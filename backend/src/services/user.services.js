const { User } = require("../models/user.models");

const UserService = {
  async createUser(userDetails) {
    try {
      const user = new User(userDetails);
      await user.save();
      return user;
    } catch (error) {
      return null;
    }
  },

  async getUser(query) {
    try {
      const user = await User.findOne(query);
      return user;
    } catch (error) {
      return null;
    }
  },

  async getUserAndUpdate(query, update) {
    try {
      const user = await User.findOneAndUpdate(query, update, {
        runValidators: true,
        new: true,
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  },
  async getUserAndDelete(id) {
    try {
      await User.findByIdAndDelete(id);
      return { message: "Deleted successfully" };
    } catch (error) {
      return null;
    }
  },
};

module.exports = UserService;
