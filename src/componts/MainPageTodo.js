// import from matrila ui
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

/*import componts*/
import Todo from "./Todo";
import { ToDoList } from "../conText/todoList";
import AlertButton from "./AlertButton";

//import from react
import { useState, useContext, useEffect } from "react";

// other library
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@emotion/react";

export default function MainPageTodo() {
  const theme = useTheme();

  const [showAlert, setShowAlert] = useState({});

  const { tasks, setTasks } = useContext(ToDoList);
  const [contentField, setContentField] = useState("");
  const [displayTasks, setDisplayTasks] = useState("all");

  const listTasksComplete = tasks.filter((task) => {
    return task.isComplate;
  });

  const listTasksnotComplete = tasks.filter((task) => {
    return !task.isComplate;
  });

  function getTasksRandraing() {
    if (displayTasks === "all") return tasks;
    else if (displayTasks === "complete") return listTasksComplete;
    else return listTasksnotComplete;
  }

  const listTasks = getTasksRandraing().map((task) => {
    if (task.title !== "") {
      return <Todo key={task.id} handelAlert={setShowAlert} taskTodo={task} />;
    }
    return null;
  });

  useEffect(() => {
    if (showAlert.show) {
      setTimeout(() => {
        setShowAlert({ show: false, title: "" });
      }, 2500);
    }
  }, [showAlert.show]);

  function alertProps(masseg) {
    return <AlertButton title={masseg}></AlertButton>;
  }

  useEffect(() => {
    const dataTasksStoreg =
      JSON.parse(localStorage.getItem("tasksStoreg")) ?? [];
    setTasks(dataTasksStoreg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fixed maxWidth="sm" style={{ marginTop: "150px" }}>
      {showAlert.show && alertProps(showAlert.title)}
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "600px", overflow: "scroll" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
        </CardContent>
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          color=""
          value={displayTasks}
          style={{ color: theme.palette.primary.main }}
          onClick={(e) => {
            console.log(e.target.value);
            setDisplayTasks(e.target.value);
          }}
        >
          <Button
            value={"non-complete"}
            style={{
              color:
                displayTasks === "non-complete"
                  ? theme.palette.primary.main
                  : "#757575",
            }}
          >
            غير المنجز
          </Button>
          <Button
            value={"complete"}
            style={{
              color:
                displayTasks === "complete"
                  ? theme.palette.primary.main
                  : "#757575",
            }}
          >
            المنجز
          </Button>
          <Button
            value={"all"}
            style={{
              color:
                displayTasks === "all" ? theme.palette.primary.main : "#757575",
            }}
          >
            الكل
          </Button>
        </ButtonGroup>
        {/* Tasks */}

        {listTasks}

        {/*== Tasks ==*/}
        {/* add tasks  */}
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "20px", padding: "10px" }}
        >
          <Grid size={4}>
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={addTask}
            >
              أضافة
            </Button>
          </Grid>
          <Grid size={8}>
            <TextField
              value={contentField}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              onChange={(e) => {
                setContentField(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {/* == add tasks == */}
      </Card>
    </Container>
  );

  function addTask() {
    const copyTasks = {
      id: uuidv4(),
      title: contentField,
      details: "",
      isComplate: false,
    };

    let updateTasks = [...tasks, copyTasks];
    setTasks(updateTasks);

    setContentField("");
    localStorage.setItem("tasksStoreg", JSON.stringify(updateTasks));
    setShowAlert({ show: true, title: "تم أضافة مهمة" });
  }
}
