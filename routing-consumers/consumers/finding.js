import { findHtmlDescendants } from "../../routing-html/mod.js"
import { isConsumer } from "./verifying.js"

export const findConsumers = (elem) => findHtmlDescendants(elem, isConsumer)