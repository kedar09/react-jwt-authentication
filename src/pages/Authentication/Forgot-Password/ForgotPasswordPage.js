import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { forgotPasswordService } from "../../../services/authentication.service";
import Swal from "sweetalert2";

const ForgotPasswordPage = (props) => {
  const history = useHistory();

  const forgotPassword = async (values) => {
    try {
      const payloadData = {
        email: values.email,
      };
      const result = await forgotPasswordService(payloadData);
      console.log(result);
      if (result && result.userId) {
        Swal.fire({
          title: "Reset password link sent successfully!",
          timer: 2000,
          icon: "success",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (result && result.message === "User not found") {
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
        <Card.Header className="text-center">Reset Password</Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize={true}
            initialValues={{ email: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Email is required"),
            })}
            onSubmit={(values) => {
              forgotPassword(values);
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

                <div>
                  <Button
                    style={{
                      marginTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Send Link
                  </Button>
                  <Button
                    style={{ marginTop: 20 }}
                    variant="link"
                    onClick={() => history.push("/")}
                  >
                    Back to Login
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

export default ForgotPasswordPage;
