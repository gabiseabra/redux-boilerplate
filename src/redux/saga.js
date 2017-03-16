import { fork } from "redux-saga/effects"
import { content, info } from "./modules/sagas"

export default function create(client) {
	return function * root() {
		yield [
			fork(content(client)),
			fork(info(client))
		]
	}
}
