'use strict';

angular.module('lunorthApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('page', {
                url: '/page/:page',
                templateUrl: 'app/page/page.html',
                controller: 'PageCtrl',
                resolve: {
                    page: function ($stateParams, pageService) {
                        console.log('page : ', $stateParams.page);
                        return pageService.findByPage($stateParams.page)
                            .then(function (response) {
                                return response;
                            })
                            .catch(function (error) {
                                console.log('Error : ', error);
                                return undefined;
                            });
                    }
                }
            });
    });