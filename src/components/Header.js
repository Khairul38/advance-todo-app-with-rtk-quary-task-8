import React, { useState } from "react";
import Notes from "../assets/images/notes.png";
import DoubleTick from "../assets/images/double-tick.png";
import Plus from "../assets/images/plus.png";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";

const Header = () => {
  const { data: todos } = useGetTodosQuery();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const [input, setInput] = useState("");

  const handleAllCompleted = () => {
    const incompleteTasks = todos.filter((todo) => !todo.completed);
    incompleteTasks.forEach((t) => {
      editTodo({
        id: t.id,
        data: { completed: true },
      });
    });
  };
  const handleClearCompleted = () => {
    const completeTasks = todos.filter((todo) => todo.completed);
    completeTasks.forEach((t) => {
      deleteTodo(t.id);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      text: input,
      completed: false,
      color: "",
    });
    setInput("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src={Notes} className="w-6 h-6" alt="Add todo" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${Plus}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          onClick={handleAllCompleted}
          className="flex space-x-1 cursor-pointer"
        >
          <img className="w-4 h-4" src={DoubleTick} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li onClick={handleClearCompleted} className="cursor-pointer">
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
