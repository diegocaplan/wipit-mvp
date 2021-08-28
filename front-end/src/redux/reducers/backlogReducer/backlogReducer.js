import { GET_BACKLOG_TASKS } from "./backlogAction";

const initialState = {
    backlogtasks: [],
}

const backlogReducer = (state = initialState, action) => {
    switch(action.type){

        case GET_BACKLOG_TASKS:
            return {
                ...state,
                backlogtasks: action.payload,

            }

        default:
            return state;
    }
} 

export default backlogReducer