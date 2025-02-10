import "./App.css";
import MainPageTodo from "./componts/MainPageTodo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToDoList } from "./conText/todoList";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: { main: "#00796b" },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ToDoList.Provider value={{ tasks, setTasks }}>
          <MainPageTodo />
        </ToDoList.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
