export const isFeedLoaded = (state) => state.content.feed && state.content.feed.loaded

export const getFeed = (state) => state.content.feed.posts

export const getFeedByCategory = (state, category) => (
	state.content.feed.posts.filter(post => post.categories.indexOf(category) >= 0)
)

export const isPostLoaded = (state, name) => state.content.posts && name in state.content.posts

export const getPost = (state, name) => state.content.posts[name]
