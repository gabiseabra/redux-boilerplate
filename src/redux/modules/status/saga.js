import { LOCATION_CHANGE } from "react-router-redux"
import { put, takeLatest } from "redux-saga/effects"
import { setStatus } from "./index"

function * updateStatus() {
	yield put(setStatus(200, "OK"))
}

export default function * watch() {
	yield takeLatest(LOCATION_CHANGE, updateStatus)
}
