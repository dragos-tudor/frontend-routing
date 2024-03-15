import { assertEquals } from "/asserts.ts"
import { render } from "/rendering.js"
import { hideHtmlElement, isDisplayedHtmlElement, showHtmlElement } from "../../routing-html/mod.js"
import { toggleRoutes } from "./toggling.js"

Deno.test("use routes => toggle routes", async (t) => {

  await t.step("shown old route => toggle new route => old route hidden", () => {
    const elem = render(<routes><route class="b"></route><route class="c"></route></routes>)
    showHtmlElement(elem.querySelector(".b"))
    toggleRoutes(Array.from(elem.children), elem.querySelector(".c"))

    assertEquals(isDisplayedHtmlElement(elem.querySelector(".b")), false)
  })

  await t.step("shown new route => toggle new route => new route shown", () => {
    const elem = render(<routes><route class="b"></route><route class="c"></route></routes>)
    hideHtmlElement(elem.querySelector(".c"))
    toggleRoutes(Array.from(elem.children), elem.querySelector(".c"))

    assertEquals(isDisplayedHtmlElement(elem.querySelector(".c")), true)
  })

})