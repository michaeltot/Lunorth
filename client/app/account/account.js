'use strict';

angular.module('lunorthApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            })
            .state('account', {
                url: '/account/:id',
                templateUrl: 'app/account/account.html',
                controller: 'AccountCtrl',
                params: {
                    id: { squash: true, value: null }
                },
                resolve: {
                    account: function ($stateParams, User) {
                        if($stateParams.id === null){
                            return null;
                        } else {
                            return User.getById({ id: $stateParams.id });
                        }
                    }
                },
                authenticate: true
            });
    });