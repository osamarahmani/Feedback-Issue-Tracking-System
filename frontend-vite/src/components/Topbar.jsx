import React from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

export default function Topbar({ spaceName, onCreate, onSearch }) {
  const navigate = useNavigate();

  return (
    <div className="topbar">

      {/* LEFT */}
      <div className="topbar-left">
        <h3>{spaceName || "Tarcin Issue Tracker"}</h3>
      </div>

      {/* RIGHT */}
      <div className="topbar-actions">

        {/* SEARCH */}
        <div className="search-box">
          <input
            placeholder="🔍 Search issues..."
            onChange={(e) => onSearch && onSearch(e.target.value)} 
            // ✅ FIX: prevent error if onSearch not passed
          />
        </div>

        {/* CREATE BUTTON */}
        <button className="create-btn" onClick={onCreate}>
          + Create
        </button>
        

        {/* PROFILE */}
        <div
          className="profile"
          onClick={() => navigate("/app/settings")}
          style={{ cursor: "pointer" }}
        >
          <span>👤</span>
        </div>

      </div>
    </div>
  );
}
