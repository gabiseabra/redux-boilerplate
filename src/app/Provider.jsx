import React, { Component, PropTypes } from "react"
import { AppContainer } from "react-hot-loader"

/**
 * App context provider
 * @class Provider
 */
export default class Provider extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	}

	static childContextTypes = {
		data: PropTypes.object
	}

	getChildContext() {
		return {
			data: this.props.data
		}
	}

	render() {
		if(process.env.HMR === "true") {
			return <AppContainer>{this.props.children}</AppContainer>
		}
		return this.props.children
	}
}
