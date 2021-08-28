import axios from "axios";
export const GET_GLOBAL_CONSTANTS = "GET_GLOBAL_CONSTANTS";
export const ADD_SIMPLE_FILTER = "ADD_SIMPLE_FILTER";
export const REMOVE_SIMPLE_FILTER = "REMOVE_SIMPLE_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export function getGlobalConstants() {
  return (dispatch) => {
    return axios.get("http://localhost:3001/globalconstants")
      .then((gc) => {
        dispatch({ type: GET_GLOBAL_CONSTANTS, payload: gc.data })
      })
  }
}

export function addSimpleFilter(payload, campo) {
  return { type: ADD_SIMPLE_FILTER, payload, campo };
}
export function removeSimpleFilter(selectedOption, campo) {
  return { type: REMOVE_SIMPLE_FILTER, selectedOption, campo };
}

export function clearFilters() {
  return { type: CLEAR_FILTERS };
}