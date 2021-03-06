import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Post} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/createprofile" component={CreateProfile} />
          <PrivateRoute exact path="/editprofile" component={EditProfile} />
        </Switch>
      </div>
    </>
  );
}

export default connect(null, { loaduser })(App);
