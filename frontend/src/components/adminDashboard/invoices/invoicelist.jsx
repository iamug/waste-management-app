import React, { useEffect, useState } from "react";
import { DatePicker, ButtonToolbar, ControlLabel } from "rsuite";
import { Grid, Row, Col, InputGroup, Icon, Input, SelectPicker } from "rsuite";
import { Form, FormGroup, FormControl, HelpBlock, Loader } from "rsuite";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../../controllers/api";
import { formatAmount } from "../../../controllers/utils";
import { FetchUsersDataAdmin } from "../../../controllers/fetchdata";

const CategoryListComponent = (props) => {
  let initialFormState = {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [showDrawer, toggleShowDrawer] = useState(false);
  let [loading, setLoading] = useState(false);
  let [formValue, setFormValue] = useState(initialFormState);
  let [users, setUsers] = useState(false);
  let [productData, setProductData] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let [dataUpdate, setDataUpdate] = useState(false);
  let token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    "x-auth-token": token,
  };

  const disablePrevious = (date) => {
    let day = new Date(date).getDay();
    let isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
    let isPreviousYear = new Date().getYear() > new Date(date).getYear();
    let isPrevious = new Date() > new Date(date);
    return isPreviousYear;
  };

  const handleSelectUsers = async () => {
    const data = await FetchUsersDataAdmin();
    // let dataArray = [];
    // if (cat) {
    //   cat.forEach((e) => {
    //     e.isEnabled && (dataArray = [...dataArray, e]);
    //   });
    // }
    setUsers(data.users);
  };

  const deleteadmin = async (id) => {
    let notifier = new AWN();
    if (!id) return notifier.alert("Error. Kindly check internet connection.");
    let onOk = async () => {
      try {
        const config = { headers };
        const res = await API.delete("/api/admin/invoice/" + id, config);
        setRefreshData(!refreshData);
        return notifier.success("Record deleted.");
      } catch (err) {
        return notifier.alert("Error. Kindly check internet connection");
      }
    };
    let onCancel = () => {};
    notifier.confirm("Are you sure?", onOk, onCancel);
  };

  const addadmin = async () => {
    const { user, amount, invoiceDate } = formValue;
    if (!user || !invoiceDate) return new AWN().alert("Kindly fill all fields");
    let body = { user, invoiceDate, amount };
    try {
      const config = { headers };
      const res = await API.post("/api/admin/invoice", body, config);
      setRefreshData(!refreshData);
      toggleShowDrawer(false);
      return new AWN().success("Invoice created successfully ");
    } catch (err) {
      console.log(err);
      new AWN().alert("Failed, Kindly try again");
    }
  };

  const updateadmins = async (id) => {
    const { user, amount, invoiceDate } = formValue;
    if (!user || !invoiceDate) return new AWN().alert("Kindly fill all fields");
    let body = { user, invoiceDate, amount };
    try {
      const config = { headers };
      const res = await API.put("/api/admin/invoice/" + id, body, config);
      setRefreshData(!refreshData);
      toggleShowDrawer(!showDrawer);
      return new AWN().success("Invoice updated successfully ");
    } catch (err) {
      console.log(err);
      new AWN().alert("Failed, Kindly try again");
    }
  };

  const fetchproducts = async () => {
    try {
      const config = { headers };
      const res = await API.get("/api/admin/invoice", config);
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
    handleSelectUsers();
    const products = await fetchproducts();
    if (!products) new AWN().alert("Network Error. Kindly check your internet connection");
    setProductData(products.invoices);
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
                  <h4 className="page-title">Invoices</h4>
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
                            Refresh
                            <i className="mdi mdi-refresh mx-1" />
                          </button>

                          <button
                            type="button"
                            className="btn btn-blue waves-effect waves-light mb-2"
                            data-toggle="modal"
                            data-target="#custom-modal"
                            onClick={() => {
                              setFormValue(initialFormState);
                              setDataUpdate(false);
                              toggleShowDrawer(!showDrawer);
                              onOpen();
                            }}
                          >
                            Add New
                          </button>
                        </div>
                      </div>
                      {/* end col*/}
                    </div>
                    <div className="table-responsive">
                      <table className="table table-centered table-nowrap table-hover mb-0">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Invoice Date</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                            <th style={{ width: 82 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && productData && productData.length >= 1 ? (
                            productData.map((product, index) => (
                              <>
                                <tr key={index}>
                                  <td className="table-user">
                                    <a href="#!" className="text-primary font-weight-semibold">
                                      {product.user?.email}
                                    </a>
                                  </td>
                                  <td>
                                    {" "}
                                    {product.invoiceDate &&
                                      new Date(product.invoiceDate).toLocaleString("en", { year: "numeric", month: "long" })}
                                  </td>
                                  <td>{formatAmount(product.amount)}</td>
                                  <td> {product.paymentDate && new Date(product.paymentDate).toDateString()}</td>
                                  <td>
                                    {product.isPaid ? (
                                      <span className="badge badge-success font-14 py-1 px-2">Paid</span>
                                    ) : (
                                      <span className="badge badge-dark font-14 py-1 px-2">Unpaid</span>
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      onClick={() => {
                                        setFormValue(product);
                                        setDataUpdate(true);
                                        toggleShowDrawer(!showDrawer);
                                        onOpen();
                                      }}
                                      className="action-icon"
                                    >
                                      <i className="mdi mdi-square-edit-outline" />
                                    </a>

                                    <a className="action-icon" onClick={() => deleteadmin(product._id)}>
                                      <i className="mdi mdi-delete" />
                                    </a>
                                  </td>
                                </tr>
                              </>
                            ))
                          ) : loading && productData && productData.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-5">
                                {" "}
                                <h3> There are no invoices.</h3>
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
              {dataUpdate && (
                <span>
                  Update Category <small className="font-weight-bolder text-primary ml-2">{formValue.adminId}</small>
                </span>
              )}
              {!dataUpdate && <span>Add Category</span>}
            </DrawerHeader>
            <DrawerBody>
              <Form
                fluid
                checkTrigger="change"
                formValue={formValue}
                onSubmit={(data) => {
                  console.log(data);
                  console.log({ formValue });
                  dataUpdate ? updateadmins(formValue._id) : addadmin();
                }}
                onChange={(data) => {
                  console.log({ data });
                  console.log({ formValue });
                  setFormValue({ ...data });
                }}
              >
                <Grid fluid>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={24}>
                      <FormGroup>
                        <ControlLabel>
                          User
                          <HelpBlock tooltip style={{ marginTop: "0px" }}>
                            Required
                          </HelpBlock>
                        </ControlLabel>
                        <FormControl
                          name="user"
                          accepter={SelectPicker}
                          data={users}
                          labelKey="email"
                          valueKey="_id"
                          value={formValue.user?._id || formValue.user}
                          disabled={formValue.isPaid}
                          onOpen={handleSelectUsers}
                          onSearch={handleSelectUsers}
                          renderMenu={(menu) => {
                            if (!users) {
                              return (
                                <p
                                  style={{
                                    padding: 4,
                                    color: "#999",
                                    textAlign: "center",
                                  }}
                                >
                                  <Icon icon="spinner" spin />
                                  Loading...
                                </p>
                              );
                            }
                            return menu;
                          }}
                          placeholder="Select User"
                          required
                          block
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="mb-3"></div>
                  <Row gutter={10}>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>Select Month and Year</ControlLabel>
                        <FormControl
                          name="invoiceDate"
                          format="yyyy-MM"
                          ranges={[]}
                          required
                          disabled={formValue.isPaid}
                          disabledDate={(date) => disablePrevious(date)}
                          accepter={DatePicker}
                          format="YYYY-MM"
                          block
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>
                          Amount
                          <HelpBlock tooltip style={{ marginTop: "0px" }}>
                            Required
                          </HelpBlock>
                        </ControlLabel>
                        <FormControl name="amount" type="number" min="1" required disabled={formValue.isPaid} />
                      </FormGroup>
                    </Col>
                  </Row>
                  {dataUpdate && (
                    <>
                      <div className="mb-3"></div>
                      <Row gutter={10}>
                        <Col xs={12}>
                          <FormGroup>
                            <ControlLabel>Status</ControlLabel>
                            <p>
                              {formValue.isPaid ? (
                                <span className="badge badge-success font-14 py-1 px-2">Paid</span>
                              ) : (
                                <span className="badge badge-dark font-14 py-1 px-2">Unpaid</span>
                              )}
                            </p>
                          </FormGroup>
                        </Col>
                        <Col xs={12}>
                          <FormGroup>
                            <ControlLabel>Payment Date</ControlLabel>
                            <FormControl
                              readOnly
                              disabled
                              value={formValue.paymentDate && new Date(formValue.paymentDate).toDateString()}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
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

export default CategoryListComponent;
