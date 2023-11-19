import { getHtmlName } from "../../routing-html/mod.js";
import { getRouteData } from "../../routing-routes/mod.js";
import { logInfo } from "../../support-loggers/mod.js"

export const logConsumer = (consumer) =>
  logInfo(consumer, `Routing consumer updated: ${getHtmlName(consumer)}`)

export const logRoute = (route) =>
  logInfo(route, `Route to ${getRouteData(route)}`)