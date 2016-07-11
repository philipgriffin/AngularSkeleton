angular.module('skeletonApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
    }]);