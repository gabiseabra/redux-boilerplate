import React, { Component, PropTypes } from "react"
import { Provider, connect } from "react-redux"
import { getInfo } from "../redux/selectors"
import { load } from "../redux/modules/info"
import Profile from "../lib/Profile"

/**
 * App context provider
 * @class Provider
 */
class ContextProvider extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		info: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired,
		load: PropTypes.func.isRequired
	}

	static childContextTypes = {
		data: PropTypes.object.isRequired,
		info: PropTypes.object.isRequired,
		profile: PropTypes.instanceOf(Profile)
	}

	getChildContext() {
		return {
			data: this.props.data,
			info: this.props.info,
			profile: new Profile(this.props.profile)
		}
	}

	componentWillMount() {
		this.props.load();
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

const mapper = (state) => ({
	info: getInfo(state)
})

export default connect(mapper, { load })(ContextProvider)
