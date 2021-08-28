import {
  CREATE_TASK,
  TASK_DETAIL,
} from "./taskActions";

const initialState = {
  newTask: {},
  taskDetail:{}
};

 const taskReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case CREATE_TASK:
      return { ...state, newTask: payload };
    case TASK_DETAIL:
      return { ...state, taskDetail: payload };
    default:
      return state;
  }
};
export default taskReducer