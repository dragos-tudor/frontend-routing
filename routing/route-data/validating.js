import { existsRouteDataPath, isRouteDataLoadFunction, isRouteDataChildObject } from "./verifying.js"

const validateRouteDataChild = (routeData) => isRouteDataChildObject(routeData)? "": "Route child should be jsx element."

const validateRouteDataLoad = (routeData) => isRouteDataLoadFunction(routeData)? "": "Route load should be function."

const validateRouteDataPath = (routeData) => existsRouteDataPath(routeData)? "": "Route path is missing."

export const validateRouteData = (routeData) => [
  validateRouteDataPath(routeData),
  validateRouteDataChild(routeData),
  validateRouteDataLoad(routeData)
]
.filter(error => error)