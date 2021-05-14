import React, { Component } from "react";
// import {Redirect} from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  componentDidMount() {
    console.log('ddddddddddd',Cookies.get("token"));
  }
  render() {
    return (
      <div>
        {/* {this.state.user ? (
          <Redirect to="/home-page" />
        ) : ( */}
        <Card style={{ marginTop: 100, marginRight: 400, marginLeft: 400 }}>
          <Card.Header className="text-center">Login to Briofeed</Card.Header>
          <Card.Body>
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Email is required"),
                password: Yup.string()
                  .min(5, "Password must be at least 5 characters")
                  .max(100, "Password max 100 characters")
                  .required("Password is required"),
              })}
              onSubmit={(values) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                };
                fetch(`http://localhost:3001/auth/loginUser`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userData),
                })
                  .then((response) => response.json())
                  .then(async (responseJson) => {
                    console.log(responseJson);
                    if (responseJson.userId) {
                      Cookies.set("token", JSON.stringify(responseJson.token));
                      Cookies.set(
                        "userId",
                        JSON.stringify(responseJson.userId)
                      );
                      // this.setState({ user: true });
                      // const { from } = this.props.location.state || { from: { pathname: "/home-page" } };
                      this.props.history.push("/home-page");
                    }
                    // alert(responseJson.message);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
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
                      Login
                    </Button>
                    <Button
                      style={{ marginTop: 20 }}
                      variant="link"
                      onClick={() =>
                        this.props.history.push("/forgot-password")
                      }
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ marginTop: 20 }}
                      variant="link"
                      onClick={() => this.props.history.push("/register")}
                    >
                      Register new account?
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
        {/* )} */}
      </div>
    );
  }
}

export default LoginPage;
