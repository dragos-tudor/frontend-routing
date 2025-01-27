## Frontend routing library
- simplified React-Router like library.
- Deno-based routing library [Node-free].
- functional-style library [OOP-free].

### Usage
```javascript
import { render, registerLinkeDomParser } from "/scripts/rendering.js"
import { Router, Route, NavLink, navigate } from "/scripts/routing.js"

await registerLinkeDomParser()

const loadSpecialOffer = async () => {
    const {SpecialOffer} = await import("/components/special-offer.jsx");
    return <SpecialOffer></SpecialOffer>;
}

const Home = () => <div>{"home"}</div>
const Contact = () => <div>{"contact"}</div>

export const App = () => {
  return (
    <Router __log={["routing"]}>
      <nav>
        <NavLink href="/home">{"Home"}</NavLink>
        <NavLink href="/contact">{"Contact"}</NavLink>
        <NavLink href="/special-offer">{"Special offer"}</NavLink>
      </nav>
      <main>
        <Route path="/home" child={<Home></Home>} index></Route>
        <Route path="/contact" child={<Contact></Contact>}></Route>
        <Route path="/special-offer" load={loadSpecialOffer}></Route>
      </main>
    </Router>
  )
}

render(<App></App>, document.body)
navigate(document.querySelector("router"), "/")
```

### Modules
- *high-level modules*: routing, routing-components.
- *low-level modules*: routing-html, routing-locations, routing-params, routing-urls.
- *low-level modules* completely independent ["parallel" modules].

### [Routing](./routing/)
- main functionality: route navigation, change routes, update routing consumers.
- `navigateToRoute`:
  - for current element find html root.
  - store location, search params, history [skipped by `navigateFromHistory`].
  - change routes starting from root [`changeRoutes`].
  - update **current path** routing consumers starting from root.
- `changeRoutes`:
  - find matching route for url.
  - store route params.
  - show matched route, hide sibling routes.
  - show route static child (jsx factory) or dynamic loaded child.
  - remove route path from url.
  - change descendant routes with remaining url.

### [Components](./routing-components/)
- main functionality: implement routing components.
- `Router`:
  - register `popstate` event handler `navigateToHistoryRoute`.
  - register `navigate` event handler `navigateToRoute`.
- `Route`: set static (jsx factory) or dynamic loading function.
- `NavLink`: on click raise `navigate` event.

### [Routes](./routing-routes/)
- main functionality: implement route operations.
  - find and toogle routes.
  - render routes children.
  - find route siblings.
  - manage routes data.
