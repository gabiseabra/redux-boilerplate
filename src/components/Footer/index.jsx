import React, { PropTypes } from "react"
import styles from "./Footer.css"

const Footer = ({ className }) => (
	<footer className={[ styles.Footer, className ].join(" ")}>
		{ /* ... */ }
	</footer>
)

Footer.propTypes = {
	className: PropTypes.string
}

export default Footer
