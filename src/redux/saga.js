import { fork } from "redux-saga/effects"
import { feed, posts } from "./modules/sagas"

export default function create(client) {
	return function * root() {
		yield [
			fork(feed(client)),
			fork(posts(client))
		]
	}
}
