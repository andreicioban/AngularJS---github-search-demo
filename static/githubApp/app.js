'use strict';

var githubApp = angular.module('githubApp', [
        'ngRoute',
        'ngResource',
        'MainCtrl',
        'Utils',
        'Config'
]);

githubApp.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'MainCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);