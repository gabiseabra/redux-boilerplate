export const LOAD = "content/feed/LOAD"
export const REQUEST = "content/feed/REQUEST"
export const SUCCESS = "content/feed/SUCCESS"
export const FAILURE = "content/feed/FAILURE"

export const load = () => ({ type: LOAD })
export const request = () => ({ type: REQUEST })
export const success = data => ({ type: SUCCESS, data })
export const fail = err => ({ type: FAILURE, err })

const initialState = {
	loaded: false,
	loading: false,
	posts: [],
	err: undefined
}

export default function feed(state = initialState, action) {
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
				posts: action.data
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
