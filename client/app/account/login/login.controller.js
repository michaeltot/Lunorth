'use strict';

angular.module('lunorthApp')
    .controller('LoginCtrl', function ($scope, Auth, $location, $window, languageService) {
        if (!loginInProgress && Auth.isLoggedIn()) {
            Auth.logout();
        }
    
        var loginInProgress = false;
        $scope.user = {};
        $scope.errors = {};
        $scope.messages = languageService.texts();
        $scope.language = languageService.get();

        $scope.login = function (form) {
            $scope.submitted = true;
            
            loginInProgress = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function () {
                        // Logged in, redirect to ticket
                        $location.path('/ticket');
                    })
                    .catch(function (err) {
                        loginInProgress = false;
                        console.log('Error : ', err);
                        $scope.errors.other = err.message;
                    });
            }
        };

        languageService.subscribe($scope, function () {
            $scope.language = languageService.get();
            $scope.messages = languageService.texts();
        });

        Auth.subscribe($scope, function () {
            if (Auth.isLoggedIn()) {
                // Logged in, redirect to ticket
                $location.path('/ticket');
            }
        });
    });