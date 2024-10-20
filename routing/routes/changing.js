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
  if(!existsRoute(route) && !isEmptyPath(url)) return [, RouteNotFound.replace("#url", url)]
  if(!existsRoute(route)) return [routes]
  logInfo(elem, "Route to: ", url)

  const routeData = getRouteData(route)
  const pathRouteParams = resolveRouteParams(url, routeData.path)
  const routeParams = addRouteParams(getRouteParams(route), pathRouteParams)
  const searchParams = getSearchParams(route)
  const routeChild = getRouteChild(route) || await renderRouteChild(route, routeData, routeParams, searchParams)

  const siblingRoutes = findSiblingRoutes(route)
  toggleRoutes(siblingRoutes, route)

  const urlPath = getUrlPath(url, routeData.path)
  const nextUrl = skipUrlPath(url, urlPath)
  return changeRoute(routeChild, nextUrl, [...routes, route])
}