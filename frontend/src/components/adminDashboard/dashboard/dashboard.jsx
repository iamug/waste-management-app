import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Button, ButtonToolbar, Paragraph } from "rsuite";
import { Loader } from "rsuite";
import { Table } from "rsuite";
import API from "../../../controllers/api";
import { Notification } from "rsuite";
import AWN from "awesome-notifications";
import DataContext, { DataConsumer } from "../../../context/datacontext";

const DashboardComponent = (props) => {
  let [totalSummary, setTotalSummary] = useState(false);
  let [recentRequests, setRecentRequests] = useState(false);
  let [loading, setLoading] = useState(false);
  let [refreshData, setRefreshData] = useState(false);
  const { userdata } = useContext(DataContext);
  let token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    "x-auth-token": token,
  };

  const fetchrecentrequests = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/admin/dashboard/recentrequests", config);
      if (!res) return false;
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const fetchtotalsummary = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/admin/dashboard/totalsummary", config);
      if (!res) return false;
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(async () => {
    console.log({ userdata });
    //$("body").addClass("authentication-bg authentication-bg-pattern");
    //$("body").removeClass("authentication-bg authentication-bg-pattern");
    //console.log("enter");
    const total = await fetchtotalsummary();
    const requests = await fetchrecentrequests();
    if (!total || !requests) new AWN().alert("Network Error. Kindly check your internet connection");
    setTotalSummary(total);
    setRecentRequests(requests);
    setLoading(true);
  }, [userdata, refreshData]);

  return (
    <React.Fragment>
      <div>
        {loading ? (
          <div className="content">
            {/* Start Content*/}
            <div className="container-fluid">
              {/* start page title */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <div className="page-title-right">
                      <form className="form-inline">
                        <a
                          onClick={() => {
                            setLoading(false);
                            setRefreshData(!refreshData);
                          }}
                          className="btn btn-default btn-md ml-2 text-white"
                        >
                          <i className="mdi mdi-autorenew" />
                        </a>
                      </form>
                    </div>
                    <h4 className="page-title">Dashboard</h4>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-md-3 col-xl-3">
                  <div className="widget-rounded-circle card-box shadow">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-info border-info border">
                          <i className="d-flex fas fa-users font-22 avatar-title text-info" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="mt-1">
                            <span data-plugin="counterup">{totalSummary?.users}</span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">Total Users</p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end row*/}
                  </div>{" "}
                  {/* end widget-rounded-circle*/}
                </div>
                {/* end col*/}
                <div className="col-md-3 col-xl-3">
                  <div className="widget-rounded-circle card-box shadow">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border-primary border">
                          <i className="d-flex fas fa-user-shield font-22 avatar-title text-primary" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">{totalSummary?.admins}</span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">Total Admins</p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end row*/}
                  </div>{" "}
                  {/* end widget-rounded-circle*/}
                </div>

                {/* end col*/}
                <div className="col-md-3 col-xl-3">
                  <div className="widget-rounded-circle card-box shadow">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-info border-info border">
                          <i className=" d-flex fas fa-tag font-22 avatar-title text-info" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">{totalSummary?.requests}</span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">Total Requests</p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end row*/}
                  </div>{" "}
                  {/* end widget-rounded-circle*/}
                </div>
                {/* end col*/}
                <div className="col-md-3 col-xl-3">
                  <div className="widget-rounded-circle card-box shadow">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-lg rounded-circle bg-soft-primary border-primary border">
                          <i className="d-flex fas fa-receipt font-22 avatar-title text-primary" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-right">
                          <h3 className="text-dark mt-1">
                            <span data-plugin="counterup">{totalSummary?.invoices}</span>
                          </h3>
                          <p className="text-muted mb-1 text-truncate">Total Invoices</p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end row*/}
                  </div>{" "}
                  {/* end widget-rounded-circle*/}
                </div>
                {/* end col*/}
              </div>
              {/* end row*/}
              {/* end row */}
              <div className="row ">
                <div className="col-12">
                  <div className="card-box h-100 shadow">
                    <div className="float-left">
                      <h4 className="header-title mb-3">Recent Request</h4>
                    </div>
                    <div className="float-right">
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          props.history.push("requests");
                        }}
                        className="btn btn-primary btn-md"
                      >
                        View more
                      </a>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-borderless table-hover table-nowrap table-centered m-0">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>State</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && recentRequests && recentRequests.length > 0 ? (
                            recentRequests.map((booking, index) => (
                              <tr key={index}>
                                <td>{new Date(booking.createdAt).toDateString()}</td>
                                <td>{booking.user?.name}</td>
                                <td>{booking.user?.email}</td>
                                <td>{booking.user?.state}</td>
                                <td>
                                  {booking.isPaid ? (
                                    <span className="badge bg-soft-success text-success">Paid</span>
                                  ) : (
                                    <span className="badge bg-soft-dark text-dark">Unpaid</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="text-center py-3">
                                <div className="text-center my-3 h-100">
                                  <h4> No Requests. </h4>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>{" "}
                    {/* end .table-responsive  */}
                  </div>{" "}
                  {/* end card-box  */}
                </div>{" "}
                {/* end col  */}
              </div>
            </div>
            {/* end row */}
          </div>
        ) : (
          /* content */
          <div className="text-center py-5 my-5 h-100">
            <div className="spinner-border avatar-lg text-primary m-2" role="status"></div>
            <h4> Loading...</h4>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DashboardComponent;
