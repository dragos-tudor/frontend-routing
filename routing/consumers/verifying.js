import { findHtmlAscendant, isHiddenHtmlElement } from "../../routing-html/mod.js"
import { isRouteElement } from "../routes/verifying.js"

export const isConsumer = (elem) => elem.__history || elem.__location || elem.__routeParams || elem.__searchParams

export const isVisiblePath = (elem) => !findHtmlAscendant(elem, (elem) => isRouteElement(elem) && isHiddenHtmlElement(elem))