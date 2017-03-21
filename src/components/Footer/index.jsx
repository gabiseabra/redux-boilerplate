import React, { Component, PropTypes } from "react"
import styles from "./Footer.css"

export default class Footer extends Component {
	/* Add social networks here */
	static Networks = [
		{
			url: "facebook.com",
			label: "Facebook",
			className: "icon-facebook"
		},
		{
			url: "google.com",
			label: "Google Plus",
			className: "icon-gplus"
		}
	]

	static propTypes = {
		className: PropTypes.string
	}

	static contextTypes = {
		info: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired
	}

	renderNetworks(profile) {
		const social = [];
		for(let i = 0; i < Footer.Networks.length; ++i) {
			const network = Footer.Networks[i];
			const url = profile.social(network.url);
			if(url) {
				social.push(
					<a key={url} target="_blank" rel="noreferrer noopener" href={url} title={network.label}>
						<span className={network.className} />
					</a>
				);
			}
		}
		return social;
	}

	render() {
		const { className } = this.props;
		const { info, profile } = this.context;
		return (
			<footer className={[ styles.Footer, className ].join(" ")}>
				<div className={[ styles.container, styles.copyright ].join(" ")}>
					{info.copy && <div>&copy; 2017 - {info.copy}</div>}
					<div className={styles.social}>
						{this.renderNetworks(profile)}
						{profile.email &&
						<a href={`mailto:${profile.email}`} title="Email">
							<span className="icon-email" />
						</a>}
					</div>
				</div>
			</footer>
		)
	}
}
