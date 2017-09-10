import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import Config from "./config.js";
import Reducers from "./reducers.js";

// const middleware = applyMiddleware(thunk, createLogger());
// for prod
const middleware = applyMiddleware(thunk);

const initialState = Config.initialState;
const store = createStore(Reducers, initialState, middleware);

export default store;
