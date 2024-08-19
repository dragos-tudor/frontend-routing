import { assertEquals } from "/asserts.ts"
import { findHtmlAscendant, findHtmlDescendant, findHtmlDescendants } from "./finding.js"
import { render } from "/rendering.js"


Deno.test("use html routes => find html elements", async (t) =>
{
  await t.step("html element => find ascendant => ascendant element", () => {
    assertEquals(findHtmlAscendant(render(<a><b></b></a>).querySelector("b"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(render(<a><b><c></c></b></a>).querySelector("c"), e => e.tagName === "A").tagName, "A")
    assertEquals(findHtmlAscendant(render(<a></a>), e => e.tagName === "B"), undefined)
  })

  await t.step("html element => find descendant => descendant element", () => {
    assertEquals(findHtmlDescendant(render(<a><b></b></a>), e => e.tagName === "B").tagName, "B")
    assertEquals(findHtmlDescendant(render(<a><b><c></c></b></a>), e => e.tagName === "C").tagName, "C")
    assertEquals(findHtmlDescendant(render(<a><b></b><c></c></a>), e => e.tagName === "C").tagName, "C")
    assertEquals(findHtmlDescendant(render(<a><b><c class="level2"></c></b><c class="level1"></c></a>), e => e.tagName === "C").className, "level1")
    assertEquals(findHtmlDescendant(render(<a></a>), e => e.tagName === "B"), undefined)
  })

  await t.step("html element => find descendants => descendant elements", () => {
    assertEquals(findHtmlDescendants(render(<a><b></b></a>), e => e.tagName === "B")[0].tagName, "B")
    assertEquals(findHtmlDescendants(render(<a><b><c></c></b></a>), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(render(<a><b></b><c></c></a>), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(render(<a><b><c></c></b><c></c></a>), e => e.tagName === "C").map(e => e.tagName), ["C", "C"])
    assertEquals(findHtmlDescendants(render(<a></a>), e => e.tagName === "B"), [])
  })
})