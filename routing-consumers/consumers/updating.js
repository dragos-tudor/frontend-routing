import { getHtmlName } from "../../routing-html/mod.js";
import { logInfo } from "../../support-loggers/mod.js";
import { findConsumers } from "./finding.js"
import { isVisiblePath } from "./verifying.js"

const getUpdateFunc = (elem) => elem?.ownerDocument?.__update

const updateConsumer = (update) => elem => (
  logInfo(elem, "Update routing consumer: ", getHtmlName(elem)),
  update(elem)[0])

export const updateConsumers = (elem, update = getUpdateFunc(elem)) =>
  findConsumers(elem)
    .filter(isVisiblePath)
    .map(updateConsumer(update))

