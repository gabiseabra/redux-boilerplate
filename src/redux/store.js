import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import { createCookieMiddleware } from "redux-cookie"
import { hydrate } from "./index"
import reducer from "./reducer"

export default function create(cookie, state) {
	const sagaMiddleware = createSagaMiddleware()
	const enhancers = []
	const middleware = [
		sagaMiddleware
	]
	if(cookie) {
		middleware.push(createCookieMiddleware(cookie))
	}
	/* eslint-disable no-underscore-dangle */
	if(process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__) {
		middleware.push(createLoggerMiddleware())
		enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())
	}
	/* eslint-enable */
	const finalCreateStore = compose(
		applyMiddleware(...middleware),
		...enhancers
	)(createStore)
	const store = finalCreateStore(reducer, state)
	store.runSaga = sagaMiddleware.run
	store.close = (() => store.dispatch(END))
	if(state) {
		store.dispatch(hydrate(state))
	}
	if(process.env.HMR && module.hot) {
		module.hot.accept("./reducer", () => {
			store.replaceReducer(reducer)
		})
	}
	return store
}
