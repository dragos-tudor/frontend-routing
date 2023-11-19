import { RouteParamPrefix } from "./RouteParamPrefix.js"

export const isRouteParam = (routePart) =>
  routePart.startsWith(RouteParamPrefix) ||
  routePart.startsWith("/" + RouteParamPrefix)