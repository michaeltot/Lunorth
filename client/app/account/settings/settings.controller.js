'use strict';

angular.module('lunorthApp')
    .controller('SettingsCtrl', function ($scope, $state, User, Auth, languageService) {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }

        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                        $state.go('account');
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });