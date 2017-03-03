import { combineReducers } from "redux"
import feed from "./feed/reducer"
import posts from "./posts/reducer"

export default combineReducers({ feed, posts })
