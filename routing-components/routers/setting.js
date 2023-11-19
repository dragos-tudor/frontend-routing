import { setEventHandler } from "../../routing-html/mod.js"

export const setPopStateHandler = (elem, navigate) =>
  setEventHandler(elem, "onpopstate", (event) => navigate(event.target, event.target.location.href, true))

export const setNavigateHandler = (elem, navigate) =>
  setEventHandler(elem, "onclick", (event) => event.isNavigate && navigate(event.target, event.target.href))