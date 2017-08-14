import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NotFound } from "../../components/views"
import { setStatus } from "../../redux/modules/status"

class NotFoundPage extends Component {
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
		return <NotFound />
	}
}

export default connect(undefined, { setStatus })(NotFoundPage)
