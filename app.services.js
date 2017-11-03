(function(){
    var app = angular.module('eSearch');

        /** Elastic Search Host IP and Search Index */
        app.service('elasticClient', function(esFactory){
            return esFactory({
                host: 'http://35.189.79.182:9200',
                // connectionClass: "default"
            });
        })
})()