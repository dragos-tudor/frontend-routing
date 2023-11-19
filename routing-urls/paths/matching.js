import { toLowerCasePath } from "./converting.js"
import { isPathParam } from "./verifying.js"

export const matchPaths = (path1, path2) =>
  isPathParam(path2)? true: toLowerCasePath(path1) === toLowerCasePath(path2)
