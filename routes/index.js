var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LadyBird' });
});

router.post('/signup', function(req, res, next) {
  var user = new User({ username: req.body.username });
  User.register(user, req.body.password, function(error) {
    if (error) {
      res.send(error);
    } else {
      req.login(user, function(loginError) {
        if (loginError) {
          res.send(loginError);
        } else {
          res.redirect('/itworks');
        }
      });
    }
  });
});

function checkLoggedIn(req, res,next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/itworks', checkLoggedIn, function(req, res, next) {
  res.render('itworks');
})

module.exports = router;