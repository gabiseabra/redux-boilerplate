import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { Loading } from "../../components"
import { getFeed, getFeedByCategory, isFeedLoaded } from "../../redux/selectors"
import { load } from "../../redux/modules/content/feed"
import styles from "./Feed.css"

class Feed extends Component {
	static propTypes = {
		params: PropTypes.shape({
			category: PropTypes.string
		}).isRequired,
		loading: PropTypes.bool.isRequired,
		feed: PropTypes.arrayOf(PropTypes.object).isRequired,
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load();
	}

	renderPost(post) {
		return (
			<article key={post.name}>
				<Link className={styles.post} to={`/post/${post.name}`}>
					<h1>{post.title}</h1>
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
		const { loading, feed, params: { category } } = this.props;
		return (
			<section>
				<h1>Articles</h1>
				{category && <h2>{category}</h2>}
				{loading ? <Loading /> : this.renderFeed(feed)}
			</section>
		)
	}
}

const mapper = (state, { params: { category } }) => ({
	loading: !isFeedLoaded(state),
	feed: category ? getFeedByCategory(state, category) : getFeed(state)
})

export default connect(mapper, { load })(Feed)
