import axios from "axios";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const ADD_LANGUAGE_FILTER = "ADD_LANGUAGE_FILTER";
export const REMOVE_LANGUAGE_FILTER = "REMOVE_LANGUAGE_FILTER";
export const CLEAR_LANGUAGE_FILTER = "CLEAR_LANGUAGE_FILTER";

export function getLanguages(area){
    return (dispatch) => {
        return axios.get("http://localhost:3001/languages")
        .then((language) => {
          if (area.length>0) language.data = language.data.filter(l=>
            area.includes(l.area)
          ) 
          dispatch({type: GET_LANGUAGES, payload: language.data})
        })
    }
}

export function addLanguageFilter(payload) {
    return { type: ADD_LANGUAGE_FILTER, payload };
  }
export function removeLanguageFilter(payload) {
  return { type: REMOVE_LANGUAGE_FILTER, payload };
}

export function clearLanguageFilter(payload) {
  return { type: CLEAR_LANGUAGE_FILTER, payload };
}
