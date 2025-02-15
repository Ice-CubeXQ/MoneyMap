import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, setUser } = useAuth();

  const logout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <div>
      <span>Welcome, {user.username}</span>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
