import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import API from "../../../controllers/api";
import AWN from "awesome-notifications";
import DataContext, { DataConsumer } from "../../../context/datacontext";
const notifier = new AWN({});

//import "./login.module.css";

const LoginComponent = (props) => {
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [notVerified, setNotVerified] = useState(false);
  const { setUserData } = useContext(DataContext);
  const [showpassword, setshowpassword] = useState(false);

  const validEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) return true;
    return false;
  };

  const onSubmit = async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!email || email === undefined || !validEmail(email))
        return new AWN().alert("Email Address not valid. Kindly enter a valid Email Address.");
      const body = { email, password };
      let res = {};
      //start
      await notifier.async(
        API.post("/api/admin/auth/login", body, config),
        (resp) => {
          res = resp;
          if (res.data.token && res.status == 200) {
            localStorage.setItem("token", res.data.token);
            notifier.success("Login Successful");
            setUserData(res.data.user);
            props.history.push("/admin/dashboard");
          }
        },
        (error) => {
          let err = error;
          new AWN().alert("Login Error. Please try again");
        }
      );
    } catch (err) {
      console.log(err);
      new AWN().alert("Kindly check your internet connection", {
        durations: { success: 2000 },
      });
    }
  };

  useEffect(() => {
    // $("body").css({ "background-color": "#5e5e5e" });
    $("body").css({
      background:
        "linear-gradient( rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) ), url('https://source.unsplash.com/UTw3j_aoIKM/1920x1280') center center / cover fixed",
    });
    //$("body").addClass("authentication-bg authentication-bg-pattern");
    // console.log("enter");
    return () => {
      console.log("unmounted login");
      $("body").css({ "background-color": "unset" });
      $("body").css({ background: "unset" });
    };
  }, []);

  return (
    <div>
      <div className=" account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-md-7 col-lg-5 col-xl-5">
              <div className="card bg-pattern bg-gradient">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    {/* <div className="auth-logo">
                      <a
                        href="index.html"
                        className="logo logo-dark text-center"
                      >
                        <span className="logo-lg">
                          <img
                            src="../assets/images/logo-light.png"
                            alt
                            height={50}
                          />
                        </span>
                      </a>
                      <a className="logo logo-light text-center">
                        <span className="logo-lg">
                          <img
                            src="../assets/images/logo-light.png"
                            alt
                            height={50}
                          />
                        </span>
                      </a>
                    </div> */}
                    <p className="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
                  </div>

                  <form
                    action="#"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <div className="form-group mb-3">
                      <label htmlFor="emailaddress">Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value.trim())}
                        value={email}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showpassword ? "text" : "password"}
                          name="password"
                          onChange={(e) => setPassword(e.target.value.trim())}
                          value={password}
                          required
                          className="form-control"
                          placeholder="Enter your password"
                        />
                        <div
                          className="input-group-append"
                          onClick={() => {
                            setshowpassword(!showpassword);
                          }}
                        >
                          <div className="input-group-text">
                            {showpassword ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="checkbox-signin" defaultChecked />
                        <label className="custom-control-label" htmlFor="checkbox-signin">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-0 text-center">
                      <button className="btn btn-primary btn-block" type="submit" onClick={(e) => {}}>
                        {" "}
                        Log In{" "}
                      </button>
                    </div>
                  </form>
                  <div className="row mt-3">
                    <div className="col-12  row text-center mt-3 d-none">
                      <div className="col-6">
                        <p className="text-dark">
                          {" "}
                          <a
                            onClick={(e) => {
                              props.history.push("/admin/signup");
                            }}
                            className="text-primary ml-1 font-14"
                          >
                            Signup
                          </a>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-dark">
                          {" "}
                          <a
                            onClick={(e) => {
                              props.history.push("/admin/recoverpassword");
                            }}
                            className="text-primary ml-1 font-14"
                          >
                            Forgot password
                          </a>
                        </p>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>{" "}
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end page */}
      <footer className="footer footer-alt">
        <a href className="text-white-50"></a>
      </footer>
    </div>
  );
};

export default LoginComponent;
