import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import { hydrate } from "./index"
import reducer from "./reducer"

export default function create(state) {
	const sagaMiddleware = createSagaMiddleware()
	const enhancers = []
	const middleware = [
		sagaMiddleware
	]
	if(process.env.NODE_ENV === "development" && process.env.BUNDLE === "client") {
		middleware.push(createLoggerMiddleware())
		/* eslint-disable no-underscore-dangle */
		if(window.__REDUX_DEVTOOLS_EXTENSION__) {
			enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
		}
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
