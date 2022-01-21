const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Request = require("../../../models/Requests");
const Invoice = require("../../../models/Invoice");

// @route   GET api/orders/me/total
// @desc    Get current drivers total order amount
// @access  Private
// router.get("/totalsummary", auth, async (req, res) => {
//   try {
//     let q = { user: req.user.id };
//     const reque = await Product.find(q).countDocuments();
//     const orders = await Order.find({ user: req.user.id }).countDocuments();
//     const tables = await Table.find(q).countDocuments();
//     let total = { products, orders, tables };
//     res.json(total);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/orders/me
// @desc    Get current users orderss
// @access  Private
router.get("/recentrequests", auth, async (req, res) => {
  try {
    const data = await Request.find({ user: req.user.id })
      .select("createdAt isCompleted")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/orders/me
// @desc    Get current users orderss
// @access  Private
router.get("/recentinvoices", auth, async (req, res) => {
  try {
    const data = await Invoice.find({ user: req.user.id })
      .select("amount invoiceDate isPaid paymentDate createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
