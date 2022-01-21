const express = require("express");
const router = express.Router();
const config = require("config");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");
const { devTransporter } = require("../../../utils/emailController");
const { generateId, validMongooseId } = require("../../../utils/utils");
const pug = require("pug");

const Admin = require("../../../models/Admins");

// @route   GET api/retrievals/me
// @desc    Get current users vehicle retrieval
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ date_created: -1 });
    if (!admins) {
      return res.status(400).json({ msg: "There is no admin" });
    }
    res.json({ success: true, admins });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // @route   GET api/plan/
// // @desc    Get current users profile
// // @access  Private
// router.get("/:id", async (req, res) => {
//   try {
//     const admin = await Admin.find({ planId: req.params.id })
//       .select("-password -date_created -creator -updatedAt -createdAt -_id")
//       .lean();
//     if (!admin)
//       return res.status(400).json({ success: false, msg: "Invalid request" });
//     if (admin.length == 0)
//       return res
//         .status(404)
//         .json({ success: false, msg: "Record does not exist" });
//     res.json({ success: true, admin });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route  DELETE api/plans/:id
// @desc   Delete plans route
// @access Private
// @Params  id -- id of plan
router.delete("/:id", auth, async (req, res) => {
  if (!req.params.id || !validMongooseId(req.params.id)) {
    return res.status(400).json({ success: false, msg: "invalid Request" });
  }
  try {
    let admin = await Admin.findByIdAndRemove(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, msg: "Record does not exist" });
    }
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/retrievals/me
// @desc   Retrieval route
// @access Private
router.post("/", auth, async (req, res) => {
  const { name, email, isActive, password, avatar, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: "Invalid request" });
  }
  let adminId = generateId("CMADMIN");
  let insertData = { adminId, name, email, phone };
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    insertData.password = await bcrypt.hash(password, salt);
  }
  avatar && (insertData.avatar = avatar);
  isActive && (insertData.isActive = isActive);
  insertData.creator = req.user.id;
  try {
    let admin = new Admin(insertData);
    // const salt = await bcrypt.genSalt(10);
    // admin.password = await bcrypt.hash(password, salt);
    const signupToken = admin.getSignupVerificationToken();
    //await user.save();
    // //await user.save({ validateBeforeSave: false });
    const verifyURL = `${config.get("Frontend_URL")}/verify${signupToken}`;
    //const verifyURL = `${req.protocol}://${req.headers["x-forwarded-host"]}/verify${signupToken}`;
    // renderFile
    const html = pug.renderFile(
      `${__dirname}/../../email/email-verification.pug`,
      {
        userName: name,
        url: verifyURL,
      }
    );
    let adminData = await admin.save();
    devTransporter.sendMail({
      from: `${config.get("FROM_NAME")} <${config.get("FROM_EMAIL")}> `, // sender address
      to: email, // list of receivers
      subject: "Verify Email", // Subject line
      text: "Verify Email", // plain text body
      html: html, // html body
    });
    res.status(201).send(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/retrievals/me
// @desc   Retrieval route
// @access Private
router.put("/:id", auth, async (req, res) => {
  if (!req.params.id || !validMongooseId(req.params.id)) {
    return res.status(400).json({ success: false, msg: "invalid Request" });
  }
  let adminData = await Admin.findOne({ adminId: req.params.id });
  if (!adminData)
    res.status(404).send({ success: false, msg: "Record does not exist" });
  let updateFields = {};
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(req.body.password, salt);
  }
  req.body.avatar && (updateFields.avatar = req.body.avatar);
  req.body.name && (updateFields.name = req.body.name);
  req.body.email && (updateFields.email = req.body.email);
  req.body.phone && (updateFields.phone = req.body.phone);
  req.body.role && (updateFields.role = req.body.role);
  req.body.isActive !== undefined &&
    (updateFields.isActive = req.body.isActive);
  req.body.isVerified !== undefined &&
    (updateFields.isVerified = req.body.isVerified);
  req.body.planDescription &&
    (updateFields.planDescription = req.body.planDescription);
  try {
    let admin = await Admin.findOneAndUpdate(
      { adminId: req.params.id },
      { $set: updateFields },
      { new: true }
    );
    Logger(
      req,
      Module || "Admins",
      req.method || "Update",
      admin.id,
      `Admin updated a record with id ${admin.id} and name ${admin.name}`
    );
    return res.json({ success: true });
  } catch (err) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
