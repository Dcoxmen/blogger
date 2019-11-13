const Sequelize = require("sequelize");
const db = require("../config/database");

const Post = db.define("members", {
  member_name: {
    type: Sequelize.STRING
  },
  level_group: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone_number: {
    type: Sequelize.STRING
  }
});

module.exports = Post;
