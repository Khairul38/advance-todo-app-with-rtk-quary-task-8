import React from "react";
import { useGetTodosQuery } from "../features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { colorChange, statusChange } from "../features/filter/filterSlice";

const Footer = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const dispatch = useDispatch();
  const { status, colors } = useSelector((state) => state.filters);

  const todosRemaining = todos?.filter((todo) => !todo.completed).length;

  const numberOfTodos = (totalTodos) => {
    switch (totalTodos) {
      case 0:
        return "No task";

      case 1:
        return "1 task";

      default:
        return `${totalTodos} tasks`;
    }
  };

  const handleStatusChanged = (status) => {
    dispatch(statusChange(status));
  };

  const handleColorChanged = (color) => {
    dispatch(colorChange(color));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      {!isLoading && <p>{numberOfTodos(todosRemaining)} left</p>}
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => handleStatusChanged("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => handleStatusChanged("Incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => handleStatusChanged("Complete")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          onClick={() => handleColorChanged("green")}
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
        ></li>
        <li
          onClick={() => handleColorChanged("yellow")}
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer
        ${colors.includes("yellow") && "bg-yellow-500"}
        `}
        ></li>
        <li
          onClick={() => handleColorChanged("red")}
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
