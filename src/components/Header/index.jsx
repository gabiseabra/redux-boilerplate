import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import classnames from "classnames"
import Nav from "./Nav"
import styles from "./Header.css"

const Header = ({ className }, { data }) => (
	<header className={classnames(styles.Header, className)}>
		<div className={styles.container}>
			<Link to="/" className={styles.brand}>{data.title}</Link>
			<Nav className={styles.nav}>
				<Link to="/" key="home">Home</Link>
				<Link to="/hello" key="hello">Hello</Link>
				<Link to="/posts" key="posts">Posts</Link>
			</Nav>
		</div>
	</header>
)

Header.propTypes = {
	className: PropTypes.string
}

Header.contextTypes = {
	data: PropTypes.object.isRequired
}

export default Header
