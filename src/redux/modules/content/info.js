import createEntity from "./entity"

const info = createEntity("info", "single")

export const { LOAD, REQUEST, SUCCESS, FAILURE } = info

export const { load, request, success, fail } = info

export default info.reducer
