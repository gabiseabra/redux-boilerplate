import { fork, all } from "redux-saga/effects"
import { feed, posts } from "./modules/sagas"

export default function create(options) {
	return function * root() {
		yield all([
			fork(feed(options)),
			fork(posts(options))
		])
	}
}
