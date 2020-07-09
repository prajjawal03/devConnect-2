import React, { useEffect } from "react";
import DashboardAction from "./DashboardAction";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
const Dashboard = ({ getProfile, profile, loading, user }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      {" "}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile === null ? (
        <>
          {" "}
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/createprofile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      ) : (
        <DashboardAction />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  user: state.auth.user,
});
export default connect(mapStateToProps, { getProfile })(Dashboard);
