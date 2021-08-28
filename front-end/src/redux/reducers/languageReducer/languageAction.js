import axios from "axios";

export const GET_LANGUAGES = "GET_LANGUAGES";

export function getLanguages(area) {
  return (dispatch) => {
    if(area){
      return axios.get(`http://localhost:3001/languages?area=${area}`)
      .then((languages) => {
        dispatch({ type: GET_LANGUAGES, payload: languages.data });
      });
    }else{
      return axios.get("http://localhost:3001/languages")
      .then((languages) => {
        dispatch({ type: GET_LANGUAGES, payload: languages.data });
      });
    };
    }
    
}

