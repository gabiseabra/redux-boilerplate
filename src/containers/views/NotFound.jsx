import React, { Component } from "react"
import PropTypes from "prop-types"
import { NotFound } from "../../components/views"

export default class NotFoundApp extends Component {
	static propTypes = {
		staticContext: PropTypes.object
	}

	componentWillMount() {
		const { staticContext } = this.props
		if(staticContext) staticContext.status = 404
	}

	render() {
		return <NotFound />
	}
}

