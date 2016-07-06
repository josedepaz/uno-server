(function() {
    'use strict';

    angular.module('app', [
        'ngRoute'    
    ]).config(Config);

    Config.$inject = ['$routeProvider'];

    function Config($routeProvider){
        $routeProvider
        .when('/', {template: '<users></users>'})
        .when('/user-detail', {template: '<user-detail></user-detail>'});
    }
})();