const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 500,
  },
  accountNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Validate that the account number is between 9 to 18 digits
        return /^[0-9]{9,18}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Account number!`,
    },
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    validate: {
      validator: function (v) {
        // Validate that the ifsc code is valid
        return /^[A-Za-z]{4}\d{7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid IFSC code!`,
    },
  },
  dateOfPayment: { type: Date, default: Date.now },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Transaction = mongoose.model("transactions", transactionSchema);
module.exports = { Transaction };
