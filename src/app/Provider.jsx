import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import Profile from "../lib/Profile"

/**
 * App context provider
 * @class Provider
 */
export default class ContextProvider extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	}

	static childContextTypes = {
		data: PropTypes.object,
		profile: PropTypes.instanceOf(Profile)
	}

	getChildContext() {
		return {
			data: this.props.data,
			profile: new Profile(this.props.profile)
		}
	}

	render() {
		const { store, children } = this.props;
		return (
			<Provider store={store}>
				{children}
			</Provider>
		);
	}
}
