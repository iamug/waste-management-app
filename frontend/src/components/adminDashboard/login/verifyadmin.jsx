import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import API from "../../../controllers/api";
import AWN from "awesome-notifications";
import DataContext, { DataConsumer } from "../../../context/datacontext";
const notifier = new AWN({});

//import "./login.module.css";

const VerifyAdminComponent = (props) => {
  let [verified, setVerified] = useState(false);
  let [loading, setLoading] = useState(false);

  const verify = async () => {
    const { signupToken } = props.match.params;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {};
      const res = await API.put(
        "/api/admin/auth/signupverify/" + signupToken,
        body,
        config
      );
      if (res.status === 404) {
        console.log("failed");
        return false;
      }
      setVerified(true);
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    //$("body").addClass("authentication-bg authentication-bg-pattern");
    $("body").css({ "background-color": "#5e5e5e" });

    await verify();
    setLoading(true);

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
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-pattern">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-logo">
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
                    </div>
                    <p className="text-muted mb-4 mt-5"></p>
                  </div>
                  <div>
                    <h3 className="text-center">
                      {verified && loading ? (
                        <p className="text-success">
                          {" "}
                          Verification Successful{" "}
                        </p>
                      ) : loading && !verified ? (
                        <p className="text-danger"> Verification Failed </p>
                      ) : (
                        <p className="text-info"> Please wait...</p>
                      )}
                    </h3>
                  </div>
                  <div className="mt-3 text-center">
                    {verified && loading ? (
                      <p className="text-success h5">
                        Signup verification successful. You will be redirected
                        to login shortly.
                      </p>
                    ) : loading && !verified ? (
                      <p className="text-danger h5">
                        Signup verification failed. Invalid Token.
                      </p>
                    ) : (
                      <p></p>
                    )}
                    <p className="mt-4">
                      {loading ? (
                        <a href="/admin/login" className=" btn btn-primary">
                          <b>Go to Login</b>
                        </a>
                      ) : (
                        <span></span>
                      )}
                    </p>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 text-center mt-3">
                      <p className="text-dark"> </p>
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

export default VerifyAdminComponent;
