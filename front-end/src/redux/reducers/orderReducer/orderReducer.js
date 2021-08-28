import { ADD_DATE_ORDER, REMOVE_DATE_ORDER } from "./orderAction";

const initialState = {
    dateOrder : [],
}

 const orderReducer =(state = initialState, action) => {
    switch (action.type) {
      case ADD_DATE_ORDER:
        return { 
            dateOrder: action.payload,
        };
      
      case REMOVE_DATE_ORDER:
          return {
              dateOrder: [],
          }
      default:
        return state;
    }
  };

  export default orderReducer;