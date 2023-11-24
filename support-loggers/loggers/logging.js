import { isLogEnabled } from "./verifying.js"

const LibraryName = "routing"
const LogHeader = "[routing]"

export const logError = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.error(LogHeader, ...args)

export const logInfo = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.info(LogHeader, ...args)
