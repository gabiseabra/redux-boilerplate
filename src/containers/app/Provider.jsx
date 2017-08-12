import React from "react"
import PropTypes from "prop-types"
import { AppContainer } from "react-hot-loader"

/**
 * App context provider
 * @class Provider
 */
export default class Provider extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	}

	static childContextTypes = {
		appData: PropTypes.object
	}

	getChildContext() {
		return {
			appData: this.props.data
		}
	}

	render() {
		if(process.env.HMR === "true") {
			return <AppContainer>{this.props.children}</AppContainer>
		}
		return this.props.children
	}
}

export const withAppData = Component => (
  // eslint-disable-next-line
	class extends React.Component {
		static contextTypes = {
			appData: PropTypes.object.isRequired
		}

		render() {
			const props = this.props
			const { appData } = this.context
			return <Component {...props} appData={appData} />
		}
	}
)
