import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import CreateIssueModal from "../components/CreateIssueModal";
import "./Layout.css";

export default function Layout() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        {/* ✅ PASS onCreate */}
        <Topbar onCreate={() => setShowModal(true)} />

        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* ✅ GLOBAL MODAL */}
      {showModal && (
        <CreateIssueModal
          onClose={() => setShowModal(false)}
          onCreate={() => setShowModal(false)}
        />
      )}
    </div>
  );
}