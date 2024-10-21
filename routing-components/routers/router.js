import { navigateToHistoryRoute, navigateToRoute } from "../../routing/mod.js"
import { setHistory } from "../../routing-locations/mod.js"
import { setPopStateHandler, setNavigateHandler } from "./setting.js"

export const Router = (props, elem) =>
{
  setHistory(elem)

  setNavigateHandler(elem, navigateToRoute)
  setPopStateHandler(globalThis, navigateToHistoryRoute)

  return props.children
}