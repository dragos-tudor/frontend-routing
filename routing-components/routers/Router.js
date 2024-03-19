import { navigateFromHistory, navigateFromUser } from "../../routing/mod.js"
import { setHistory } from "../../routing-locations/mod.js"
import { setPopStateHandler, setNavigateHandler, setRouterReroute } from "./setting.js"

export const Router = (props, elem) => {
  setHistory(elem)

  setNavigateHandler(elem, navigateFromUser)
  setPopStateHandler(window, navigateFromHistory)
  setRouterReroute(elem, props.reroute)

  return props.children
}