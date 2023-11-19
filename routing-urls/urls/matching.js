import { matchPaths } from "../paths/matching.js"
import { splitPath } from "../paths/splitting.js"
import { isEmptyPath } from "../paths/verifying.js"

export const matchUrlPath = (url, path) => {
  const urlParts = splitPath(url)
  const pathParts = splitPath(path)

  return url.match(path) != null ||
         pathParts.every((pathPart, index) =>
          isEmptyPath(pathPart) ||
          matchPaths(urlParts[index], pathPart)
  )
}