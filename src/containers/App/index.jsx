import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { Header, Footer } from "../../components"
import styles from "./App.css"

const App = ({ className, children }, { data }) => (
	<div className={[ styles.App, className ].join(" ")}>
		<Helmet titleTemplate={data.title} />
		<Header className={styles.header} />
		<main className={styles.content}>{children}</main>
		<Footer className={styles.footer} />
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
