var express = require('express');
var Task = require('../model/Task');

var router = express.Router();

/* GET tasks listing. */
router.get('/', function (req, res, next) {

  // var user = new User({ firstName: 'First' });
  // user.save(function (err, user) {
  //   if (err) return console.error(err);
  //   console.log('user saved '+user);
  // });
  Task.find().then(tasks => {
    res.json(tasks);
  }).catch(err => {
    res.send('Error occured: ' + err);
  })

});

/* Save a task */
router.post('/', function (req, res, next) {
  var newTask = new Task(req.body);
  newTask.save().then(task => {
    let savedTask = task;
    savedTask.success = true;
    res.json(savedTask);
  }).catch(err => {
    console.log(err);
    res.json({ success: false, message: err.message });
  });
});

/* Update a task */
router.put('/:id', function (req, res, next) {
  if(req.params.id === null || (req.params.id!==null && req.params.id.length === 0)) {
    res.json({ success: false, message :'Invalid request'});
    return;
  }
  if(req.body === null){
    res.json({ success: false, message :'Invalid request data'});
    return;
  }
  var query = { _id: req.params.id};
  var updates = req.body;
  var options = {new: true, runValidators: true};
  Task.findOneAndUpdate(query, updates, options, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err.message });
    }
    else if (result === null) {
      //result.success = true;
      res.statusCode = 404;
      res.json({ success: false, message :'Task not found'});
    }
    else{
      result.success = true;
      res.json(result);
    }
  });
});

/* Delete a task */
router.delete('/:id', function (req, res, next) {
  Task.findByIdAndRemove(req.params.id, function (err, result) {
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


router.get('/user/:id', function (req, res, next) {

  // var user = new User({ firstName: 'First' });
  // user.save(function (err, user) {
  //   if (err) return console.error(err);
  //   console.log('user saved '+user);
  // });
  var query = {assignedUserId: req.params.id};
  Task.find(query).then(tasks => {
    res.json(tasks);
  }).catch(err => {
    res.send('Error occured: ' + err);
  })

});

module.exports = router;
