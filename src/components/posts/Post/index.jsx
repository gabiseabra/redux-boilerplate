import React from "react"
import PropTypes from "prop-types"

const Post = ({ post }) => (post ?
	<article>
		<h1>{post.title}</h1>
		<div dangerouslySetInnerHTML={{ __html: post.body }} />
	</article> :
	null
)


Post.propTypes = {
	post: PropTypes.object
}

export default Post
