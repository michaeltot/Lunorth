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
                
                    if(page === undefined){
                        $http.get('/api/pages/page/' + pageName)
                            .then(function(response){
                                $localStorage.pages.push(response.data);
                                promise.resolve(response.data);
                            })
                            .catch(function(error){
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

            if ($localStorage.pages !== undefined) {
                $http.get('/api/pages/')
                    .then(function (response) {
                        $localStorage.pages = response.data;
                        promise.resolve($localStorage.pages);
                    })
                    .catch(function (error) {
                        promise.reject(error);
                    });
            } else {
                console.log('local : ', $localStorage.pages);
                promise.resolve($localStorage.pages);
            }

            return promise.promise;
        };

        return service;
    });