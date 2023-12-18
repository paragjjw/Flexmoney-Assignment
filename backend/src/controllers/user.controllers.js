const UserService = require("../services/user.services.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const userDetails = req.body;
    const response = await UserService.createUser(userDetails);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUser = catchAsyncErrors(async (req, res, next) => {
  const { mobileNo } = req.query;
  try {
    const userDetails = await UserService.getUser({ mobileNo: mobileNo });
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const userDetails = await UserService.getUserAndUpdate({ _id: id }, update);
    // console.log(userDetails);
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const msg = await UserService.getUserAndDelete(id);
    res.status(200).send(msg);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
};
