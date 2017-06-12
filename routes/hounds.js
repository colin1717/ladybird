var express = require('express');
var router = express.Router();
var Hound = require('../models/hound');

/* GET likes */
router.get('/', function(req, res, next){
  Hound.find({}, function(err, hounds){
    if (err) {
      res.status(500).send();
    } else {
      res.json(hounds);
    }
  })
})


/* GET user's hounds */
router.get('/user', checkLoggedIn, function(req, res, next){
  var userId = req.user._id;

  Hound.find( {userId: userId }, function(err, hounds) {
    if (err) {
      res.status(500).send();
    } else {
      if (hounds) {
        res.hounds = hounds;
        res.json(hounds);
      } else {
        res.status(404).send();
      }
    }
  });
});

function checkLoggedIn(req, rex, next) {
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
};

/* POST hound */
router.post('/', function(req, res, next) {
  var userId = req.user._id;
  var url = req.body.url;
  var search_term = req.body.search_term;

  var hound = new Hound({
    userId: userId,
    url: url,
    search_term: search_term
  });

  hound.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      console.log('hound saved');
      res.json(hound);
    }
  });
});

/* Middleware to specify houndId */
router.use('/:houndId', function(req, res, next) {
  Hound.findOne({ "_id": req.params.houndId }, function(err, hound) {
    if (err) {
      res.status(500).send();
    } else {
      if (hound) {
        res.hound = hound;
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

/* GET /hounds/:houndId */
router.get('/:houndId', function(req, res, next) {
  res.json(res.hound);
});

/* PUT /hounds/:houndId */
router.put('/:houndId', function(req, res, next) {
  Hound.findByIdAndUpdate(req.params.houndId, { $set: req.body }, function(err, hound) {
    if (err) {
      res.status(500).send();
    } else {
      Hound.findOne({ '_id': req.params.houndId}, function(err, hound) {
        if (err) {
          res.status(500).send();
        } else {
          if (hound) {
            res.hound = hound;
            res.json(hound);
          } else {
            res.status(404).send();
          }
        }
      });
    }
  });
});

/* DELETE /hounds/:houndId */
router.delete('/:houndId', function(req, res, next) {
  Hound.remove({ '_id': res.hound._id }, function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
