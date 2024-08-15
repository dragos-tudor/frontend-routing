import { assertEquals, assertExists } from "/asserts.ts"
import { render } from "/rendering.js"
import { spy, assertSpyCallArgs} from "/mock.ts"
import { hideHtmlElement, isShownHtmlElement } from "../../routing-html/mod.js"
import { setRouteParams, getRouteParams, resolveSearchParams, setSearchParams } from "../../routing-params/mod.js"
import { createRouteData } from "../route-data/creating.js"
import { changeRoute } from "./changing.js"


Deno.test("use routes => change routes", async (t) => {

  await t.step("root route => change route => rendered root route", async () => {
    const elem = render(<route __routeData={createRouteData("/", <a></a> )}></route>)
    await changeRoute(elem, "/")

    assertExists(elem.querySelector("route a"))
  })

  await t.step("hidden route => change route => shown route", async () => {
    const elem = render(<route __routeData={createRouteData("/a", <a></a> )}></route>)
    hideHtmlElement(elem)
    const actual = await changeRoute(elem, "/a")

    assertEquals(isShownHtmlElement(elem), true)
  })

  await t.step("fallback route => change route => shown fallback route", async () => {
    const elem = render(<a>
      <route __routeData={createRouteData("/b", <b></b> )}></route>
      <route class="c" __routeData={createRouteData(/\/.*/, <c></c> )}></route>
    </a>)
    hideHtmlElement(elem.querySelector(".c"))
    const actual = await changeRoute(elem, "/x")

    assertExists(elem.querySelector("route c"))
    assertEquals(isShownHtmlElement(elem.querySelector(".c")), true)
  })

  await t.step("nested routes => change route => rendered nested routes", async () => {
    const elem = render(
      <route __routeData={createRouteData("/a",
        <a>
          <route __routeData={createRouteData("/b", <b></b>)}></route>
        </a> )}>
      </route>)
    await changeRoute(elem, "/a/b")

    assertExists(elem.querySelector("route a route b"))
  })

  await t.step("nested index routes => change route => rendered index route", async () => {
    const elem = render(
      <route __routeData={createRouteData("/a",
        <a>
          <route __routeData={createRouteData("/b", <b></b>)}></route>
          <route __routeData={createIndexRoute("/c", <c></c>)}></route>
        </a> )}>
      </route>)
    const actual = await changeRoute(elem, "/a")

    assertExists(elem.querySelector("route a route c"))
  })

  await t.step("nested routes => change routes => rendered nested routes once", async () => {
    const elem = render(
      <route __routeData={createRouteData("/a",
        <a>
          <route __routeData={createRouteData("/b", <b></b>)}></route>
        </a> )}>
      </route>)
    await changeRoute(elem, "/a/b")
    await changeRoute(elem, "/a/b")
    await changeRoute(elem, "/a/b")

    assertEquals(elem.querySelectorAll("a").length, 1)
    assertEquals(elem.querySelectorAll("b").length, 1)
  })

  await t.step("shown old routes => change route => shown new routes", async () => {
    const elem = render(
      <route __routeData={createRouteData("/a",
        <a>
          <route class="b" __routeData={createRouteData("/b", <b></b>)}></route>
          <route class="c" __routeData={createRouteData("/c", <c></c>)}></route>
        </a> )}>
      </route>)
    await changeRoute(elem, "/a/c")

    assertEquals(isShownHtmlElement(elem.querySelector(".b")), false)
    assertEquals(isShownHtmlElement(elem.querySelector(".c")), true)
  })

  await t.step("route params => change route => stored route params", async () => {
    const elem = render(
      <route __routeData={createRouteData("/a",
        <a>
          <route class="b" __routeData={createRouteData("/:p1",
            <b>
              <route class="c" __routeData={createRouteData("/c/:p2", <c></c>)}></route>
            </b>)}>
          </route>
        </a> )}>
      </route>)
    setRouteParams(elem, {})
    await changeRoute(elem, "/a/1/c/2")

    assertEquals(getRouteParams(elem), {p1: 1, p2: 2})
  })

  await t.step("route params => change route => route load receive route params", async () => {
    const loadSpy = spy(() => {})
    const elem = render(<route __routeData={createRouteData("/a/:p", undefined, (params) => { loadSpy(params); return <a></a>})}></route>)
    setRouteParams(elem, {})
    await changeRoute(elem, "/a/1")

    assertSpyCallArgs(loadSpy, 0, [{p: 1}])
  })

  await t.step("search params => change route => route load receive search params", async () => {
    const loadSpy = spy(() => {})
    const elem = render(<route __routeData={createRouteData("/a", undefined, (_, params) => { loadSpy(params); return <a></a>})}></route>)
    setSearchParams(elem, resolveSearchParams("/a?p=1"))
    await changeRoute(elem, "/a")

    assertSpyCallArgs(loadSpy, 0, [{p: 1}])
  })

  await t.step("unknown routes => chang eroute => route not found error", async () => {
    assertEquals((await changeRoute(render(<a></a>), "/"))[1], "Route / not found.")
    assertEquals((await changeRoute(render(<route __routeData={createRouteData("/a", <></>)}></route>), "/a/b"))[1], "Route /b not found.")
  })

})

const createIndexRoute = (path, child) => createRouteData(path, child, undefined, true)