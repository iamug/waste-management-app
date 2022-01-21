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
    const requests = await Request.find().populate("user", "-password").sort({ createdAt: -1 }).lean();
    if (!requests) return res.status(400).json({ msg: "Invalid request" });
    res.json({ success: true, requests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/earnings/delete
// @desc   Earnings route
// @access Private
router.delete("/:id", auth, async (req, res) => {
  if (!req.params.id) return res.status(400).json({ success: false, msg: "invalid Request" });
  try {
    let user = await Request.findByIdAndRemove(req.params.id);
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
// router.post("/", auth, async (req, res) => {
//   let Id = generateId("REQ");
//   let insertData = { Id, user: req.user.id };
//   try {
//     await new Request(insertData).save();
//     res.status(201).send({ success: true });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// @route  POST api/retrievals/me
// @desc   Retrieval route
// @access Private
router.put("/:id", auth, async (req, res) => {
  if (!req.params.id || !validMongooseId(req.params.id)) return res.status(400).json({ success: false, msg: "invalid Request" });
  let requestData = await Request.findById(req.params.id);
  if (!requestData) res.status(404).send({ success: false, msg: "Record does not exist" });
  let updateFields = { isCompleted: true };
  try {
    let request = await Request.findOneAndUpdate({ _id: req.params.id }, { $set: updateFields }, { new: true });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
