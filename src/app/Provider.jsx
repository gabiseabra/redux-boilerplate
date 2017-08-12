import React, { Component } from "react"
import PropTypes from "prop-types"
import { Provider, connect } from "react-redux"
import { AppContainer } from "react-hot-loader"
import { getInfo } from "../redux/selectors"
import { load } from "../redux/modules/content/info"

/**
 * App context provider
 * @class Provider
 */
class ContextProvider extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		info: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired,
		load: PropTypes.func.isRequired
	}

	static childContextTypes = {
		data: PropTypes.object.isRequired,
		info: PropTypes.object.isRequired
	}

	getChildContext() {
		return {
			data: this.props.data,
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
		if(process.env.HMR === "true") {
			return <AppContainer>{component}</AppContainer>
		}
		return component
	}
}

const mapper = state => ({
	info: getInfo(state) || {}
})

export default connect(mapper, { load })(ContextProvider)
