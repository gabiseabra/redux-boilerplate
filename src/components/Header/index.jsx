import React, { PropTypes } from "react"
import { Link } from "react-router"
import Nav from "./Nav"
import styles from "./Header.css"

const Header = ({ className }, { data }) => (
	<header className={[ styles.Header, className ].join(" ")}>
		<Link to="/" className={styles.brand}>{data.title}</Link>
		<Nav className={styles.nav}>
			<Link to="/">Home</Link>
			<Link to="/hello">Hello</Link>
		</Nav>
	</header>
)

Header.propTypes = {
	className: PropTypes.string
}

Header.contextTypes = {
	data: PropTypes.object.isRequired
}

export default Header
