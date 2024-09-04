var express = require('express');
var router = express.Router();
const User = require("../models/users.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    // Pass the user data to the template
    res.render('home-page', { title: 'Home page', username: req.body.username });
});


router.get("/about", (req, res) => {
  res.render('about', {title: "About us"});
});

router.get("/login", (req, res) => {
  res.render("login", {title: "login"});
});

router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    if(!user){
      res.status(401).json({message: "Incorrect username"});
    }

    const isMatch = await user.comparePasswords(req.body.userpassword);
    if(!isMatch){
      res.status(401).json({message: "Incorrect password"});
    }

    const token = user.genToken();
    res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: false});
    // res.json({message: `User ${user.username} login success!`});


    res.redirect("/");
}catch(err) {
    res.status(401).send("Something went wrong try again later", err.message);
}
});

router.get("/signup", (req, res) => {
  res.render("signup", {title: "create account"})
});

router.post("/signup", async(req, res) => {
  try{
    const user = new User({
      username: req.body.username,
      useremail: req.body.useremail,
      userpassword: req.body.userpassword
    });

    await user.save()
    res.status(200).json({message: `User ${user.username} has successfuly signed in..`});
  }catch (err){
    res.status(401).send(err.message);
  }
});

module.exports = router;
