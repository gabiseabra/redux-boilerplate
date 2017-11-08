import { SUCCESS as FEED_SUCCESS } from "../feed"

export const LOAD = "posts/LOAD"
export const REQUEST = "posts/REQUEST"
export const SUCCESS = "posts/SUCCESS"
export const FAILURE = "posts/FAILURE"

export const load = id => ({ type: LOAD, id })
export const request = id => ({ type: REQUEST, id })
export const success = (id, data) => ({ type: SUCCESS, id, data })
export const failure = (id, error) => ({ type: SUCCESS, id, error })

export default function posts(state = {}, action) {
	switch(action.type) {
		case REQUEST:
			return {
				...state,
				[action.id]: undefined
			}
		case SUCCESS:
			return {
				...state,
				[action.id]: action.data
			}
		case FEED_SUCCESS: {
			const result = { ...state }
			action.data.forEach((data) => {
				result[data.id] = data
			})
			return result
		}
		case FAILURE:
			return {
				...state,
				[action.id]: { error: action.error }
			}
		default: return state
	}
}
