import { assertEquals, assertExists } from "/asserts.ts"
import { render, dispatchEvent, registerLinkeDomParser } from "/rendering.js"
import { getHistory } from "../../routing-locations/mod.js"
import { useRouteParams } from "../../routing-params/mod.js"
import { NavLink, Route, Router } from "../../routing-components/mod.js"
import { navigateToRoute } from "./navigating.js"

await registerLinkeDomParser()

Deno.test("navigate app => navigate to route", async (t) => {

  await t.step("routes => navigate to route => rendered navigated routes", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route><Route path="/b" child={<b></b>}></Route></Router>)
    await navigateToRoute(elem, "/a")

    assertExists(elem.querySelector("router route a"))
  })

  await t.step("nested routes => navigate to route => rendered nested routes", async () => {
    const A = () => <Route path="/b" child={<b></b>}></Route>
    const elem = render(<Router><Route path="/a" child={<A></A>} index></Route></Router>)

    await navigateToRoute(elem, "/a/b")

    assertExists(elem.querySelector("router a"))
    assertExists(elem.querySelector("router a route b"))
  })

  await t.step("index route => navigate to route => rendered index route", async () => {
    const A = () => <></>
    const elem = render(<Router>
      <Route path="/a" child={<A></A>} index></Route>
      <Route path="/b" child={<b></b>}></Route>
    </Router>)

    await navigateToRoute(elem, "/")

    assertExists(elem.querySelector("router a"))
  })

  await t.step("routing consumers => navigate to route => updated consumers", async () => {
    const A = (_, elem) => <>{useRouteParams(elem).p}</>
    const elem = render(<Router><Route path="/a/:p" child={<A></A>}></Route></Router>)
    await navigateToRoute(elem, "/a/1")
    assertEquals(elem.querySelector("route a").textContent, "1")

    await navigateToRoute(elem, "/a/2")
    assertEquals(elem.querySelector("route a").textContent, "2")
  })

  await t.step("router => navigate to route => url history changed", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route></Router>)
    await navigateToRoute(elem, "/a?id=1")

    assertEquals(getHistory(elem).hrefs[0], "/a?id=1")
  })

  await t.step("root route => navigate to nested route => nested route rendered", async () => {
    const A = () => <Route path="/b" child={<b></b>}></Route>
    const elem = render(<Router><Route path="/a" child={<A></A>}></Route></Router>)

    await navigateToRoute(elem, "/a")
    assertEquals(elem.querySelector("route b"), null)

    await navigateToRoute(elem, "/a/b")
    assertExists(elem.querySelector("route b"))
  })

  await t.step("old route => navigate to new route => new route rendered", async () => {
    const A = () => <><Route path="/b" child={<b></b>}></Route><Route path="/c" child={<c></c>}></Route></>
    const elem = render(<Router><Route path="/a" child={<A></A>} index></Route></Router>)

    await navigateToRoute(elem, "http://localhost/a/b")
    assertEquals(elem.querySelector("route c"), null)

    await navigateToRoute(elem, "http://localhost/a/c")
    assertExists(elem.querySelector("route c"))
  })

  await t.step("fallback route => navigate to unknown route => fallback route rendered", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route><Route path={/\/.*/} child={<b></b>}></Route></Router>)

    await navigateToRoute(elem, "/x")
    assertExists(elem.querySelector("route b"))
  })

  await t.step("no fallback route => navigate to unknown route => route not found error", async () => {
    const elem = render(<Router><Route path="/a" element={<a></a>}></Route></Router>)

    const error = await navigateToRoute(elem, "/b")
    assertEquals(error, "Navigation error: Route /b not found.")
  })

  await t.step("router => click navigate link => rendered routes with link href", async () => {
    const elem = render(<Router>
      <NavLink href="/c"></NavLink>
      <Route path="/b" child={<b></b>}></Route>
      <Route path="/c" child={<c></c>}></Route>
    </Router>)

    await navigateToRoute(elem, "/b")
    assertEquals(elem.querySelector("c"), null)

    dispatchEvent(elem.querySelector("navlink a"), "click")
    await Promise.resolve()

    assertExists(elem.querySelector("route c"))
  })

})