import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Helmet from "react-helmet"
import { setStatus } from "../../../redux/modules/status"

class NotFound extends Component {
	static propTypes = {
		setStatus: PropTypes.func.isRequired,
		message: PropTypes.string.isRequired
	}

	static defaultProps = {
		message: "Not Found"
	}

	componentWillMount() {
		this.props.setStatus(404, this.props.message)
	}

	render() {
		return (
			<section>
				<Helmet title={this.props.message} />
				<h1>404</h1>
				<p>The page you have requested does not exist.</p>
			</section>
		)
	}
}

export default connect(undefined, { setStatus })(NotFound)
