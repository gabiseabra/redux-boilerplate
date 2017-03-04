import React, { PropTypes } from "react"
import { Link } from "react-router"
import Nav from "./Nav"
import styles from "./Header.css"

const Header = ({ className }) => (
	<header className={[ styles.Header, className ].join(" ")}>
		<Nav>
			<Link to="/">Home</Link>
			<Link to="/hello">Hello</Link>
			<Link to="/feed">Feed</Link>
		</Nav>
	</header>
)

Header.propTypes = {
	className: PropTypes.string
}

export default Header
