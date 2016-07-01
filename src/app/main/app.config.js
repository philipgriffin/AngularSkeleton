angular.module('skeletonApp')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                template: 'Homepage page'
            })

            .state('temp', {
                url: '/temp',
                template: 'Template page'
            });
    });