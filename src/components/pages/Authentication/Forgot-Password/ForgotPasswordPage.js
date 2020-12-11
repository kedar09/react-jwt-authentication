import React, {Component} from "react";
// import {Redirect} from "react-router-dom";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            alertStatusSuccess: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    render() {
        return (
            <div>
                <Card style={{marginTop: 100, marginRight: 400, marginLeft: 400}}>
                    <Card.Header className="text-center">Reset Password</Card.Header>
                    {this.state.alertStatusAdd === true ? <Alert variant="success">
                        <p>Reset Link Send Successfully</p>
                    </Alert> : null}
                    <Card.Body>
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email()
                                    .required("Email is required")
                            })}
                            onSubmit={(values) => {
                                let userData = {
                                    email: values.email,
                                };
                                return fetch(`http://localhost:3001/auth/resetPasswordLink`, {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(userData),
                                })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        if (responseJson.authId) {
                                            localStorage.setItem(
                                                "token",
                                                JSON.stringify(responseJson.token)
                                            );
                                            localStorage.setItem(
                                                "authId",
                                                JSON.stringify(responseJson.authId)
                                            );
                                            if (responseJson.status === 200) {
                                                this.setState({alertStatusSuccess: true}, () => {
                                                    window.setTimeout(() => {
                                                        this.setState({alertStatusSuccess: false})
                                                    }, 3000)
                                                });
                                            }
                                        }
                                        // alert(responseJson.message);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }}
                        >
                            {(props) => (
                                <Form onSubmit={props.handleSubmit} style={{padding: 20}}>
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
                                            style={{marginTop: 20}}
                                            variant="link"
                                            onClick={() =>
                                                this.props.history.push("/")
                                            }
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
    }
}

export default ForgotPasswordPage;
