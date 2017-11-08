import { createSelector } from "reselect"
import { getAllPosts } from "../posts/selectors"

export const isFeedLoading = state => state.feed.loading

export const getFeed = state => state.feed.data

export const getFeedError = state => state.feed.error

export const getFeedPosts = createSelector(
	getAllPosts,
	getFeed,
	(posts, ids) => ids.map(id => posts[id])
)

export const isFeedReady = createSelector(
	isFeedLoading,
	getFeedError,
	(loading, error) => (!loading && !error)
)
