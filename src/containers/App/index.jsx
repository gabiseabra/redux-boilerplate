import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Header, Footer } from "../../components"
import styles from "./App.css"

const App = ({ children }, { data: { title } }) => (
	<div className={styles.App}>
		<Helmet titleTemplate={`%s - ${title}`} defaultTitle={title} />
		<Header className={styles.header} />
		<main className={styles.content}>{children}</main>
		<Footer className={styles.footer} />
	</div>
)

App.propTypes = {
	children: PropTypes.node
}

App.contextTypes = {
	data: PropTypes.object.isRequired
}

export default App
