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
      </div>
  );
}
