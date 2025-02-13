// other library
import { v4 as uuidv4 } from "uuid";

export default function todosReducers(currentValue, action) {
  switch (action.type) {
    case "added": {
      const copyTasks = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isComplate: false,
      };
      let updateTasks = [...currentValue, copyTasks];
      localStorage.setItem("tasksStoreg", JSON.stringify(updateTasks));
      return updateTasks;
    }
    case "updated": {
      const copyArray = currentValue.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return task;
      });
      localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
      return copyArray;
    }
    case "deleted": {
      const copyArray = currentValue.filter((task) => {
        return task.id !== action.payload.id;
      });

      localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
      return copyArray;
    }
    case "get": {
      const dataTasksStoreg =
        JSON.parse(localStorage.getItem("tasksStoreg")) ?? [];
      return dataTasksStoreg;
    }

    case "checked": {
      const copyArray = currentValue.map((task) => {
        if (task.id === action.payload.id) {
          const copyTask = { ...task, isComplate: !task.isComplate };
          return copyTask;
        }
        return task;
      });
      localStorage.setItem("tasksStoreg", JSON.stringify(copyArray));
      return copyArray;
    }

    default:
      throw new Error("Don't know this action type");
  }
}
