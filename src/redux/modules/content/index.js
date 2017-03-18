import { combineReducers } from "redux"
import feed from "./feed"
import posts from "./posts"
import info from "./info"

export default combineReducers({ info, feed, posts })
