import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/app/dashboard", icon: "📊" },
    { name: "My Issues", path: "/app/my-issues", icon: "🐞" },
    { name: "Reports", path: "/app/reports", icon: "📈" },
    { name: "Settings", path: "/app/settings", icon: "⚙️" }
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">⚡ Tracker</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item.name}
            className={
              location.pathname.startsWith(item.path) ? "active" : ""
            }
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}