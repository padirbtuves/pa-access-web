
angular.module('paApp', ['ui.utils', 'ui.bootstrap'])
    .factory('AccessService', ['$http', function ($http) {
        return {
            load: function (callback) {
                $http.get('/app/user/all')
                    .success(function (data, status, header, config) {
                        callback(data);
                    })
                    .error(function (data, status, header, config) {
                        alert("error");
                    });
            },
            currentUser: function (callback) {
                $http.get('/app/user/current')
                    .success(function (data, status, header, config) {
                        callback(data);
                    })
                    .error(function (data, status, header, config) {
                        alert("error");
                    });
            },
            updateUser: function (user, callback) {
                $http.post('/app/user/update', user)
                    .success(function (data, status, header, config) {
                        callback(data);
                    })
                    .error(function (data, status, header, config) {
                        alert("error");
                    });
            }
        }
    }])
    .controller('AccessController', ['$scope', 'AccessService', function ($scope, AccessService) {

        $scope.editMode = false;

        AccessService.currentUser(function (user) {
            $scope.user = user;
            if (user.admin) {
                AccessService.load(function (users) {
                    $scope.users = users;
                });
            }
        });

        $scope.updateUser = function (user) {
            AccessService.updateUser(user, function (data) {});
        };

        $scope.update = function () {
            if ($scope.editMode) {
                //save stuff
                AccessService.updateUser($scope.user, function (data) {
                    $scope.editMode = false;
                });
            } else {
                // enable editing
                $scope.editMode = true;
            }
        };

        $scope.keyCallback = function ($event) {
            //$event.preventDefault();
            alert("Asd");
        };

    }]);