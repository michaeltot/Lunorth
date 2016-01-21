'use strict';

angular.module('lunorthApp')
    .controller('MainCtrl', function ($scope, $http, pageService, languageService, Auth) {
        var page;
        $scope.isAdmin = Auth.isAdmin();
        $scope.edit = false;
        $scope.error = '';
        $scope.messages = languageService.texts();
        findPage();

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

        function findPage() {
            pageService.findByPage('index')
                .then(function (response) {
                    page = response;
                    $scope.page = pageService.setPage(page);
                })
                .catch(function (error) {
                    console.log('Error : ', error);
                });
        };

        languageService.subscribe($scope, function() {
            if(page === undefined){
                findPage();
            } else {
                $scope.page = pageService.setPage(page);
            }
            
            $scope.messages = languageService.texts();
        });
    });