import { createRouteData, setRouteData, validateRouteData } from "../../routing-routes/mod.js"
import { throwErrors } from "../../routing/engine/throwing.js"

export const Route = (props, elem) => {
  const routeData = createRouteData(props.path, props.child, props.load, "index" in props)

  throwErrors(validateRouteData(routeData))
  setRouteData(elem, routeData)

  return <></>
}
