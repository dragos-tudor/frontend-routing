import { logInfo } from "../../routing/loggers/logging.js"
import { getHtmlName } from "../../routing-html/mod.js"
import { getUpdateFunc } from "../funcs/getting.js"
import { findConsumers } from "./finding.js"
import { isVisiblePath } from "./verifying.js"


const updateConsumer = (update) => elem => (
  logInfo(elem, "Update routing consumer: ", getHtmlName(elem)),
  update(elem)[0])

export const updateConsumers = (elem, update = getUpdateFunc(elem)) =>
  findConsumers(elem)
    .filter(isVisiblePath)
    .map(updateConsumer(update))

