const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json()); // Allow to the server to accept a json in thre body of the req

mongoose
  .connect(
    "mongodb+srv://ultra:safe2008@nodeexpressprojects.vtjsw6v.mongodb.net/?retryWrites=true&w=majority",
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

const Todo = require("./models/Todo.js");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save(); // save the todo to the actual collection
  res.json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

app.listen(3001, () => console.log("Server started on port 3001"));
