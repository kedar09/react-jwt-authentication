import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../../pages/Authentication/Login/LoginPage";
import HomePage from "../../pages/HomePage/HomePage";
import ForgotPasswordPage from "../../pages/Authentication/Forgot-Password/ForgotPasswordPage";
import SetNewPasswordPage from "../../pages/Authentication/Set-New-Password/SetNewPasswordPage";
import { PrivateRoute } from "../Private-Route/PrivateRoute";
import RegisterPage from "../../pages/Authentication/Register/RegisterPage";
import { PublicRoute } from "../Public-Route/PublicRoute";

const RootRoute = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PublicRoute exact path="/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute exact path="/set-new-password" component={SetNewPasswordPage} />
        <PrivateRoute exact path="/home-page" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default RootRoute;
