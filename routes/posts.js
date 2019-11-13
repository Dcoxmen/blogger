const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Post = require("../models/Post");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) =>
  Post.findAll()
    .then(posts => {
      res.render("posts", {
        posts
      });
    })
    .catch(err => console.log(err))
);

//Display add post form
router.get("/add", (req, res) => res.render("add"));

//Add a post
router.post("/add", (req, res) => {
  let { member_name, level_group, email, phone_number } = req.body;
  let errors = [];

  //Validate Fields
  if (!member_name) {
    errors.push({ text: "Please add member name" });
  }
  if (!level_group) {
    errors.push({ text: "Please add level group" });
  }
  if (!email) {
    errors.push({ text: "Please add member email" });
  }
  if (!phone_number) {
    errors.push({ text: "Please add member phone number" });
  }

  //Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      member_name,
      level_group,
      email,
      phone_number
    });
  } else {
    //Insert into table
    Post.create({
      member_name: member_name,
      level_group: level_group,
      email: email,
      phone_number: phone_number
    })
      .then(post => res.redirect("/posts"))
      .catch(err => console.log(err));
  }
});

module.exports = router;
