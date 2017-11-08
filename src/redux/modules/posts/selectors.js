import { createSelector } from "reselect"

export const getAllPosts = state => state.posts

export const getPost = createSelector(
	getAllPosts,
	(state, { id }) => id,
	(posts, id) => posts[id]
)

export const isPostLoading = createSelector(getPost, post => post === undefined)

export const getPostError = createSelector(getPost, post => (post ? post.error : undefined))

export const isPostReady = createSelector(
	isPostLoading,
	getPostError,
	(loading, error) => (!loading && !error)
)
