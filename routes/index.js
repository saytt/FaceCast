var express = require('express');
var router = express.Router();

var imgNodeJS = "/images/image.png";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FaceCast',img : imgNodeJS });
});


module.exports = router;
