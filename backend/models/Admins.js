const mongoose = require("mongoose");
// const crypto = require("crypto");

const AdminSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    superAdmin: Boolean,
    password: {
      required: true,
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// //Generate and hash paswword token
// AdminSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

// //Generate and hash signup verification token
// AdminSchema.methods.getSignupVerificationToken = function () {
//   const signupToken = crypto.randomBytes(32).toString("hex");
//   this.signupVerificationToken = crypto.createHash("sha256").update(signupToken).digest("hex");
//   this.signupVerificationExpire = Date.now() + 1440 * 60 * 1000;
//   return signupToken;
// };

module.exports = Admin = mongoose.model("admins", AdminSchema);
