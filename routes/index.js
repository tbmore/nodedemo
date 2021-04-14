var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // 直接渲染模版
  res.render('index', { title: 'node-demo' });
});

module.exports = router;