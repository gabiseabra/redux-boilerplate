import { fork } from "redux-saga/effects"
import { content } from "./modules/sagas"

export default function * root() {
	yield [
		fork(content)
	]
}
