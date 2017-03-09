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
		let i = 0;
		const { children, className, ...props } = this.props;
		const { collapsed } = this.state;
		const classNames = [ styles.Nav, className ];
		if(!collapsed) classNames.push(styles.active);

		return (
			<nav className={classNames.join(" ")} {...props}>
				<a className={styles.handle}
					onClick={this.click}
					title="Menu"
					tabIndex="0">
					<span />
				</a>
				<div className={styles.links}>
					<ul>
						{React.Children.map(children, node => <li key={++i}>{node}</li>)}
					</ul>
				</div>
			</nav>
		);
	}
}
