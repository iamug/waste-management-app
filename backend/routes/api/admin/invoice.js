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
    const invoices = await Invoice.find().populate("user", "-password").sort({ createdAt: -1 }).lean();
    if (!invoices) return res.status(400).json({ msg: "Invalid request" });
    res.json({ success: true, invoices });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//new Date(new Date(new Date().setDate(1)).setHours(0,0,0))

// @route  POST api/earnings/delete
// @desc   Earnings route
// @access Private
router.delete("/:id", auth, async (req, res) => {
  if (!req.params.id) return res.status(400).json({ success: false, msg: "invalid Request" });
  try {
    let user = await Invoice.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "Record does not exist" });
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/plans
// @desc   Add Plans route
// @access Public
router.post("/", auth, async (req, res) => {
  let { user, amount, invoiceDate } = req.body;
  if (!user || !invoiceDate) return res.status(400).json({ success: false, msg: "Invalid request" });
  let Id = generateId("INV");
  let insertData = { Id, user, amount, invoiceDate };
  try {
    let invoice = await new Invoice(insertData).save();
    res.status(201).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/plans
// @desc   Add Plans route
// @access Public
router.put("/:id", auth, async (req, res) => {
  let { user, amount, invoiceDate } = req.body;
  let updateData = { user, amount, invoiceDate };
  //   let updateData = { isPaid: true, paymentDate: new Date().now() };
  try {
    await Invoice.indOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
