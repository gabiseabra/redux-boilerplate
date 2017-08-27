import React from "react"
import PropTypes from "prop-types"
import { Provider, connect } from "react-redux"
import { getInfo } from "../../redux/selectors"
import { load } from "../../redux/modules/content/info"

/**
 * App context provider
 * @class Provider
 */
class ContextProvider extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		info: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired,
		load: PropTypes.func.isRequired
	}

	static childContextTypes = {
		appData: PropTypes.object,
		info: PropTypes.object.isRequired
	}

	getChildContext() {
		return {
			appData: this.props.data,
			info: this.props.info
		}
	}

	componentWillMount() {
		this.props.load()
	}

	render() {
		const { store, children } = this.props
		const component = (
			<Provider store={store}>
				{children}
			</Provider>
		)
		if(module.hot) {
			const { AppContainer } = require("react-hot-loader")
			return <AppContainer>{component}</AppContainer>
		}
		return component
	}
}

const mapper = state => ({
	info: getInfo(state) || {}
})

export default connect(mapper, { load })(ContextProvider)

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
