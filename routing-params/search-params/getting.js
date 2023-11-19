import { splitPath } from "../paths/splitting.js"
import { QueryDelimiter } from "./QueryDelimiter.js"

export const getQueryString = (url, delimiter = QueryDelimiter) => splitPath(url, delimiter)[1]

export const getSearchParams = (elem) => elem.ownerDocument.__searchParams