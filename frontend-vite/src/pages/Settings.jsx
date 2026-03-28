import React, { useEffect, useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const [points, setPoints] = useState(0);
  const [theme, setTheme] = useState("light"); // ✅ ADD STATE

  // ✅ LOAD USER + POINTS + THEME
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    const savedTheme = localStorage.getItem("theme") || "light";

    if (storedUser) setUser(storedUser);

    // ✅ TOTAL POINTS
    const totalPoints = issues.reduce((sum, i) => sum + (i.points || 0), 0);
    setPoints(totalPoints);

    // ✅ APPLY THEME
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // ✅ SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated!");
  };

  // ✅ DARK MODE TOGGLE (FIXED)
  const toggleTheme = () => {
    if (theme === "dark") {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  // ✅ CLEAR DATA
  const clearData = () => {
    localStorage.clear();
    alert("All data cleared!");
    window.location.reload();
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="settings">
      <h2>⚙ Settings</h2>

      {/* PROFILE */}
      <div className="card">
        <h3>👤 Profile</h3>

        <input
          type="text"
          value={user.name}
          placeholder="Name"
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <input
          type="email"
          value={user.email}
          placeholder="Email"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <button onClick={handleSave}>Save</button>
      </div>

      {/* POINTS */}
      <div className="card">
        <h3>🏆 Reward Points</h3>
        <p className="points">{points} pts</p>
      </div>

      {/* THEME */}
      <div className="card">
        <h3>🌙 Theme</h3>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>

      {/* DANGER */}
      <div className="card danger">
        <h3>⚠ Danger Zone</h3>

        <button onClick={clearData}>Clear Data</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}