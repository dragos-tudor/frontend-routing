import { addRouteParams, getRouteParams, getSearchParams, resolveRouteParams } from "../../routing-params/mod.js"
import { getRouteChild, getRouteData, existsRoute, findRoute, findSiblingRoutes, renderRouteChild, toggleRoutes } from "../../routing-routes/mod.js"
import { isEmptyUrl, getUrlPath, skipUrlPath, trimUrl} from "../../routing-urls/mod.js"
import { logInfo } from "../../support-loggers/mod.js"


export const changeRoute = async (elem, url, routes = []) =>
{
  logInfo(elem, "Route to: ", url)
  const route = findRoute(elem, url)
  if(!existsRoute(route) && isEmptyUrl(url)) return [routes]
  if(!existsRoute(route)) return [, `Route ${url} not found.`]

  const routeData = getRouteData(route)
  const routeParams = resolveRouteParams(url, routeData.path)
  addRouteParams(getRouteParams(route), routeParams)

  const routeChild = getRouteChild(route) ||
    await renderRouteChild(route, routeData, getRouteParams(route), getSearchParams(route))
  toggleRoutes(findSiblingRoutes(route), route)

  const urlPath = getUrlPath(url, routeData.path)
  const nextUrl = trimUrl(skipUrlPath(url, urlPath))
  return changeRoute(routeChild, nextUrl, [...routes, route])
}