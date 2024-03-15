import { hideHtmlElement, showHtmlElement } from "../../routing-html/mod.js"

const toggleRoute = (routeElem, showElem) =>
  routeElem === showElem? showHtmlElement(showElem): hideHtmlElement(routeElem)

export const toggleRoutes = (routeElems, showElem) =>
  routeElems.map(routeElem => toggleRoute(routeElem, showElem))