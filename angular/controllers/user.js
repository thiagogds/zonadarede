/*global angular:false */
angular.module('userController', ['ngRoute', 'resources', 'facebook']).config(function ($routeProvider) {
    'use strict';

    $routeProvider.when('/', {'templateUrl' : 'views/user/login.html', 'controller' : 'UserLoginController'});
}).controller('UserLoginController', function ($scope, user, $facebook) {
    'use strict';

    $facebook.login(function (data) {
        var token, id;

        token = data.authResponse.accessToken;
        id    = data.authResponse.userID;

        user.get({'userId' : id, 'token' : token}, function (data) {
            $scope.user = data;
        }, function () {
            $scope.user = new user({
                'facebookId' : id,
                'token' : token
            });

            $scope.user.$save();
        });
    });
});
