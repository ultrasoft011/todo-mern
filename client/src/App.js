import { useEffect, useState } from "react";
const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.log(err));
  };

  const handleOnClick = async (id) => {
    const data = await fetch(API_BASE + "/todos/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };
  return (
    <div className="App">
      <h1>Welcome</h1>
      <h4>Your tasks</h4>
      <div>
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "complete" : "")}
            key={todo._id}
          >
            <div className="todos">
              <div
                className="checkbox"
                onClick={() => handleOnClick(todo._id)}
              ></div>
              <div>{todo.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
