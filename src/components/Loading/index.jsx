import React, { PropTypes } from "react"
import styles from "./Loading.css"

const Loading = ({ className }) => (
	<div className={[ styles.Loading, className ].join(" ")}>
		<div className={styles.spinner} />
	</div>
)

Loading.propTypes = {
	className: PropTypes.string
}

export default Loading
