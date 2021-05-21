import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router";
import { setNewPasswordService } from "../../../services/authentiacation.service";
import Swal from "sweetalert2";

const SetNewPasswordPage = (props) => {
  const params = useParams();
  const history = useHistory();

  const forgotPassword = async (values) => {
    try {
      const payloadData = {
        payload: {
          password: values.password,
          userId: parseInt(params.userId),
        },
        token: params.token,
      };
      const result = await setNewPasswordService(payloadData);
      if (result && result.message === "User Password updated successfully!") {
        Swal.fire({
          title: "Password updated successfully!",
          timer: 2000,
          icon: "success",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
        history.push("/");
      } else {
        Swal.fire({
          title: "Please try again later!",
          timer: 2000,
          icon: "warning",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      console.log(result);
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
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={Yup.object().shape({
              password: Yup.string().required("Password is required!"),
              confirmPassword: Yup.string()
                .required("Confirm Password is required!")
                .oneOf([Yup.ref("password"), null], "Passwords not matched!"),
            })}
            onSubmit={async (values) => {
              forgotPassword(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} style={{ padding: 20 }}>
                <Form.Group controlId="formBasicEmail">
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

                <Form.Group controlId="formBasicEmail">
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
                    Update Password
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

export default SetNewPasswordPage;
