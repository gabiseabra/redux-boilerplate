import React, { PropTypes } from "react"
import styles from "./Loading.css"
import Spinner from "./Spinner"
import Error from "./Error"

const Loading = ({ error, className, ...props }) => (
	<div className={[ styles.Loading, className ].join(" ")}>
		{error ? <Error error={error} {...props} /> : <Spinner />}
	</div>
)

Loading.propTypes = {
	error: PropTypes.instanceOf(Error),
	className: PropTypes.string
}

export default Loading
