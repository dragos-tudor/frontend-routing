import { assertEquals as eq } from "/asserts.ts"
import { render } from "/rendering.js"
import { createRouteData } from "../route-data/creating.js"
import { findRoute } from "./finding.js"


Deno.test("use routes => find route", async (t) => {

  await t.step("matching url => find route => route with matched path", () => {
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a").__routeData, createRouteData( "/a"))
    eq(findRoute(render(<route __routeData={createRouteData("/a/b")}></route>), "/a/b").__routeData, createRouteData( "/a/b"))
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a/b").__routeData, createRouteData( "/a"))
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a/b").__routeData, createRouteData( "/a"))

    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route></a>), "/a").__routeData, createRouteData("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route></a>), "/a/b").__routeData, createRouteData("/a"))

    eq(findRoute(render(<a><route __routeData={createRouteData("/b")}></route><route __routeData={createRouteData("/a")}></route></a>), "/a").__routeData, createRouteData("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route><route __routeData={createIndexRoute("/b")}></route></a>), "/a").__routeData, createRouteData("/a"))
  })

  await t.step("non-matching url => find route => nothing", () => {
    eq(findRoute(render(<a></a>), "/"), undefined)
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/b"), undefined)
  })

  await t.step("non-matching url and index route => find route => index route", () => {
    eq(findRoute(render(<route __routeData={createIndexRoute("/a")}></route>), "/").__routeData, createIndexRoute("/a"))
    eq(findRoute(render(<a><route __routeData={createIndexRoute("/a")}></route></a>), "/x").__routeData, createIndexRoute("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/b")}></route><route __routeData={createIndexRoute("/a")}></route></a>), "/x").__routeData, createIndexRoute("/a"))
  })

})

const createIndexRoute = (path) => createRouteData(path, undefined, undefined, undefined, true)