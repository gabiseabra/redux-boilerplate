import { put, call, fork, select, takeLatest, all } from "redux-saga/effects"
import { isPostReady } from "./selectors"
import * as actions from "./index"

export default function create({ apiClient }) {
	function * request({ id }) {
		yield put(actions.request({ id }))
		const response = yield call(apiClient.post, id)
		if(response.error) {
			yield put(actions.fail(id, response.error))
		} else {
			yield put(actions.success(id, response))
		}
	}


	function * load(props) {
		const ready = yield select(isPostReady, props)
		if(!ready) {
			yield fork(request, props)
		}
	}


	return function * watch() {
		yield all([
			takeLatest(actions.LOAD, load)
		])
	}
}
