import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Post } from "../../components/views"
import { load } from "../../redux/modules/posts"
import {
	getPost,
	getPostError,
	isPostLoading
} from "../../redux/modules/posts/selectors"

class PostPage extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		post: PropTypes.object,
		error: PropTypes.instanceOf(Error),
		loading: PropTypes.bool.isRequired,
		load: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load(this.props.match.params.id)
	}

	render() {
		const { loading, post, error } = this.props
		return <Post loading={loading} post={post} error={error} />
	}
}

const props = (state, { match: { params } }) => ({
	post: getPost(state, params),
	error: getPostError(state, params),
	loading: isPostLoading(state, params)
})

export default connect(props, { load })(PostPage)
