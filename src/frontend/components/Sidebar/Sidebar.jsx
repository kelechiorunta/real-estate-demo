import React from "react";
import { Link } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <Link to="/home">
          <Home size={20} /> My Account
        </Link>
        <a href="/profile">
          <User size={20} /> My Profile
        </a>
        <Link to="/settings">
          <Settings size={20} /> My Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

