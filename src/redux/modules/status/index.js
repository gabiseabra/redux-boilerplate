export const SET = "status/SET"

export const setStatus = (code, message) => ({ type: SET, code, message })

const initialState = {
	code: 200,
	message: undefined
}

export default function status(state = initialState, action) {
	switch(action.type) {
		case SET: return { code: action.code, message: action.message }
		default: return state
	}
}
