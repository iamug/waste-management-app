const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Invoice = require("../../../models/Invoice");
const { generateId, validMongooseId } = require("../../../utils/utils");
//const { query } = require("express");

// @route   GET api/payment/
// @desc    Get current users profile
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).populate("user", "-password").sort({ createdAt: -1 }).lean();
    if (!invoices) return res.status(400).json({ msg: "Invalid request" });
    res.json({ success: true, invoices });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/plans
// @desc   Add Plans route
// @access Public
router.put("/:id", auth, async (req, res) => {
  let updateData = { isPaid: true, paymentDate: new Date() };
  try {
    await Invoice.findOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
