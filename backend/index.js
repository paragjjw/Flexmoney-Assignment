require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./src/middleware/error.js");

const app = express();
const port = process.env.PORT;

const connection = require("./db/connection");

const bodyParser = require("body-parser");

const cors = require("cors");

const { UserRouter } = require("./src/routes/user.routes");
const { TransactionRouter } = require("./src/routes/transaction.routes");

// middleware
app.use(errorMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  optionSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

//end-points
app.use("/api/user", UserRouter);
app.use("/api/transaction", TransactionRouter);

app.listen(port, async () => {
  try {
    await connection();
    console.log(`your server is running on port ${port} `);
  } catch (error) {
    console.log(error);
  }
});
