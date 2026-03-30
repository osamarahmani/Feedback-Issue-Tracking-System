// controllers/issueController.js

const Issue = require("../models/Issue");
const User = require("../models/User");

// 🎯 POINTS FUNCTION
const getPoints = (priority) => {
  switch (priority) {
    case "Low": return 5;
    case "Medium": return 10;
    case "High": return 20;
    case "Critical": return 30;
    case "Blocker": return 50;
    default: return 0;
  }
};

// ✅ CREATE ISSUE
exports.createIssue = async (req, res) => {
  try {
    const data = req.body;

    const issue = await Issue.create({
      ...data,
      points: getPoints(data.priority)
    });

    res.json(issue);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE ISSUE (IMPORTANT)
exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    const oldStatus = issue.status;

    Object.assign(issue, req.body);

    // ✅ ADD POINTS WHEN DONE
    if (oldStatus !== "Done" && req.body.status === "Done") {
      await User.findByIdAndUpdate(issue.createdBy, {
        $inc: { points: issue.points || 0 }
      });
    }

    await issue.save();

    res.json(issue);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ISSUES
exports.getIssues = async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
};