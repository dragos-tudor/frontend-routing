import { findHtmlDescendant } from "../../routing-html/mod.js"
import { findSiblingRoute, findSiblingRoutes } from "../route-siblings/finding.js"
import { isRouteElement } from "./verifying.js"

const pipe = (firstArg, ...funcs) =>
  funcs.reduce((arg, func) => arg != undefined? func(arg): arg, firstArg)

const findDescendantRoute = (elem) =>
  findHtmlDescendant(elem, isRouteElement)

export const findRoute = (elem, urlPart) => pipe(
  elem,
  findDescendantRoute,
  findSiblingRoutes,
  findSiblingRoute(urlPart)
)



