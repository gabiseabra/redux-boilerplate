export const LOAD = "feed/LOAD"
export const REQUEST = "feed/REQUEST"
export const SUCCESS = "feed/SUCCESS"
export const FAILURE = "feed/FAILURE"

export const load = () => ({ type: LOAD })
export const request = () => ({ type: REQUEST })
export const success = data => ({ type: SUCCESS, data })
export const failure = error => ({ type: SUCCESS, error })

const initialState = {
	data: [],
	loading: true,
	error: undefined
}

export default function feed(state = initialState, action) {
	switch(action.type) {
		case REQUEST:
			return {
				...state,
				loading: true
			}
		case SUCCESS:
			return {
				data: action.data.map(({ id }) => id),
				loading: false,
				error: undefined
			}
		case FAILURE:
			return {
				...state,
				loading: false,
				error: action.error
			}
		default: return state
	}
}
