import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
//import "./login.module.css";

const NotPermittedComponent = (props) => {
  useEffect(() => {
    //$(".left-side-menu").hide();
    //$(".navbar-custom").hide();
    //$(".content-page").css("margin-left", "auto");
  }, []);

  return (
    <div className="content">
      {/* Start Content*/}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-4 mb-4 mt-5 pt-5">
            <div className="text-center">
              <div class="text-error">
                <span class="text-primary px-1">4</span>
                <i class="ti-face-sad text-pink"></i>
                <span class="text-info px-1 font-">3</span>
              </div>
              <h3 className="mt-2 mb-2">Whoops! You dont have permission for this page. </h3>
              <p className="text-muted mb-3">
                It's looking like you may have taken a wrong turn. Don't
                worry... it happens to the best of us. You might want to check
                your internet connection. Here's a little tip that might help
                you get back on track.
              </p>
              <a
                href="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  //props.history.push("/dashboard");
                  window.location.href = "/dashboard";
                }}
                className="btn btn-success waves-effect waves-light"
              >
                Back to Dashboard
              </a>
            </div>
            {/* end row */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
      </div>{" "}
      {/* container */}
    </div>
  );
};

export default withRouter(NotPermittedComponent);
