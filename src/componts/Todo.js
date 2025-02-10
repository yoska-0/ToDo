//import from matrail ui

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// import icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//import from react
import { useContext, useState } from "react";

//import componts
import { ToDoList } from "../conText/todoList";

export default function Todo({ taskTodo, handelAlert }) {
  const [showDelateDialog, setShowDelateDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { tasks, setTasks } = useContext(ToDoList);
  const [updateTask, setUpdateTask] = useState({
    title: taskTodo.title,
    details: taskTodo.details,
  });
  // function for handel buttons
  function handelCheckedButton() {
    let copyArray = tasks.map((task) => {
      if (task.id === taskTodo.id) {
        task.isComplate = !task.isComplate;
      }
      return task;
    });
    setTasks(copyArray);
    localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
    if (taskTodo.isComplate)
      handelAlert({ show: true, title: "تم أنجاز المهمة" });
  }

  function handelDelateButton() {
    const copyArray = tasks.filter((task) => {
      return task.id !== taskTodo.id;
    });

    setTasks(copyArray);
    localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
    handelAlert({ show: true, title: "تم الحذف بنجاح" });
  }

  function handelUpdateTask() {
    const copyArray = tasks.map((task) => {
      if (task.id === taskTodo.id) {
        return {
          ...task,
          title: updateTask.title,
          details: updateTask.details,
        };
      }
      return task;
    });
    setTasks(copyArray);
    localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
    handleUpdateClose();
    handelAlert({ show: true, title: "تم التحديث بنجاح" });
  }

  function handleDelateClose() {
    setShowDelateDialog(false);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  // ====function for handel buttons====
  return (
    <Container maxWidth="sm">
      {/* delate Dialog  */}

      <Dialog
        style={{ direction: "rtl" }}
        open={showDelateDialog}
        onClose={handleDelateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" هل أنت متأكد  من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن ذالك أذا حذفت المهمة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelateClose}>أغلاق</Button>
          <Button autoFocus onClick={handelDelateButton}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* === delate Dialog === */}
      {/*  update Dialog  */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTask.title}
            onChange={(e) => {
              setUpdateTask({ ...updateTask, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={updateTask.details}
            onChange={(e) => {
              setUpdateTask({ ...updateTask, details: e.target.value });
            }}
          />
          <DialogActions>
            <Button onClick={handleUpdateClose}>أغلاق</Button>
            <Button autoFocus onClick={handelUpdateTask}>
              تأكيد التعديل
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* === update Dialog === */}
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
                    setShowDelateDialog(true);
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
                    setShowUpdateDialog(true);
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
