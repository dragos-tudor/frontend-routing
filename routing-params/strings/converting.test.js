import { assertEquals } from "/asserts.ts"
import { fromStringType } from "./converting.js"

Deno.test("use query and route params => convert to type", async (t) => {

  await t.step("string data => from string type => typed data", () => {
    assertEquals(fromStringType("1"), 1)
    assertEquals(fromStringType("-1"), -1)
    assertEquals(fromStringType("1.1"), 1.1)
    assertEquals(fromStringType("-1.1"), -1.1)
    assertEquals(fromStringType("0.42"), 0.42)
    assertEquals(fromStringType(".42"), 0.42)
    assertEquals(fromStringType("-0.42"), -0.42)
    assertEquals(fromStringType("0"), 0)
    assertEquals(fromStringType(new Date(2020, 0, 1).toISOString()), new Date(2020, 0, 1))
    assertEquals(fromStringType("2020-13-01"), "2020-13-01")
    assertEquals(fromStringType("true"), true)
    assertEquals(fromStringType("false"), false)
    assertEquals(fromStringType("null"), null)
    assertEquals(fromStringType("undefined"), undefined)
    assertEquals(fromStringType("[1, 2, 3]"), [1,2,3])
    assertEquals(fromStringType('\{"a": 1\}'), {"a": 1})
    assertEquals(fromStringType(""), "")
    assertEquals(fromStringType(" "), " ")
    assertEquals(fromStringType("\n"), "\n")
    assertEquals(fromStringType("[a"), "[a")
    assertEquals(fromStringType("{a"), "{a")
    assertEquals(fromStringType("a"), "a")
    assertEquals(fromStringType("abc.de"), "abc.de")
  })

})