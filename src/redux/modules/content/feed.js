import { createCollection } from "./entity"

const feed = createCollection("feed")

export const { LOAD, REQUEST, SUCCESS, FAILURE } = feed

export const { load, request, success, fail } = feed

export default feed.reducer
