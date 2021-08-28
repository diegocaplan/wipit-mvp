export const SET_ROOM = "SET_ROOM";
export const CLEAR_ROOM = "CLEAR_ROOM";

export function setRoom(room) {
  return { type: SET_ROOM, payload: room};
}

export function clearRoom() {
  return { type: CLEAR_ROOM, payload: undefined };
}
