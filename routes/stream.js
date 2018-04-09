//import { url } from 'inspector';

/* refactored interface from hls-fetcher 
 * https://github.com/videojs/hls-fetcher
 * cli.js / CML tool */

var express = require('express');
var router = express.Router();
var path = require('path');
var fetcher = require('../hls-fetcher/src');

/* route GET stream. */
router.get('/', function(req, res, next) {
  /* illegal input url to be handled*/

  const concur = 5;
  const location = path.join(process.cwd(), 'public/download/');

  /* https://stackoverflow.com/questions/5675315/node-js-regular-expression-to-get-from-and-to */
  var pattern = /(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/i;
  var url = req.query.hlsurl;
  var directory = `${location}${pattern.exec(url)[1]}`;
  var file = `${pattern.exec(url)[1]}/${pattern.exec(url)[0]}`;
 
  var options = {
    input: url,
    output: directory,
    concurrency: concur,
    decrypt: false
  };

  fetcher(options).then(function() {
    res.send({
      flag: true,
      message: `${req.protocol}://${req.hostname}/download/${file}`
    });
    console.log(`${req.protocol}://${req.hostname}/download/${file}`);
  }).catch(function(error) {
    res.send({
      flag: false,
      message: `ERROR when fetching hls playlist`
    });
  });

});

module.exports = router;
