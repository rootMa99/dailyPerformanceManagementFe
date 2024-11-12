import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import React from "react";

const NavBar = (p) => {
  return (
    <div className={c.navBar}>
      <div className={c.logo}>
        <NavLink to="/">
          <img src={imglogo} alt="logo for aptiv" />
        </NavLink>
      </div>

      <div className={c.links}>
        <ul>
          <li>
            <NavLink
              to="/aec"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              Action Exit Criteria
            </NavLink>
          </li>
          <li style={{ marginRight: "20rem" }}>
            <a
              href="http://10.142.0.204/toScada"
              target="_blank"
              rel="noopener noreferrer"
            >
              DPO usage
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
