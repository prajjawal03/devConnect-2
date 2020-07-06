import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";
const Navbar = ({ logout, isAuthenticated, loading }) => {
  const userBar = (
    <ul>
      <li>
        <Link onClick={logout} to="/">
          logout
        </Link>
      </li>
    </ul>
  );

  const guestBar = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? userBar : guestBar}</>}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { logout })(Navbar);
