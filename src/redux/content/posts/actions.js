export const REQUEST = "content/posts/REQUEST"
export const SUCCESS = "content/posts/SUCCESS"
export const FAILURE = "content/posts/FAILURE"

export const request = name => ({ type: REQUEST, name })
export const success = (name, data) => ({ type: SUCCESS, name, data })
export const fail = (name, err) => ({ type: FAILURE, name, err })
