export const REQUEST = "content/feed/REQUEST"
export const SUCCESS = "content/feed/SUCCESS"
export const FAILURE = "content/feed/FAILURE"

export const request = () => ({ type: REQUEST })
export const success = data => ({ type: SUCCESS, data })
export const fail = err => ({ type: FAILURE, err })
