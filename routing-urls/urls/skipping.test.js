import { assertEquals } from "/asserts.ts"
import { skipUrlPath } from "./skipping.js"

Deno.test("use urls => skip url paths", async (t) => {

  await t.step("url => skip url path => remaining url", () => {
    assertEquals(skipUrlPath("", null), "")
    assertEquals(skipUrlPath("", undefined), "")

    assertEquals(skipUrlPath("/", null), "/")
    assertEquals(skipUrlPath("/", undefined), "/")
    assertEquals(skipUrlPath("a", null), "a")
    assertEquals(skipUrlPath("a", undefined), "a")
    assertEquals(skipUrlPath("/", "a"), "/")

    assertEquals(skipUrlPath("/", "/"), "")
    assertEquals(skipUrlPath("/a", "/"), "a")
    assertEquals(skipUrlPath("/a/b", "/a"), "/b")
    assertEquals(skipUrlPath("/a/b/c", "/a"), "/b/c")
    assertEquals(skipUrlPath("/a/b/c/d", "/a/b"), "/c/d")

    assertEquals(skipUrlPath("a", ""), "a")
    assertEquals(skipUrlPath("a", "/"), "a")
    assertEquals(skipUrlPath("a", "c"), "a")
    assertEquals(skipUrlPath("a/b", "a"), "/b")
    assertEquals(skipUrlPath("a/b/c", "a"), "/b/c")
    assertEquals(skipUrlPath("a/b/c/d", "a/b"), "/c/d")
  })

})