import { assertEquals } from "/asserts.ts"
import { toStringType } from "./converting.js"

Deno.test("use query and route params => convert to string type", async (t) => {

  await t.step("string data => to string type => typed data", () => {
    assertEquals(toStringType("1"), 1)
    assertEquals(toStringType("-1"), -1)
    assertEquals(toStringType("1.1"), 1.1)
    assertEquals(toStringType("-1.1"), -1.1)
    assertEquals(toStringType("0.42"), 0.42)
    assertEquals(toStringType(".42"), 0.42)
    assertEquals(toStringType("-0.42"), -0.42)
    assertEquals(toStringType("0"), 0)
    assertEquals(toStringType("2020-01-01"), new Date(2020, 0, 1))
    assertEquals(toStringType("2020-13-01"), "2020-13-01")
    assertEquals(toStringType("true"), true)
    assertEquals(toStringType("false"), false)
    assertEquals(toStringType("null"), null)
    assertEquals(toStringType("undefined"), undefined)
    assertEquals(toStringType("[1, 2, 3]"), [1,2,3])
    assertEquals(toStringType('\{"a": 1\}'), {"a": 1})
    assertEquals(toStringType(""), "")
    assertEquals(toStringType(" "), " ")
    assertEquals(toStringType("\n"), "\n")
    assertEquals(toStringType("[a"), "[a")
    assertEquals(toStringType("{a"), "{a")
    assertEquals(toStringType("a"), "a")
    assertEquals(toStringType("abc.de"), "abc.de")
  })

})