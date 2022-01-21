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
    console.log("enter");
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
                href="/admin/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/dashboard");
                }}
              >
                <i className="mdi mdi-view-dashboard-outline" />
                <span> Dashboards </span>
              </a>
            </li>
            {/* <li>
              <a
                href="/users"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admins");
                }}
              >
                <i className="mdi mdi-account-multiple-outline" />
                <span> Admins </span>
              </a>
            </li> */}
            {/* {Modules && Modules.length > 0 && Modules.map((item, index) => {
              return item.type == "multilevel" ?
              <Multi props={{...props, ...item, index}} key={index} />
              : <Single props={{ ...props, ...item, index }} key={index} />
            } )} */}

            <li>
              <a
                href="/admin/admins"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/admins");
                }}
              >
                <i className="fas fa-user-shield" />
                <span> Admins </span>
              </a>
            </li>

            {/* {((userdata && userdata.superAdmin) ||
              (userdata &&
                userdata.permissions &&
                userdata.permissions.Bookings &&
                userdata.permissions.Bookings.read)) && (
              <li>
                <a
                  href="/bookings"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/bookings");
                  }}
                >
                  <i className=" fas fa-receipt" />
                  <span> Bookings </span>
                </a>
              </li>
            )} */}

            {/* <li>
              <a href="#sidebarMultilevelBooking" data-toggle="collapse">
                <i className=" fas fa-receipt" />
                <span> Products </span> <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMultilevelBooking">
                <ul className="nav-second-level">
                  <li>
                    <a
                      href="/admin/products"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/admin/products");
                      }}
                    >
                      Products
                    </a>
                  </li>

                  <li>
                    <a
                      href="/admin/category"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/admin/category");
                      }}
                    >
                      Categories
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            <li>
              <a
                href="/admin/requests"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/requests");
                }}
              >
                <i className="fas fa-tag" />
                <span> Requests </span>
              </a>
            </li>

            <li>
              <a
                href="/admin/invoices"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/invoices");
                }}
              >
                <i className="fas fa-receipt" />
                <span> Invoices </span>
              </a>
            </li>

            <li>
              <a
                href="/admin/users"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/users");
                }}
              >
                <i className="mdi mdi-account-multiple-outline" />
                <span> Users </span>
              </a>
            </li>

            {/* <li>
              <a
                href="/roles"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/roles");
                }}
              >
                <i className=" fas fa-lock" />
                <span> Roles and Permissions </span>
              </a>
            </li> */}

            {/* <li>
              <a href="#sidebarMultilevel4" data-toggle="collapse">
                <i className=" fas fa-car" />
                <span> Vehicle Inspection </span>{" "}
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMultilevel4">
                <ul className="nav-second-level">
                  <li>
                    <a
                      href="/vehicleinsp"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/vehicleinsp");
                      }}
                    >
                      Inspection List
                    </a>
                  </li>
                  <li>
                    <a
                      href="/inspcenters"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/inspcenters");
                      }}
                    >
                      Inspection Centers
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            {/* {((userdata && userdata.superAdmin) ||
              (userdata &&
                userdata.permissions &&
                userdata.permissions["Admins"] &&
                userdata.permissions["Admins"].read) ||
              (userdata &&
                userdata.permissions &&
                userdata.permissions["Roles and Permissions"] &&
                userdata.permissions["Roles and Permissions"].read)) && (
              <li>
                <a href="#sidebarMultilevelAdmin" data-toggle="collapse">
                  <i className=" fas fa-user-shield" />
                  <span> Admin Management </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <div className="collapse" id="sidebarMultilevelAdmin">
                  <ul className="nav-second-level">
                    {((userdata && userdata.superAdmin) ||
                      (userdata &&
                        userdata.permissions &&
                        userdata.permissions["Admins"] &&
                        userdata.permissions["Admins"].read)) && (
                      <li>
                        <a
                          href="/admins"
                          onClick={(e) => {
                            e.preventDefault();
                            props.history.push("/admins");
                          }}
                        >
                          <span> Admins </span>
                        </a>
                      </li>
                    )}
                    {((userdata && userdata.superAdmin) ||
                      (userdata &&
                        userdata.permissions &&
                        userdata.permissions["Roles and Permissions"] &&
                        userdata.permissions["Roles and Permissions"]
                          .read)) && (
                      <li>
                        <a
                          href="/roles"
                          onClick={(e) => {
                            e.preventDefault();
                            props.history.push("/roles");
                          }}
                        >
                          Roles and Permissions
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}
            {((userdata && userdata.superAdmin) ||
              (userdata &&
                userdata.permissions &&
                userdata.permissions["Activity Logs"] &&
                userdata.permissions["Activity Logs"].read)) && (
              <li>
                <a
                  href="/logs"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/logs");
                  }}
                >
                  <i className=" fas fa-history" />
                  <span> Activity Logs </span>
                </a>
              </li>
            )} */}
            {/* <li>
              <a href="#sidebarMultilevelAdmin" data-toggle="collapse">
                <i className=" fas fa-user-shield" />
                <span> Admin Management </span> <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMultilevelAdmin">
                <ul className="nav-second-level">
                  <li>
                    <a
                      href="/admins"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/admins");
                      }}
                    >
                      <span> Admins </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/roles"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/roles");
                      }}
                    >
                      Roles and Permissions
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            <li>
              <a
                href="/admin/profile"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/admin/profile");
                }}
              >
                <i className="fas fa-user-circle" />
                <span> My Profile </span>
              </a>
            </li>
            <li>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  LogoutUser();
                }}
              >
                <i className="fe-log-out" />
                <span> Logout</span>
              </a>
            </li>
            {/* <li className="menu-title mt-2">Apps</li>
            <li>
              <a href="apps-calendar.html">
                <i className="mdi mdi-calendar" />
                <span> Calendar </span>
              </a>
            </li>
            <li>
              <a href="apps-chat.html">
                <i className="mdi mdi-forum-outline" />
                <span> Chat </span>
              </a>
            </li>
            <li>
              <a href="#sidebarEcommerce" data-toggle="collapse">
                <i className="mdi mdi-cart-outline" />
                <span> Ecommerce </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarEcommerce">
                <ul className="nav-second-level">
                  <li>
                    <a href="ecommerce-dashboard.html">Dashboard</a>
                  </li>
                  <li>
                    <a href="ecommerce-products.html">Products</a>
                  </li>
                  <li>
                    <a href="ecommerce-product-detail.html">Product Detail</a>
                  </li>
                  <li>
                    <a href="ecommerce-product-edit.html">Add Product</a>
                  </li>
                  <li>
                    <a href="ecommerce-customers.html">Customers</a>
                  </li>
                  <li>
                    <a href="ecommerce-orders.html">Orders</a>
                  </li>
                  <li>
                    <a href="ecommerce-order-detail.html">Order Detail</a>
                  </li>
                  <li>
                    <a href="ecommerce-sellers.html">Sellers</a>
                  </li>
                  <li>
                    <a href="ecommerce-cart.html">Shopping Cart</a>
                  </li>
                  <li>
                    <a href="ecommerce-checkout.html">Checkout</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarCrm" data-toggle="collapse">
                <i className="mdi mdi-account-multiple-outline" />
                <span> CRM </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarCrm">
                <ul className="nav-second-level">
                  <li>
                    <a href="crm-dashboard.html">Dashboard</a>
                  </li>
                  <li>
                    <a href="crm-contacts.html">Contacts</a>
                  </li>
                  <li>
                    <a href="crm-opportunities.html">Opportunities</a>
                  </li>
                  <li>
                    <a href="crm-leads.html">Leads</a>
                  </li>
                  <li>
                    <a href="crm-customers.html">Customers</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarEmail" data-toggle="collapse">
                <i className="mdi mdi-email-multiple-outline" />
                <span> Email </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarEmail">
                <ul className="nav-second-level">
                  <li>
                    <a href="email-inbox.html">Inbox</a>
                  </li>
                  <li>
                    <a href="email-read.html">Read Email</a>
                  </li>
                  <li>
                    <a href="email-compose.html">Compose Email</a>
                  </li>
                  <li>
                    <a href="email-templates.html">Email Templates</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="apps-social-feed.html">
                <span className="badge badge-primary float-right">Hot</span>
                <i className="mdi mdi-rss" />
                <span> Social Feed </span>
              </a>
            </li>
            <li>
              <a href="apps-companies.html">
                <i className="mdi mdi-domain" />
                <span> Companies </span>
              </a>
            </li>
            <li>
              <a href="#sidebarProjects" data-toggle="collapse">
                <i className="mdi mdi-briefcase-check-outline" />
                <span> Projects </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarProjects">
                <ul className="nav-second-level">
                  <li>
                    <a href="project-list.html">List</a>
                  </li>
                  <li>
                    <a href="project-detail.html">Detail</a>
                  </li>
                  <li>
                    <a href="project-create.html">Create Project</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarTasks" data-toggle="collapse">
                <i className="mdi mdi-clipboard-multiple-outline" />
                <span> Tasks </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarTasks">
                <ul className="nav-second-level">
                  <li>
                    <a href="task-list.html">List</a>
                  </li>
                  <li>
                    <a href="task-details.html">Details</a>
                  </li>
                  <li>
                    <a href="task-kanban-board.html">Kanban Board</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarContacts" data-toggle="collapse">
                <i className="mdi mdi-book-account-outline" />
                <span> Contacts </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarContacts">
                <ul className="nav-second-level">
                  <li>
                    <a href="contacts-list.html">Members List</a>
                  </li>
                  <li>
                    <a href="contacts-profile.html">Profile</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarTickets" data-toggle="collapse">
                <i className="mdi mdi-lifebuoy" />
                <span> Tickets </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarTickets">
                <ul className="nav-second-level">
                  <li>
                    <a href="tickets-list.html">List</a>
                  </li>
                  <li>
                    <a href="tickets-detail.html">Detail</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="apps-file-manager.html">
                <i className="mdi mdi-folder-star-outline" />
                <span> File Manager </span>
              </a>
            </li>
            <li className="menu-title mt-2">Custom</li>
            <li>
              <a href="#sidebarAuth" data-toggle="collapse">
                <i className="mdi mdi-account-circle-outline" />
                <span> Auth Pages </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarAuth">
                <ul className="nav-second-level">
                  <li>
                    <a href="auth-login.html">Log In</a>
                  </li>
                  <li>
                    <a href="auth-login-2.html">Log In 2</a>
                  </li>
                  <li>
                    <a href="auth-register.html">Register</a>
                  </li>
                  <li>
                    <a href="auth-register-2.html">Register 2</a>
                  </li>
                  <li>
                    <a href="auth-signin-signup.html">Signin - Signup</a>
                  </li>
                  <li>
                    <a href="auth-signin-signup-2.html">Signin - Signup 2</a>
                  </li>
                  <li>
                    <a href="auth-recoverpw.html">Recover Password</a>
                  </li>
                  <li>
                    <a href="auth-recoverpw-2.html">Recover Password 2</a>
                  </li>
                  <li>
                    <a href="auth-lock-screen.html">Lock Screen</a>
                  </li>
                  <li>
                    <a href="auth-lock-screen-2.html">Lock Screen 2</a>
                  </li>
                  <li>
                    <a href="auth-logout.html">Logout</a>
                  </li>
                  <li>
                    <a href="auth-logout-2.html">Logout 2</a>
                  </li>
                  <li>
                    <a href="auth-confirm-mail.html">Confirm Mail</a>
                  </li>
                  <li>
                    <a href="auth-confirm-mail-2.html">Confirm Mail 2</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarExpages" data-toggle="collapse">
                <i className="mdi mdi-text-box-multiple-outline" />
                <span> Extra Pages </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarExpages">
                <ul className="nav-second-level">
                  <li>
                    <a href="pages-starter.html">Starter</a>
                  </li>
                  <li>
                    <a href="pages-timeline.html">Timeline</a>
                  </li>
                  <li>
                    <a href="pages-sitemap.html">Sitemap</a>
                  </li>
                  <li>
                    <a href="pages-invoice.html">Invoice</a>
                  </li>
                  <li>
                    <a href="pages-faqs.html">FAQs</a>
                  </li>
                  <li>
                    <a href="pages-search-results.html">Search Results</a>
                  </li>
                  <li>
                    <a href="pages-pricing.html">Pricing</a>
                  </li>
                  <li>
                    <a href="pages-maintenance.html">Maintenance</a>
                  </li>
                  <li>
                    <a href="pages-coming-soon.html">Coming Soon</a>
                  </li>
                  <li>
                    <a href="pages-gallery.html">Gallery</a>
                  </li>
                  <li>
                    <a href="pages-404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="pages-404-two.html">Error 404 Two</a>
                  </li>
                  <li>
                    <a href="pages-404-alt.html">Error 404-alt</a>
                  </li>
                  <li>
                    <a href="pages-500.html">Error 500</a>
                  </li>
                  <li>
                    <a href="pages-500-two.html">Error 500 Two</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarLayouts" data-toggle="collapse">
                <i className="mdi mdi-cellphone-link" />
                <span className="badge badge-info float-right">New</span>
                <span> Layouts </span>
              </a>
              <div className="collapse" id="sidebarLayouts">
                <ul className="nav-second-level">
                  <li>
                    <a href="layouts-horizontal.html">Horizontal</a>
                  </li>
                  <li>
                    <a href="layouts-detached.html">Detached</a>
                  </li>
                  <li>
                    <a href="layouts-two-column.html">Two Column Menu</a>
                  </li>
                  <li>
                    <a href="layouts-two-tone-icons.html">Two Tones Icons</a>
                  </li>
                  <li>
                    <a href="layouts-preloader.html">Preloader</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-title mt-2">Components</li>
            <li>
              <a href="#sidebarBaseui" data-toggle="collapse">
                <i className="mdi mdi-black-mesa" />
                <span> Base UI </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarBaseui">
                <ul className="nav-second-level">
                  <li>
                    <a href="ui-buttons.html">Buttons</a>
                  </li>
                  <li>
                    <a href="ui-cards.html">Cards</a>
                  </li>
                  <li>
                    <a href="ui-avatars.html">Avatars</a>
                  </li>
                  <li>
                    <a href="ui-portlets.html">Portlets</a>
                  </li>
                  <li>
                    <a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a>
                  </li>
                  <li>
                    <a href="ui-modals.html">Modals</a>
                  </li>
                  <li>
                    <a href="ui-progress.html">Progress</a>
                  </li>
                  <li>
                    <a href="ui-notifications.html">Notifications</a>
                  </li>
                  <li>
                    <a href="ui-spinners.html">Spinners</a>
                  </li>
                  <li>
                    <a href="ui-images.html">Images</a>
                  </li>
                  <li>
                    <a href="ui-carousel.html">Carousel</a>
                  </li>
                  <li>
                    <a href="ui-list-group.html">List Group</a>
                  </li>
                  <li>
                    <a href="ui-video.html">Embed Video</a>
                  </li>
                  <li>
                    <a href="ui-dropdowns.html">Dropdowns</a>
                  </li>
                  <li>
                    <a href="ui-ribbons.html">Ribbons</a>
                  </li>
                  <li>
                    <a href="ui-tooltips-popovers.html">
                      Tooltips &amp; Popovers
                    </a>
                  </li>
                  <li>
                    <a href="ui-general.html">General UI</a>
                  </li>
                  <li>
                    <a href="ui-typography.html">Typography</a>
                  </li>
                  <li>
                    <a href="ui-grid.html">Grid</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarExtendedui" data-toggle="collapse">
                <i className="mdi mdi-layers-outline" />
                <span className="badge badge-primary float-right">Hot</span>
                <span> Extended UI </span>
              </a>
              <div className="collapse" id="sidebarExtendedui">
                <ul className="nav-second-level">
                  <li>
                    <a href="extended-nestable.html">Nestable List</a>
                  </li>
                  <li>
                    <a href="extended-range-slider.html">Range Slider</a>
                  </li>
                  <li>
                    <a href="extended-dragula.html">Dragula</a>
                  </li>
                  <li>
                    <a href="extended-animation.html">Animation</a>
                  </li>
                  <li>
                    <a href="extended-sweet-alert.html">Sweet Alert</a>
                  </li>
                  <li>
                    <a href="extended-tour.html">Tour Page</a>
                  </li>
                  <li>
                    <a href="extended-scrollspy.html">Scrollspy</a>
                  </li>
                  <li>
                    <a href="extended-loading-buttons.html">Loading Buttons</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="widgets.html">
                <i className="mdi mdi-gift-outline" />
                <span> Widgets </span>
              </a>
            </li>
            <li>
              <a href="#sidebarIcons" data-toggle="collapse">
                <i className="mdi mdi-bullseye" />
                <span> Icons </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarIcons">
                <ul className="nav-second-level">
                  <li>
                    <a href="icons-two-tone.html">Two Tone Icons</a>
                  </li>
                  <li>
                    <a href="icons-feather.html">Feather Icons</a>
                  </li>
                  <li>
                    <a href="icons-mdi.html">Material Design Icons</a>
                  </li>
                  <li>
                    <a href="icons-dripicons.html">Dripicons</a>
                  </li>
                  <li>
                    <a href="icons-font-awesome.html">Font Awesome 5</a>
                  </li>
                  <li>
                    <a href="icons-themify.html">Themify</a>
                  </li>
                  <li>
                    <a href="icons-simple-line.html">Simple Line</a>
                  </li>
                  <li>
                    <a href="icons-weather.html">Weather</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarForms" data-toggle="collapse">
                <i className="mdi mdi-bookmark-multiple-outline" />
                <span> Forms </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarForms">
                <ul className="nav-second-level">
                  <li>
                    <a href="forms-elements.html">General Elements</a>
                  </li>
                  <li>
                    <a href="forms-advanced.html">Advanced</a>
                  </li>
                  <li>
                    <a href="forms-validation.html">Validation</a>
                  </li>
                  <li>
                    <a href="forms-pickers.html">Pickers</a>
                  </li>
                  <li>
                    <a href="forms-wizard.html">Wizard</a>
                  </li>
                  <li>
                    <a href="forms-masks.html">Masks</a>
                  </li>
                  <li>
                    <a href="forms-summernote.html">Summernote</a>
                  </li>
                  <li>
                    <a href="forms-quilljs.html">Quilljs Editor</a>
                  </li>
                  <li>
                    <a href="forms-file-uploads.html">File Uploads</a>
                  </li>
                  <li>
                    <a href="forms-x-editable.html">X Editable</a>
                  </li>
                  <li>
                    <a href="forms-image-crop.html">Image Crop</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarTables" data-toggle="collapse">
                <i className="mdi mdi-table" />
                <span> Tables </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarTables">
                <ul className="nav-second-level">
                  <li>
                    <a href="tables-basic.html">Basic Tables</a>
                  </li>
                  <li>
                    <a href="tables-datatables.html">Data Tables</a>
                  </li>
                  <li>
                    <a href="tables-editable.html">Editable Tables</a>
                  </li>
                  <li>
                    <a href="tables-responsive.html">Responsive Tables</a>
                  </li>
                  <li>
                    <a href="tables-footables.html">FooTable</a>
                  </li>
                  <li>
                    <a href="tables-bootstrap.html">Bootstrap Tables</a>
                  </li>
                  <li>
                    <a href="tables-tablesaw.html">Tablesaw Tables</a>
                  </li>
                  <li>
                    <a href="tables-jsgrid.html">JsGrid Tables</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarCharts" data-toggle="collapse">
                <i className="mdi mdi-poll" />
                <span> Charts </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarCharts">
                <ul className="nav-second-level">
                  <li>
                    <a href="charts-apex.html">Apex Charts</a>
                  </li>
                  <li>
                    <a href="charts-flot.html">Flot Charts</a>
                  </li>
                  <li>
                    <a href="charts-morris.html">Morris Charts</a>
                  </li>
                  <li>
                    <a href="charts-chartjs.html">Chartjs Charts</a>
                  </li>
                  <li>
                    <a href="charts-peity.html">Peity Charts</a>
                  </li>
                  <li>
                    <a href="charts-chartist.html">Chartist Charts</a>
                  </li>
                  <li>
                    <a href="charts-c3.html">C3 Charts</a>
                  </li>
                  <li>
                    <a href="charts-sparklines.html">Sparklines Charts</a>
                  </li>
                  <li>
                    <a href="charts-knob.html">Jquery Knob Charts</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#sidebarMaps" data-toggle="collapse">
                <i className="mdi mdi-map-outline" />
                <span> Maps </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMaps">
                <ul className="nav-second-level">
                  <li>
                    <a href="maps-google.html">Google Maps</a>
                  </li>
                  <li>
                    <a href="maps-vector.html">Vector Maps</a>
                  </li>
                  <li>
                    <a href="maps-mapael.html">Mapael Maps</a>
                  </li>
                </ul>
              </div>
            </li> */}
            {/* <li>
              <a href="#sidebarMultilevel" data-toggle="collapse">
                <i className="mdi mdi-share-variant" />
                <span> Multi Level </span>
                <span className="menu-arrow" />
              </a>
              <div className="collapse" id="sidebarMultilevel">
                <ul className="nav-second-level">
                  <li>
                    <a href="#sidebarMultilevel2" data-toggle="collapse">
                      Second Level <span className="menu-arrow" />
                    </a>
                    <div className="collapse" id="sidebarMultilevel2">
                      <ul className="nav-second-level">
                        <li>
                          <a href="#">Item 1</a>
                        </li>
                        <li>
                          <a href="#">Item 2</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="#sidebarMultilevel3" data-toggle="collapse">
                      Third Level <span className="menu-arrow" />
                    </a>
                    <div className="collapse" id="sidebarMultilevel3">
                      <ul className="nav-second-level">
                        <li>
                          <a href="#">Item 1</a>
                        </li>
                        <li>
                          <a href="#sidebarMultilevel4" data-toggle="collapse">
                            Item 2 <span className="menu-arrow" />
                          </a>
                          <div className="collapse" id="sidebarMultilevel4">
                            <ul className="nav-second-level">
                              <li>
                                <a href="#">Item 1</a>
                              </li>
                              <li>
                                <a href="#">Item 2</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li> */}
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
