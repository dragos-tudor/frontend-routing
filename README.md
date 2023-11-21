## Frontend routing library
- Deno-based routing library [Node-free].
- functional-style library [OOP-free].
- simplified React-Routing library version.

### Modules
- high-levels: routing, routing-components.
- low-levels: routing-consumers, routing-html, routing-locations, routing-params, routing-routes, routing-urls.

### [Routing module](./routing/)
- main functionality: navigate from history or user and change routes.
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

### [Components module](./routing-components/)
- main functionality: implement routing components.
- `Router`:
  - register `popstate` event handler `navigateFromHistory`.
  - register `navigate` event handler `navigateFromUser`.
- `Route`: set static (jsx factory) or dynamic loading function.
- `NavLink`: on click raise `navigate` event.

### [Routes module](./routing-routes/)
- main functionality: implement route behaviour.
  - find, toogle routes.
  - render routes children.
  - find route siblings.
  - manage routes data.

### [Consumers module](./routing-consumers/)
- main functionality: update routing consumers.