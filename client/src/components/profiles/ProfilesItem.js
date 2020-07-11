import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpg";
const ProfilesItem = ({
  profile: {
    user: { _id, name },
    status,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={logo} alt="dp" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProfilesItem;
