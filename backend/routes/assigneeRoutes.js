const express = require("express");
const router = express.Router();
const Assignee = require("../models/Assignee");

// GET all assignees
router.get("/", async (req, res) => {
  const data = await Assignee.find();
  res.json(data);
});

// ADD assignee
router.post("/", async (req, res) => {
  const newAssignee = new Assignee(req.body);
  await newAssignee.save();
  res.json(newAssignee);
});

// DELETE assignee
router.delete("/:id", async (req, res) => {
  await Assignee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;