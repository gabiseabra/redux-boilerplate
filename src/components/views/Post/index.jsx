import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Loader } from "../../shared"

const Post = ({ loading, post, error }) => (
	<section>
		<Loader loading={loading} error={error}>
			{post && (
				<div>
					<Helmet title={post.title} />
					<h1>{post.title}</h1>
					<p>{post.description}</p>
					{post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
				</div>
			)}
		</Loader>
	</section>
)


Post.propTypes = {
	post: PropTypes.object,
	error: PropTypes.object,
	loading: PropTypes.bool.isRequired
}

export default Post
