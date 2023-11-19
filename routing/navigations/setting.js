import { setLocation } from "../../routing-locations/mod.js";
import { resolveSearchParams, setRouteParams, setSearchParams } from "../../routing-params/mod.js";

export const setRoutingData = (elem, url) =>
{
  setLocation(elem, url)
  setRouteParams(elem, {})
  setSearchParams(elem, resolveSearchParams(url))
  return elem
}