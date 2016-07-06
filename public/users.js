(function () {
    'use strict';

    angular.module('app')
        .component('users', {
            controller: Users,
            templateUrl: 'users.html'
        });
    Users.$inject = ['$http'];

    function Users($http) {
        var self = this;

        self.users = [];

        $http.get('/users').then(function (result) {
            self.users = result.data;
        });
    }
})();