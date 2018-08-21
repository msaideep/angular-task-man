var express = require('express');
var User = require('../model/User');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  // var user = new User({ firstName: 'First' });
  // user.save(function (err, user) {
  //   if (err) return console.error(err);
  //   console.log('user saved '+user);
  // });
  User.find().then(users => {
    res.json(users);
  }).catch(err => {
    res.send('Error occured: ' + err);
  })

});
/* Save a user */
router.post('/', function (req, res, next) {
  var user = new User({ firstName: req.body.firstName });
  user.save().then(user => {
    user.success = true;
    res.json(user);
  }).catch(err => {
    console.log(err);
    user.success = false;
    res.json({ success: false, message: err.message });
  });
});

/* Delete a user */
router.delete('/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err.message });
    }
    else if (result === null) {
      //result.success = true;
      res.json({ success: false });
    }
    else {
      console.log(result);
      result.success = true;
      res.json(result);
    }
  });
});

/* Fallback path to show error is requred */
router.all('/', function (req, res, next) {
  res.json({ success: false, message: 'Not a valid request' });
});

module.exports = router;
