import { getLocation } from "./getting.js";

export const useLocation = (elem) =>
  (elem.__location = true) && getLocation(elem)