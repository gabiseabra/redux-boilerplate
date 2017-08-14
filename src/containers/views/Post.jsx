import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Post } from "../../components/views"
import { getPost, getPostError } from "../../redux/selectors"
import { load } from "../../redux/modules/content/posts"
import { setStatus } from "../../redux/modules/status"
import { ResponseError } from "../../lib/ApiClient"

class PostPage extends Component {
	static propTypes = {
		params: PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired,
		post: PropTypes.object,
		error: PropTypes.instanceOf(Error),
		load: PropTypes.func.isRequired,
		setStatus: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.load(this.props.params.name)
	}

	componentWillReceiveProps({ error }) {
		if(error && error instanceof ResponseError) {
			this.props.setStatus(error.status, error.statusText)
		}
	}

	render() {
		const { post, error } = this.props
		return <Post post={post} error={error} />
	}
}

const props = (state, { params: { name } }) => ({
	post: getPost(state, name),
	error: getPostError(state, name)
})

export default connect(props, { load, setStatus })(PostPage)