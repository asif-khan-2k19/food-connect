var express = require('express');
var router = express.Router();

var userModel = require("./users");
var foodModel = require("./food");

var passport = require("passport");

var localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/home',isLoggedin, function(req, res, next) {
  res.render('home');
}); 

router.get('/editprofile', isLoggedin, async function(req, res, next) {
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  res.render('edit', {user: user});
});

router.post('/updateprofile', isLoggedin, async function(req, res, next) {
  const user = await userModel.findOneAndUpdate(
    {username : req.session.passport.user},
    {
      username: req.body.username,
      name : req.body.name,
      phone : req.body.phone,
      from : req.body.from,
      address : req.body.address
    },
    {new: true}
  )
  await user.save();
  
  res.redirect('/profile')
});

router.post('/donatefood', isLoggedin, async function(req, res, next){
  const user = await userModel.findOne({username : req.session.passport.user});
  console.log(user);
  const food = await foodModel.create({
    pickupLocation: req.body.pickupLocation,
    pickupDate: req.body.pickupDate,
    pickupTime: req.body.pickupTime,
    foodItems: req.body.foodItems,
    foodQuantity: req.body.foodQuantity,
    donatedBy: user._id
  });
  
  console.log("Food: " ,food._id)

  user.donations.push(food._id);
  await user.save();
  res.redirect('/home');
});

router.get('/upload', isLoggedin, function(req, res, next) {
  res.render('upload');
});

router.get('/profile',isLoggedin, async function(req, res, next) {
  const user = await userModel.findOne(
    {username : req.session.passport.user}
  )
  res.render('profile', {user: user});
});

router.post('/register', function(req, res){
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password).then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })
  console.log(userData);
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/");
  })
})

function isLoggedin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
