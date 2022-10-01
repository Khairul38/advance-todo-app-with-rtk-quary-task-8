import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake--json-server.herokuapp.com/",
  }),
  tagTypes: ["Filtered", "Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos?_sort=id&_order=desc",
      providesTags: ["Todos"],
    }),
    getFilteredTodos: builder.query({
      query: ({ status, colors }) => {
        let queryString = "todos?_sort=id&_order=desc";
        if (status === "All") {
          queryString = "todos?_sort=id&_order=desc";
        }
        if (status === "Incomplete") {
          queryString += "&completed=false";
        }
        if (status === "Complete") {
          queryString += "&completed=true";
        }
        if (colors.length > 0) {
          queryString += colors.map((color) => `&color=${color}`).join("");
        }
        return queryString;
      },
      providesTags: [ "Filtered"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Filtered", "Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [
        "Filtered",
        "Todos",
      ],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Filtered", "Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetFilteredTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
