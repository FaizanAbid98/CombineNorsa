/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";
import { getRole } from "services/auth";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundColor: "#42D0ED",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="#">
            <div>
              <img
                src={require("assets/img/norsalogo.png").default}
                alt="logo"
                className="img-fluid"
                style={{ width: "100px", height: "55px" }}
              />
            </div>
          </a>
          <a className="simple-text mt-1" href="#">
            Norsa n.v.
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              if (
                prop.path.includes("add") ||
                (prop.path.includes("Form") && !prop.path.includes("Card")) ||
                prop.path.includes("History") ||
                prop.path.includes("PendingPaymentList") ||
                prop.path.includes("pendingClientList")
              )
                return;
            }
            if (parseInt(getRole()) != 0) {
              if (prop.path != "/groups" && prop.path !== "/ClientList" && prop.path != "/dashboard") {
                return;
              }
            }
            return (
              <li
                className={
                  prop.upgrade
                    ? "active active-pro"
                    : activeRoute(prop.layout + prop.path)
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
