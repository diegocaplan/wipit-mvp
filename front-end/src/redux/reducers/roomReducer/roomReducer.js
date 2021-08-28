import {
  SET_ROOM,
  CLEAR_ROOM,
} from "./roomActions";

const initialState = {
  room:'',
};

 const roomReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case SET_ROOM:
      return { ...state, room: payload };
    case CLEAR_ROOM:
      return { ...state, room:'' };
    default:
      return state;
  }
};
export default roomReducer