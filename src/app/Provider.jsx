import { Component, PropTypes } from "react"
import Profile from "../lib/Profile"

/**
 * App context provider
 * @class Provider
 */
export default class Provider extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
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
		return this.props.children;
	}
}
