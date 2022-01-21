const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Request = require("../../../models/Requests");
const { generateId, validMongooseId } = require("../../../utils/utils");
//const { query } = require("express");

// @route   GET api/payment/
// @desc    Get current users profile
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).populate("user", "-password").sort({ createdAt: -1 }).lean();
    if (!requests) return res.status(400).json({ msg: "Invalid request" });
    res.json({ success: true, requests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/plans
// @desc   Add Plans route
// @access Public
router.post("/", auth, async (req, res) => {
  let Id = generateId("REQ");
  let insertData = { Id, user: req.user.id };
  try {
    await new Request(insertData).save();
    res.status(201).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
