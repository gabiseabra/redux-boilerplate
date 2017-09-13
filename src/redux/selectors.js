export const getStatus = state => state.status

export const isFeedLoaded = state => state.content.feed.loaded

export const getFeed = state => state.content.feed.data

export const getFeedError = state => state.content.feed.error

export const getPostError = (state, id) => (
	id in state.content.posts ?
		state.content.posts[id].error :
		undefined
)

export const isPostLoaded = (state, id) => (
	id in state.content.posts &&
	!state.content.posts[id].error
)

export const getPost = (state, id) => (
	isPostLoaded(state, id) ?
		state.content.posts[id] :
		undefined
)
