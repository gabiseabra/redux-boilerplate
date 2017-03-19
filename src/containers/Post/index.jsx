import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Loading } from "../../components"
import { getPost, getPostError } from "../../redux/selectors"
import { load } from "../../redux/modules/content/posts"
import { setStatus } from "../../redux/modules/status"
import { ResponseError } from "../../lib/ApiClient"

class Post extends Component {
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
		this.props.load(this.props.params.name);
	}

	componentWillReceiveProps({ error }) {
		if(error && error instanceof ResponseError) {
			this.props.setStatus(error.status, error.statusText)
		}
	}

	render() {
		const { post, error } = this.props
		if(!post) {
			return (<section><Loading error={error} /></section>)
		}
		return (
			<section>
				<h1>{post.title}</h1>
				<p>{post.description}</p>
				{post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
			</section>
		)
	}
}

const mapper = (state, { params: { name } }) => ({
	post: getPost(state, name),
	error: getPostError(state, name)
})

export default connect(mapper, { load, setStatus })(Post)
