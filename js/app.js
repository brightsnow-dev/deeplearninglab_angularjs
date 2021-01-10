var app = angular.module('app',[
    'ngRoute'
]);
app.config(['$routeProvider', function config($routeProvider){
    $routeProvider.
        when('/home',{
            templateUrl: 'views/home.html'
        }).
        when('/networks',{
            templateUrl: 'views/networks.html',
            controller: 'NetworkCtrl'
        }).
        when('/learningbase',{
            templateUrl: 'views/learningbase.html',
            controller: 'LearningBaseCtrl'
        }).
        when('/training',{
            templateUrl: 'views/training.html',
            controller: 'TrainingCtrl'
        }).
        otherwise('/home');
}])
