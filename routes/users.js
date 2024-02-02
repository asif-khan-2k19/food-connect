const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/food-connect")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  phone: [{
    type: Number
  }],
  password: {
    type: String
  },
  address : {
    type: String
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  profilePicture:{
    type: String
  },
  from:{
    type: String
  },
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }]
})

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema)