import { fromStringType } from "../strings/converting.js";

const removePrefix = (param) => param.replace(":", "")

export const setRouteParam = (params, param) => (params[removePrefix(param[0])] = fromStringType(param[1]), params)

export const setRouteParams = (elem, params) => elem.ownerDocument.__routeParams = params