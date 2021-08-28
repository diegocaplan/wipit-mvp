import {
    GET_LANGUAGES,
  } from "./languageAction";
  
  const initialState = {
    languages: [],
  };
  
 const languageReducer = (state = initialState, {type,payload}) => {
    switch (type) {
      case GET_LANGUAGES:
        return { ...state, languages: payload };
      default:
        return state;
    }
  };

  export default languageReducer;