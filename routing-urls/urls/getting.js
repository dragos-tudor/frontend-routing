import { PathDelimiter } from "../paths/PathDelimiter.js"
import { RootPath } from "../paths/RootPath.js"
import { splitPath } from "../paths/splitting.js"
import { trimEndPath } from "../paths/trimming.js"
import { isRegExpPath, isRootPath } from "../paths/verifying.js"

export const getUrlPath = (url, path) =>
{
  if(isRootPath(path)) return RootPath
  if(isRegExpPath(path)) return url.match(path).join(PathDelimiter)

  const pathParts = splitPath(trimEndPath(path), PathDelimiter)
  const urlParts = splitPath(trimEndPath(url), PathDelimiter)

  return pathParts
    .map((_, index) => urlParts[index])
    .join(PathDelimiter)
}

export const getUrlPathName = (url) =>
  url.startsWith("http")? new URL(url).pathname: url