//import from matrail ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";

// import icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//import from react
import { useContext } from "react";

//import componts
import { TodoList } from "../conText/todoList";

export default function Todo({
  taskTodo,
  handelAlert,
  openDelateDiloge,
  openUpdateDiloge,
}) {
  const { tasksReduser, dispatchTasksReduser } = useContext(TodoList);

  // function for handel buttons
  function handelCheckedButton() {
    dispatchTasksReduser({ type: "checked", payload: taskTodo });
    if (taskTodo.isComplate)
      handelAlert({ show: true, title: "تم أنجاز المهمة" });
  }

  // ====function for handel buttons====
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          marginTop: 5,
          marginBottom: 5,
          background: "#000d6c",
        }}
        className="contentTask"
      >
        <CardContent sx={{}} style={{ padding: "16px" }}>
          <Grid container spacing={1}>
            <Grid
              size={4}
              container
              justifyContent="space-around"
              alignItems="center"
              display="flex"
            >
              <IconButton
                aria-label="check"
                size="large"
                style={{ padding: 0 }}
              >
                <DeleteIcon
                  className="iconButton"
                  sx={{
                    padding: "2px",
                    fontSize: "inherit",
                    color: "#ff1744",
                    border: "2px solid #ff1744",
                    background: "white",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    openDelateDiloge(taskTodo);
                  }}
                />
              </IconButton>
              <IconButton
                aria-label="check"
                size="large"
                style={{ padding: 0 }}
              >
                <ModeEditIcon
                  className="iconButton"
                  sx={{
                    padding: "2px",
                    fontSize: "inherit",
                    color: "#2196f3",
                    border: "2px solid #2196f3",
                    background: "white",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    openUpdateDiloge(taskTodo);
                  }}
                />
              </IconButton>
              <IconButton
                aria-label="check"
                size="large"
                style={{ padding: 0 }}
              >
                <CheckIcon
                  className="iconButton"
                  sx={{
                    padding: "2px",
                    fontSize: "inherit",
                    color: taskTodo.isComplate ? "white" : "#43a047",
                    border: "2px solid #43a047",
                    background: taskTodo.isComplate ? "#43a047" : "white",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    handelCheckedButton();
                  }}
                />
              </IconButton>
            </Grid>
            <Grid size={8}>
              <Typography
                gutterBottom
                variant="h5"
                style={{
                  textAlign: "right",
                  color: "white",
                  textDecoration: taskTodo.isComplate ? "line-through" : "none",
                }}
              >
                {taskTodo.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                style={{
                  textAlign: "right",
                  color: "white",
                  margin: "0",
                  textDecoration: taskTodo.isComplate ? "line-through" : "none",
                }}
              >
                {taskTodo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
