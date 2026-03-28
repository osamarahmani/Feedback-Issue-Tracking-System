import React, { useEffect } from "react"; // ✅ ADD useEffect
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Onboarding from "./pages/Onboarding";

// Layout system
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import AdminDashboard from "./pages/AdminDashboard";

function App() {

  // ✅ APPLY THEME ON LOAD
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const isConfigured = localStorage.getItem("config");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ONBOARDING */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

        {/* USER DASHBOARD */}
        <Route
  path="/app"
  element={<Layout />}
>
          <Route path="dashboard" element={<Home />} />
          <Route path="my-issues" element={<Issues />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;