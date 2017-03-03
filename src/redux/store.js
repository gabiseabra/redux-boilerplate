import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import createLoggerMiddleware from "redux-logger"
import reducer from "./reducer"
import saga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const middleware = [ sagaMiddleware ]

if(process.env.NODE_ENV === "development") {
	middleware.push(createLoggerMiddleware())
}

export default createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(saga)
