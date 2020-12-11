var express = require('express');
var router = express.Router();
var util = require('../components/util')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('GET request to the homepage : '+util.getCurrentTime())
  res.render('index', { title: 'Express' });
});

// router.get(/d/, function(req, res, next) {
//   res.send('GET d request to the homepage')
// });


router.post('/', function (req, res) {
  res.send('POST request to the homepage : '+util.getCurrentTime())
})

module.exports = router;

