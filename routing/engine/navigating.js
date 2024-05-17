import { updateConsumers } from "../../routing-consumers/mod.js"
import { findHtmlRoot, validateHtmlElement } from "../../routing-html/mod.js"
import { addToHistory, getHistory, setLocation } from "../../routing-locations/mod.js"
import { resolveSearchParams, setRouteParams, setSearchParams, skipQueryString } from "../../routing-params/mod.js"
import { getUrlPathName } from "../../routing-urls/mod.js"
import { logError, logInfo } from "../../support-loggers/mod.js"
import { NavigationError } from "../errors/errors.js"
import { throwError } from "../errors/throwing.js"
import { changeRoute } from "./changing.js"

export const navigateFromHistory = async (elem, url) =>
{
  logInfo(elem, "Navigate to:", url)
  throwError(validateHtmlElement(elem))

  const root = findHtmlRoot(elem)
  setLocation(root, url)
  setRouteParams(root, {})
  setSearchParams(root, resolveSearchParams(url))
  const urlPathName = skipQueryString(getUrlPathName(url))

  const [routes, changeRouteError] = await changeRoute(root, urlPathName)
  if(changeRouteError) logError(elem, NavigationError, changeRouteError)
  if(changeRouteError) return NavigationError + changeRouteError

  const consumers = updateConsumers(root)
  return [routes, consumers]
}

export const navigateFromUser = (elem, url) =>
{
  addToHistory(getHistory(elem), url)
  return navigateFromHistory(elem, url)
}