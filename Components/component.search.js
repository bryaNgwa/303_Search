(function () {

    var app = angular.module('eSearch');

    /** Creating the search component */
    app.component('search', {
        bindings: {

        },
        templateUrl: './Components/component.search.html',
        controller: (['$q', '$http', '$state', 'elasticVariables', 'elasticClient', '$http', function ($q, $http, $state, $elasticVariables, $elasticClient, $http) {

            /** Setting component variables */
            var vm = this;

            vm.searchReady = false;
            vm.elasticVariables = $elasticVariables;

            vm.search = elasticSearch;

            // console.log($elasticClient);
            // $elasticClient.search({
            //     index:$elasticVariables.euiIndex,
            //     q:'bryan',
            //     size: 50,
            // }).then(function(resp){
            //     var hits = resp.body.hits;
            //     console.log(hits);
            // });

            /** Function to run the elastic search*/
            function elasticSearch(_searchParameters) {

                var _searchUrl = $elasticVariables.euiHost + "/" + $elasticVariables.euiIndex + "/_search?q=" + _searchParameters;
                $elasticClient.search({
                    index:$elasticVariables.euiIndex,
                    q:'bryan'
                }).then(function(response){
                    var hits = resp.body.hits;
                    $scope.searchHits = hits;
                },function(error){
                    console.log(error);
                })
            }

            function loadData() {
                var data = [];

                try {
                    return $q.all(data);
                } catch (error) {
                    logError(error);
                    return null;
                }

            }

            function bootstrapView(_data) {
                vm.initialData = _data;
            }

            function logError(error) {
                console.error(error);
            }

            function init() {
                loadData().then(bootstrapView).catch(logError).finally(function () {
                    vm.searchReady = true;
                    console.log('Search Ready');
                })
            }

            vm.$onInit = function () {
                init();
            }

        }])
    });

})();