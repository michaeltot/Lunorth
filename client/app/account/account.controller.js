'use strict';

angular.module('lunorthApp')
    .controller('AccountCtrl', function ($scope, $state, Auth, Print, ticketService, languageService, datetimeService, account) {
        console.log('Auth.isLoggedIn()', Auth.isLoggedIn());
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        } else {
            if(!Auth.isAdmin()) {
                if(account === null) {
                    account = Auth.getCurrentUser();
                } else if(account._id !== Auth.getCurrentUser()._id){
                    $state.go('main');
                }
            }
        }

        $scope.errors = {};
        $scope.user = {};
        $scope.tickets = [];
        $scope.messages = languageService.texts();
        $scope.ticket = {
                show: false,
                item: undefined
            };
        $scope.bill = {
                show: false,
                item: undefined
            };
        $scope.isAdmin = Auth.isAdmin();
        setUser();
    
        function setUser(){
            if(account === null){
                $scope.user = Auth.getCurrentUser();
                getTickets();
            } else {
                account.$promise.then(function(response) {
                    $scope.user = response;
                    getTickets();
                });
            }
        };
    
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
    
        $scope.printTicket = function(item){
            $scope.bill.show = false;
            $scope.ticket = item;
            Print.start();
        };
    
        $scope.isSend = function(item){
            item.ticketSend = true;
            item.owner = item.owner._id;
            
            ticketService.update(item)
                .then(function(response){
                })
                .catch(function(error) {
                    console.log('Error : ', error);
                });
        };
    
        languageService.subscribe($scope, function() {
            $scope.messages = languageService.texts();
        });
    });