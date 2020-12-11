import "./App.css";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from "./components/pages/Authentication/Login/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";
import ForgotPasswordPage from "./components/pages/Authentication/Forgot-Password/ForgotPasswordPage";
import SetNewPasswordPage from "./components/pages/Authentication/Set-New-Password/SetNewPasswordPage";
import {PrivateRoute} from "./routes/PrivateRoute";
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
function App() {
    return (
        // <Router history={history}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPasswordPage}
                />
                <Route
                    exact
                    path="/set-new-password"
                    component={SetNewPasswordPage}
                />
                <PrivateRoute path="/home-page" component={HomePage}/>
            </Switch>
        </Router>
    );
}

export default App;
