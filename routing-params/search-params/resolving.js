import { getQueryString } from "./getting.js";
import { setSearchParam } from "./setting.js"

export const resolveSearchParams = (url) => {
  const queryString = getQueryString(url)
  const searchParams = new URLSearchParams(queryString)
  if(!searchParams.size) return undefined

  return Array
    .from(searchParams.entries())
    .reduce(setSearchParam, {})
}
