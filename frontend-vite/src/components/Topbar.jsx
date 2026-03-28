import React from "react";
import "./Topbar.css";

export default function Topbar({ spaceName, onCreate }) {
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
          <input placeholder="🔍 Search issues..." />
        </div>

        {/* CREATE BUTTON */}
        <button className="create-btn" onClick={onCreate}>
          + Create
        </button>

        {/* PROFILE */}
        <div className="profile">
          <span>👤</span>
        </div>

      </div>
    </div>
  );
}