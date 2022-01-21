import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, ControlLabel } from "rsuite";
import axios from "axios";
import { Grid, Row, Col, InputGroup, Icon, Input, SelectPicker } from "rsuite";
import { Form, FormGroup, FormControl, HelpBlock, Loader } from "rsuite";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../../controllers/api";
import { formatAmount, capitalize } from "../../../controllers/utils";
import { FetchCategoryData } from "../../../controllers/fetchdata";

const ProductListComponent = (props) => {
  let initialFormState = {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [showDrawer, toggleShowDrawer] = useState(false);
  let [loading, setLoading] = useState(false);
  let [formValue, setFormValue] = useState(initialFormState);
  let [productData, setProductData] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let [dataUpdate, setDataUpdate] = useState(false);
  let [categoryData, setCategoryData] = useState(false);
  let token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    "x-auth-token": token,
  };

  const deleterecord = async (id) => {
    let notifier = new AWN();
    if (!id) return notifier.alert("Error. Kindly check internet connection.");
    let onOk = async () => {
      try {
        const config = { headers };
        const res = await API.delete("/api/admin/requests/" + id, config);
        if (!res) return notifier.alert("Error. Kindly check internet connection");
        setRefreshData(!refreshData);
        return notifier.success("Record deleted.");
      } catch (err) {
        console.log(err);
        return notifier.alert("Error. Kindly check internet connection");
      }
    };
    let onCancel = () => {};
    notifier.confirm("Are you sure?", onOk, onCancel);
  };

  const updaterecord = async (id) => {
    let notifier = new AWN();
    if (!id) return notifier.alert("Error. Kindly check internet connection.");
    let onOk = async () => {
      try {
        const config = { headers };
        const res = await API.put("/api/admin/requests/" + id, {}, config);
        if (!res) return notifier.alert("Error. Kindly check internet connection");
        setRefreshData(!refreshData);
        return notifier.success("Request update successful.");
      } catch (err) {
        console.log(err);
        return notifier.alert("Error. Kindly check internet connection");
      }
    };
    let onCancel = () => {};
    notifier.confirm("Are you sure?", onOk, onCancel);
  };

  const fetchrecords = async () => {
    try {
      let token = localStorage.getItem("token");
      const config = { headers };
      const res = await API.get("/api/admin/requests", config);
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
    if (!products) {
      new AWN().alert("Network Error. Kindly check your internet connection", {
        durations: { alert: 0 },
      });
    }
    setProductData(products.requests);
    console.log(products);
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
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Requests</h4>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-sm-5">
                        <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group mb-2 col-sm-12 pl-0">
                            <label htmlFor="inputPassword2" className="sr-only">
                              Search
                            </label>
                            <input type="search" className="form-control col-sm-12" id="myInput" placeholder="Search..." />
                          </div>
                        </form>
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
                            Refresh <i className="mdi mdi-refresh mx-2" />
                          </button>
                        </div>
                      </div>
                      {/* end col*/}
                    </div>
                    <div className="table-responsive">
                      <table className="table table-centered table-nowrap table-hover mb-0">
                        <thead>
                          <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="col-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && productData && productData.length >= 1 ? (
                            productData.map((product, index) => (
                              <>
                                <tr key={index}>
                                  <td className="table-user">
                                    <a href="#" className="text-primary font-weight-semibold">
                                      {capitalize(product.user?.name)}
                                    </a>
                                  </td>
                                  <td>{product.user?.email}</td>
                                  <td className="table-user">
                                    <span className="text-primary font-weight-semibold">
                                      {product.createdAt &&
                                        new Date(product.createdAt).toDateString() +
                                          " " +
                                          new Date(product.createdAt).toLocaleTimeString("en")}
                                    </span>
                                  </td>

                                  <td>
                                    {product.isCompleted ? (
                                      <span className="badge badge-success font-12 py-1 px-2">Completed</span>
                                    ) : (
                                      <span className="badge badge-dark font-12 py-1 px-2">Not Completed</span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      disabled={product.isCompleted}
                                      onClick={() => {
                                        updaterecord(product._id);
                                      }}
                                      className="mx-2 btn-sm btn btn-success"
                                    >
                                      Complete
                                      <i className="mdi mdi-square-edit-outline mx-1" />
                                    </button>

                                    <a
                                      href="#!"
                                      className="mx-2 btn-sm btn btn-danger"
                                      onClick={() => {
                                        deleterecord(product._id);
                                      }}
                                    >
                                      Delete
                                      <i className="mdi mdi-delete mx-1" />
                                    </a>
                                  </td>
                                </tr>
                              </>
                            ))
                          ) : loading && productData && productData.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-5">
                                {" "}
                                <h3> There are no requests yet.</h3>
                                {/* <Loader size="lg" content="Loading" /> */}
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td colSpan={6} className="text-center py-5">
                                <Loader size="lg" content="Loading" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
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
        {/* content */};
      </div>

      <Drawer onClose={onClose} isOpen={isOpen} size="md" placement="right">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton className="mt-1" />
            <DrawerHeader borderBottomWidth="1px">
              {" "}
              {dataUpdate && (
                <span>
                  Update Product <small className="font-weight-bolder text-primary ml-2">{formValue.adminId}</small>
                </span>
              )}
              {!dataUpdate && <span>Add Product</span>}
            </DrawerHeader>
            <DrawerBody>
              <Form
                fluid
                checkTrigger="change"
                formValue={formValue}
                onSubmit={(data) => {
                  console.log(data);
                  console.log({ formValue });
                  updaterecord(formValue._id);
                }}
                onChange={(data) => {
                  console.log({ data });
                  console.log({ formValue });
                  setFormValue({ ...data });
                }}
              >
                <Grid fluid>
                  <Row gutter={10}>
                    {formValue.avatar && (
                      <div className="text-center px-3">
                        <img
                          style={{ height: "10rem", width: "10rem" }}
                          className="img-thumbnail  rounded-circle"
                          src={formValue.avatar && formValue.avatar}
                        />
                      </div>
                    )}
                  </Row>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>
                          Name
                          <HelpBlock tooltip style={{ marginTop: "0px" }}>
                            Required
                          </HelpBlock>
                        </ControlLabel>
                        <FormControl name="name" required />
                      </FormGroup>
                    </Col>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>
                          Price{" "}
                          <HelpBlock tooltip style={{ marginTop: "0px" }}>
                            Required
                          </HelpBlock>
                        </ControlLabel>
                        <InputGroup style={{ width: "100%" }}>
                          <InputGroup.Addon>NGN</InputGroup.Addon>
                          <FormControl name="price" required />
                          <InputGroup.Addon>.00</InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={24}>
                      <FormGroup>
                        <ControlLabel>
                          Description
                          <HelpBlock tooltip style={{ marginTop: "0px" }}>
                            Required
                          </HelpBlock>
                        </ControlLabel>
                        <FormControl rows={4} name="description" required componentClass="textarea" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl
                          name="isEnabled"
                          accepter={SelectPicker}
                          data={[
                            { label: "Enabled", value: true },
                            { label: "Disabled", value: false },
                          ]}
                          placeholder="Select Status"
                          block
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>Category</ControlLabel>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={24}>
                      <FormGroup>
                        <ControlLabel></ControlLabel>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="mb-3"></div>
                  {formValue && formValue.creator && formValue.creator.name && (
                    <Row gutter={10}>
                      <Col xs={12}>
                        <FormGroup>
                          <ControlLabel>Owner Name</ControlLabel>
                          <FormControl value={formValue.creator.name} readOnly />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <ControlLabel>Owner Slug</ControlLabel>
                          <FormControl value={formValue.creator.slug} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}

                  <div className="mb-4"></div>
                  <Row gutter={10}>
                    <Col xs={24}>
                      <FormGroup>
                        <ButtonToolbar>
                          {dataUpdate ? (
                            <button type="submit" className="btn btn-blue waves-effect waves-light mb-2">
                              Update
                            </button>
                          ) : (
                            <button type="submit" className="btn btn-blue waves-effect waves-light mb-2">
                              Add New
                            </button>
                          )}
                        </ButtonToolbar>
                      </FormGroup>
                    </Col>
                  </Row>
                </Grid>
              </Form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  );
};

export default ProductListComponent;
