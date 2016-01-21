'use strict';

angular.module('lunorthApp')
    .factory('pageService', function ($http, $localStorage, $q, languageService) {
        var service = {};

        service.find = function () {
            return get();
        };

        service.findByPage = function (pageName) {
            var promise = $q.defer();

            get()
                .then(function (response) {
                    var pages = response,
                        page;

                    for (var i = 0; i < pages.length; i++) {
                        if (pages[i].page === pageName) {
                            page = pages[i];
                        }
                    }

                    if (page === undefined) {
                        $http.get('/api/pages/page/' + pageName)
                            .then(function (response) {
                                if ($localStorage.pages === undefined) {
                                    $localStorage.pages = [];
                                }

                                console.log('$localStorage.pages : ', $localStorage.pages);
                                console.log('response.data : ', response.data);

                                $localStorage.pages.push(response.data);
                                promise.resolve(response.data);
                            })
                            .catch(function (error) {
                                promise.reject(error);
                            });
                    } else {
                        promise.resolve(page);
                    }
                })
                .catch(function (error) {
                    promise.reject(error);
                });

            return promise.promise;
        };

        service.update = function (item, page) {
            var language = languageService.get();
            console.log('language : ', language);

            if (language === 'dansk') {
                page.content.dansk = item;
            }
            if (language === 'english') {
                page.content.english = item;
            }
            if (language === 'deutsch') {
                page.content.deutsch = item;
            }

            console.log('page : ', page);

            return $http.put('/api/pages/' + page._id, page);
        };

        service.setPage = function (page) {
            var language = languageService.get();

            if (language === 'dansk') {
                return page.content.dansk;
            }
            if (language === 'english') {
                return page.content.english;
            }
            if (language === 'deutsch') {
                return page.content.deutsch;
            }

            return null;
        };

        function get() {
            var promise = $q.defer();

            $http.get('/api/pages/')
                .then(function (response) {
                    if (response.data._id !== undefined) {
                        $localStorage.pages = [];
                        $localStorage.pages.push(response.data);
                    } else {
                        $localStorage.pages = response.data;
                    }

                    console.log('$localStorage.pages : ', $localStorage.pages);
                    console.log('response.data : ', response.data);

                    promise.resolve($localStorage.pages);
                })
                .catch(function (error) {
                    promise.reject(error);
                });

            return promise.promise;
        };

        return service;
    });