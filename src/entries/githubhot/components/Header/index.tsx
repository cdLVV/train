import { memo } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-white flex items-center px-10 h-20 z-10 text-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mr-8 ${isActive ? "  text-cyan-500" : "hover:text-cyan-500"}`
        }
      >
        Popular
      </NavLink>
      <NavLink
        to="/battle"
        className={({ isActive }) =>
          `${isActive ? " text-cyan-500" : "hover:text-cyan-500"}`
        }
      >
        Battle
      </NavLink>
    </nav>
  );
}

export default memo(Header);
