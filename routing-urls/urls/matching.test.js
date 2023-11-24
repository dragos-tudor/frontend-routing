import { assertEquals } from "/asserts.ts"
import { matchUrlPath } from "./matching.js"

Deno.test("use urls => verify url and path matching", async (t) => {

  await t.step("matched urls and paths => match urls and paths => true", () => {
    assertEquals(matchUrlPath("/", "/"), true)
    assertEquals(matchUrlPath("/a", "/a"), true)
    assertEquals(matchUrlPath("/a", "/:p1"), true)
    assertEquals(matchUrlPath("/a/", "/a"), true)
    assertEquals(matchUrlPath("/a/b", "/a/b"), true)
    assertEquals(matchUrlPath("/A/b", "/a/B"), true)
    assertEquals(matchUrlPath("/a/b", "/:p1/b"), true)
    assertEquals(matchUrlPath("/a/b", "/a"), true)
    assertEquals(matchUrlPath("/a/b/c", "/a/b"), true)
    assertEquals(matchUrlPath("/a/b/:p1", "/a/b"), true)
    assertEquals(matchUrlPath("/a/b/c", "/a/:p1"), true)
    assertEquals(matchUrlPath("/a/b/c", "/:p1/b"), true)
  })

  await t.step("non-matched urls and paths => match urls and paths => false", () => {
    assertEquals(matchUrlPath("/", "/b"), false)
    assertEquals(matchUrlPath("/a", "/b"), false)
    assertEquals(matchUrlPath("a", "/b"), false)
    assertEquals(matchUrlPath("/a", "b"), false)
    assertEquals(matchUrlPath("/a/1", "/b/1"), false)
    assertEquals(matchUrlPath("/a/1", "/b/:1"), false)
    assertEquals(matchUrlPath("/a/1/c", "/b/1/c"), false)
    assertEquals(matchUrlPath("/a/1/", "/a/1/b"), false)
  })

  await t.step("matched urls and reg exp => match urls and reg exps => true", () => {
    assertEquals(matchUrlPath("/", /\/.*/), true)
    assertEquals(matchUrlPath("/a", /\/.*/), true)
    assertEquals(matchUrlPath("/a/b", /\/a\/.*/), true)
    assertEquals(matchUrlPath("/a/b", /\/a.*/), true)
  })

  await t.step("non-matched urls and reg exp => match urls and reg exps => true", () => {
    assertEquals(matchUrlPath("a", /\/.*/), false)
    assertEquals(matchUrlPath("/a", /\/b.*/), false)
    assertEquals(matchUrlPath("/a/c", /\/c\/.*/), false)
  })

})