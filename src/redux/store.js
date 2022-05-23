import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import messagesReducer from "./messages";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    messagesReducer: messagesReducer
});

//TODO: remove react-devtools-extension in production
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
