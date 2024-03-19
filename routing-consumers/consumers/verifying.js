import { findHtmlAscendants } from "../../routing-html/elements/finding.js"
import { isRouteElement } from "../../routing-routes/routes/verifying.js"

export const isConsumer = (elem) =>
  elem.__history ||
  elem.__location ||
  elem.__routeParams ||
  elem.__searchParams

export const isVisiblePath = (elem) => findHtmlAscendants(elem, isRouteElement).every(elem => !elem.hidden)