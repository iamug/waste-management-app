import React, { useEffect, useState } from "react";
import $ from "jquery";
import API from "../../../controllers/api";
import AWN from "awesome-notifications";
const globalOptions = {};
const notifier = new AWN(globalOptions);
//import "./login.module.css";

const ResetPasswordComponent = (props) => {
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [password2, setPassword2] = useState(null);
  const [showpassword, setshowpassword] = useState(false);
  const [showpassword2, setshowpassword2] = useState(false);

  const onSubmit = async () => {
    const { resetToken } = props.match.params;
    if (password !== password2) {
      //console.log("passwords do not match");
      new AWN().alert("Passwords do not match", {
        durations: { alert: 4000 },
      });
      return false;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { password };
      let res = {};
      //start
      await notifier.async(
        API.put("/api/admin/auth/resetpassword/" + resetToken, body, config),
        (resp) => {
          res = resp;
          if (res.data.status && res.status == 200) {
            notifier.success(
              "Password reset Successful. Kindly login with email address and new password",
              {
                durations: { success: 4000 },
              }
            );
            setTimeout(() => {
              props.history.push("/admin/login");
            }, 6000);
          }
        },
        (error) => {
          //console.log(error);
          //console.log("error");
          let err = error;
          //console.log(err.response);
          ////console.log(err.response.data);
          if (err.response.data.errors) {
            new AWN().alert(
              err.response.data.errors["0"].msg + " Please try again",
              {
                durations: { alert: 4000 },
              }
            );
          } else {
            new AWN().alert("Reset Password Error. Please try again", {
              durations: { alert: 4000 },
            });
          }
        }
      );
    } catch (err) {
      //console.log(err);
      new AWN().alert("Kindly check your internet connection", {
        durations: { success: 3000 },
      });
    }
  };

  useEffect(() => {
    $("body").css({ "background-color": "#5e5e5e" });
    //$("body").addClass("authentication-bg authentication-bg-pattern");
    // console.log("enter");
    return () => {
      console.log("unmounted login");
      $("body").css({ "background-color": "unset" });
    };
  }, []);

  return (
    <div>
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-5">
              <div className="card bg-pattern">
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
                      <a
                        href="index.html"
                        className="logo logo-light text-center"
                      >
                        <span className="logo-lg">
                          <img
                            src="../assets/images/logo-light.png"
                            alt
                            height={50}
                          />
                        </span>
                      </a>
                    </div> */}
                    <p className="text-muted mb-4 mt-3">
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </p>
                  </div>
                  <form action="#">
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showpassword ? "text" : "password"}
                          name="password"
                          id="password"
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
                            {showpassword ? (
                              <i className="fas fa-eye" />
                            ) : (
                              <i className="fas fa-eye-slash" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Confirm Password</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showpassword2 ? "text" : "password"}
                          name="password2"
                          id="password"
                          required
                          onChange={(e) => setPassword2(e.target.value.trim())}
                          value={password2}
                          className="form-control"
                          placeholder="Confirm your password"
                        />
                        <div
                          className="input-group-append"
                          onClick={() => {
                            setshowpassword2(!showpassword2);
                          }}
                        >
                          <div className="input-group-text">
                            {showpassword2 ? (
                              <i className="fas fa-eye" />
                            ) : (
                              <i className="fas fa-eye-slash" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-0 text-center">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmit();
                        }}
                      >
                        {" "}
                        Reset Password{" "}
                      </button>
                    </div>
                  </form>
                  <div className="row mt-3">
                    <div className="col-12 text-center mt-3">
                      <p className="text-dark">
                        Back to{" "}
                        <a
                          onClick={(e) => {
                            props.history.push("/admin/login");
                          }}
                          className="text-primary ml-1 font-14"
                        >
                          <b>Log in</b>
                        </a>
                      </p>
                    </div>{" "}
                    {/* end col */}
                  </div>
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
      ;
    </div>
  );
};

export default ResetPasswordComponent;
