import { getEventName } from "../events/getting.js"

const addEventListener = (elem, handlerName, handler) => elem[handlerName] = handler

const removeEventListener = (elem, handlerName) => elem.removeEventListener(getEventName(handlerName), elem[handlerName])

export const setEventHandler = (elem, handlerName, handler) => {
  removeEventListener(elem, handlerName)
  addEventListener(elem, handlerName, handler)
  return elem
}
