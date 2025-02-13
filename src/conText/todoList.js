import { createContext, useReducer } from "react";
import todosReducers from "../reducers/TodosReducer";

export const TodoList = createContext([]);

export const TodoProvider = ({ children }) => {
  const [tasksReduser, dispatchTasksReduser] = useReducer(todosReducers, []);
  return (
    <TodoList value={{ tasksReduser, dispatchTasksReduser }}>
      {children}
    </TodoList>
  );
};
