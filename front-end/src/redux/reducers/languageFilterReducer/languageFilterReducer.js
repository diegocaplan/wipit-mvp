import { GET_LANGUAGES,REMOVE_LANGUAGE_FILTER,ADD_LANGUAGE_FILTER,CLEAR_LANGUAGE_FILTER } from "./languageFilterAction";

const initialState = {
    languageFilterloaded: [],
    languageFilter: [],
}

const languageFilterReducer =  (state = initialState, action) => {
    switch(action.type){

        case GET_LANGUAGES:
          return {
            ...state,
            languageFilterloaded: action.payload,
          }

        case ADD_LANGUAGE_FILTER:
          if(state.languageFilterloaded.map((l) => l.name).includes(action.payload)){
            return {
              ...state,
              languageFilter: state.languageFilter.concat(action.payload)
            }
          }
          break;
        case REMOVE_LANGUAGE_FILTER:
          return {
            ...state,
            languageFilter: state.languageFilter.filter(language=> language !== action.payload)
          }

        case CLEAR_LANGUAGE_FILTER:
          return {
            ...state,
            languageFilter: []
          }

        default:
            return state;
    }
} 

export default languageFilterReducer;