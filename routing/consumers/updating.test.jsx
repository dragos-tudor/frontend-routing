import { assertEquals } from "/asserts.ts"
import { registerLinkeDomParser, render } from "/rendering.js"
import { updateConsumers } from "./updating.js"
import { useHistory, useLocation } from "../../routing-locations/mod.js"
import { useSearchParams } from "../../routing-params/mod.js"

await registerLinkeDomParser()

Deno.test("use routes => update routing consumers", async (t) => {

  await t.step("current route location consumer => update consumers => updated location consumer", () => {
    const A = (_, elem) => { useLocation(elem); return <></> }
    const elem = render(<route><A></A></route>)
    const actual = updateConsumers(elem)

    assertEquals(actual[0].tagName, "A")
  })

  await t.step("current route history consumer => update consumers => updated history consumer", () => {
    const A = (_, elem) => { useHistory(elem); return <></> }
    const elem = render(<route><A></A></route>)
    const actual = updateConsumers(elem)

    assertEquals(actual[0].tagName, "A")
  })

  await t.step("current route search params consumer => update consumers => updated search params consumer", () => {
    const A = (_, elem) => { useSearchParams(elem); return <></> }
    const elem = render(<route><A></A></route>)
    const actual = updateConsumers(elem)

    assertEquals(actual[0].tagName, "A")
  })

  await t.step("current route route params consumer => update consumers => updated route params consumer", () => {
    const A = (_, elem) => { useSearchParams(elem); return <></> }
    const elem = render(<route><A></A></route>)
    const actual = updateConsumers(elem)

    assertEquals(actual[0].tagName, "A")
  })

  await t.step("non-current route consumer => update consumers => consumer not updated", () => {
    const A = (_, elem) => { useLocation(elem); return <></> }
    const elem = render(<route hidden><A></A></route>)
    const actual = updateConsumers(elem)

    assertEquals(actual.length, 0)
  })

  await t.step("route consumers => update consumers => updated current route consumers", () => {
    const A = (props, elem) => { useLocation(elem); return <>{props.children}</> }
    const elem = render(<b><route hidden><A>{"1"}</A></route><route ><A>{"2"}</A></route></b>)
    const actual = updateConsumers(elem)

    assertEquals(actual.length, 1)
    assertEquals(actual[0].textContent, "2")
  })

})
