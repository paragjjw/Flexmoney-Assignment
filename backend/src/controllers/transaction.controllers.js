const TransactionService = require("../services/transaction.services.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createTransaction = catchAsyncErrors(async (req, res, next) => {
  try {
    const transactionDetails = req.body;
    console.log(transactionDetails);
    const response = await TransactionService.createTransaction(
      transactionDetails
    );
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createTransaction,
};
