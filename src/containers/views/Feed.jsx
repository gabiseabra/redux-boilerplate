import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Feed } from "../../components/views"
import { load } from "../../redux/modules/content/feed"
import {
	getFeed,
	getFeedError,
	isFeedLoaded
} from "../../redux/selectors"

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
			loading,
			location: { query: { type } }
		} = this.props
		return <Feed feed={feed} error={error} loading={loading} type={type} />
	}
}

const props = state => ({
	error: getFeedError(state),
	feed: getFeed(state),
	loading: !isFeedLoaded(state)
})

export default connect(props, { load })(FeedPage)
