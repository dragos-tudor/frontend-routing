import { hideHtmlElement, showHtmlElement } from "../../routing-html/mod.js"

const toggleRoute = (elem, showElem) =>
  elem === showElem? showHtmlElement(showElem): hideHtmlElement(elem)

export const toggleRoutes = (elems, showElem) =>
  elems.map(elem => toggleRoute(elem, showElem))