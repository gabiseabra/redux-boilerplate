import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Helmet from "react-helmet"
import { Post } from "../posts"
import { Page } from "../../components/views"
import { load } from "../../redux/modules/posts"
import {
	getPost,
	getPostError,
	isPostLoading
} from "../../redux/modules/posts/selectors"

class PostPage extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		error: PropTypes.instanceOf(Error),
		post: PropTypes.object,
		loading: PropTypes.bool.isRequired,
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load(this.id)
	}

	get id() { return this.props.match.params.id }

	render() {
		const { loading, error, post } = this.props
		return (
			<Page error={error} loading={loading}>
				<Helmet title={post.title} />
				<Post id={this.id} />
			</Page>
		)
	}
}

const props = (state, { match: { params } }) => ({
	post: getPost(state, params) || {},
	error: getPostError(state, params),
	loading: isPostLoading(state, params)
})

export default connect(props, { load })(PostPage)
