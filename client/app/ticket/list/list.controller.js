'use strict';

angular.module('lunorthApp')
    .controller('TicketListCtrl', function ($scope, $state, languageService, ticketService, datetimeService, Auth) {
        if (!Auth.isLoggedIn() && !Auth.isAdmin()) {
            $state.go('login');
        }

        $scope.messages = languageService.texts();
        $scope.items = [];
        $scope.deleteModal = {
                hide: true,
                item: null
            };
        $scope.isAdmin = Auth.isAdmin();
        setItems();

        function setItems() {
            ticketService.find()
                .then(function(response){
                    $scope.items = response.data;
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
    
        $scope.update = function(item){
            item.paid = true;
            item.ticketSend = false;
            item.owner = item.owner._id;
            
            ticketService.update(item)
                .then(function(response){
                })
                .catch(function(error) {
                    console.log('Error : ', error);
                });
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
    
        $scope.delete = function(item){
            ticketService.delete(item._id)
                .then(function(response){
                    $scope.deleteModal.hide = true;
                    setItems();
                })
                .catch(function(error) {
                    console.log('Error : ', error);
                    $scope.error.message = error.message;
                });
        };
    
        $scope.showDeleteModal = function(item){
            $scope.deleteModal = {
                hide: false,
                item: item
            };
        };

        languageService.subscribe($scope, function () {
            $scope.messages = languageService.texts();
        });
    });