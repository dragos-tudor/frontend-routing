import { assertEquals } from "/asserts.ts"
import { render } from "/rendering.js"
import { toggleRoutes } from "./toggling.js"

Deno.test("use routes => toggle routes", async (t) => {

  await t.step("shown old route => toggle new route => old route hidden", () => {
    const elem = render(<routes><route class="b"></route><route class="c" hidden></route></routes>)
    toggleRoutes(Array.from(elem.children), elem.querySelector(".c"))

    assertEquals(elem.querySelector(".b").hasAttribute("hidden"), true)
  })

  await t.step("shown old route => toggle new route => new route shown", () => {
    const elem = render(<routes><route class="b"></route><route class="c" hidden></route></routes>)
    toggleRoutes(Array.from(elem.children), elem.querySelector(".c"))

    assertEquals(elem.querySelector(".c").hasAttribute("hidden"), false)
  })

})