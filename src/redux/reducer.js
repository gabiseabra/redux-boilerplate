import { combineReducers } from "redux"
import { content, info } from "./modules/reducers"

export default combineReducers({
	content,
	info
})
