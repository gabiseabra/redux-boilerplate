export const LOAD = "info/LOAD"
export const REQUEST = "info/REQUEST"
export const SUCCESS = "info/SUCCESS"
export const FAILURE = "info/FAILURE"

export const load = () => ({ type: LOAD })
export const request = () => ({ type: REQUEST })
export const success = data => ({ type: SUCCESS, data })
export const fail = err => ({ type: FAILURE, err })

const initialState = {
	loaded: false,
	loading: false,
	data: {},
	err: undefined
}

export default function info(state = initialState, action) {
	switch(action.type) {
		case REQUEST:
			return {
				...state,
				loading: true
			};
		case SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.data
			};
		case FAILURE:
			return {
				...state,
				loaded: false,
				loading: false,
				err: action.err
			};
		default: return state;
	}
}
