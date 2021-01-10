var app = angular.module('app',[
    'ngRoute'
]);
app.config(['$routeProvider', function config($routeProvider){
    $routeProvider.
        when('/welcome',{
            templateUrl: 'views/index_view.html',
        })
        .otherwise({
            redirectTo: '/welcome'
        })
}]);
