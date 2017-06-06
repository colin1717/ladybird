var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(req, res, next) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(users);
    }
  });
});

/* Post User */
router.post('/', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(user);
    }
  });
});

/* middleware */
router.use('/:userId', function(req, res, next) {
  User.findOne({'_id': req.params.userId}, function(err, user) {
    if (err) {
      res.status(500).send();
    } else {
      if (user) {
        res.user = user;
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

/* GET /users/:userId */
router.get('/:userId', function(req, res, next) {
  res.json(res.user)
});

/* PUT /users/:userId */
router.put('/:userId', function(req, res, next) {
  User.findByIdAndUpdate(req.params.userId, { $set: req.body }, function(err, user) {
    if (err) {
      res.status(500).send();
    } else {
      User.findOne({ "_id": req.params.userId }, function(err, user) {
        if (err) {
          res.status(500).send();
        } else {
          if (user) {
            res.user = user;
            res.json(user);
          } else {
            res.status(404).send();
          }
        }
      });
    }
  });
});

/* Delete /user/:userId */
router.delete('/:userId', function(req, res, next) {
  User.remove({ "_id": res.user._id}, function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});



module.exports = router;
