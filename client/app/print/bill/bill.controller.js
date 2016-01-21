'use strict';

angular.module('lunorthApp')
    .controller('PrintBillCtrl', function ($scope, $state, Auth, languageService, bill, Print) {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }
    
        if ((bill === undefined) || (bill.length === 0)) {
            $state.go('account');
        }
    
        $scope.messages = languageService.texts();
        $scope.bill = {
            items: bill,
            payGroup: bill[0].payGroup,
            payDate: new Date(bill[0].payDate).toLocaleDateString(),
            total: calculateTotal()
        };
        $scope.user = bill[0].owner;
        $scope.print = function(){
            Print.start();
        };
    
        function calculateTotal(){
            var result = 0;
            
            for(var i = 0; i < bill.length; i++){
                result += bill[i].price;
            }
            
            return result;
        };
    
        languageService.subscribe($scope, function () {
            $scope.messages = languageService.texts();
        });
    });