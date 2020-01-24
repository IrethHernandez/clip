var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 return res.json('respond with a resource');
});

module.exports = router;
