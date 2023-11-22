## Frontend routing library
- Deno-based routing library [Node-free].
- functional-style library [OOP-free].
- simplified React-Routing like library.

### Usage
```javascript

import {render} from "/scripts/rendering.js"
import {Router, Route, NavLink} from "/scripts/routing.js"

export const App = (props, elem) => {
  const loadOffers = async () => {
    const {Offers} = await import("/offers.js");
    return <Offers></Offers>;
  }
  return (
    <Router>
      <nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/offers">Offers</NavLink>
      </nav>
      <main>
        <Route path="/" child={<Home></Home>}></Route>
        <Route path="/contact" child={<Contact></Contact>}></Route>
        <Route path="/offers" load={loadOffers}></Route>
      </main>
    </Router>
  )
}

render(<App></App>, document.body)
```

### Modules
- main modules: routing, routing-components.
- support modules: routing-\*, support-\*.

### [Routing](./routing/)
- main functionality: user/history navigation, change routes.
- `navigateFromUser`:
  - for current element find (ascending) router.
  - store location, search params, history [skipped by `navigateFromHistory`].
  - change routes starting from router [`changeRoutes`].
  - update **current path** routing consumers starting from router.
- `changeRoutes`:
  - find matching route for url.
  - store route params.
  - show mached route, hide sibling routes.
  - show route static child (jsx factory) or dynamic loaded child.
  - remove route path from url.
  - change descendant routes with remaining url.

### [Components](./routing-components/)
- main functionality: implement routing components.
- `Router`:
  - register `popstate` event handler `navigateFromHistory`.
  - register `navigate` event handler `navigateFromUser`.
- `Route`: set static (jsx factory) or dynamic loading function.
- `NavLink`: on click raise `navigate` event.

### [Routes](./routing-routes/)
- main functionality: implement route operations.
  - find and toogle routes.
  - render routes children.
  - find route siblings.
  - manage routes data.

### [Consumers](./routing-consumers/)
- main functionality: update routing consumers.