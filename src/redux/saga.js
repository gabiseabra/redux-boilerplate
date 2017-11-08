import { fork, all } from "redux-saga/effects"
import { feed, posts } from "./modules/sagas"

export default function create(client) {
	return function * root() {
		yield all([
			fork(feed(client)),
			fork(posts(client))
		])
	}
}
