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
           
          </ul>
        </div>

    </div>
  );
};
export default NavBar;
