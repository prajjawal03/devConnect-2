import React from "react";
import logo from "../../img/logo.jpg";
const ProfileTop = ({
  profile: {
    user: { name },
    status,
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={logo} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">{status}</p>
    </div>
  );
};
export default ProfileTop;
