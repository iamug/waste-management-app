import React, { useState, useEffect, useMemo } from "react";
import "./styles/notification/shared-awesome.scss";
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import DataContext from "./context/datacontext";
import AdminDashboard from "./components/adminDashboard/home";
import UserDashboard from "./components/userDashboard/home";

function App() {
  let [userdata, setUserData] = useState(false);
  let providerValue = useMemo(() => ({ userdata, setUserData }), [userdata, setUserData]);

  return (
    <DataContext.Provider value={providerValue}>
      <Router>
        <Switch>
          {/* <Route path="/user/login" exact component={LoginComponent} />
          <Route path="/signup" exact component={SignupComponent} />
          <Route path="/menu" exact component={withRouter(MenuComponent)} />
          <Route path="/" exact component={LoginComponent} /> */}

          <Route path="/user/" component={withRouter(UserDashboard)} />
          <Route path="/admin/" component={withRouter(AdminDashboard)} />
          {/* <Route path="/menu" exact component={withRouter(UserComponent)} />
          <Route path="/menu/:id/:tablename?" exact component={withRouter(MenuComponent)} /> */}
          <Redirect to="/user" />
        </Switch>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
