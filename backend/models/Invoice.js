const mongoose = require("mongoose");
const User = require("./Users");

const InvoiceSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    invoiceDate: {
      required: true,
      type: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Invoice = mongoose.model("invoices", InvoiceSchema);
