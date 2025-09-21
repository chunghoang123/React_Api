import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { ramdomReducer } from "./ramdomReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    ramdom: ramdomReducer
})

export default rootReducer