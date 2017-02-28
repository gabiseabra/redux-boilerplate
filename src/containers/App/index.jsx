import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { Header, Footer } from "../../components"
import styles from "./App.css"

const App = ({ className, children }, { data }) => (
	<div className={[ styles.App, className ].join(" ")}>
		{"head" in data && <Helmet {...data.head} />}
		<Header />
		<main>{children}</main>
		<Footer />
	</div>
)

App.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
}

App.contextTypes = {
	data: PropTypes.object.isRequired
}

export default App
