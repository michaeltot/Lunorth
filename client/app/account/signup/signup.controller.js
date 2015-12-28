'use strict';

angular.module('lunorthApp')
    .controller('SignupCtrl', function ($scope, Auth, $location, $window, languageService) {
        $scope.user = {};
        $scope.errors = {};
        $scope.messages = languageService.texts();

        $scope.register = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function () {
                        // Account created, redirect to home
                        $location.path('/ticket');
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    
        languageService.subscribe($scope, function(){
            $scope.messages = languageService.texts();
        });
    });