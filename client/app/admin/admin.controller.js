'use strict';

angular.module('lunorthApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User) {
        if (!Auth.isLoggedIn() && !Auth.isAdmin()) {
            $state.go('login');
        }

        // Use the User $resource to fetch all users
        $scope.users = User.query();
        $scope.deleteModal = {
                hide: true,
                item: null
            };

        $scope.delete = function (user) {
            User.remove({
                id: user._id
            }, function(){
                $scope.deleteModal.hide = true;
            });
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };
    
        $scope.showDeleteModal = function(item){
            $scope.deleteModal = {
                hide: false,
                item: item
            };
        };
    });