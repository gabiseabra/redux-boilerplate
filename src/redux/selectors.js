export const isInfoLoaded = (state) => state.info && state.info.loaded

export const getInfo = (state) => state.info.data

export const isFeedLoaded = (state) => state.content.feed && state.content.feed.loaded

export const getFeed = (state) => state.content.feed.posts

export const getFeedByType = (state, type) => (
	state.content.feed.posts.filter(post => post.type === type)
)

export const isPostLoaded = (state, name) => state.content.posts && name in state.content.posts

export const getPost = (state, name) => state.content.posts[name]
