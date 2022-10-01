import React, { useEffect, useState } from "react";
import Cancel from "../assets/images/cancel.png";
import Edit from "../assets/images//edit.svg";
import Plus from "../assets/images/plus.svg";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";

const Todo = ({ todo }) => {
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [name, setName] = useState(todo.text);
  const [completed, setCompleted] = useState(todo.completed);
  const [color, setColor] = useState(todo.color);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setName(todo.text);
    setCompleted(todo.completed);
  }, [todo.text, todo.completed]);

  const handleToggleChanged = (todoId, completed) => {
    editTodo({
      id: todoId,
      data: { completed: !completed },
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editTodo({
      id: todo.id,
      data: { text: name },
    });
    setEdit(false);
  };

  const handleColorChanged = (todoId, color) => {
    editTodo({
      id: todoId,
      data: { color },
    });
  };

  const handleDelete = (todoId) => {
    deleteTodo(todoId);
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed ? "border-green-500" : "border-gray-400"
        }`}
      >
        <input
          onChange={() => {
            setCompleted(!completed);
            handleToggleChanged(todo.id, completed);
          }}
          checked={completed}
          type="checkbox"
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 ${completed && "line-through"}`}>
        {edit ? (
          <form
            onSubmit={handleUpdate}
            className="flex items-center bg-gray-100 px-1 py- rounded"
          >
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Type your todo"
              className="w-full px- py- border-none outline-none bg-gray-100"
            />
            <button
              type="submit"
              className={`appearance-none w-5 h-5 bg-[url('${Plus}')] bg-no-repeat bg-contain`}
            ></button>
          </form>
        ) : (
          <p>{name}</p>
        )}
      </div>

      <img
        onClick={() => {
          setEdit(true);
        }}
        src={Edit}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />

      <div
        onClick={() => {
          setColor("green");
          handleColorChanged(todo.id, "green");
        }}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${
          color === "green" && "bg-green-500"
        }`}
      ></div>

      <div
        onClick={() => {
          setColor("yellow");
          handleColorChanged(todo.id, "yellow");
        }}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
      ></div>

      <div
        onClick={() => {
          setColor("red");
          handleColorChanged(todo.id, "red");
        }}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${
          color === "red" && "bg-red-500"
        }`}
      ></div>

      <img
        onClick={() => handleDelete(todo.id)}
        src={Cancel}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />
    </div>
  );
};

export default Todo;
