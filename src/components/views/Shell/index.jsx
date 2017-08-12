import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Shell.css"

const Shell = ({ children, appData }) => (
	<div className={styles.Shell}>
		<Helmet titleTemplate={`%s - ${appData.title}`} defaultTitle={appData.title} />
		<Header className={styles.header} appData={appData} />
		<main className={styles.content}>{children}</main>
		<Footer className={styles.footer} appData={appData} />
	</div>
)

Shell.propTypes = {
	children: PropTypes.node,
	appData: PropTypes.object.isRequired
}

export default Shell
