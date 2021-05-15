import React, { Component } from "react";
// import {Redirect} from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";
import { registerUserService } from "../../../services/authentiacation.service";
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      displayName: "",
      user: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  async registerUser(values) {
    try {
      const payloadData = {
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber.toString(),
        displayName: values.displayName,
      };
      const result = await registerUserService(payloadData);
      if (result && result.userId) {
        Cookies.set("token", JSON.stringify(result.token), {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("userId", JSON.stringify(result.userId), {
          sameSite: "None",
          secure: true,
        });
        // this.setState({ user: true });
        // const { from } = this.props.location.state || { from: { pathname: "/home-page" } };
        this.props.history.push("/home-page");
      }
    } catch (error) {
      console.log("eeeeeeeeeee", error);
    }
  }

  render() {
    return (
      <div>
        <Card style={{ marginTop: 100, marginRight: 400, marginLeft: 400 }}>
          <Card.Header className="text-center">Login to Briofeed</Card.Header>
          <Card.Body>
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email("Email must be a valid email")
                  .required("Email is required"),
                password: yup
                  .string()
                  .min(5, "Password must be at least 5 characters")
                  .max(100, "Password max 100 characters")
                  .required("Password is required"),
                confirmPassword: yup
                  .string()
                  .oneOf([yup.ref("password"), null], "Passwords must match"),
                displayName: yup
                  .string()
                  .min(5, "Name must be at least 5 characters")
                  .max(100, "Name max 100 characters"),
                phoneNumber: yup.number(),
                //   .min(5, "Password must be at least 5 characters")
                //   .max(100, "Password max 100 characters")
              })}
              onSubmit={(values) => {
                this.registerUser(values);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} style={{ padding: 20 }}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={props.values.email}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      isInvalid={props.errors.email && props.touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicDisplayName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter display name"
                      name="displayName"
                      value={props.values.displayName}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      isInvalid={
                        props.errors.displayName && props.touched.displayName
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.displayName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter phone number"
                      name="phoneNumber"
                      value={props.values.phoneNumber}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      isInvalid={
                        props.errors.phoneNumber && props.touched.phoneNumber
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={props.values.password}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      isInvalid={
                        props.errors.password && props.touched.password
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter confirm password"
                      name="confirmPassword"
                      value={props.values.confirmPassword}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      isInvalid={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{
                        marginTop: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      variant="primary"
                      type="submit"
                    >
                      Register
                    </Button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginTop: 20 }}
                      variant="link"
                      onClick={() => this.props.history.push("/")}
                    >
                      Already registerd, login?
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default RegisterPage;
