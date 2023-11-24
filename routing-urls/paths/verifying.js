import { RootPath } from "./RootPath.js"
import { PathDelimiter } from "./PathDelimiter.js"

export const isEmptyPath = (path) => path === ""

export const isEndPathDelimiter = (path) => path.endsWith(PathDelimiter)

export const isRegExpPath = (path) => path instanceof RegExp

export const isRootPath = (path) => path === RootPath

export const isPathParam = (path) => path.startsWith(":") || path.includes("/:")