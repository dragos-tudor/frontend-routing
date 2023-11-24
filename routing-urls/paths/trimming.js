import { isEmptyPath, isEndPathDelimiter, isRootPath } from "./verifying.js"

export const trimEndPath = (path) => {
  if(isEmptyPath(path)) return path
  if(isRootPath(path)) return path
  if(isEndPathDelimiter(path)) return path.substr(0, path.length - 1)
  return path
}