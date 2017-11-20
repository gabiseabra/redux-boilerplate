import { put, call, fork, select, takeLatest, all } from "redux-saga/effects"
import { isFeedReady } from "./selectors"
import * as actions from "./index"

export default function create({ apiClient }) {
	function * request() {
		yield put(actions.request())
		const response = yield call(apiClient.feed)
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
		yield all([
			takeLatest(actions.LOAD, load)
		])
	}
}
