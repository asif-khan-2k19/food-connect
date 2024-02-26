var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/food-connect");

const foodSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  foodQuantity: {
    type: Number,
  },
  foodItems: {
    type: String,
  },
  pickupLocation: {
    type: String,
  },
  pickupDate: {
    type: String,
  },
  pickupTime: {
    type: String,
  },
  donatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// foodSchema.plugin(plm);

module.exports = mongoose.model("Food", foodSchema);
