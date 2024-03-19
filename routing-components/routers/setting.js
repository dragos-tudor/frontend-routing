import { findHtmlDescendant, setEventHandler } from "../../routing-html/mod.js"
import { isHtmlRouter } from "./verifying.js";

export const setNavigateHandler = (elem, navigate) =>
  setEventHandler(elem, "onclick", (event) => event.isNavigate && navigate(event.target, event.target.href))

export const setPopStateHandler = (window, navigate) =>
  setEventHandler(window, "onpopstate", () => navigate(findHtmlDescendant(window.document.body, isHtmlRouter), window.location.href, true))

export const setRouterReroute = (elem, reroute) =>
  elem.__reroute = reroute

