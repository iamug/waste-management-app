import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Drawer, ControlLabel } from "rsuite";
import { Grid, Row, Col, InputGroup, Icon, Input, SelectPicker } from "rsuite";
import { Form, FormGroup, FormControl, HelpBlock, Loader } from "rsuite";
import $ from "jquery";
import AWN from "awesome-notifications";
import API from "../../../controllers/api";

const UserListComponent = (props) => {
  let initialFormState = {
    verified: undefined,
    firstName: null,
    lastName: null,
    email: undefined,
    phone: undefined,
    category: undefined,
  };
  let [showDrawer, toggleShowDrawer] = useState(false);
  let [formValue, setFormValue] = useState(initialFormState);
  let [userData, setUserData] = useState([]);
  let [refreshData, setRefreshData] = useState(false);
  let [dataUpdate, setDataUpdate] = useState(false);
  let [loading, setLoading] = useState(false);

  const deleteuser = async (id) => {
    let notifier = new AWN();
    if (id == undefined) {
      notifier.alert("Error. Kindly check internet connection.");
      return;
    }

    let onOk = async () => {
      try {
        let token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };
        const res = await API.delete("/api/admin/users/" + id, config);
        if (!res) {
          notifier.alert("Error. Kindly check internet connection");
          return false;
        }
        if (res.status == 200) {
          notifier.success("Record deleted.");
          setRefreshData(!refreshData);
          return true;
        }
      } catch (err) {
        console.log(err);
        notifier.alert("Error. Kindly check internet connection");
        return false;
      }
    };
    let onCancel = () => {};
    notifier.confirm("Are you sure?", onOk, onCancel);
  };

  const updateuser = async (id) => {
    const { isVerified, name, email, phone, slug } = formValue;
    if (!name || !email) return new AWN().alert("Kindly fill all fields");
    let body = { name, email, phone, slug };
    isVerified !== undefined && (body.isVerified = isVerified);
    phone !== undefined && (body.phone = phone);
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const res = await API.put("/api/admin/users/" + id, body, config);
      if (res.status == 200) {
        new AWN().success("User updated successfully ");
        setRefreshData(!refreshData);
      } else {
        return new AWN().alert("Failed, Kindly try again");
      }
    } catch (err) {
      console.log(err);
      new AWN().alert("Failed, Kindly try again", {
        durations: { alert: 3000 },
      });
    }
  };

  const fetchusers = async () => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const res = await API.get("/api/admin/users", config);
      if (!res) {
        return false;
      }
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
        $("tbody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
    const users = await fetchusers();
    if (!users) {
      new AWN().alert("Network Error. Kindly check your internet connection", {
        durations: { alert: 0 },
      });
    }
    setUserData(users.users);
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
                  <h4 className="page-title">Users</h4>
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
                            className=" btn btn-success waves-effect waves-light mb-2 mr-1"
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>State</th>
                            <th>Joined</th>
                            {/* <th>Status</th> */}
                            <th style={{ width: 82 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && userData && userData.length >= 1 ? (
                            userData.map((user, index) => (
                              <>
                                <tr key={index}>
                                  <td className="table-user">
                                    <a href="#" className="text-primary font-weight-semibold">
                                      {user.name}
                                    </a>
                                  </td>
                                  <td>{user.email}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.state}</td>
                                  <td>{new Date(user.createdAt).toDateString()}</td>
                                  {/* <td>
                                    {user.isActive ? (
                                      <span className="badge badge-success">Active</span>
                                    ) : (
                                      <span className="badge badge-warning">Not Active</span>
                                    )}
                                  </td> */}
                                  <td>
                                    <a
                                      onClick={() => {
                                        console.log(user);
                                        setFormValue(user);
                                        setDataUpdate(true);
                                        toggleShowDrawer(!showDrawer);
                                      }}
                                      className="action-icon"
                                    >
                                      {" "}
                                      <i className="mdi mdi-square-edit-outline" />
                                    </a>

                                    <a
                                      className="action-icon"
                                      onClick={() => {
                                        deleteuser(user._id);
                                      }}
                                    >
                                      {" "}
                                      <i className="mdi mdi-delete" />
                                    </a>
                                  </td>
                                </tr>
                              </>
                            ))
                          ) : loading && userData && userData.length === 0 && loading ? (
                            <tr>
                              <td colSpan={7} className="text-center py-5">
                                <h3> There are no Users</h3>
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td colSpan={7} className="text-center py-5">
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
      <Drawer
        backdrop={showDrawer}
        show={showDrawer}
        size="sm"
        onHide={() => {
          toggleShowDrawer(!showDrawer);
        }}
      >
        <Drawer.Header>
          <Drawer.Title>
            {dataUpdate && (
              <span>
                Update User <small className="font-weight-bolder text-primary ml-2">{formValue.adminId}</small>
              </span>
            )}
            {!dataUpdate && <span>Add User</span>}
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            fluid
            checkTrigger="change"
            formValue={formValue}
            onSubmit={(data) => {
              console.log(data);
              console.log({ formValue });
              dataUpdate && updateuser(formValue._id);
            }}
            onChange={(data) => {
              setFormValue({ ...data });
            }}
          >
            <Grid fluid>
              <Row gutter={10}>
                {formValue.imgUrl && (
                  <div className="text-center px-3">
                    <img
                      style={{ height: "10rem", width: "10rem" }}
                      className="img-thumbnail  rounded-circle"
                      src={formValue.imgUrl && formValue.imgUrl}
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
                    <ControlLabel>State</ControlLabel>
                    <FormControl name="state" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div>
              <Row gutter={10}>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Email Address
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="email" type="email" required />
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Phone Number
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="phone" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div>

              {/* <Row gutter={10}>
                <Col xs={12}>
                  <FormGroup>
                    <FormControl
                      name="isActive"
                      accepter={SelectPicker}
                      data={[
                        { label: "Active", value: true },
                        { label: "Disabled", value: false },
                      ]}
                      placeholder="Select Status"
                      block
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div> */}
              <Row gutter={10}>
                <Col xs={24}>
                  <FormGroup>
                    <ControlLabel>
                      Address
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl rows={4} name="address" required componentClass="textarea" />
                  </FormGroup>
                </Col>
              </Row>

              <div className="mb-4"></div>
              <Row gutter={10}>
                <Col xs={24}>
                  <FormGroup>
                    <ButtonToolbar>
                      {dataUpdate ? (
                        <Button
                          onClick={() => {
                            //updateuser(formValue.userId);
                          }}
                          appearance="primary"
                          type="submit"
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            //adduser();
                          }}
                          appearance="primary"
                          type="submit"
                        >
                          Add New
                        </Button>
                      )}
                    </ButtonToolbar>
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Button
            onClick={() => {
              toggleShowDrawer(!showDrawer);
            }}
            appearance="subtle"
          >
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </React.Fragment>
  );
};

export default UserListComponent;
