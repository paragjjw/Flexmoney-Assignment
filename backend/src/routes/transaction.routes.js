const express = require("express");

const { createTransaction } = require("../controllers/transaction.controllers");

const TransactionRouter = express.Router();

TransactionRouter.post("/create", createTransaction);

module.exports = { TransactionRouter };
