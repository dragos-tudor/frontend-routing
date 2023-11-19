
export const existsRouteDataPath = (routeData) => routeData.path

export const existsRouteDataLoadChild = (routeData) => typeof routeData.loadChild === "function"

export const isRouteDataLoadFunction = (routeData) => !routeData.loadChild || typeof routeData.loadChild === "function"

export const isRouteDataChildObject = (routeData) => !routeData.child || typeof routeData.child === "object"
