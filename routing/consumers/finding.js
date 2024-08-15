import { findHtmlDescendants } from "../../routing-html/mod.js"
import { isConsumer, isVisiblePath } from "./verifying.js"

export const findConsumers = (elem) => findHtmlDescendants(elem, isConsumer)

export const findVisiblePathConsumers = (elem) => findConsumers(elem).filter(isVisiblePath)