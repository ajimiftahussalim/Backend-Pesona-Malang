import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import tourReducer from "./tourReduser";

const reducer = combineReducers({homeReducer, tourReducer})

export default reducer;