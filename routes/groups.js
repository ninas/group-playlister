var express = require('express');
var router = express.Router();

router.param('group', function(req, res, next, group) {
  console.log('doing name validations on ' + group);

  req.group = group;
  next();       
});

router.get('/:group', function(req, res) {
  console.log(req.params);
  res.render('index', { groupName: req.params.group });
});

module.exports = router;
