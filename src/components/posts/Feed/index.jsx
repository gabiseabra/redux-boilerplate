import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"

const Feed = ({ posts }) => (
	<div>
		{posts.map(post => <Card key={post.id} post={post} />)}
	</div>
)


Feed.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object)
}

export default Feed
