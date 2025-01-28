import { assertEquals } from "/asserts.ts"
import { registerLinkeDomParser, render } from "/rendering.js"
import { createRouteData } from "../route-data/creating.js"
import { renderRouteChild } from "./rendering.js"

await registerLinkeDomParser()

export const A = () => <></>

Deno.test("use routes => render route children", async (t) => {

  await t.step("static route => render route child => rendered child", async () => {
    const elem = await renderRouteChild(render(<b></b>), createRouteData("a", <A></A>))
    assertEquals(elem.tagName, "A")
  })

  await t.step("dynamic route => render route child => rendered child", async () => {
    const load  = async () => { const {A} = await import(import.meta.url); return <A></A> }
    const elem = await renderRouteChild(render(<b></b>), createRouteData("a", undefined, load))
    assertEquals(elem.tagName, "A")
  })

})