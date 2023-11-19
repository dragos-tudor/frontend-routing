import { toStringType } from "../strings/converting.js";

export const setSearchParam = (params, param) => (params[param[0]] = toStringType(param[1]), params)

export const setSearchParams = (elem, params) => elem.ownerDocument.__searchParams = params