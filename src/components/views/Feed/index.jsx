import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Link } from "react-router"
import { Loading } from "../../shared"
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
	post: PropTypes.object.isRequired
}

const Feed = ({ feed, error, loading, type }) => (
	<section>
		<Helmet title="Posts" />
		<h1>Posts</h1>
		{type && <h2>{type}</h2>}
		{loading ? <Loading error={error} /> :
		<div className={styles.feed}>
			{feed.map(post => <Post post={post} />)}
		</div>}
	</section>
)

Feed.propTypes = {
	loading: PropTypes.bool.isRequired,
	feed: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.instanceOf(Error),
	type: PropTypes.string
}

export default Feed
