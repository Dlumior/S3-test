import { createStore } from "redux";

import homeReducer from "./Home/homeReducer.js";

const store = createStore(homeReducer);

export default store;
