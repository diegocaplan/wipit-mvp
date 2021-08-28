import { UPDATE_SEARCH } from "./searchAction";

const initialState = {
    searchFilter:''
}

const searchReducer =(state = initialState, action) => {
    switch(action.type){

        case UPDATE_SEARCH:
          return {
            ...state,
            searchFilter: action.payload
          }
  
        default:
            return state;
    }
} 

export default searchReducer;