import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Helmet from "react-helmet"
import { Feed } from "../posts"
import { Page } from "../../components/views"
import { load } from "../../redux/modules/feed"
import {
	isFeedLoading,
	getFeedError
} from "../../redux/modules/feed/selectors"

class FeedPage extends Component {
	static propTypes = {
		loading: PropTypes.bool.isRequired,
		error: PropTypes.object,
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load()
	}

	render() {
		const { error, loading } = this.props
		return (
			<Page error={error} loading={loading}>
				<Helmet title="Feed" />
				<Page.Title>Feed</Page.Title>
				<Feed />
			</Page>
		)
	}
}

const props = state => ({
	error: getFeedError(state),
	loading: isFeedLoading(state)
})

export default connect(props, { load })(FeedPage)
