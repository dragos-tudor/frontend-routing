import { assertEquals } from "/asserts.ts"
import { trimUrl } from "./trimming.js"

Deno.test("use urls => trimming url", async (t) => {

  await t.step("urls => trim urls => starts and ends urls without chars", () => {
    assertEquals(trimUrl("/", "/"), "")
    assertEquals(trimUrl("", "/"), "")
    assertEquals(trimUrl("a", "/"), "a")
    assertEquals(trimUrl("/a", "/"), "a")
    assertEquals(trimUrl("a/", "/"), "a")
    assertEquals(trimUrl("a/b/", "/"), "a/b")
    assertEquals(trimUrl("/a/b", "/"), "a/b")
  })

})
