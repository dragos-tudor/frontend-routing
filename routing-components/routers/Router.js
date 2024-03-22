import { navigateFromHistory, navigateFromUser } from "../../routing/mod.js"
import { setHistory } from "../../routing-locations/mod.js"
import { setPopStateHandler, setNavigateHandler } from "./setting.js"

export const Router = (props, elem) =>
{
  setHistory(elem)

  setNavigateHandler(elem, navigateFromUser)
  setPopStateHandler(window, navigateFromHistory)

  return props.children
}