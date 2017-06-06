var passport = require('passport');
var User = require('../models/user');

module.exports = function() {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  return passport;
}
