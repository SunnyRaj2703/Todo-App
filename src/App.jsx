import { useState, useEffect } from "react";
import useVoiceRecognition from "./useVoiceRecognition";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    generateStars(100);
    generateMeteors(8);
    const onResize = () => {
      generateStars(100);
      generateMeteors(8);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [darkMode]);

  function addTodo() {
    if (input.trim() === "" || date.trim() === "") return;
    setTodos([...todos, { item: input, dueDate: date, completed: false }]);
    setInput("");
    setDate("");
  }

  function deleteTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function toggleComplete(index) {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  function handleVoiceResult(text) {
    const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/);
    if (dateMatch) setDate(dateMatch[0]);
    setInput(text.replace(dateMatch?.[0] ?? "", "").trim());
  }

  const { start, isListening } = useVoiceRecognition(handleVoiceResult);

  return (
    <div className={`App ${darkMode ? "" : "light-mode"}`}>
      <div id="background" aria-hidden="true">
        <div className="stars"></div>
        <div className="meteors"></div>
      </div>

      <div className="todo-wrapper" role="main">
        <h1 id="main-heading">🌟 Todo App</h1>

        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="grid-container">
          <input
            id="todo-input"
            type="text"
            placeholder="Enter Todo here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <input
            id="todo-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            className={`mic-btn ${isListening ? "listening" : ""}`}
            onClick={start}
            aria-pressed={isListening}
            title="Click and speak. Say YYYY-MM-DD to set date"
          >
            🎤
          </button>

          <button
            className="btn-todo"
            onClick={addTodo}
            style={{ gridColumn: "1 / -1", justifySelf: "center" }}
          >
            Add
          </button>
        </div>

        <div className="todo-container">
          {todos.length === 0 ? (
            <p style={{ textAlign:"center" }}>No todos yet!</p>
          ) : (
            todos.map((todo, i) => (
              <div
                key={i}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <span>{todo.completed ? "✅" : ""}</span>
                <span>{todo.item}</span>
                <span>{todo.dueDate}</span>
                <button
                  className="btn-complete"
                  onClick={() => toggleComplete(i)}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button className="btn-delete" onClick={() => deleteTodo(i)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function generateStars(count) {
  const starsContainer = document.querySelector(".stars");
  if (!starsContainer) return;
  starsContainer.innerHTML = "";
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * maxHeight}px`;
    star.style.left = `${Math.random() * maxWidth}px`;
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out alternate`;
    starsContainer.appendChild(star);
  }
}

function generateMeteors(count) {
  const meteorContainer = document.querySelector(".meteors");
  if (!meteorContainer) return;
  meteorContainer.innerHTML = "";
  const maxWidth = window.innerWidth;
  for (let i = 0; i < count; i++) {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");
    meteor.style.left = `${Math.random() * maxWidth}px`;
    meteor.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    meteor.style.animation = `meteorFall ${Math.random() * 4 + 3}s ${Math.random() * 5}s infinite linear`;
    meteorContainer.appendChild(meteor);
  }
}
