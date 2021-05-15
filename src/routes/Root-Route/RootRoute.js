import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../../pages/Authentication/Login/LoginPage";
import HomePage from "../../pages/HomePage/HomePage";
import ForgotPasswordPage from "../../pages/Authentication/Forgot-Password/ForgotPasswordPage";
import SetNewPasswordPage from "../../pages/Authentication/Set-New-Password/SetNewPasswordPage";
import { PrivateRoute } from "../Private-Route/PrivateRoute";
import RegisterPage from "../../pages/Authentication/Register/RegisterPage";

const RootRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/set-new-password" component={SetNewPasswordPage} />
        <PrivateRoute path="/home-page" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default RootRoute;
