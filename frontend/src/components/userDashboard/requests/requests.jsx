import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, ControlLabel } from "rsuite";
import { Grid, Row, Col, TagPicker, Icon, Input, SelectPicker } from "rsuite";
import { Form, FormGroup, FormControl, HelpBlock, Loader } from "rsuite";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../../controllers/api";

const RequestListComponent = (props) => {
  let initialFormState = {};
  let [loading, setLoading] = useState(false);
  let [formValue, setFormValue] = useState(initialFormState);
  let [productData, setProductData] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    "x-auth-token": token,
  };
  let notifier = new AWN();

  const addrecord = async () => {
    let onOk = async () => {
      try {
        const config = { headers };
        const res = await API.post("/api/user/requests", {}, config);
        if (!res) return notifier.alert("Error. Kindly check internet connection");
        setRefreshData(!refreshData);
        return notifier.success("Request successful.");
      } catch (err) {
        console.log(err);
        return notifier.alert("Error. Kindly check internet connection");
      }
    };
    let onCancel = () => {};
    notifier.confirm("Are you sure?", onOk, onCancel);
  };

  // const addrecord = async () => {
  //   const { name, imageUrl, description, tableCategory } = formValue;
  //   const { isEnabled, productCategory } = formValue;
  //   if (!name || !imageUrl || !description || !productCategory) {
  //     notifier.alert("Kindly fill all fields");
  //     return false;
  //   }
  //   let body = { name, imageUrl, description, productCategory };
  //   tableCategory !== undefined && (body.tableCategory = tableCategory);
  //   isEnabled && (body.isEnabled = isEnabled);
  //   try {
  //     const config = { headers };
  //     const res = await API.post("/api/user/requests", body, config);
  //     if (res.status == 201) {
  //       notifier.success("Record added successfully.");
  //       setRefreshData(!refreshData);
  //     } else {
  //       notifier.alert("Failed, Kindly try again");
  //     }
  //   } catch (err) {
  //     notifier.alert("Failed, Kindly try again");
  //   }
  // };

  const fetchrecords = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/user/requests", config);
      if (!res) return false;
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(async () => {
    $(document).ready(function () {
      $("#myInput").on("input", function () {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $("tbody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
    const products = await fetchrecords();
    if (!products) notifier.alert("Network Error. Kindly check your internet connection");
    setProductData(products.requests);
    setLoading(true);
  }, [refreshData]);

  return (
    <React.Fragment>
      <div>
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12"></div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow-lg mt-3">
                  <div className="card-body">
                    <div className="row align-items-center mb-2">
                      <div className="col-sm-5">
                        <div className="page-title-box">
                          <h4 className="page-title">Requests</h4>
                        </div>
                        {/* <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group mb-2 col-sm-12 pl-0">
                            <label htmlFor="inputPassword2" className="sr-only">
                              Search
                            </label>
                            <input type="search" className="form-control col-sm-12" id="myInput" placeholder="Search..." />
                          </div>
                        </form> */}
                      </div>
                      <div className="col-sm-7">
                        <div className="text-sm-right">
                          <button
                            type="button"
                            onClick={() => {
                              setLoading(false);
                              setRefreshData(!refreshData);
                            }}
                            className="btn btn-success waves-effect waves-light mb-2 mr-1"
                          >
                            Refresh <i className="ml-2 mdi mdi-refresh" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-blue waves-effect waves-light mb-2"
                            data-toggle="modal"
                            data-target="#custom-modal"
                            onClick={() => {
                              // setFormValue(initialFormState);
                              // setDataUpdate(false);
                              // toggleShowDrawer(!showDrawer);
                              // onOpen();
                              addrecord();
                            }}
                          >
                            Make Request
                          </button>
                        </div>
                      </div>
                      {/* end col*/}
                    </div>
                    {!loading && (
                      <div className="my-5 py-5">
                        <div className="col-12 text-center">
                          <Loader size="lg" content="Loading" />
                        </div>
                      </div>
                    )}
                    {loading && productData && productData.length === 0 && (
                      <div className="my-5 py-5">
                        <div className="col-12 text-center">
                          <h2 className="fw-light">You have not made any requests.</h2>
                        </div>
                      </div>
                    )}
                    {loading && productData && productData.length > 0 && (
                      <div className="table-responsive">
                        <table className="table table-centered table-nowrap  table-hover mb-0">
                          <thead>
                            <tr>
                              <th className="border-top-0">Date</th>
                              <th className="border-top-0">Status</th>
                              {/* <th style={{ width: 82 }}>Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {productData.map((product, index) => (
                              <>
                                <tr key={index}>
                                  <td className="table-user">
                                    <span className="text-primary font-weight-semibold">
                                      {product.createdAt &&
                                        new Date(product.createdAt).toDateString() + " " + new Date().toLocaleTimeString("en")}
                                    </span>
                                  </td>

                                  <td>
                                    {product.isCompleted ? (
                                      <span className="badge badge-success">Completed</span>
                                    ) : (
                                      <span className="badge badge-danger font-12 py-2 px-1 rounded-3 ">Not Completed</span>
                                    )}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>{" "}
                  {/* end card-body*/}
                </div>{" "}
                {/* end card*/}
              </div>{" "}
              {/* end col */}
            </div>
            {/* end row */}
          </div>{" "}
          {/* container */}
        </div>{" "}
        {/* content */}
      </div>
    </React.Fragment>
  );
};

export default RequestListComponent;
