import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Loading } from "../../shared"

const Post = ({ post, error }) => {
	if(!post) {
		return (<section><Loading error={error} /></section>)
	}
	return (
		<section>
			<Helmet title={post.title} />
			<h1>{post.title}</h1>
			<p>{post.description}</p>
			{post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
		</section>
	)
}

Post.propTypes = {
	post: PropTypes.object,
	error: PropTypes.object
}

export default Post
