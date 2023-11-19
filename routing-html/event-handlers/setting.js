import { getEventName } from "../events/getting.js"
import { storeEventHandler } from "./storing.js"

export const setEventHandler = (elem, handlerName, handler) => {
  const eventName = getEventName(handlerName)

  elem.removeEventListener(eventName, elem[handlerName])
  elem.addEventListener(eventName, handler)

  storeEventHandler(elem, handlerName, handler)
  return elem
}
