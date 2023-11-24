import { assertEquals } from "/asserts.ts"
import { getUrlPath } from "./getting.js"

Deno.test("use urls => get url path from url", async (t) => {

  await t.step("paths without params  => get url paths => url start path", () => {
    assertEquals(getUrlPath("/", "/"), "/")
    assertEquals(getUrlPath("/a", "/"), "/")
    assertEquals(getUrlPath("/a/b", "/"), "/")
    assertEquals(getUrlPath("/a", "/a"), "/a")
  })

  await t.step("paths with params => get url paths => url start paths", () => {
    assertEquals(getUrlPath("/a", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1/"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1"), "/a")
    assertEquals(getUrlPath("/a/b", "/:p1/b"), "/a/b")
    assertEquals(getUrlPath("/a/b/", "/:p1/b"), "/a/b")
    assertEquals(getUrlPath("/a/b", "/a/:p1"), "/a/b")
    assertEquals(getUrlPath("/a/b/c", "/:p1/b"), "/a/b")
  })

  await t.step("reg exp paths => get url paths => url start paths", () => {
    assertEquals(getUrlPath("/a/b", /\/a/), "/a")
    assertEquals(getUrlPath("/a/b/c", /\/.*\/b/), "/a/b")
  })

})
