import { findRouter, getRouterReroute } from "../../routing-components/private.js"
import { updateConsumers } from "../../routing-consumers/mod.js"
import { validateHtmlElement } from "../../routing-html/mod.js"
import { addToHistory, getHistory, setLocation } from "../../routing-locations/mod.js"
import { resolveSearchParams, setRouteParams, setSearchParams, skipQueryString } from "../../routing-params/mod.js"
import { getUrlPathName } from "../../routing-urls/mod.js"
import { throwError } from "../../support-errors/mod.js"
import { logError, logInfo } from "../../support-loggers/mod.js"
import { MissingRouterError, NavigationError, RouteNotAllowed } from "../errors/errors.js"
import { changeRoute } from "./changing.js"

const NavigateTo = "Navigate to:"

export const navigateFromHistory = async (elem, url) =>
{
  logInfo(elem, NavigateTo, url)
  throwError(validateHtmlElement(elem))

  const router = findRouter(elem)
  if(!router) logError(elem, MissingRouterError)
  if(!router) return MissingRouterError

  setLocation(router, url)
  setRouteParams(router, {})
  setSearchParams(router, resolveSearchParams(url))
  const urlPathName = skipQueryString(getUrlPathName(url))

  const [routes, changeRouteError] = await changeRoute(router, urlPathName)
  if(changeRouteError) logError(router, NavigationError, changeRouteError)
  if(changeRouteError === RouteNotAllowed) return getRouterReroute(router)?.(router, url)
  if(changeRouteError) return NavigationError + changeRouteError

  const consumers = updateConsumers(router)
  return [routes, consumers]
}

export const navigateFromUser = (elem, url) =>
{
  addToHistory(getHistory(elem), url)
  return navigateFromHistory(elem, url)
}