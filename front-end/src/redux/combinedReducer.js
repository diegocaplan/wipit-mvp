import { combineReducers } from 'redux';
import registerReducer from "./reducers/registerReducer/registerReducer";
import backlogReducer from "./reducers/backlogReducer/backlogReducer";
import languageFilterReducer from './reducers/languageFilterReducer/languageFilterReducer';
import simpleFilterReducer from './reducers/simpleFilterReducer/simpleFilterReducer';
import searchReducer from './reducers/searchReducer/searchReducer';
import orderReducer from './reducers/orderReducer/orderReducer';
import languageReducer from './reducers/languageReducer/languageReducer';
import taskReducer from './reducers/taskReducer/taskReducer';
import roomReducer from './reducers/roomReducer/roomReducer';


const rootReducer = combineReducers({  
    registerReducer,
    backlogReducer,
    languageReducer,
    languageFilterReducer,
    simpleFilterReducer,
    searchReducer,
    orderReducer,
    taskReducer,
    roomReducer
});
  
export default rootReducer;