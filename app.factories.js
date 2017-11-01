(function () {
    var app = angular.module('eSearch');

    /** Elastic Search Host IP and Search Index */
    app.factory('esFactory', ['$http', '$q', function ($http, $q) {

        var factory = function (config) {
            config = config || {};
            config.connectionClass = AngularConnector;
            config.$http = $http;
            config.defer = function () {
                return $q.defer();
            };

            return new Client(config);
        };

        // return esFactory({
        //     host: 'http://35.189.79.182:9200'
        // });
    }])
})()