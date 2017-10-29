(function () {

    var app = angular.module('eSearch');

    /** Creating the search component */
    app.component('search', {
        bindings: {

        },
        templateUrl: './Public/Components/component.search.html',
        controller: (['$q', '$http', '$state', 'elasticVariables', 'elasticClient', function ($q, $http, $state, $elasticVariables, $elasticClient) {

            /** Setting component variables */
            var vm = this;

            vm.searchReady = false;
            vm.elasticVariables = $elasticVariables;

            vm.search = elasticSearch;

            /** Function to run the elastic search*/
            function elasticSearch(_searchParameters) {

                $elasticClient.search({
                    index: $elasticVariables.euiIndex,
                    q: _searchParameters,
                    type: 'default'
                }).then(function (body) {
                    console.log(body);
                    var hits = body.hits.hits;
                    vm.searchResults = hits;
                }, function (error) {
                    logError(error);
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