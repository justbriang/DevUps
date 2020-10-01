import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Alert from "./components/layout/alert";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from "./components/dashboard/dashboard";
import CreateProfile from "./components/profile-form/createProfile";
import EditProfile from "./components/profile-form/edit-profile";
import AddExperience from "./components/profile-form/addExperience";
import AddEducation from "./components/profile-form/addEducation";
import Profiles from "./components/profiles/profiles";
import Profile from './components/profile/profile'
//redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/privateRoute";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin
      ></script>
    </Provider>
  );
};

export default App;
