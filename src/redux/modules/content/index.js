import { combineReducers } from "redux"
import feed from "./feed"
import posts from "./posts"

export default combineReducers({ feed, posts })
