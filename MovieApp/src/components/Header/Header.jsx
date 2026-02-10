import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Watchlist
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
