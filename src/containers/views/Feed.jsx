import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Feed } from "../../components/views"
import { load } from "../../redux/modules/feed"
import {
	isFeedLoading,
	getFeedError,
	getFeedPosts
} from "../../redux/modules/feed/selectors"

class FeedPage extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
		feed: PropTypes.arrayOf(PropTypes.object).isRequired,
		error: PropTypes.object,
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load()
	}

	render() {
		const {
			feed,
			error,
			loading
		} = this.props
		return <Feed feed={feed} error={error} loading={loading} />
	}
}

const props = state => ({
	error: getFeedError(state),
	feed: getFeedPosts(state),
	loading: isFeedLoading(state)
})

export default connect(props, { load })(FeedPage)
