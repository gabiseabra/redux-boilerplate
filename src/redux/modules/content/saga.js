import { put, call, fork, select, takeLatest } from "redux-saga/effects"
import * as feed from "./feed"
import * as posts from "./posts"
import { isFeedLoaded, isPostLoaded } from "../../selectors"
import api from "../../../lib/api"

function * request(actions, apiFn, id) {
	yield put(actions.request());
	const response = yield call(apiFn, id);
	if(response.error) {
		yield put(actions.fail(response.error, id));
	} else {
		yield put(actions.success(response, id));
	}
}

const requestFeed = request.bind(undefined, feed, api.feed)
const requestPosts = request.bind(undefined, posts, api.post)

function * loadFeed() {
	const loaded = yield select(isFeedLoaded);
	if(!loaded) {
		yield fork(requestFeed);
	}
}

function * loadPosts({ name }) {
	const loaded = yield select(isPostLoaded, name);
	if(!loaded) {
		yield fork(requestPosts, name);
	}
}

export default function * watch() {
	yield [
		takeLatest(feed.LOAD, loadFeed),
		takeLatest(posts.LOAD, loadPosts)
	]
}

