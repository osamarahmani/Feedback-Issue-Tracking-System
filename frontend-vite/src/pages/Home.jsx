import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // ✅ ADD STATE
  const [issues, setIssues] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error(err));
  }, []);

  const userId = localStorage.getItem("userId");

const userIssues = issues.filter(
  i => i.createdBy === userId || i.assignedTo === userId
);

const total = userIssues.length;
const inProgress = userIssues.filter(i => i.status === "In Progress").length;
const resolved = userIssues.filter(i => i.status === "Done").length;
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">
          <h1>Issue Tracking System</h1>
          <p>
            Manage, track, and resolve issues efficiently with a smart workflow.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/app/my-issues?create=true")}
            >
              Create Issue
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/app/reports")}
            >
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="cards">

        <div className="card">
          <h3>📊 Total Issues</h3><br />
          <p>{total}</p> {/* ✅ dynamic */}
        </div>

        <div className="card">
          <h3>⏳ In Progress</h3><br />
          <p>{inProgress}</p> {/* ✅ dynamic */}
        </div>

        <div className="card">
          <h3>✅ Resolved</h3><br />
          <p>{resolved}</p> {/* ✅ dynamic */}
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="info">

        <div className="info-card">
          <h3>📝 How it works</h3>
          <p>
            The process starts when a user creates an issue from the “My Issues” section
            by clicking the “+ New Issue” button and submitting the required details.
            Once submitted, the issue is recorded with an initial status. The admin then
            reviews the issue and assigns it to a responsible team member. After
            assignment, the issue moves into progress where the user can continuously
            track its status. Finally, once the problem is resolved, the issue is marked
            as completed, ensuring a smooth and transparent workflow from start to end.
          </p>
        </div>

        <div className="info-card">
          <h3>🚀 Features</h3>
          <p>
            This system provides real-time tracking of issues through a visual Kanban
            workflow, allowing users to clearly see the progress of their requests. It
            also includes a chat feature that enables direct communication between the
            user and the assigned team member. With structured issue management and
            admin control, the platform ensures efficient handling, assignment, and
            resolution of issues in an organized manner.
          </p>
        </div>

      </div>

    </div>
  );
}