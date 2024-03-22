import { createRouteData, setRouteData, validateRouteData } from "../../routing-routes/mod.js"
import { throwErrors } from "../../support-errors/mod.js"

export const Route = (props, elem) => {
  const {path, child, load} = props
  const routeData = createRouteData(path, child, load, "index" in props)

  throwErrors(validateRouteData(routeData))
  setRouteData(elem, routeData)

  return <></>
}
