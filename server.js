var express = require('express');
var router = express.Router();
var path = require('path');

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
    host: 'http://35.189.79.182:9200',
    log:'error'
});

esClient.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

/** Get home page */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname, '../', 'views', 'indext.html'));
});

module.exports = router;