import { handleNavLinkClick } from "./handling.js"

export const NavLink = (props) =>
  <a onclick={handleNavLinkClick} {...props}>
    {props.children}
  </a>

