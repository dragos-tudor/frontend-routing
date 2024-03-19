import { getHtmlName } from "../../routing-html/mod.js"
import { matchUrlPath } from "../../routing-urls/mod.js"
import { getRouteData } from "../route-data/getting.js"


export const existsRoute = (elem) => elem

export const isAllowedRoute = (elem) => {
  const routeData = getRouteData(elem)
  if(typeof routeData.allow === "function") return routeData.allow()
  if(typeof routeData.allow === "boolean") return routeData.allow
  return true
}

export const isMatchedRoute = (urlPart) => (elem) => matchUrlPath(urlPart, getRouteData(elem).path)

export const isRouteElement = (elem) => getHtmlName(elem) === "route"