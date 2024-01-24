var express = require('express');
var router = express.Router();

var userModel = require("./users");
var passport = require("passport");

var localStrategy = require("passport-local");
const { default: mongoose } = require('mongoose');

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

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

router.get('/profile',isLoggedin, async function(req, res, next) {
  const user = await userModel.findOne(
    {username : req.session.passport.user}
  )
  console.log(user);
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
