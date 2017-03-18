import createEntity from "./entity"

const feed = createEntity("info", "single")

export const { LOAD, REQUEST, SUCCESS, FAILURE } = feed

export const { load, request, success, fail } = feed

export default feed.reducer
