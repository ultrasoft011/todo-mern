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

  return (
    <div className="App">
      <h1>Welcome</h1>
      <h4>Your tasks</h4>
      <div className="todos">
        {todos.map((todo) => (
          <div key={todo._id}>{todo.text}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
