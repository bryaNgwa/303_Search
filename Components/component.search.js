(function () {

    var app = angular.module('eSearch');

    /** Creating the search component */
    app.component('search', {
        bindings: {

        },
        templateUrl: './Components/component.search.html',
        controller: (['$q', '$http', '$state', 'elasticVariables', 'elasticClient', '$http', '$timeout', function ($q, $http, $state, $elasticVariables, $elasticClient, $http, $timeout) {

            /** Setting component variables */
            var vm = this;

            vm.autocompleteItems = [];
            vm.searchCriteria = {
                freeText:'',
                autoCompleteSearchText:''
            }
            vm.searchReady = false;
            vm.elasticVariables = $elasticVariables;

            vm.search = elasticSearch;
            vm.autoCompleteQuery = autoComplete;


            function autoComplete(_searchString) {

                _searchString = encodeURIComponent(_searchString.toLowerCase());

                $elasticClient.search({
                    index: $elasticVariables.euiIndex,
                    q: "name:"+_searchString+"*",
                    size:10
                }).then(function (response) {
                    vm.autocompleteItems = response.hits.hits.map(function(_hit){
                        return _hit._source.name;
                    })
                    // console.log(vm.autocompleteItems);
                }, function (error) {
                    console.log('Autocomplete Error: ', error);
                })
            }

            /** Create filter function for a query string */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }

            /** Function to run the elastic search*/
            function elasticSearch() {

                /** Use the free text string if an autocomplete suggestion was not selected */
                var _searchParameters = vm.searchCriteria.freeText !== vm.searchCriteria.autoCompleteSearchText ? vm.searchCriteria.autoCompleteSearchText : vm.searchCriteria.freeText;

                _searchParameters = encodeURIComponent(_searchParameters);

                if(vm.searchCriteria.freeText !== vm.searchCriteria.autoCompleteSearchText){
                    $elasticClient.search({
                        index: $elasticVariables.euiIndex,
                        q: _searchParameters
                    }).then(function (response) {
                        var hits = response.hits.hits;
                        var results = JSON.parse(JSON.stringify(hits));
    
                        vm.searchHits = results.map(function (_hit) {
                            return _hit._source;
                        });
    
                    }, function (error) {
                        console.log(error);
                    })
                }
                
                else{
                    $elasticClient.search({
                        index: $elasticVariables.euiIndex,
                        body:{
                            'query':{
                                match:{name:_searchParameters}
                            },
                        },
                    }).then(function (response) {
                        var hits = response.hits.hits;
                        var results = JSON.parse(JSON.stringify(hits));
    
                        vm.searchHits = results.map(function (_hit) {
                            return _hit._source;
                        });
    
                    }, function (error) {
                        console.log(error);
                    })
                    
                }
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