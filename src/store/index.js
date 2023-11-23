import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import audioFile from "./audioFile";
import properties from "./properties";
import funcName from "./funcName";

export default configureStore({
	reducer: combineReducers({ audioFile, properties, funcName }),
	middleware: [thunkMiddleware],
});
