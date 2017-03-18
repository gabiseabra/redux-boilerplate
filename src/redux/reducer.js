import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { content, status } from "./modules/reducers"

export default combineReducers({
	content,
	status,
	routing: routerReducer
})
