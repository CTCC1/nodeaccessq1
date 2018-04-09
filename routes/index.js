var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    {
      title: 'hls-fetching web app',
      content: 'Input a link to HLS playlist to generate a link for playback on our server.' 
    });
});

module.exports = router;
