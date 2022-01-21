import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Drawer, Placeholder } from "rsuite";
import { Grid, Row, Col, InputGroup, Icon, Input, Modal } from "rsuite";
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from "rsuite";
import { fakeData } from "../../data/fakeData";
import $ from "jquery";
import AWN from "awesome-notifications";
const { Paragraph } = Placeholder;

const UserListComponent = () => {
  let initialFormState = {
    lastName: "",
    firstName: "",
    name: "",
    email: "",
    password: "",
  };
  let [showDrawer, toggleShowDrawer] = useState(false);
  let [showEditModal, toggleShowEditModal] = useState(false);
  let [formValue, setFormValue] = useState(initialFormState);
  let [fakedata, setFakeData] = useState([]);
  let [dataUpdate, setDataUpdate] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [showpassword2, setshowpassword2] = useState(false);

  const deleteorders = async (id) => {
    let notifier = new AWN();
    console.log(id);
    if (!id) {
      notifier.alert("Error. Kindly check internet connection.");
    }

    let onOk = async () => {
      try {
        //let token = localStorage.getItem("token");
        // const config = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "x-auth-token": token,
        //   },
        // };
        const body = { id };
        const res =
          "hello"; /*await API.post("/api/orders/delete", body, config);*/
        if (!res) {
          notifier.alert("Error. Kindly check internet connection");
          return false;
        }
        if (res.status == 200) {
          notifier.success("Record deleted.");
          window.location.reload();
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

  useEffect(() => {
    setFakeData(fakeData);
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $("tbody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }, []);

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
                  <h4 className="page-title">
                    Users {formValue.name ? formValue.name : "None"}
                  </h4>
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
                        <form className="form-inline">
                          <div className="form-group mb-2 col-sm-12 pl-0">
                            <label htmlFor="inputPassword2" className="sr-only">
                              Search
                            </label>
                            <input
                              type="search"
                              className="form-control col-sm-12"
                              id="myInput"
                              placeholder="Search..."
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-sm-7">
                        <div className="text-sm-right">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light mb-2 mr-1"
                          >
                            <i className="mdi mdi-refresh" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-blue waves-effect waves-light mb-2"
                            data-toggle="modal"
                            data-target="#custom-modal"
                            onClick={() => {
                              setFormValue(initialFormState);
                              toggleShowDrawer(!showDrawer);
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
                            <th>Basic Info</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Created Date</th>
                            <th style={{ width: 82 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fakedata.map((order, index) => (
                            <tr>
                              <td className="table-user">
                                <img
                                  src={order.avartar}
                                  alt="table-user"
                                  className="mr-2 rounded-circle"
                                />
                                <a
                                  href="#"
                                  className="text-body font-weight-semibold"
                                >
                                  {order.firstName + " " + order.lastName}
                                </a>
                              </td>
                              <td>{order.zipCode}</td>
                              <td>{order.email}</td>
                              <td>{order.companyName}</td>
                              <td>07/07/2018</td>
                              <td>
                                <a
                                  onClick={() => {
                                    console.log(order);
                                    setFormValue(order);
                                    toggleShowDrawer(!showDrawer);
                                  }}
                                  className="action-icon"
                                >
                                  {" "}
                                  <i className="mdi mdi-square-edit-outline" />
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  onClick={() => {
                                    deleteorders(order.id);
                                  }}
                                >
                                  {" "}
                                  <i className="mdi mdi-delete" />
                                </a>
                              </td>
                            </tr>
                          ))}

                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-3.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Bryan J. Luellen
                              </a>
                            </td>
                            <td>215-302-3376</td>
                            <td>bryuellen@dayrep.com</td>
                            <td>Blue Motors</td>
                            <td>09/12/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-3.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Kathryn S. Collier
                              </a>
                            </td>
                            <td>828-216-2190</td>
                            <td>collier@jourrapide.com</td>
                            <td>Arcanetworks</td>
                            <td>06/30/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-1.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Timothy Kauper
                              </a>
                            </td>
                            <td>(216) 75 612 706</td>
                            <td>thykauper@rhyta.com</td>
                            <td>Boar Records</td>
                            <td>09/08/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-5.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Zara Raws
                              </a>
                            </td>
                            <td>(02) 75 150 655</td>
                            <td>austin@dayrep.com</td>
                            <td>Bearings</td>
                            <td>07/15/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-6.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Annette P. Kelsch
                              </a>
                            </td>
                            <td>(+15) 73 483 758</td>
                            <td>annette@email.net</td>
                            <td>Shadowshine</td>
                            <td>09/05/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-7.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Jenny C. Gero
                              </a>
                            </td>
                            <td>078 7173 9261</td>
                            <td>jennygero@teleworm.us</td>
                            <td>Crowares</td>
                            <td>08/02/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-8.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Edward Roseby
                              </a>
                            </td>
                            <td>078 6013 3854</td>
                            <td>edwardR@armyspy.com</td>
                            <td>Orangations</td>
                            <td>08/23/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-9.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Anna Ciantar
                              </a>
                            </td>
                            <td>(216) 76 298 896</td>
                            <td>annac@hotmai.us</td>
                            <td>Surprise Brews</td>
                            <td>05/06/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <img
                                src="../assets/images/users/user-10.jpg"
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Dean Smithies
                              </a>
                            </td>
                            <td>077 6157 4248</td>
                            <td>deanes@dayrep.com</td>
                            <td>Apexlife</td>
                            <td>04/09/2018</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="action-icon"
                              >
                                {" "}
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
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
      {/* Modal for Edit */}
      <Modal
        backdrop={showEditModal}
        show={showEditModal}
        onHide={() => {
          toggleShowEditModal(!showEditModal);
        }}
      >
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary">Ok</Button>
          <Button
            onClick={() => {
              toggleShowEditModal(!showEditModal);
            }}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Edit */}
      <Drawer
        backdrop={showDrawer}
        show={showDrawer}
        size="sm"
        onHide={() => {
          toggleShowDrawer(!showDrawer);
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form
            fluid
            checkTrigger="change"
            formValue={formValue}
            onSubmit={(data) => {
              console.log(data);
              console.log({ formValue });
            }}
            onChange={(data) => {
              console.log({ data });
              console.log({ formValue });

              setFormValue({ ...data });
            }}
          >
            <Grid fluid>
              <Row gutter={10}>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Username
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="firstName" />
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Email{" "}
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="lastName" type="email" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div>
              <Row gutter={10}>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Username
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="name" />
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>
                      Email{" "}
                      <HelpBlock tooltip style={{ marginTop: "0px" }}>
                        Required
                      </HelpBlock>
                    </ControlLabel>
                    <FormControl name="email" type="email" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div>
              <Row gutter={10}>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <InputGroup inside style={{ width: "auto" }}>
                      <Input
                        name="password"
                        type={showpassword ? "text" : "password"}
                        id="password"
                        onChange={(e) => {
                          setFormValue({
                            ...formValue,
                            ["password"]: e,
                          });
                        }}
                        value={formValue.password}
                      />
                      <InputGroup.Button
                        onClick={() => {
                          setshowpassword(!showpassword);
                        }}
                      >
                        {" "}
                        {showpassword ? (
                          <Icon icon="eye" />
                        ) : (
                          <Icon icon="eye-slash" />
                        )}
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel> Confirm Password</ControlLabel>
                    <InputGroup inside style={{ width: "auto" }}>
                      <Input
                        name="password2"
                        type={showpassword2 ? "text" : "password"}
                        id="password2"
                        onChange={(e) => {
                          setFormValue({
                            ...formValue,
                            ["password2"]: e,
                          });
                        }}
                        value={formValue.password2}
                      />
                      <InputGroup.Button
                        onClick={() => {
                          setshowpassword2(!showpassword2);
                        }}
                      >
                        {" "}
                        {showpassword2 ? (
                          <Icon icon="eye" />
                        ) : (
                          <Icon icon="eye-slash" />
                        )}
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-3"></div>
              <Row gutter={10}>
                <Col xs={24}>
                  <FormGroup>
                    <ControlLabel>Textarea</ControlLabel>
                    <FormControl
                      rows={5}
                      name="textarea"
                      componentClass="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mb-4"></div>
              <Row gutter={10}>
                <Col xs={24}>
                  <FormGroup>
                    <ButtonToolbar>
                      <Button appearance="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        appearance="default"
                        onClick={() => {
                          setFormValue(initialFormState);
                        }}
                      >
                        Reset
                      </Button>
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
