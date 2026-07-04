import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { FaHome, FaUsers, FaBug, FaSignOutAlt, FaUserCheck } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin</h2>

      <ul>

        <li onClick={() => navigate("/admin")}>
          <FaHome className="admin-icon" /> Dashboard
        </li>

        <li onClick={() => navigate("/app/users")}>
          <FaUsers className="admin-icon" /> Users
        </li>

        <li onClick={() => navigate("/app/issues")}>
          <FaBug className="admin-icon" /> Issues
        </li>

        {/* ✅ NEW ASSIGNEE MENU */}
        <li onClick={() => navigate("/app/assignees")}>
          <FaUserCheck className="admin-icon" /> Assignees
        </li>

        <li onClick={() => navigate("/")}>
          <FaSignOutAlt className="admin-icon" /> Logout
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;