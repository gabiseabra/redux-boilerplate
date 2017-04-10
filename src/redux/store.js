import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import { createCookieMiddleware } from "redux-cookie"
import { hydrate } from "./index"
import reducer from "./reducer"
import DevTools from "./DevTools"

export default function create(cookie, state) {
	const sagaMiddleware = createSagaMiddleware()
	const enhancers = []
	const middleware = [
		sagaMiddleware
	]
	if(cookie) {
		middleware.push(createCookieMiddleware(cookie))
	}
	if(process.env.NODE_ENV === "development") {
		middleware.push(createLoggerMiddleware())
		/* eslint-disable no-underscore-dangle */
		enhancers.push(
			window.__REDUX_DEVTOOLS_EXTENSION__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() :
			DevTools.instrument()
		)
		/* eslint-enable */
	}
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
