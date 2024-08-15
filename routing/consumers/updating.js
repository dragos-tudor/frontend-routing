import { getHtmlName } from "../../routing-html/mod.js"
import { getUpdateFunc } from "../funcs/getting.js"
import { logInfo } from "../loggers/logging.js"
import { findVisiblePathConsumers } from "./finding.js"


const updateConsumer = (update) => elem => (logInfo(elem, "Update routing consumer: ", getHtmlName(elem)), update(elem)[0])

export const updateConsumers = (elem, update = getUpdateFunc(elem)) => findVisiblePathConsumers(elem).map(updateConsumer(update))

