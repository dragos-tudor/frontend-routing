import { findRouter, getRouterReroute } from "../../routing-components/private.js"
import { updateConsumers } from "../../routing-consumers/mod.js"
import { validateHtmlElement } from "../../routing-html/mod.js"
import { addToHistory, getHistory } from "../../routing-locations/mod.js"
import { skipQueryString } from "../../routing-params/mod.js"
import { getUrlPathName } from "../../routing-urls/mod.js"
import { throwError } from "../../support-errors/mod.js"
import { logError, logInfo } from "../../support-loggers/mod.js"
import { routeNotAllowed } from "../errors/errors.js"
import { changeRoute } from "./changing.js"
import { setRoutingData } from "./setting.js"

const missingRouterError = "Router is missing."
const navigationError = "Navigation error: "
const navigateTo = "Navigate to:"

export const navigateFromHistory = async (elem, url) =>
{
  logInfo(elem, navigateTo, url)
  throwError(validateHtmlElement(elem))

  const router = findRouter(elem)
  if(!router) logError(elem, missingRouterError)
  if(!router) return missingRouterError

  setRoutingData(router, url)
  const urlPathName = skipQueryString(getUrlPathName(url))

  const [routes, changeRouteError] = await changeRoute(router, urlPathName)
  if(changeRouteError) logError(router, navigationError, changeRouteError)
  if(changeRouteError === routeNotAllowed) getRouterReroute(router)?.(router, url)
  if(changeRouteError) return navigationError + changeRouteError

  const consumers = updateConsumers(router)
  return [routes, consumers]
}

export const navigateFromUser = (elem, url) =>
{
  addToHistory(getHistory(elem), url)
  return navigateFromHistory(elem, url)
}