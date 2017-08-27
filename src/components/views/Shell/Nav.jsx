import React, { Component } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Nav.css"

export default class Nav extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node)
		]).isRequired,
		className: PropTypes.string
	}

	state = { collapsed: true }

	click = () => this.setState({ collapsed: !this.state.collapsed })

	render() {
		const { children, className } = this.props
		const { collapsed } = this.state
		return (
			<nav className={classnames(styles.Nav, className, collapsed && styles.active)}>
				<a
					className={styles.handle}
					onClick={this.click}
					title="Menu"
					role="button"
					aria-expanded={!collapsed}
					tabIndex="0">
					<span className={styles.icon} />
				</a>
				<div className={styles.links}>
					<ul>
						{React.Children.map(children, node => <li key="menu">{node}</li>)}
					</ul>
				</div>
			</nav>
		)
	}
}
