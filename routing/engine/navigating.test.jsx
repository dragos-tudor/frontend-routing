import { assertEquals, assertExists } from "/asserts.ts"
import { render, dispatchEvent } from "/rendering.js"
import { getHistory } from "../../routing-locations/mod.js"
import { useRouteParams } from "../../routing-params/mod.js"
import { NavLink } from "../../routing-components/navlinks/NavLink.jsx"
import { Route } from "../../routing-components/routes/Route.jsx"
import { Router } from "../../routing-components/routers/Router.js"
import { navigateFromUser } from "./navigating.js"

Deno.test("navigate app => navigate to url", async (t) => {

  await t.step("routes => navigate to url => rendered navigated routes", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route><Route path="/b" child={<b></b>}></Route></Router>)
    await navigateFromUser(elem, "/a")

    assertExists(elem.querySelector("router route a"))
  })

  await t.step("nested routes => navigate to url => rendered nested routes", async () => {
    const A = () => <Route path="/b" child={<b></b>}></Route>
    const elem = render(<Router><Route path="/a" child={<A></A>} index></Route></Router>)

    await navigateFromUser(elem, "/a/b")

    assertExists(elem.querySelector("router a"))
    assertExists(elem.querySelector("router a route b"))
  })

  await t.step("index route => navigate to url => rendered index route", async () => {
    const A = () => <></>
    const elem = render(<Router>
      <Route path="/a" child={<A></A>} index></Route>
      <Route path="/b" child={<b></b>}></Route>
    </Router>)

    await navigateFromUser(elem, "/")

    assertExists(elem.querySelector("router a"))
  })

  await t.step("routing consumers => navigate to url => updated consumers", async () => {
    const A = (_, elem) => <>{useRouteParams(elem).p}</>
    const elem = render(<Router><Route path="/a/:p" child={<A></A>}></Route></Router>)
    await navigateFromUser(elem, "/a/1")
    assertEquals(elem.querySelector("route a").textContent, "1")

    await navigateFromUser(elem, "/a/2")
    assertEquals(elem.querySelector("route a").textContent, "2")
  })

  await t.step("router => navigate to url => url history changed", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route></Router>)
    await navigateFromUser(elem, "/a?id=1")

    assertEquals(getHistory(elem).hrefs[0], "/a?id=1")
  })

  await t.step("root route => navigate to url => rendered nested routes", async () => {
    const A = () => <Route path="/b" child={<b></b>}></Route>
    const elem = render(<Router><Route path="/a" child={<A></A>}></Route></Router>)

    await navigateFromUser(elem, "/a")
    assertEquals(elem.querySelector("route b"), null)

    await navigateFromUser(elem, "/a/b")

    assertExists(elem.querySelector("route b"))
  })

  await t.step("old route => navigate to url => rendered new route", async () => {
    const A = () => <><Route path="/b" child={<b></b>}></Route><Route path="/c" child={<c></c>}></Route></>
    const elem = render(<Router><Route path="/a" child={<A></A>} index></Route></Router>)

    await navigateFromUser(elem, "http://localhost/a/b")
    assertEquals(elem.querySelector("route c"), null)

    await navigateFromUser(elem, "http://localhost/a/c")
    assertExists(elem.querySelector("route c"))
  })

  await t.step("fallback route => navigate to wrong url => rendered fallback route", async () => {
    const elem = render(<Router><Route path="/a" child={<a></a>}></Route><Route path={/\/.*/} child={<b></b>}></Route></Router>)

    await navigateFromUser(elem, "/x")
    assertExists(elem.querySelector("route b"))
  })

  await t.step("no fallback route => navigate to wrong url => route not found error", async () => {
    const elem = render(<Router><Route path="/a" element={<a></a>}></Route></Router>)

    const error = await navigateFromUser(elem, "/b")
    assertEquals(error, "Navigation error: Route /b not found.")
  })

  await t.step("router => click navigate link => rendered routes with link href", async () => {
    const elem = render(<Router><NavLink href="/c"></NavLink><Route path="/b" child={<b></b>}></Route><Route path="/c" child={<c></c>}></Route></Router>)

    await navigateFromUser(elem, "/b")
    assertEquals(elem.querySelector("c"), null)

    dispatchEvent(elem.querySelector("navlink a"), "click")
    await Promise.resolve()

    assertExists(elem.querySelector("route c"))
  })

})