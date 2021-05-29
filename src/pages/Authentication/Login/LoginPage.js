import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { loginService } from "../../../services/authentiacation.service";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const LoginPage = (props) => {
  const history = useHistory();

  const loginUser = async (values) => {
    try {
      const payloadData = {
        email: values.email,
        password: values.password,
      };
      const result = await loginService(payloadData);
      console.log("rrrrrrrr", result);
      if (result && result.userId) {
        Cookies.set("token", JSON.stringify(result.token));
        Cookies.set("token", JSON.stringify(result.token));
        Cookies.set("userId", JSON.stringify(result.userId));
        Swal.fire({
          title: "Login successfully!",
          timer: 2000,
          icon: "success",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
        history.push("/home-page");
      } else if (result && result.message === "Wrong Password") {
        Swal.fire({
          title: "Wrong password!",
          timer: 2000,
          icon: "warning",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (result && result.message === "User Not Found") {
        Swal.fire({
          title: "User not found!",
          timer: 2000,
          icon: "warning",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Please try again later!",
          timer: 2000,
          icon: "warning",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log("eeeeeeeeeee", error);
    }
  };

  return (
    <div>
      <Card style={{ marginTop: 100, marginRight: 400, marginLeft: 400 }}>
        <Card.Header className="text-center">Login to Briofeed</Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Email is required"),
              password: Yup.string()
                .min(5, "Password must be at least 5 characters")
                .max(100, "Password max 100 characters")
                .required("Password is required"),
            })}
            onSubmit={(values) => {
              loginUser(values);
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
                    isInvalid={props.errors.password && props.touched.password}
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
                    onClick={() => {
                      history.push("/forgot-password");
                    }}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{ marginTop: 20 }}
                    variant="link"
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    Register new account?
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
