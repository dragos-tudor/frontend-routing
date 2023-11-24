import { findRouter } from "../../routing-components/routers/finding.js"
import { updateConsumers } from "../../routing-consumers/mod.js"
import { validateHtmlElement } from "../../routing-html/mod.js"
import { addToHistory, getHistory } from "../../routing-locations/mod.js"
import { getUrlPathName } from "../../routing-urls/mod.js"
import { throwError } from "../../support-errors/mod.js"
import { logError, logInfo } from "../../support-loggers/mod.js"
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
  if(!router) return (
    logError(elem, missingRouterError),
    missingRouterError)

  setRoutingData(router, url)
  const [routes, changeRouteError] = await changeRoute(router, getUrlPathName(url))
  if(changeRouteError) return (
    logError(router, navigationError, changeRouteError),
    navigationError + changeRouteError)

  const consumers = updateConsumers(router)
  return [routes, consumers]
}

export const navigateFromUser = (elem, url) =>
{
  addToHistory(getHistory(elem), url)
  return navigateFromHistory(elem, url)
}