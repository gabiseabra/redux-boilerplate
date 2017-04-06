import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import { createCookieMiddleware } from "redux-cookie"
import { hydrate } from "./index"
import reducer from "./reducer"

export default function create(cookie, state) {
	let store
	const sagaMiddleware = createSagaMiddleware()
	const middleware = [
		sagaMiddleware
	]

	if(cookie) {
		middleware.push(createCookieMiddleware(cookie))
	}

	if(process.env.NODE_ENV === "development") {
		middleware.push(createLoggerMiddleware())
	}

	if(state) {
		store = createStore(reducer, state, applyMiddleware(...middleware))
		store.dispatch(hydrate(state))
	} else {
		store = createStore(reducer, applyMiddleware(...middleware))
	}

	store.runSaga = sagaMiddleware.run
	store.close = (() => store.dispatch(END))

	if(process.env.HMR && module.hot) {
		module.hot.accept("./reducer", () => {
			store.replaceReducer(reducer)
		})
	}

	return store
}
