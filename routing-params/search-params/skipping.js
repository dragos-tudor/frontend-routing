import { QueryDelimiter } from "./QueryDelimiter.js"

export const skipQueryString = (url, delimiter = QueryDelimiter) => url.split(delimiter)[0]