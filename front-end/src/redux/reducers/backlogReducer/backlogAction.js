import axios from "axios";
export const GET_BACKLOG_TASKS = "GET_BACKLOG_TASKS";

export function getBacklogTasks() {
  return (dispatch) => {
    return axios.get("http://localhost:3001/tasks").then((response) => {
      if (response.data) {
        const pending = response.data.filter(
          (task) => task.status === "sprint"
        );
        dispatch({ type: GET_BACKLOG_TASKS, payload: pending });
      } else {
        dispatch({ type: GET_BACKLOG_TASKS, payload: "No hay tareas." });
      }
    });
  };
}
