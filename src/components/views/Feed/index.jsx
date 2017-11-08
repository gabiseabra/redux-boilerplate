import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"
import { Loader } from "../../shared"
import styles from "./Feed.css"

const Post = ({ post }) => (
	<article className={styles.post} key={post.name}>
		<Link to={`/posts/${post.id}`}>
			<h2>{post.title}</h2>
		</Link>
		<p>{post.description}</p>
	</article>
)

Post.propTypes = {
	post: PropTypes.object
}

const Feed = ({ feed, error, loading, type }) => (
	<section>
		<Loader loading={loading} error={error}>
			<Helmet title="Posts" />
			<h1>Posts</h1>
			{type && <h2>{type}</h2>}
			{feed && <div className={styles.feed}>
				{feed.map(post => <Post key={post.id} post={post} />)}
			</div>}
		</Loader>
	</section>
)

Feed.propTypes = {
	loading: PropTypes.bool.isRequired,
	feed: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.instanceOf(Error),
	type: PropTypes.string
}

export default Feed
