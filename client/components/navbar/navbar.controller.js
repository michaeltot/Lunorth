'use strict';

angular.module('lunorthApp')
    .controller('NavbarCtrl', function ($scope, $state, pageService, languageService, Auth) {
        $scope.messages = languageService.texts();
    
        setUser();
    
        function setTicket(){
            if($scope.user.isLoggedIn){
                $scope.ticketRoute = 'ticket';
            } else {
                $scope.ticketRoute = 'login';
            }
        };
    
        function setUser(){
            $scope.user = {
                isLoggedIn: Auth.isLoggedIn()
            }
            
            $scope.isAdmin = Auth.isAdmin();
            
            setTicket();
        };
    
        $scope.setLanguage = function(language){
            languageService.set(language);
            $scope.language = language;
        };
    
        $scope.signOut = function(){
            Auth.logout();
            $state.go('login');
        };

        languageService.subscribe($scope, function() {
            $scope.messages = languageService.texts();
        });
    
        Auth.subscribe($scope, function() {
            setUser();
        });
    });