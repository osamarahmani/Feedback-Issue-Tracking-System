const mongoose = require("mongoose");

const AssigneeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  role: { 
    type: String, 
    default: "Developer" 
  },

  department: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
 
});

module.exports = mongoose.model("Assignee", assigneeSchema);