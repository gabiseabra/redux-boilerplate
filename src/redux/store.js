import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import reducer from "./reducer"

export default function create(state) {
	let store;
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [
		sagaMiddleware
	];
	if(process.env.NODE_ENV === "development") {
		middleware.push(createLoggerMiddleware())
	}
	if(state) {
		store = createStore(reducer, state, applyMiddleware(...middleware));
	} else {
		store = createStore(reducer, applyMiddleware(...middleware));
	}
	store.runSaga = sagaMiddleware.run;
	store.close = (() => store.dispatch(END));
	return store;
}