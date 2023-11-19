import { assertEquals } from "/asserts.ts"
import { addToHistory } from "./adding.js"
import { setHistory } from "./setting.js"

Deno.test("use routers => add url to history", async (t) => {

  await t.step("last url history => add new url to history => added url", () => {
    const history = setHistory({ownerDocument: {}})
    addToHistory(history, "/a")

    assertEquals(history.hrefs[0], "/a")
  })

  await t.step("last url history => add new urls to history => added urls", () => {
    const history = setHistory({ownerDocument: {}})
    addToHistory(history, "/a")
    addToHistory(history, "/b")

    assertEquals(history.hrefs[0], "/a")
    assertEquals(history.hrefs[1], "/b")
  })

})