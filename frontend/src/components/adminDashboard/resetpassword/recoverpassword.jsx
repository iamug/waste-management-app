import React, { useEffect, useState } from "react";
import $ from "jquery";
import API from "../../../controllers/api";
import AWN from "awesome-notifications";
const globalOptions = {};
const notifier = new AWN(globalOptions);
//import "./login.module.css";

const RecoverPasswordComponent = (props) => {
  let [email, setEmail] = useState(null);

  const onSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { email };
      let res = {};
      //start
      await notifier.async(
        API.post("/api/admin/auth/forgotpassword", body, config),
        (resp) => {
          res = resp;
          if (res.data.msg_sent && res.status == 200) {
            notifier.success(
              "Email Sent Successfully. Kindly check your inbox for password reset instructions.",
              {
                durations: { success: 0 },
              }
            );
          }
        },
        (error) => {
          let err = error;
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
                    <div className="form-group mb-0 text-center">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {" "}
                        Recover Password{" "}
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

export default RecoverPasswordComponent;
