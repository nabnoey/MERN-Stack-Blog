import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  let username = "";
  if (user) {
    try {
      username =
        user.username ||
        (typeof user === "string" ? JSON.parse(user).username : "");
    } catch (e) {
      username = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span>{username}</span>
      <button className="btn btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
