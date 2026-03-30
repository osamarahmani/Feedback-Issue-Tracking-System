import React, { useState, useEffect, useRef } from "react";
import "./IssueChatModal.css";
import { socket } from "../socket";

export default function AdminIssueChatModal({ issue, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(issue?.messages || []);

  const chatEndRef = useRef(null);

  const adminId = localStorage.getItem("adminId") || "admin";
  const adminName = localStorage.getItem("adminName") || "Admin";

  const issueId = issue?._id;

  /* =========================
     JOIN ROOM
  ========================= */
  useEffect(() => {
    if (!issueId) return;

    socket.emit("join-issue", issueId);

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [issueId]);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: adminId,
      senderName: adminName,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send-message", {
      issueId,
      message: msgData,
    });

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>

        <div className="chat-header">
          <h3>🛠 Admin Chat</h3>
        </div>

        <div className="chat-box">
          {messages.length === 0 && (
            <p className="empty">No messages yet...</p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg ${
                msg.senderId === adminId ? "user" : "other"
              }`}
            >
              <strong>{msg.senderName}</strong>
              <span>{msg.text}</span>
              <small>{msg.time}</small>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            placeholder="Type admin message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>

      </div>
    </div>
  );
}