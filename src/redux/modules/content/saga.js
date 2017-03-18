import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import * as feed from "./feed"
import * as posts from "./posts"
import * as info from "./info"
import { isFeedLoaded, isPostLoaded, isInfoLoaded } from "../../selectors"

const Entities = [
	{ actions: feed, selector: isFeedLoaded, apiFn: "feed" },
	{ actions: posts, selector: isPostLoaded, apiFn: "post" },
	{ actions: info, selector: isInfoLoaded, apiFn: "info" }
]

function * requestFn(actions, apiFn, id) {
	yield put(actions.request())
	const response = yield call(apiFn, id);
	if(response.error) {
		yield put(actions.fail(response.error, id));
	} else {
		yield put(actions.success(response, id));
	}
}

export default function create(client) {
	const watchers = []

	Entities.forEach(({ actions, selector, apiFn }) => {
		const request = requestFn.bind(undefined, actions, client[apiFn])

		function * load({ name }) {
			const loaded = yield select(selector, name);
			if(!loaded) {
				yield fork(request, name)
			}
		}

		watchers.push(takeLatest(actions.LOAD, load))
	})

	return function * watch() {
		yield watchers
	}
}
