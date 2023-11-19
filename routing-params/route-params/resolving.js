import { splitPath } from "../paths/splitting.js";
import { setRouteParam } from "./setting.js";
import { isRouteParam } from "./verifying.js";

export const resolveRouteParams = (url, path = "") => {
  const urlParts = splitPath(url)
  const routeParts = splitPath(path)
  const getIndex = (_, index) => index

  return routeParts
    .map(getIndex)
    .filter(index => isRouteParam(routeParts[index]))
    .map(index => [routeParts[index], urlParts[index]])
    .reduce(setRouteParam, {})
}