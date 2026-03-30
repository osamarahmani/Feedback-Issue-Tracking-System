io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-issue", (issueId) => {
    socket.join(issueId);
    console.log(`User joined issue ${issueId}`);
  });

  socket.on("send-message", ({ issueId, message }) => {
    io.to(issueId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export const socket = io("https://feedback-issue-tracking-system.onrender.com", {
  transports: ["websocket"]
});