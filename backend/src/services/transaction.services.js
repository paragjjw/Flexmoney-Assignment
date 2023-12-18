const { Transaction } = require("../models/transaction.models");

const TransactionService = {
  async createTransaction(transactionDetails) {
    try {
      const transaction = new Transaction(transactionDetails);
      await transaction.save();
      return { message: "Transaction created successfully" };
    } catch (error) {
      return null;
    }
  },
};

module.exports = TransactionService;
