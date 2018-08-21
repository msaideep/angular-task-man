var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.status(404);
});

/* Fallback path to show error is requred */
router.all('/', function (req, res, next) {
  res.json({ success: false, message: 'Not a valid request' });
});

module.exports = router;
