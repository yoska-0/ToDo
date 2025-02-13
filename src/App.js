import "./App.css";
import MainPageTodo from "./componts/MainPageTodo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodoProvider } from "./conText/todoList";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: { main: "#00796b" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TodoProvider>
          <MainPageTodo />
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
