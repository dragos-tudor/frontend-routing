import { assertObjectMatch, assertEquals } from "/asserts.ts"
import { resolveSearchParams } from "./resolving.js"

Deno.test("use search params => resolve search params", async (t) => {

  await t.step("query string => resolve search params => typed search params", () => {
    assertEquals(resolveSearchParams(""), undefined)
    assertEquals(resolveSearchParams("http://test.ro"), undefined)
    assertEquals(resolveSearchParams("http://test.ro?"), undefined)
    assertObjectMatch(resolveSearchParams("http://test.ro?x=1"), {x: 1})
    assertObjectMatch(resolveSearchParams("http://test.ro?x="), {x: ""})
    assertObjectMatch(resolveSearchParams("http://test.ro?x=1&"), {x: 1})
    assertObjectMatch(resolveSearchParams("http://test.ro?x=%20a"), {x: " a"})
    assertObjectMatch(resolveSearchParams("http://test.ro?x=abc&y=[1, 2]"), {x: "abc", y: [1, 2]})
  })

})