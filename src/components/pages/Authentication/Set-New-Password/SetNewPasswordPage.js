import React, {Component} from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";

class SetNewPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: '',
            alertStatusSuccess: false,
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
                        <p>Password Updated Successfully</p>
                    </Alert> : null}
                    <Card.Body>
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state}
                            validationSchema={Yup.object().shape({
                                password: Yup.string()
                                    .required("Password is required!"),
                                confirmPassword: Yup.string()
                                    .required("Confirm Password is required!")
                                    .oneOf([Yup.ref('password'), null], 'Passwords not matched!')
                            })}
                            onSubmit={async (values) => {
                                // let token = await JSON.parse((localStorage.getItem("token")));
                                // let authId = await JSON.parse((localStorage.getItem("authId")));

                                let userData = {
                                    password: values.password,
                                    // authId: authId
                                };
                                return fetch(`http://localhost:3001/auth/updateUserPassword`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        // 'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(userData),
                                })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        console.log(responseJson);

                                        if (responseJson.StatusCode === 200) {
                                            this.setState({alertStatusSuccess: true}, () => {
                                                window.setTimeout(() => {
                                                    this.setState({alertStatusSuccess: false})
                                                }, 3000)
                                            });
                                            this.props.history.push("/");
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }}
                        >
                            {(props) => (
                                <Form onSubmit={props.handleSubmit} style={{padding: 20}}>
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
                                            isInvalid={props.errors.confirmPassword && props.touched.confirmPassword}
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

export default SetNewPasswordPage;
