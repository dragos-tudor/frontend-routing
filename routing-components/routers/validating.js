import { isValidRouterReroute } from "./verifying.js"

const validateReRoute = (props) => isValidRouterReroute(props.reroute)? "": "Router reroute should be function."

export const validateRouterProps = (props) => [
  validateReRoute(props),
]
.filter(error => error)