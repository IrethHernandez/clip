var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
 return res.send('success');
});

module.exports = router;
