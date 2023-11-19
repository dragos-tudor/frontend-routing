import { getRouteParams } from "./getting.js";

export const useRouteParams = (elem) =>
  (elem.__routeParams = true) && getRouteParams(elem)