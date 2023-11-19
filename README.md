## Frontend routing library
- Deno-based routing library [Node-free].
- functional-style library [OOP-free].
- simplified React-Routing library version.

### Modules
- high-levels: routing, routing-components, routing-consumers.
- low-levels: routing-html, routing-locations, routing-params, routing-urls.

### [Routing module](./routing/)
- main functionality: navigate from history or user.
- `navigateFromUser`:
  - for current element find router.
  - store location, search params, history (skipped by `navigateFromHistory`).
  - change routes starting from router.
  - update **current path** routing consumers starting from router.

### [Routes module](./routing-routes/)
- main functionality: implement route behaviour.
- `changeRoutes`:
  - find matching route for url.
  - store route params.
  - show maching route, hide sibling routes.
  - first time showing route static or dynamic load child.
  - remove route path from url.
  - change descendant routes with remaining url.

### [Components module](./routing-components/)
- main functionality: implement routing components.
- `Router`:
  - register `popstate` event handler `navigateFromHistory`.
  - register `navigate` event handler `navigateFromUser`.
- `Route`: set static (jsx factory) or dynamic loading function.
- `NavLink`: on click raise `navigate` event.