(function() {
    angular.module('skeletonApp')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    template: 'Homepage page',
                })

                .state('temp', {
                    url: '/temp',
                    template: 'Template page',
                });

            $urlRouterProvider.otherwise('/home');
        }]);
})();
