import React from "react"
import PropTypes from "prop-types"

/* eslint-disable react/no-danger */
const Post = ({ post }) => (post ?
	<article>
		<h1>{post.title}</h1>
		<div dangerouslySetInnerHTML={{ __html: post.body }} />
	</article> :
	null
)
/* eslint-enable */

Post.propTypes = {
	post: PropTypes.object
}

export default Post
