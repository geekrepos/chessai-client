import {combineReducers} from "redux";
import {LOGOUT} from "../action_types/action_types";
import userReducer from "./userReducer";

const appReducer = combineReducers({
    userReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
