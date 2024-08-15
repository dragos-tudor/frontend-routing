import { addRouteParams, getRouteParams, getSearchParams, resolveRouteParams } from "../../routing-params/mod.js"
import { isEmptyPath, getUrlPath, skipUrlPath} from "../../routing-urls/mod.js"
import { RouteNotFound } from "../errors/errors.js"
import { logInfo } from "../loggers/logging.js"
import { getRouteChild } from "../route-children/getting.js"
import { renderRouteChild } from "../route-children/rendering.js"
import { getRouteData } from "../route-data/getting.js"
import { findSiblingRoutes } from "../route-siblings/finding.js"
import { findRoute } from "./finding.js"
import { toggleRoutes } from "./toggling.js";
import { existsRoute } from "./verifying.js"

export const changeRoute = async (elem, url, routes = []) =>
{
  const route = findRoute(elem, url)
  if(!existsRoute(route) && isEmptyPath(url)) return [routes]
  if(!existsRoute(route)) return [, RouteNotFound.replace("#url", url)]
  logInfo(elem, "Route to: ", url)

  const routeData = getRouteData(route)
  const routeParams = resolveRouteParams(url, routeData.path)
  addRouteParams(getRouteParams(route), routeParams)

  const routeChild = getRouteChild(route) ||
    await renderRouteChild(route, routeData, getRouteParams(route), getSearchParams(route))
  toggleRoutes(findSiblingRoutes(route), route)

  const urlPath = getUrlPath(url, routeData.path)
  const nextUrl = skipUrlPath(url, urlPath)
  return changeRoute(routeChild, nextUrl, [...routes, route])
}