import axios from "axios";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const MODIFY_USER = "MODIFY_USER";
export const CLEAR_USER = "CLEAR_USER";

export function createUser(body) {
  return (dispatch) => {
    return axios
      .post("http://localhost:3001/user/createUser", body)
      .then((newUser) => {
        delete newUser.data.password;
        dispatch({ type: CREATE_USER, payload: newUser });
      });
  };
}

export function logInUser(userInfo) {
  delete userInfo.password;
  return (dispatch) => {
    return dispatch({ type: LOGIN_USER, payload: userInfo });
  };
}

export function modifyUser(info) {
  return (dispatch) => {
    return axios.put("http://localhost:3001/user/changePassword", info)
      .then((updateUser) => {
        dispatch({ type: MODIFY_USER, payload: updateUser.data });
      });
  };
};

export function clearUser() {
  return ({ type: CLEAR_USER, payload: {} })
};
