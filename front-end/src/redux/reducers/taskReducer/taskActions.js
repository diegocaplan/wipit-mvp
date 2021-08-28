import axios from "axios";
export const CREATE_TASK = "CREATE_TASK";
export const TASK_DETAIL = "TASK_DETAIL";

export function createTask(task) {
  return (dispatch) => {
    return axios.post("http://localhost:3001/task", task).then((newTask) => {
      dispatch({ type: CREATE_TASK, payload: newTask.data });
    });
  };
}

export function getTaskDetail(taskId) {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3001/task/${taskId}`)
      .then((taskDetail) => {
        dispatch({ type: TASK_DETAIL, payload: taskDetail.data });
      });
  };
}

export function deleteTask(taskId) {
  return axios.delete(`http://localhost:3001/task/${taskId}`);
}

export function clearDetail() {
  return { type: TASK_DETAIL, payload: undefined };
}
