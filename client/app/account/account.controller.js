'use strict';

angular.module('lunorthApp')
    .controller('AccountCtrl', function ($scope, $state, Auth, ticketService, languageService, datetimeService, account) {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }

        $scope.errors = {};
        $scope.user = account !== null ? account : Auth.getCurrentUser();
        $scope.tickets = [];
        $scope.messages = languageService.texts();
        getTickets();
    
        function getTickets(){
            ticketService.findByOwner($scope.user)
                .then(function(response){
                    $scope.tickets = response.data;
                })
                .catch(function(error){
                    console.log('Error : ', error);
                });
        };
    
        $scope.banned = function(item){
            var dueDate = new Date(item.payDate),
                today = new Date();
            
            return ((today > dueDate) && !item.paid);
        };
    
        $scope.waiting = function(item){
            var dueDate = new Date(item.payDate),
                today = new Date();
            
            return ((today < dueDate) && !item.paid);
        };
    
        languageService.subscribe($scope, function() {
            $scope.messages = languageService.texts();
        });
    });