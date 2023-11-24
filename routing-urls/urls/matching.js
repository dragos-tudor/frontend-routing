import { matchPaths } from "../paths/matching.js"
import { splitPath } from "../paths/splitting.js"
import { isRegExpPath } from "../paths/verifying.js"

const matchUrlPathPart = (urlParts) => (pathPart, index) =>
  matchPaths(urlParts[index], pathPart)

export const matchUrlPath = (url, path) =>
{
  if(isRegExpPath(path)) return path.test(url)

  const urlParts = splitPath(url)
  const pathParts = splitPath(path)
  return pathParts.every(matchUrlPathPart(urlParts))
}