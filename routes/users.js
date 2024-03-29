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
      type: String,
      default:1
    },
    safetyAndHygiene: {
      type: String,
      default:1
    },
    variety: {
      type: String,
      default:1
    },
    taste: {
      type: String,
      default:1
    },
    portionSize: {
      type: String,
      default:1
    },
    rating: {
      type: Number,
      default:1
    },
    review: {
      type: String,
      default: "No reviews yet"
    }
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema)