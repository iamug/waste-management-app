import API from "./api";
import React, { Component } from "react";
import NotPermittedComponent from "../components/notpermitted";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AWN from "awesome-notifications";

export const Reload = async (setUser, toast = true) => {
  if (toast) {
    new AWN().info("Please wait....", {
      durations: { info: 0 },
      icons: { info: "sync fa-spin" },
    });
  }
  let data;
  try {
    data = await GetUserData();
  } catch (error) {
    data = false;
  }
  if (data && data.email) {
    setUser(data);
    if (!toast) return;
    new AWN().closeToasts();
    new AWN().success("Reload Successful", { durations: { success: 2000 } });
  } else {
    return <Redirect to="/login" />;
  }
};

export const AdminReload = async (setUser, toast = true) => {
  if (toast) {
    new AWN().info("Please wait....", {
      durations: { info: 0 },
      icons: { info: "sync fa-spin" },
    });
  }
  let data;
  try {
    data = await GetAdminData();
  } catch (error) {
    data = false;
  }
  if (data && data.email) {
    setUser(data);
    if (!toast) return;
    new AWN().closeToasts();
    new AWN().success("Reload Successful", { durations: { success: 2000 } });
  } else {
    return <Redirect to="/login" />;
  }
};

export async function GetUserData() {
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    if (token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const res = await API.get("/api/user/auth", config);
      if (res.status == 401) {
        //window.location.href = "/login";
        return false;
      }
      return res.data;
    }
  } catch (err) {
    console.log("error auth", err);
  }
}

export async function GetAdminData() {
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    if (token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const res = await API.get("/api/admin/auth", config);
      if (res.status == 401) {
        //window.location.href = "/login";
        return false;
      }
      return res.data;
    }
  } catch (err) {
    console.log("error auth", err);
  }
}

export const hasPermission = {
  read: (data) => {
    if ((data && data.superAdmin) || (data && data.read)) return true;
    return false;
  },
  create: (data) => {
    if ((data && data.superAdmin) || (data && data.create)) return true;
    return false;
  },
  update: (data) => {
    if ((data && data.superAdmin) || (data && data.update)) return true;
    return false;
  },
  delete: (data) => {
    if ((data && data.superAdmin) || (data && data.delete)) return true;
    return false;
  },
};

export const hasModulePermission = {
  read: (data, module) => {
    if ((data && data.superAdmin) || (data && data[module] && data[module].read)) return true;
    return false;
  },
  create: (data, module) => {
    if ((data && data.superAdmin) || (data && data[module] && data[module].create)) return true;
    return false;
  },
  update: (data, module) => {
    if ((data && data.superAdmin) || (data && data[module] && data[module].update)) return true;
    return false;
  },
  delete: (data, module) => {
    if ((data && data.superAdmin) || (data && data[module] && data[module].delete)) return true;
    return false;
  },
};

const hasReadPermission = (module, permissions, superAdmin = false) => {
  let token = localStorage.getItem("token");
  if (!token || token === undefined) window.location.href = "/login";
  if (superAdmin || (permissions && permissions[module] && permissions[module].read)) {
    return true;
  } else {
    return false;
  }
};

//export const checkPermission
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

export const PrivateRoute = ({ component: Component, module, permissions, superAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasReadPermission(module, permissions, superAdmin) === true ? (
          <Component
            {...props}
            permissions={{
              ...(permissions[module] || {}),
              superAdmin: superAdmin,
            }}
          />
        ) : (
          <NotPermittedComponent />
        )
      }
    />
  );
};

export const LogoutUser = () => {
  new AWN().success("Logout Successful", { durations: { success: 2000 } });
  localStorage.removeItem("token");
  window.location.href = "./login";
};

//export default { GetUserData, LogoutUser };
