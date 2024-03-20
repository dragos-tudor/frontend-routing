import { navigateFromHistory, navigateFromUser } from "../../routing/mod.js"
import { setHistory } from "../../routing-locations/mod.js"
import { throwErrors } from "../../support-errors/mod.js"
import { setPopStateHandler, setNavigateHandler, setRouterReroute } from "./setting.js"
import { validateRouterProps } from "./validating.js"

export const Router = (props, elem) =>
{
  throwErrors(validateRouterProps(props))
  setRouterReroute(elem, props.reroute)
  setHistory(elem)

  setNavigateHandler(elem, navigateFromUser)
  setPopStateHandler(window, navigateFromHistory)

  return props.children
}