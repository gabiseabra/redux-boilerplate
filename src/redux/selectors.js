export const isInfoLoaded = (state) => state.info.loaded

export const getInfo = (state) => state.info.data

export const isFeedLoaded = (state) => state.content.feed.loaded

export const getFeed = (state) => state.content.feed.posts

export const getFeedError = (state) => state.content.feed.err

export const getFeedByType = (state, type) => (
	state.content.feed.posts.filter(post => post.type === type)
)

export const getPostError = (state, name) => (
	name in state.content.posts ?
	state.content.posts[name].err :
	undefined
)

export const isPostLoaded = (state, name) => (
	name in state.content.posts &&
	!state.content.posts[name].err
)

export const getPost = (state, name) => (
	isPostLoaded(state, name) ?
	state.content.posts[name] :
	undefined
)
