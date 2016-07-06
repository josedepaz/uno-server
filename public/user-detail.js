(function () {
    'use strict';

    angular.module('app')
        .component('userDetail', {
            controller: UserDetail,
            templateUrl: 'user-detail.html'
        });

    UserDetail.$inject = ['$http'];

    function UserDetail($http) {
        var self = this;

        self.user = {};

        self.saveUser = saveUser;

        function saveUser() {
            $http.post('/users', self.user).then(function (result) {
                alert("Usuario guardado exitosamente " + result.data.name + " " + result.data.lastname);
            });
        }
    }
})();