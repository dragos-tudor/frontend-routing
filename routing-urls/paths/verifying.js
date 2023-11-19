import { RootPath } from "./RootPath.js"

export const isEmptyPath = (path) => path == ""

export const isRootPath = (path) => path === RootPath

export const isPathParam = (path) => path.startsWith(":") || path.includes("/:")