const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const crypto = require("crypto");
const { check, validationResult } = require("express-validator");
const pug = require("pug");
const { generateId, validMongooseId } = require("../../../utils/utils");

const { devTransporter } = require("../../../utils/emailController");

const Admin = require("../../../models/Admins");
// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password").lean();
    if (!user) return res.status(400).json({ errors: [{ msg: "Error. Kindly try again later" }] });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
  "/login",
  [check("email", "Please include valid email address").isEmail(), check("password", "Password is required").exists()],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email }).lean();
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      // if (!user.isVerified) {
      //   return res.status(200).json({ notVerified: true });
      // }
      const payload = { user: { id: user._id, name: user.name, role: user.role } };
      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        req.user = payload.user;
        res.json({ success: true, token, user });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  POST api/users
// @desc   Register route
// @access Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include valid email address").isEmail(),
    check("password", "Please enter a password with more than 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    let Id = generateId("ADMIN");
    try {
      let user = await Admin.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      user = new Admin({ Id, name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, async (err, token) => {
        if (err) throw err;
        res.json({ success: true, token, user });
      });
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
router.put("/profile/", auth, async (req, res) => {
  let adminData = await Admin.findById(req.user.id);
  if (!adminData) return res.status(404).send({ success: false, msg: "Record does not exist" });
  let updateFields = {};
  req.body.name && (updateFields.name = req.body.name);
  req.body.phone && (updateFields.phone = req.body.phone);
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    let admin = await Admin.findOneAndUpdate({ _id: req.user.id }, { $set: updateFields }, { new: true });
    return res.json({ success: true, admin });
  } catch (err) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
