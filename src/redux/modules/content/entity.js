const createActions = (entity) => {
	const actions = {
		LOAD: `content/${entity}/LOAD`,
		REQUEST: `content/${entity}/REQUEST`,
		SUCCESS: `content/${entity}/SUCCESS`,
		FAILURE: `content/${entity}/FAILURE`
	}
	actions.load = id => ({ type: actions.LOAD, id })
	actions.request = id => ({ type: actions.REQUEST, id })
	actions.success = (data, id) => ({ type: actions.SUCCESS, data, id })
	actions.fail = (error, id) => ({ type: actions.FAILURE, error, id })
	return actions
}

// Create reducer for an entity endpoint
export function createEntity(name) {
	const actions = createActions(name)
	actions.reducer = (state = {}, action) => {
		switch(action.type) {
			case actions.SUCCESS:
				return {
					...state,
					[action.id]: action.data
				}
			case actions.FAILURE:
				return {
					...state,
					[action.id]: { error: action.error }
				}
			default: return state
		}
	}
	return actions
}

// Create reducer for a collection endpoint
export function createCollection(name) {
	const actions = createActions(name)
	actions.reducer = (state = {}, action) => {
		switch(action.type) {
			case actions.REQUEST:
				return {
					...state,
					loading: true
				}
			case actions.SUCCESS:
				return {
					...state,
					loaded: true,
					loading: false,
					data: action.data
				}
			case actions.FAILURE:
				return {
					...state,
					loaded: false,
					loading: false,
					error: action.error
				}
			default: return state
		}
	}
	return actions
}
