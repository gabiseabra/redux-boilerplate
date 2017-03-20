import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Loading } from "../../components"
import { getFeed, getFeedError, getFeedByType, isFeedLoaded } from "../../redux/selectors"
import { load } from "../../redux/modules/content/feed"
import styles from "./Feed.css"

class Feed extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		feed: PropTypes.arrayOf(PropTypes.object).isRequired,
		error: PropTypes.instanceOf(Error),
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load();
	}

	renderPost(post) {
		return (
			<article className={styles.post} key={post.name}>
				<Link to={`/posts/${post.id}`}>
					<h2>{post.title}</h2>
				</Link>
				<p>{post.description}</p>
			</article>
		)
	}

	renderFeed(feed) {
		return (
			<div className={styles.feed}>
				{feed.map(post => this.renderPost(post))}
			</div>
		)
	}

	render() {
		const { loading, feed, error, location: { query: { type } } } = this.props;
		return (
			<section>
				<Helmet title="Posts" />
				<h1>Posts</h1>
				{type && <h2>{type}</h2>}
				{loading ? <Loading error={error} /> : this.renderFeed(feed)}
			</section>
		)
	}
}

const mapper = (state, { location: { query: { type } } }) => ({
	loading: !isFeedLoaded(state),
	error: getFeedError(state),
	feed: type ? getFeedByType(state, type) : getFeed(state)
})

export default connect(mapper, { load })(Feed)
