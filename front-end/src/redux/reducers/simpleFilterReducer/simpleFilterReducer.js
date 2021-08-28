import { GET_GLOBAL_CONSTANTS, REMOVE_SIMPLE_FILTER, ADD_SIMPLE_FILTER, CLEAR_FILTERS } from "./simpleFilterAction";

const initialState = {
  globalconstants: {}
}

const simpletFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_CONSTANTS:
      return {
        ...state,
        globalconstants: action.payload
      }
    case ADD_SIMPLE_FILTER:
      if (state[action.campo + 'Filter']) {
        if (!state[action.campo + 'Filter'].includes(action.payload)) {
          return {
            ...state,
            [action.campo + 'Filter']: [...state[action.campo + 'Filter'], action.payload]
          }
        }
      } else {
        return {
          ...state,
          [action.campo + 'Filter']: [action.payload]
        }
      }
      break;
    case REMOVE_SIMPLE_FILTER:
      return {
        ...state,
        [action.campo + 'Filter']: state[action.campo + 'Filter'].filter(f => f !== action.selectedOption)
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        areaFilter: '',
        purposeFilter: '',
        difficultyFilter: '',
        howlongFilter: ''
      }
    default:
      return state;
  }
}

export default simpletFilterReducer;