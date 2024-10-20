import { fromStringType } from "../strings/converting.js";

export const setSearchParam = (params, param) => (params[param[0]] = fromStringType(param[1]), params)

export const setSearchParams = (elem, params) => elem.ownerDocument.__searchParams = params