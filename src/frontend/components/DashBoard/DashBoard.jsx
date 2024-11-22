import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Profile from "../Profile/Profile"
import Settings from "../Settings/Settings";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DashboardRoutes;
