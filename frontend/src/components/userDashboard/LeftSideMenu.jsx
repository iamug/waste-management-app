import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { LogoutUser } from "../../controllers/auth";
import DataContext, { DataConsumer } from "../../context/datacontext";
import $ from "jquery";
//import "./login.module.css";

const Single = ({ props }) => {
  console.log("single", props);
  return (
    <li>
      <a
        href={props.path}
        onClick={(e) => {
          e.preventDefault();
          props.history.push(`${props.path || "/"}`);
        }}
      >
        <i className={props.icon} />
        <span> {props.name} </span>
      </a>
    </li>
  );
};

const Multi = ({ props }) => (
  <li>
    <a href={`#sidebarMultilevel${props.name}`} data-toggle="collapse">
      <i className={props.icon} />
      <span> {props.name} </span> <span className="menu-arrow" />
    </a>
    <div className="collapse" id={`#sidebarMultilevel${props.name}`}>
      <ul className="nav-second-level">
        {props.children &&
          props.children.length > 0 &&
          props.children.map((child, index) => (
            <li key={index}>
              <a
                href={child.path}
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push(`${child.path || "/"}`);
                }}
              >
                <span> {child.name}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  </li>
);

const LeftSideMenuComponent = (props) => {
  const { userdata } = useContext(DataContext);
  useEffect(() => {
    // $("body").addClass("authentication-bg authentication-bg-pattern");
    //console.log("enter");
    // if (window.matchMedia("(max-width: 768px)").matches) {
    //   $("body").addClass("sidebar-enable");
    // }
    $(".button-menu-mobile").click(function (e) {
      if ($("body").attr("data-sidebar-size") == "default") {
        $("body").attr("data-sidebar-size", "condensed");
      } else {
        $("body").attr("data-sidebar-size", "default");
      }
    });
  }, []);

  return (
    <div>
      <div className="h-100" data-simplebar>
        {/* User box */}
        <div className="user-box text-center">
          <img src="../assets/images/users/user-1.jpg" alt="user-img" title="Mat Helme" className="rounded-circle avatar-md" />
          <div className="dropdown">
            <a href="#" className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block" data-toggle="dropdown">
              Geneva Kennedy
            </a>
            <div className="dropdown-menu user-pro-dropdown">
              {/* item*/}
              <a href="#" className="dropdown-item notify-item">
                <i className="fe-user mr-1" />
                <span>My Account</span>
              </a>
              {/* item*/}
              <a href="#" className="dropdown-item notify-item">
                <i className="fe-settings mr-1" />
                <span>Settings</span>
              </a>
              {/* item*/}
              <a href="#" className="dropdown-item notify-item">
                <i className="fe-lock mr-1" />
                <span>Lock Screen</span>
              </a>
              {/* item*/}
              <a href="#" className="dropdown-item notify-item">
                <i className="fe-log-out mr-1" />
                <span>Logout</span>
              </a>
            </div>
          </div>
          <p className="text-muted">Admin Head</p>
        </div>
        {/*- Sidemenu */}
        <div id="sidebar-menu">
          <ul id="side-menu">
            <li className="menu-title">Navigation</li>
            <li>
              <a
                href="/dashboards"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/dashboard");
                }}
              >
                <i className="mdi mdi-view-dashboard-outline" />
                <span> Dashboards </span>
              </a>
            </li>

            <li>
              <a
                href="/user/requests"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/requests");
                }}
              >
                <i className="fas fa-tag" />
                <span> Requests </span>
              </a>
            </li>

            <li>
              <a
                href="/user/orders"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/orders");
                }}
              >
                <i className="fas fa-receipt" />
                <span> Invoices </span>
              </a>
            </li>

            {/* <li>
              <a
                href="/user/tables"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/tables");
                }}
              >
                <i className="mdi mdi-table-furniture" />
                <span> Tables </span>
              </a>
            </li> */}

            {/* <li>
              <a href="#sidebarMultilevelTable" data-toggle="collapse">
                <i className="mdi mdi-table-furniture" />
                <span> Tables</span> <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMultilevelTable">
                <ul className="nav-second-level">
                  <li>
                    <a
                      href="/user/tables"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/user/tables");
                      }}
                    >
                      Tables
                    </a>
                  </li>
                  <li>
                    <a
                      href="/user/tablecategory"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/user/tablecategory");
                      }}
                    >
                      Table Category
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}

            <li>
              <a
                href="/user/profile"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/user/profile");
                }}
              >
                <i className="fas fa-user-circle" />
                <span> My Profile </span>
              </a>
            </li>
            <li>
              <a
                href="/user/login"
                onClick={(e) => {
                  e.preventDefault();
                  LogoutUser();
                }}
              >
                <i className="fe-log-out" />
                <span> Logout</span>
              </a>
            </li>
          </ul>
        </div>
        {/* End Sidebar */}
        <div className="clearfix" />
      </div>
      ;{/* Sidebar -left */}
    </div>
  );
};

export default withRouter(LeftSideMenuComponent);
