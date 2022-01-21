const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const pug = require("pug");
const { generateId, validMongooseId } = require("../../../utils/utils");
const { devTransporter, ProdTransporter } = require("../../../utils/emailController");
const auth = require("../../../middleware/auth");

// render
//var html = pug.render('string of pug', merge(options, locals));

const User = require("../../../models/Users");

// @route   GET api/retrievals/me
// @desc    Get current users vehicle retrieval
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
    if (!users) return res.status(400).json({ msg: "There is no user" });
    res.json({ success: true, users });
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
    let user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "Record does not exist" });
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/users
// @desc   Register route
// @access Public
router.post(
  "/",
  [
    check("email", "Please include valid Email address").isEmail().notEmpty(),
    check("phone", "Please include valid Phone number").notEmpty(),
    check("name", "Please include valid Name").notEmpty(),
    check("password", "Please include valid Password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, phone, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      let Id = generateId("USER");
      let insertData = { userId, firstName, lastName, email, phone, isActive: true };
      user = new User(insertData);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(201).send({ success: true });
    } catch (err) {
      console.log(err);
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  POST api/retrievals/me
// @desc   Retrieval route
// @access Private
router.put("/:id", auth, async (req, res) => {
  if (!req.params.id) return res.status(400).json({ success: false, msg: "Invalid request" });
  let userData = await User.findById(req.params.id);
  if (!userData) res.status(404).send({ success: false, msg: "Record does not exist" });
  let updateFields = {};
  const { name, address, email, phone, isActive } = req.body;
  name && (updateFields.name = name);
  address && (updateFields.address = address);
  email && (updateFields.email = email);
  phone && (updateFields.phone = phone);
  isActive !== undefined && (updateFields.isActive = isActive);
  try {
    let user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: updateFields }, { new: true });
    return res.json({ success: true });
  } catch (err) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
