import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducer"

const sagaMiddleware = createSagaMiddleware()

const middleware = [ sagaMiddleware ]

export default createStore(reducer, applyMiddleware(...middleware));

// sagaMiddleware.run(saga)
