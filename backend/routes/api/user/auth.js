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

const User = require("../../../models/Users");

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();
    if (!user) return res.status(400).json({ errors: [{ msg: "Error. Kindly try again later" }] });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth/forgotpassword
// @desc    Forgot password
// @access  Public
// router.post("/forgotpassword", async (req, res, next) => {
//   //console.log(req);
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res
//       .status(404)
//       .json({ errors: [{ msg: "There is no user with that email" }] });
//   }
//   const resetToken = user.getResetPasswordToken();
//   await user.save({ validateBeforeSave: false });
//   const { name, email } = user;
//   // const resetURL = `${req.protocol}://${
//   //   req.headers["x-forwarded-host"] || req.socket.remoteAddress
//   // }/resetpassword${resetToken}`;
//   const resetURL = `${config.get(
//     "Frontend_URL"
//   )}/user/resetpassword${resetToken}`;
//   var html = pug.renderFile(`${__dirname}/../../email/reset-password.pug`, {
//     userName: name,
//     url: resetURL,
//   });
//   try {
//     let info = await devTransporter.sendMail({
//       from: `${config.get("FROM_NAME")} <${config.get("FROM_EMAIL")}> `, // sender address
//       to: email, // list of receivers
//       subject: "Reset Password", // Subject line
//       text: "Reset Password", // plain text body
//       html: html, // html body
//     });
//     console.log("Message sent: %s", info.messageId);
//     //res.status(200).json(user);
//     res.status(200).json({ msg_sent: true });
//   } catch (err) {
//     console.log(err);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });
//     return res
//       .status(400)
//       .json({ errors: [{ msg: "Error. Kindly try again later" }] });
//   }
// });

// @route   PUT api/auth/resetpassword/:resettoken
// @desc    Reset password
// @access  Public
// router.put("/resetpassword/:resetToken", async (req, res, next) => {
//   const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });
//   if (!user) {
//     return res.status(404).json({ errors: [{ msg: "Invalid Token" }] });
//   }
//   //set new password
//   const salt = await bcrypt.genSalt(10);
//   //let password = req.body.password
//   user.password = await bcrypt.hash(req.body.password, salt);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save();
//   return res.status(200).json({ status: true });
// });

// @route   PUT api/auth/resendverification
// @desc    Resend verification Email
// @access  Public
// router.post("/resendverification/", async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: "User does not exist. Kindly register" }] });
//     }
//     let name = user.name;
//     const signupToken = user.getSignupVerificationToken();
//     await user.save();
//     // const verifyURL = `${req.protocol}://${
//     //   req.headers["x-forwarded-host"] || req.socket.remoteAddress
//     // }/verify${signupToken}`;
//     const verifyURL = `${config.get("Frontend_URL")}/user/verify${signupToken}`;
//     // renderFile
//     var html = pug.renderFile(`${__dirname}/../../../email/email-verification.pug`, {
//       userName: name,
//       url: verifyURL,
//     });
//     let info = await devTransporter.sendMail({
//       from: `${config.get("FROM_NAME")} <${config.get("FROM_EMAIL")}> `, // sender address
//       to: email, // list of receivers
//       subject: "Verify Email", // Subject line
//       text: "Verify Email", // plain text body
//       html: html, // html body
//     });
//     return res.status(200).json({ status: true });
//   } catch (err) {
//     console.log(err);
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// @route   PUT api/auth/signupverify/:signuptoken
// @desc    Verify User
// @access  Public
// router.put("/signupverify/:signupToken", async (req, res, next) => {
//   const signupVerificationToken = crypto.createHash("sha256").update(req.params.signupToken).digest("hex");

//   const user = await User.findOne({
//     signupVerificationToken,
//     signupVerificationExpire: { $gt: Date.now() },
//   });
//   if (!user) {
//     return res.status(404).json({ errors: [{ msg: "Invalid Token" }] });
//   }
//   //set verified status to true
//   user.isVerified = true;
//   user.signupVerificationToken = undefined;
//   user.signupVerificationExpire = undefined;
//   await user.save();
//   return res.status(200).json({ status: true });
// });

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
  "/login",
  [check("email", "Please include valid email address").isEmail(), check("password", "Password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }).lean();
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      const payload = { user: { id: user._id, name: user.name } };
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
    let Id = generateId("USER");
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      user = new User({ Id, name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = { user: { id: user._id, name: user.name } };
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
  let adminData = await User.findById(req.user.id);
  if (!adminData) res.status(404).send({ success: false, msg: "Record does not exist" });
  let updateFields = {};
  req.body.name && (updateFields.name = req.body.name);
  req.body.phone && (updateFields.phone = req.body.phone);
  req.body.address && (updateFields.address = req.body.address);
  req.body.state && (updateFields.state = req.body.state);
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    let admin = await User.findOneAndUpdate({ _id: req.user.id }, { $set: updateFields }, { new: true });
    return res.json({ success: true, admin });
  } catch (err) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
