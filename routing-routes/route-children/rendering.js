import { existsRouteDataLoadChild } from "../route-data/verifying.js"

const getRenderFunc = (elem) => elem?.ownerDocument?.__render

export const renderRouteChild = async (elem, routeData, routeParams, searchParams, render = getRenderFunc(elem)) =>
  existsRouteDataLoadChild(routeData)?
    render(await routeData.loadChild(routeParams, searchParams), elem)[0]:
    render(routeData.child, elem)[0]
