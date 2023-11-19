import { getHistory } from "./getting.js";

export const useHistory = (elem) =>
  (elem.__history = true) && getHistory(elem)