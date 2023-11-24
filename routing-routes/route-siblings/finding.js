import { getHtmlChildren, getHtmlParentElement } from "../../routing-html/mod.js"
import { getRouteData } from "../route-data/getting.js"
import { isRoute, isMatchedRoute } from "../routes/verifying.js"

const findIndexRoute = (elems) =>
  elems.find(elem => getRouteData(elem).index)

export const findSiblingRoute = (urlPart) => (elems) =>
  elems.find(isMatchedRoute(urlPart)) ||
  findIndexRoute(elems)

export const findSiblingRoutes = (elem) =>
  getHtmlChildren(getHtmlParentElement(elem))
    .filter(isRoute)