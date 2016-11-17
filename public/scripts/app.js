angular.module('contactlistApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        console.log($routeProvider);
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: '/views/main.html'
            })
            .otherwise( { redirectTo: '/' } );
    }]);
