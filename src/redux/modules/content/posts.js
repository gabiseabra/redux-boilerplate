import { createEntity } from "./entity"

const posts = createEntity("posts")

export const { LOAD, REQUEST, SUCCESS, FAILURE } = posts

export const { load, request, success, fail } = posts

export default posts.reducer
