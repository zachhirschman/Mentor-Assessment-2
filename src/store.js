import { createStore, applyMiddleware } from "redux";
import tasks from './redux/tasks';
import promiseMiddleware from "redux-promise-middleware";

let middleware = [ promiseMiddleware ]

export default createStore( tasks, undefined, applyMiddleware(...middleware) );