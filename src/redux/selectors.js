export const getStatus = state => state.status

export const isInfoLoaded = state => state.content.info.loaded

export const getInfo = state => state.content.info.data

export const isFeedLoaded = state => state.content.feed.loaded

export const getFeed = state => state.content.feed.data

export const getFeedError = state => state.content.feed.error

export const getFeedByType = (state, type) => (
	state.content.feed.posts.filter(post => post.type === type)
)

export const getPostError = (state, name) => (
	name in state.content.posts ?
	state.content.posts[name].error :
	undefined
)

export const isPostLoaded = (state, name) => (
	name in state.content.posts &&
	!state.content.posts[name].error
)

export const getPost = (state, name) => (
	isPostLoaded(state, name) ?
	state.content.posts[name] :
	undefined
)
