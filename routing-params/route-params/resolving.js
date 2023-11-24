import { splitPath } from "../paths/splitting.js"
import { setRouteParam } from "./setting.js"
import { isRouteParam } from "./verifying.js"

export const resolveRouteParams = (url, path = "") =>
{
  if(path instanceof RegExp) return {}

  const urlParts = splitPath(url)
  const routeParts = splitPath(path)

  return routeParts
    .map((routePart, index) => isRouteParam(routePart) && [routePart, urlParts[index]])
    .filter(part => part)
    .reduce(setRouteParam, {})
}