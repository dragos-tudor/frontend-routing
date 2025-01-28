import { assertEquals } from "/asserts.ts"
import { render, registerLinkeDomParser } from "/rendering.js"
import { NavLink } from "./navlink.jsx"

await registerLinkeDomParser()

Deno.test("navigate app => use navigation links", async (t) => {

  await t.step("navigation link with children => render navigation link => anchor with children", () => {
    const elem = render(<NavLink><icon></icon></NavLink>)

    assertEquals(elem.outerHTML, "<navlink><a><icon></icon></a></navlink>")
  })

  await t.step("navigation link with href => render navigation link => anchor with href property", () => {
    const elem = render(<NavLink href="test.com"></NavLink>)

    assertEquals(elem.querySelector("a").href, "test.com")
  })

})