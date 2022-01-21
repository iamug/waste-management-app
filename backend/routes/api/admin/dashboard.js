const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../../../models/Users");
const Admin = require("../../../models/Admins");
const Request = require("../../../models/Requests");
const Invoice = require("../../../models/Invoice");

// @route   GET api/orders/me/total
// @desc    Get current drivers total order amount
// @access  Private
router.get("/totalsummary", auth, async (req, res) => {
  try {
    const admins = await Admin.find().count();
    const users = await User.find().count();
    const requests = await Request.find().count();
    const invoices = await Invoice.find().count();
    let total = { admins, users, requests, invoices };
    res.json(total);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/orders/me
// @desc    Get current users orderss
// @access  Private
router.get("/recentrequests", auth, async (req, res) => {
  try {
    const data = await Request.find().populate("user", "-password").sort({ createdAt: -1 }).limit(10).lean();
    return res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
