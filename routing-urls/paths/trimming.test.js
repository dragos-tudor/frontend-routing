import { assertEquals } from "/asserts.ts"
import { trimEndPath } from "./trimming.js"

Deno.test("use urls => trim paths", async (t) => {

  await t.step("paths => trim paths => remove end path delimiter", () => {
    assertEquals(trimEndPath(""), "")
    assertEquals(trimEndPath("/"), "/")
    assertEquals(trimEndPath("/a"), "/a")
    assertEquals(trimEndPath("/a/"), "/a")
    assertEquals(trimEndPath("/a/b"), "/a/b")
    assertEquals(trimEndPath("/a/b/"), "/a/b")
  })

})
