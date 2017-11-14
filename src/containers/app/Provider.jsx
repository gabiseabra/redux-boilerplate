import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"

/**
 * App context provider
 * @class Provider
 */
export default class ContextProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
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
		const { store, children } = this.props
		const component = (
			<Provider store={store}>
				{children}
			</Provider>
		)
		if(module.hot) {
			// eslint-disable-next-line global-require
			const { AppContainer } = require("react-hot-loader")
			return <AppContainer>{component}</AppContainer>
		}
		return component
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
