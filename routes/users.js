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
  }],
  reviews: {
    freshness : {
      type: Number,
      default: 0
    },
    safetyAndHygiene: {
      type: Number,
      default: 0
    },
    variety: {
      type: Number,
      default: 0
    },
    taste: {
      type: Number,
      default: 0
    },
    portionSize: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    review: {
      type: String,
      default: "No review"
    }
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema)