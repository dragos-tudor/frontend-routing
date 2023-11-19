import { assertEquals as eq } from "/asserts.ts"
import { resolveRouteParams } from "./resolving.js"

Deno.test("use route params => resolve route params", async (t) => {

  await t.step("route paths with params => resolve route params => url route params", () => {
    eq(resolveRouteParams("", ""), {})
    eq(resolveRouteParams("a", "a"), {})
    eq(resolveRouteParams("a/b", "a"), {})
    eq(resolveRouteParams("a", ":p1"), { p1: "a" })
    eq(resolveRouteParams("/a", "/:p1"), { p1: "a" })
    eq(resolveRouteParams("a/b", "a/:p1"), { p1: "b" })
    eq(resolveRouteParams("/a/b", "/a/:p1"), { p1: "b" })
    eq(resolveRouteParams("a/b/c", "a/:p1/:p2"), { p1: "b", p2: "c" })
    eq(resolveRouteParams("a/b/c", "a/b/:p1"), { p1: "c" })
  })

})
