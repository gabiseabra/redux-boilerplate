import React, { PropTypes } from "react"
import { Link } from "react-router"
import Nav from "./Nav"
import styles from "./Header.css"

const Header = ({ className }, { info }) => (
	<header className={[ styles.Header, className ].join(" ")}>
		<div className={styles.container}>
			<Link to="/" className={styles.brand}>{info.title}</Link>
			<Nav className={styles.nav}>
				<Link to="/">Home</Link>
				<Link to="/hello">Hello</Link>
				<Link to="/posts">Posts</Link>
			</Nav>
		</div>
	</header>
)

Header.propTypes = {
	className: PropTypes.string
}

Header.contextTypes = {
	info: PropTypes.object.isRequired
}

export default Header
