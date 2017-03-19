import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import { hydrate } from "./index"
import reducer from "./reducer"

export default function create(state) {
	let store
	const sagaMiddleware = createSagaMiddleware()
	const middleware = [
		sagaMiddleware
	]
	middleware.push(createLoggerMiddleware())
	if(state) {
		store = createStore(reducer, state, applyMiddleware(...middleware))
		store.dispatch(hydrate(state))
	} else {
		store = createStore(reducer, applyMiddleware(...middleware))
	}
	store.runSaga = sagaMiddleware.run
	store.close = (() => store.dispatch(END))
	return store
}
