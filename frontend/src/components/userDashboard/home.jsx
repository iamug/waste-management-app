import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Loader } from "rsuite";
import { Spinner } from "@chakra-ui/react";

import DataContext, { DataProvider } from "../../context/datacontext";
import { GetUserData, PrivateRoute } from "../../controllers/auth";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";

// import Error404Component from "../../components/404";
import VerifyAdminComponent from "./login/verifyadmin";
import RecoverPasswordComponent from "./resetpassword/recoverpassword";
import ResetPasswordComponent from "./resetpassword/resetpassword";
import ProfileComponent from "./profile/profile";
import DashboardComponent from "./dashboard/dashboard";
import RequestListComponent from "./requests/requests";
import OrderListComponent from "./invoice/invoicelist";
import Error404Component from "../404";
import LeftSideMenuComponent from "./LeftSideMenu";
import TopbarMenuComponent from "./TopBarMenu";

//import UserDashboard from "../../components/adminDashboard/home";

function UserDashboard() {
  let [userdata, setUserData] = useState(false);
  let [loading, setLoading] = useState(false);
  let providerValue = useMemo(() => ({ userdata, setUserData }), [userdata, setUserData]);

  useEffect(async () => {
    let data;
    try {
      data = await GetUserData();
    } catch (error) {
      data = false;
    }
    console.log({ data });
    if (data && data.email) {
      if (window.location.pathname === "/user/login") {
        window.location.href = "/user/dashboard";
      }
    }
    if (!data) {
      if (window.location.pathname === "/user/login") {
        setLoading(true);
        return false;
      } else {
        if (
          window.location.pathname &&
          (window.location.pathname.includes("/resetpassword") || window.location.pathname.includes("/verify"))
        ) {
          setLoading(true);
          return false;
        }
        //window.location.href = "/login";
      }
    }
    setUserData(data);
    setLoading(true);
  }, []);

  return loading ? (
    <DataContext.Provider value={providerValue}>
      <Router>
        <Switch>
          <Route path="/user/login" exact component={LoginComponent} />
          <Route path="/user/signup" exact component={SignupComponent} />
          {/* <Route path="/menu" exact component={withRouter(MenuComponent)} /> */}
          {/* <Route path="/" exact component={LoginComponent} /> */}
          <Route path="/user/recoverpassword" exact component={RecoverPasswordComponent} />
          <Route path="/user/resetpassword" exact component={withRouter(ResetPasswordComponent)} />
          <Route path="/user/resetpassword:resetToken" exact component={withRouter(ResetPasswordComponent)} />
          <Route path="/user/verify:signupToken" exact component={withRouter(VerifyAdminComponent)} />

          {loading && userdata ? (
            <React.Fragment>
              <TopbarMenuComponent />
              <div className="left-side-menu" id="left-side-menu">
                <LeftSideMenuComponent />
              </div>
              <div className="content-page">
                <Switch>
                  <Route path="/user/dashboard" exact render={(props) => <DashboardComponent {...props} />} />
                  <Route path="/user/profile" exact component={ProfileComponent} />

                  <Route path="/user/requests" exact component={RequestListComponent} />

                  <Route path="/user/orders" exact component={OrderListComponent} />

                  {/* <Route path="/user/tablecategory" exact component={TableCategoryListComponent} /> */}

                  <Route path="/404" component={Error404Component} />
                  <Route component={Error404Component} />
                </Switch>
              </div>
            </React.Fragment>
          ) : (
            <Redirect to="/user/login" />
          )}
        </Switch>
      </Router>
    </DataContext.Provider>
  ) : (
    <>
      <div className=" my-5 py-5 text-center  h-100">
        <div className=" my-5 py-5 text-center  h-100">
          <Spinner size="xl" />
          {/* <Loader size="lg" content="Loading..." vertical="true" /> */}
          {/* <div className="text-center py-5">
            <div
              class="spinner-border avatar-lg text-primary m-2"
              role="status"
            ></div>
            <h4> Loading...</h4>
          </div> */}
        </div>
      </div>
    </>
  );
}

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ProfileComponent from "./profile/profile";
// import DashboardComponent from "./dashboard/dashboard";
// import AdminListComponent from "./admins/adminlist";
// import ProductListComponent from "./products/productlist";
// import CategoryListComponent from "./Category/categorylist";
// import Error404Component from "../404";
// import LeftSideMenuComponent from "./LeftSideMenu";
// import TopbarMenuComponent from "./TopBarMenu";

// const UserDashboard = () => (
//   <React.Fragment>
//     <TopbarMenuComponent />
//     <div className="left-side-menu" id="left-side-menu">
//       <LeftSideMenuComponent />
//     </div>
//     <div className="content-page">
//       <Switch>
//         <Route
//           path="/dashboard"
//           exact
//           render={(props) => <DashboardComponent {...props} />}
//         />
//         <Route path="/profile" exact component={ProfileComponent} />
//         <Route path="/admins" exact component={AdminListComponent} />
//         <Route path="/products" exact component={ProductListComponent} />
//         <Route path="/category" exact component={CategoryListComponent} />
//         <Route path="/404" component={Error404Component} />
//         <Route component={Error404Component} />
//       </Switch>
//     </div>
//   </React.Fragment>
// );

export default UserDashboard;
