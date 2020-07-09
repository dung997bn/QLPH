import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ info }) => {
  const { accountInfo, authenticationState } = info;
  return (
    <nav
      className="nav-extended"
      style={{ paddingRight: "50px", paddingLeft: "50px" }}
    >
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <img
            className="responsive-img"
            src="assets/images/Logo_NEU.png"
            alt="Logo_NEU"
            style={{ maxWidth: "25%" }}
          />
        </Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          {authenticationState === "Unauthenticated" && (
            <li>
              <a href="sass.html">Hệ thống quản lý phòng họp</a>
            </li>
          )}

          {authenticationState === "Authenticated" && (
            <li>
              <a href="sass.html">Xin chào {accountInfo.account.name}</a>
            </li>
          )}
        </ul>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="sass.html">Hello</a>
          </li>
          <li>
            <a href="badges.html">Login</a>
          </li>
          <li>
            <a href="collapsible.html">Log out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
