const express = require("express");

const {
  createUser,
  getUser,
  editUser,
  seleteUser,
  deleteUser,
} = require("../controllers/user.controllers");

const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/fetch", getUser);
UserRouter.patch("/edit/:id", editUser);
UserRouter.delete("/remove/:id", deleteUser);

module.exports = { UserRouter };
