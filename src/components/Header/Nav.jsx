import React, { Component, PropTypes } from "react"
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
		const classNames = [ styles.Nav, className ]
		if(!collapsed) classNames.push(styles.active)
		return (
			<nav className={classNames.join(" ")}>
				<a className={styles.handle}
					onClick={this.click}
					title="Menu"
					tabIndex="0">
					<span className={styles.icon} />
				</a>
				<div className={styles.links}>
					<ul>
						{React.Children.map(children, node => <li key="menu">{node}</li>)}
					</ul>
				</div>
			</nav>
		);
	}
}
