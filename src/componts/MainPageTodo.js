// import from matrila ui
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*import from project*/
import Todo from "./Todo";
import { TodoList } from "../conText/todoList";
import AlertButton from "./AlertButton";

//import from react
import { useState, useContext, useEffect, useMemo } from "react";

// other library
import { useTheme } from "@emotion/react";

export default function MainPageTodo() {
  const theme = useTheme();

  const { tasksReduser, dispatchTasksReduser } = useContext(TodoList);
  //useReducer(todosReducers, []);
  const [showAlert, setShowAlert] = useState({});
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDelateDialog, setShowDelateDialog] = useState(false);
  const [contentField, setContentField] = useState("");
  const [displayTasks, setDisplayTasks] = useState("all");
  const [todo, setTodo] = useState({});

  function addTask() {
    if (contentField !== "") {
      dispatchTasksReduser({
        type: "added",
        payload: { newTitle: contentField },
      });

      setContentField("");
      setShowAlert({ show: true, title: "تم أضافة مهمة" });
    }
  }

  const listTasksComplete = useMemo(() => {
    return tasksReduser.filter((task) => {
      return task.isComplate;
    });
  }, [tasksReduser]);

  const listTasksnotComplete = useMemo(() => {
    return tasksReduser.filter((task) => {
      return !task.isComplate;
    });
  }, [tasksReduser]);

  function getTasksRandraing() {
    if (displayTasks === "all") return tasksReduser;
    else if (displayTasks === "complete") return listTasksComplete;
    else return listTasksnotComplete;
  }

  const listTasks = getTasksRandraing().map((task) => {
    return (
      <Todo
        key={task.id}
        handelAlert={setShowAlert}
        openDelateDiloge={handelShowDelateDilaog}
        taskTodo={task}
        openUpdateDiloge={handelShowUpdateDilaog}
      />
    );
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

  // start handel dialog

  function handleDelateClose() {
    setShowDelateDialog(false);
  }

  function handelShowDelateDilaog(todo) {
    setTodo(todo);
    setShowDelateDialog(true);
  }

  function handelDelateButton() {
    dispatchTasksReduser({ type: "deleted", payload: todo });
    setShowAlert({ show: true, title: "تم الحذف بنجاح" });
    setShowDelateDialog(false);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handelShowUpdateDilaog(todo) {
    setTodo(todo);
    setShowUpdateDialog(true);
  }

  function handelUpdateTask() {
    dispatchTasksReduser({ type: "updated", payload: todo });
    handleUpdateClose();
    setShowAlert({ show: true, title: "تم التحديث بنجاح" });
  }

  // end handel dialog

  useEffect(() => {
    dispatchTasksReduser({ type: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fixed maxWidth="sm" style={{ marginTop: "150px" }}>
      {/* alert */}
      {showAlert.show && alertProps(showAlert.title)}
      {/* ==== alert ====*/}

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
            value={todo.title}
            onChange={(e) => {
              setTodo({ ...todo, title: e.target.value });
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
            value={todo.details}
            onChange={(e) => {
              setTodo({ ...todo, details: e.target.value });
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
}
