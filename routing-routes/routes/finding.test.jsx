import { assertEquals as eq } from "/asserts.ts"
import { render } from "/rendering.js"
import { createRouteData } from "../route-data/creating.js"
import { findRoute } from "./finding.js"


Deno.test("use routes => find route", async (t) => {

  await t.step("non-matching url => find route => nothing", () => {
    eq(findRoute(render(<a></a>), "/"), undefined)
    eq(findRoute(render(<route __routeData={createRouteData("a")}></route>), "/"), undefined)
  })

  await t.step("matching url => find route => route with matched path", () => {
    eq(findRoute(render(<route __routeData={createRouteData("a")}></route>), "a").__routeData, createRouteData( "a"))
    eq(findRoute(render(<route __routeData={createRouteData("a/b")}></route>), "a/b").__routeData, createRouteData( "a/b"))
    eq(findRoute(render(<route __routeData={createRouteData("a")}></route>), "a/b").__routeData, createRouteData( "a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("a")}></route></a>), "a").__routeData, createRouteData("a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("a/b")}></route></a>), "a/b").__routeData, createRouteData("a/b"))
    eq(findRoute(render(<a><route __routeData={createRouteData("a")}></route></a>), "a/b").__routeData, createRouteData("a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("b")}></route><route __routeData={createRouteData("a")}></route></a>), "a").__routeData, createRouteData("a"))

    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a").__routeData, createRouteData( "/a"))
    eq(findRoute(render(<route __routeData={createRouteData("/a/b")}></route>), "/a/b").__routeData, createRouteData( "/a/b"))
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a/b").__routeData, createRouteData( "/a"))
    eq(findRoute(render(<route __routeData={createRouteData("/a")}></route>), "/a/b").__routeData, createRouteData( "/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route></a>), "/a").__routeData, createRouteData("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route></a>), "/a/b").__routeData, createRouteData("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/b")}></route><route __routeData={createRouteData("/a")}></route></a>), "/a").__routeData, createRouteData("/a"))

    eq(findRoute(render(<a><route __routeData={createRouteData("/a")}></route><route __routeData={createIndexRoute("/b")}></route></a>), "/a").__routeData, createRouteData("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/")}></route></a>), "/a").__routeData, createRouteData("/"))
  })

  await t.step("rooted url => find route => root route", () => {
    eq(findRoute(render(<route __routeData={createRouteData("/")}></route>), "/").__routeData, createRouteData("/"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/")}></route></a>), "/").__routeData, createRouteData("/"))
    eq(findRoute(render(<route __routeData={createRouteData("/")}></route>), "/a").__routeData, createRouteData("/"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/")}></route></a>), "/a").__routeData, createRouteData("/"))
  })

  await t.step("no url => find route => index route", () => {
    eq(findRoute(render(<route __routeData={createIndexRoute("a")}></route>), "").__routeData, createIndexRoute("a"))
    eq(findRoute(render(<a><route __routeData={createIndexRoute("a")}></route></a>), "").__routeData, createIndexRoute("a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("b")}></route><route __routeData={createIndexRoute("a")}></route></a>), "").__routeData, createIndexRoute("a"))

    eq(findRoute(render(<route __routeData={createIndexRoute("/a")}></route>), "").__routeData, createIndexRoute("/a"))
    eq(findRoute(render(<a><route __routeData={createIndexRoute("/a")}></route></a>), "").__routeData, createIndexRoute("/a"))
    eq(findRoute(render(<a><route __routeData={createRouteData("/b")}></route><route __routeData={createIndexRoute("/a")}></route></a>), "").__routeData, createIndexRoute("/a"))
  })

})

const createIndexRoute = (path) => createRouteData(path, undefined, undefined, true)