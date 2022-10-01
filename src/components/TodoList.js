import React from "react";
import { useSelector } from "react-redux";
import { useGetFilteredTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";

const TodoList = () => {
  const { status, colors } = useSelector((state) => state.filters);
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetFilteredTodosQuery({ status, colors });

  // decide what to render
  let content = null;

  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>There was an error occurred</p>;
  if (!isLoading && !isError && todos?.length === 0)
    content = <p>No todo found</p>;
  if (!isLoading && !isError && todos?.length > 0)
    content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {/* <!-- todo --> */}
      {content}
    </div>
  );
};

export default TodoList;
