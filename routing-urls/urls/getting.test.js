import { assertEquals } from "/asserts.ts"
import { getUrlPath } from "./getting.js"

Deno.test("use urls => get url path from url", async (t) => {

  await t.step("root paths => get url paths => url start path", () => {
    assertEquals(getUrlPath("/", "/"), "/")
    assertEquals(getUrlPath("/a", "/"), "/")
    assertEquals(getUrlPath("/a/b", "/"), "/")
    assertEquals(getUrlPath("/a", "/a"), "/a")
  })

  await t.step("root param paths => get url paths => url start path", () => {
    assertEquals(getUrlPath("/a", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1/b"), "/a/b")
    assertEquals(getUrlPath("/a/b", "/a/:p1"), "/a/b")
    assertEquals(getUrlPath("/a/b/c", "/:p1/b"), "/a/b")
  })

  await t.step("rootless paths => get url paths => url start path", () => {
    assertEquals(getUrlPath("a", "a"), "a")
    assertEquals(getUrlPath("a/b", "a"), "a")
    assertEquals(getUrlPath("a/", "a"), "a")
    assertEquals(getUrlPath("a/b", "a/"), "a/")
  })

  await t.step("rootless param paths => get url paths => url start path", () => {
    assertEquals(getUrlPath("a", ":p1"), "a")
    assertEquals(getUrlPath("a/", ":p1"), "a")
    assertEquals(getUrlPath("a/b", ":p1/"), "a/")
    assertEquals(getUrlPath("a/b", ":p1"), "a")
    assertEquals(getUrlPath("a/b", ":p1"), "a")
    assertEquals(getUrlPath("a/b", ":p1/b"), "a/b")
    assertEquals(getUrlPath("a/b/", ":p1/b"), "a/b")
    assertEquals(getUrlPath("a/b", "a/:p1"), "a/b")
    assertEquals(getUrlPath("a/b/c", ":p1/b"), "a/b")
  })

})
