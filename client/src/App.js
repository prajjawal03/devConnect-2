import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { connect } from "react-redux";
import { loaduser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

function App({ loaduser }) {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    loaduser();
  }, []);
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </>
  );
}

export default connect(null, { loaduser })(App);
