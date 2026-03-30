import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KanbanBoard from "../components/KanbanBoard";
import CreateIssueModal from "../components/CreateIssueModal";
import IssueChatModal from "../components/IssueChatModal";
import "./Dashboard.css";

export default function Dashboard() {
  const [config, setConfig] = useState(null);
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [search, setSearch] = useState(""); // ✅ ADD SEARCH

  const location = useLocation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedConfig = JSON.parse(localStorage.getItem("config"));
    if (storedConfig) {
      setConfig(storedConfig);
    } else {
      setConfig({
        spaceName: "My Workspace",
        workflow: ["To Do", "In Progress", "Done"]
      });
    }

    const storedIssues = JSON.parse(localStorage.getItem("issues")) || [];
    setIssues(storedIssues);
  }, []);

  // ✅ HANDLE SIDEBAR NAVIGATION
  useEffect(() => {
    if (location.pathname === "/dashboard/issues") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [location]);

  // ✅ FILTER USER ISSUES
  const userIssues = issues.filter(
    (i) => i.createdBy === userId || i.assignedTo === userId
  );

  // 🔍 SEARCH FILTER
  const filteredIssues = userIssues.filter((issue) => {
  const text = search.toLowerCase();

  return (
    issue.title?.toLowerCase().includes(text) ||
    issue.description?.toLowerCase().includes(text) ||
    issue.status?.toLowerCase().includes(text) ||
    issue.priority?.toLowerCase().includes(text)
  );
});

  const handleCreateIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: Date.now(),
      createdBy: userId,
      messages: [],
      status: issue.status || "To Do"
    };

    const updated = [...issues, newIssue];
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
  };

  const updateIssues = (updated) => {
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
  };

  if (!config) return <h2 className="loading">Loading Dashboard...</h2>;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar
          spaceName={config.spaceName}
          onCreate={() => setShowModal(true)}
          onSearch={setSearch} // ✅ PASS SEARCH
        />

        {/* CONTENT */}
        <div className="board-container">

          {location.pathname === "/dashboard" && (
            <h2>Welcome to Dashboard 👋</h2>
          )}

          {location.pathname === "/dashboard/reports" && (
            <h2>Reports Page 📊</h2>
          )}

          {location.pathname === "/dashboard/settings" && (
            <h2>Settings ⚙️</h2>
          )}

          {/* ✅ KANBAN WITH FILTERED DATA */}
          {(location.pathname === "/dashboard" ||
            location.pathname === "/dashboard/issues") && (
            <KanbanBoard
              workflow={config.workflow}
              issues={filteredIssues} // 🔥 USE FILTERED
              onCardClick={(issue) => setSelectedIssue(issue)}
            />
          )}
           {filteredIssues.length === 0 && (
  <p style={{ textAlign: "center" }}>No matching issues found 🔍</p>
)}
        </div>

        {/* FLOAT BUTTON */}
        <button
          className="floating-btn"
          onClick={() => setShowModal(true)}
        >
          + New Issue
        </button>

        {/* CREATE MODAL */}
        {showModal && (
          <CreateIssueModal
            onClose={() => setShowModal(false)}
            onCreate={(issue) => {
              handleCreateIssue(issue);
              setShowModal(false);
            }}
          />
        )}

        {/* CHAT MODAL */}
        {selectedIssue && (
          <IssueChatModal
            issue={selectedIssue}
            onClose={() => setSelectedIssue(null)}
            updateIssues={updateIssues}
          />
        )}
      </div>
    </div>
  );
}