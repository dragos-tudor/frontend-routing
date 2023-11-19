import { getSearchParams } from "./getting.js";

export const useSearchParams = (elem) =>
  (elem.__searchParams = true) && getSearchParams(elem)