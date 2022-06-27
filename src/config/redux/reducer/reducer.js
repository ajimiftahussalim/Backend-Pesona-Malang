import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import createTourReducer from "./createTourReduser";

const reducer = combineReducers({homeReducer, createTourReducer})

export default reducer;