(function () {

    var app = angular.module('eSearch', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngMaterial','elasticsearch']);

    app.config(function ($stateProvider, $urlRouterProvider) {

        /** All unmatched URLS go here */
        $urlRouterProvider.otherwise('/search');

        /** States */
        $stateProvider
            .state('SearchComponent', {
                url: '/search',
                component: 'search',
                resolve:{

                }
            })
    });
})()