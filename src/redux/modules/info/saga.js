import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import * as actions from "./index"
import { isInfoLoaded } from "../../selectors"

export default function create(client) {
	function * request() {
		yield put(actions.request());
		const response = yield call(client.info);
		if(response.error) {
			yield put(actions.fail(response.error));
		} else {
			yield put(actions.success(response));
		}
	}

	function * load() {
		const loaded = yield select(isInfoLoaded);
		if(!loaded) {
			yield fork(request)
		}
	}

	return function * watch() {
		yield takeLatest(actions.LOAD, load);
	}
}
