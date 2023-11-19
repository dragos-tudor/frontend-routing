import { PathDelimiter } from "../paths/PathDelimiter.js"
import { RootPath } from "../paths/RootPath.js"
import { splitPath } from "../paths/splitting.js"
import { isRootPath } from "../paths/verifying.js"

export const getUrlPath = (url, path) => {
  if(isRootPath(path)) return RootPath
  const pathParts = splitPath(path, PathDelimiter)
  const urlParts = splitPath(url, PathDelimiter)

  return pathParts
    .map((pathPart, index) => pathPart && urlParts[index])
    .join(PathDelimiter)
}