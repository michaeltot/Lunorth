'use strict';

angular.module('lunorthApp')
    .controller('PageCtrl', function ($scope, pageService, languageService, page, Auth) {
        $scope.page = pageService.setPage(page);
        $scope.isAdmin = Auth.isAdmin();
        $scope.edit = false;
        $scope.error = '';

        $scope.save = function () {
            pageService.update($scope.page, page)
                .then(function (response) {
                    page = response.data;
                    $scope.page = pageService.setPage(page);
                    $scope.edit = false;
                })
                .catch(function (error) {
                    console.log('Error : ', error);
                    $scope.error = error.message;
                });
        };

        languageService.subscribe($scope, function () {
            $scope.page = pageService.setPage(page);
        });
    });