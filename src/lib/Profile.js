const formatPhone = phone => phone.replace(/^(?:\+\d{2})(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")

export default class Profile {
	static defaultProps = {
		"@type": "Thing"
	}

	/**
	 * @param {Object} data - JSON-LD data.
	 */
	constructor(data) {
		Object.assign(this, data);
	}

	social(domain) {
		if("sameAs" in this) {
			const regExp = new RegExp(`^https?:\\/\\/([^\\.]+\\.)*${domain.replace(/[^\w\s]/g, "\\$&")}`);
			for(let i = 0; i < this.sameAs.length; ++i) {
				const url = this.sameAs[i];
				if(url.match(regExp)) return url;
			}
		}
	}

	get type() { return this["@type"] }
	get phoneNumber() { return this.telephone }
	get phone() { return "telephone" in this ? formatPhone(this.telephone) : undefined }
	get fax() { return "faxNumber" in this ? formatPhone(this.faxNumber) : undefined }
}
