import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import DataContext, { DataConsumer } from "../../context/datacontext";
import { LogoutUser, Reload } from "../../controllers/auth";
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from "@chakra-ui/react";
//import "./login.module.css";

const TopbarMenuComponent = (props) => {
  const { userdata, setUserData } = useContext(DataContext);
  useEffect(() => {
    // $("body").addClass("authentication-bg authentication-bg-pattern");
    //console.log("enter");
  }, [userdata]);

  return (
    <React.Fragment>
      {/* Topbar Start */}
      <div className="navbar-custom">
        <div className="container-fluid">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown d-inline-block d-lg-none">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect waves-light"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="fe-search noti-icon" />
              </a>
              <div className="dropdown-menu dropdown-lg dropdown-menu-right p-0">
                <form className="p-3">
                  <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                </form>
              </div>
            </li>

            {/* <li className="dropdown notification-list topbar-dropdown">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  Reload(setUserData);
                }}
                className="nav-link waves-effect waves-light"
                role="button"
              >
                <i className="fas fa-sync-alt noti-icon" />
              </a>
            </li> */}
            <li className="dropdown notification-list topbar-dropdown mr-2">
              <a
                className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <Avatar size="md" name={userdata.name} className="m-2" src={userdata.avatar} />

                <span className="pro-user-name ml-1">
                  {(userdata && userdata.name) || null} <i className="mdi mdi-chevron-down" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                {/* item*/}
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
                {/* item*/}
                <a
                  href="/admin/profile"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/admin/profile");
                  }}
                  className="dropdown-item notify-item"
                >
                  <i className="fe-user" />
                  <span>My Account</span>
                </a>
                {/* item*/}
                {/* <a
                  onClick={(e) => {
                    e.preventDefault();
                    Reload(setUserData);
                  }}
                  className="dropdown-item notify-item"
                >
                  <i className="mdi mdi-reload" />
                  <span>Reload</span>
                </a> */}
                {/* item*/}

                <div className="dropdown-divider" />
                {/* item*/}
                <a
                  href="/admin/login"
                  onClick={(e) => {
                    e.preventDefault();
                    LogoutUser();
                  }}
                  className="dropdown-item notify-item"
                >
                  <i className="fe-log-out" />
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
          {/* LOGO */}
          <div className="logo-box" style={{ backgroundColor: "#ffffff" }}>
            <a href="index.html" className="logo logo-dark text-center">
              <span className="logo-sm">
                {/* <img
                  src="../assets/images/logo-sm.png"
                  alt="logo"
                  height={50}
                /> */}
                {/* <span class="logo-lg-text-light">UBold</span> */}
              </span>
              <span className="logo-lg">
                {/* <img
                  src="../assets/images/logo-dark.png"
                  alt="logo"
                  height={50}
                /> */}
                {/* <span class="logo-lg-text-light">U</span> */}
              </span>
            </a>
            <a href="index.html" className="logo logo-light text-center">
              <span className="logo-sm">
                {/* <img
                  src="../assets/images/logo-sm.png"
                  alt="logo"
                  height={50}
                /> */}
              </span>
              <span className="logo-lg">
                {/* <img
                  src="../assets/images/logo-light.png"
                  alt="logo"
                  height={50}
                /> */}
              </span>
            </a>
          </div>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu" />
              </button>
            </li>
            <li>
              {/* Mobile menu toggle (Horizontal Layout)*/}
              <a className="navbar-toggle nav-link" data-toggle="collapse" data-target="#topnav-menu-content">
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </a>
              {/* End mobile menu toggle*/}
            </li>
          </ul>
          <div className="clearfix" />
        </div>
      </div>
      {/* end Topbar */}
    </React.Fragment>
  );
};

export default withRouter(TopbarMenuComponent);
