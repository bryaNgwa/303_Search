(function(){
    var app = angular.module('eSearch');

    /** Elastic Search Host IP and Search Index */
    app.constant('elasticVariables',{
        euiHost: 'http://35.189.79.182:9200',
        euiIndex: 'productstest'
    })
})()