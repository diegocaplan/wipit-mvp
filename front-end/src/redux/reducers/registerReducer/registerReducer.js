import {
  CREATE_USER,
  LOGIN_USER,
  MODIFY_USER,
  CLEAR_USER,
} from "./registerAction";

const initialState = {
  user: {},
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload.data };
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case MODIFY_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
