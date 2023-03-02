import React, { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getAllTodos = async () => {
    const todoResponse = await fetch("http://localhost:4000/todo");
    const allTodos = await todoResponse.json();
    setTodos(allTodos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  async function addTodo() {
    const newTodoResponse = await fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo,
        completed: false,
      }),
    });
    const response = await newTodoResponse.text();
    getAllTodos();
  }

  async function completeTodo(todo) {
    const updateTodoResponse = await fetch(
      `http://localhost:4000/todo/${todo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );
    await updateTodoResponse.text();
    getAllTodos();
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter Todo"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos?.map((todo) => {
          return (
            <li key={todo.title}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => {
                  completeTodo(todo);
                }}
              >
                Complete
              </button>
              <button>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Todo;
