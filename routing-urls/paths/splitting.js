import { PathDelimiter } from "./PathDelimiter.js"

export const splitPath = (path, delimiter = PathDelimiter) => path.split(delimiter)