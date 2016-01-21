'use strict';

angular.module('lunorthApp')
    .controller('PrintTicketCtrl', function ($scope, $state, Auth, languageService, ticket, Print) {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }
    
        if (ticket === undefined) {
            $state.go('account');
        }
    
        $scope.messages = languageService.texts();
        $scope.ticket = ticket;
        $scope.user = ticket.owner;
        $scope.print = function(){
            Print.start();
        };
    
        console.log('$scope.ticket : ', $scope.ticket);
    
        languageService.subscribe($scope, function () {
            $scope.messages = languageService.texts();
        });
    });