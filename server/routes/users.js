var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  let params = req.params
  console.log('params : ',params)
  let userId = params.userId
  console.log('userId : ',userId)
  res.send(req.params)
});

module.exports = router;
