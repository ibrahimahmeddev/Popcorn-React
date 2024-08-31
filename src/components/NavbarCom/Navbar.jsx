import NavLogo from "./NavLogo";

import NavSearch from "./NavSearch";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <NavLogo />
      {/* <NavSearch /> */}
      {children}
    </nav>
  );
}

export default Navbar;
