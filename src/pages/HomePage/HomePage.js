import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  getUserProfileService,
  updateUserProfileService,
} from "../../services/authentiacation.service";
import * as Yup from "yup";
import Swal from "sweetalert2";

const HomePage = (props) => {
  const history = useHistory();
  const [editProfile, setEditProfile] = useState(false);
  const [state, setState] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    userId: "",
  });

  const logoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token", { path: "" }); // removed!
        Cookies.remove("userId", { path: "" }); // removed!
        history.push("/");
      }
    });
  };

  const getUserProfile = async () => {
    try {
      let payloadData = {
        token: Cookies.get("token").replace(/"/g, ""),
        payload: { userId: Cookies.get("userId") },
      };
      const result = await getUserProfileService(payloadData);
      if (result) {
        setState(result[0]);
      }
    } catch (error) {
      console.log("eeeeeeeeeee", error);
    }
  };

  const updateUserProfile = async (values) => {
    try {
      const payloadData = {
        token: Cookies.get("token").replace(/"/g, ""),
        payload: {
          userProfileData: {
            displayName: values.displayName,
            phoneNumber: values.phoneNumber.toString(),
          },
          userId: values.userId,
        },
      };
      const result = await updateUserProfileService(payloadData);
      console.log("rrrrrrrr", result);
      if (result.message === "User Profile updated successfully!") {
        Swal.fire({
          title: "Profile updated successfully!",
          timer: 2000,
          icon: "success",
          // timerProgressBar: true,
          showConfirmButton: false,
        });
        setEditProfile(!editProfile)
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

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      {editProfile ? (
        <Card style={{ marginTop: 100, marginRight: 400, marginLeft: 400 }}>
          <Card.Header className="text-center">Welcome to KEDAR09</Card.Header>
          <Formik
            enableReinitialize={true}
            initialValues={state}
            validationSchema={Yup.object().shape({
              displayName: Yup.string()
                .min(5, "Name must be at least 5 characters")
                .max(100, "Name max 100 characters"),
              phoneNumber: Yup.number(),
              //   .min(5, "Password must be at least 5 characters")
              //   .max(100, "Password max 100 characters")
            })}
            onSubmit={(values) => {
              Swal.fire({
                title: "Are you sure?",
                text: "You want to update your profile!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save",
                cancelButtonText: "Cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  updateUserProfile(values);
                }
              });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Card.Body style={{ padding: 40 }}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:-</Form.Label>
                    <Form.Label>{" " + props.values.email}</Form.Label>
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
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button
                    variant="primary"
                    onClick={() => {
                      props.handleSubmit();
                    }}
                  >
                    Save Profile
                  </Button>
                  <Button
                    variant="danger"
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setEditProfile(!editProfile);
                    }}
                  >
                    Cancel
                  </Button>
                </Card.Footer>
              </Form>
            )}
          </Formik>
        </Card>
      ) : (
        <Card style={{ marginTop: 100, marginRight: 400, marginLeft: 400 }}>
          <Card.Header className="text-center">Welcome to KEDAR09</Card.Header>
          <Card.Body>
            <Card.Text>Name:- {state.displayName}</Card.Text>
            <Card.Text>Email:- {state.email}</Card.Text>
            <Card.Text>Phone number:- {state.phoneNumber}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button
              variant="primary"
              onClick={() => {
                setEditProfile(!editProfile);
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="danger"
              style={{ marginLeft: 20 }}
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </Button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
