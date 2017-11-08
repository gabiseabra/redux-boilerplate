import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import { isFeedReady } from "./selectors"
import * as actions from "./index"

export default function create(client) {
	function * request() {
		yield put(actions.request())
		const response = yield call(client.feed)
		if(response.error) {
			yield put(actions.fail(response.error))
		} else {
			yield put(actions.success(response))
		}
	}


	function * load() {
		const ready = yield select(isFeedReady)
		if(!ready) {
			yield fork(request)
		}
	}


	return function * watch() {
		yield [
			takeLatest(actions.LOAD, load)
		]
	}
}
