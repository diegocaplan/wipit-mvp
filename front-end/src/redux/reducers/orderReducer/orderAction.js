export const ADD_DATE_ORDER = "ADD_DATE_ORDER";
export const REMOVE_DATE_ORDER = "REMOVE_DATE_ORDER";

export function addDateOrder(payload) {
    return { type: ADD_DATE_ORDER, payload: payload};
}

export function removeDateOrder(payload){
    return { type: REMOVE_DATE_ORDER, payload: payload};
}