export const HYDRATE = "HYDRATE"

export const hydrate = payload => ({
	type: HYDRATE,
	payload,
	select: selector => selector(payload)
})
