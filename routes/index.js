var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home-page', { title: 'Travel hotel global' });
});

router.get('/about', (req, res) => {
  res.render('about', {title: "About us"});
});

router.get("/login", (req, res) => {
  res.render("login", {title: "Login"});
});

module.exports = router;
