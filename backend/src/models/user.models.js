const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mobileNo: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          // Validate that the mobile number is exactly 10 digits
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit mobile number!`,
      },
      required: true,
    },
    age: {
      type: Number,
      default: 18,
      min: 18,
      max: 65,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    slot: {
      type: String,
      enum: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"],
      default: "6-7AM",
    },
    dateOfPayment: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = { User };
