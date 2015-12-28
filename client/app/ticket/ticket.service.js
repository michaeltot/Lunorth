'use strict';

angular.module('lunorthApp')
    .factory('ticketService', function ($http) {
        var service = {};
    
        service.find = function(){
            return $http.get('api/tickets/');
        };
    
        service.findByOwner = function(owner){
            return $http.get('api/tickets/owner/' + owner._id);
        };
    
        service.save = function(item){
            return $http.post('/api/tickets/', item);
        };
    
        service.update = function(item) {
            return $http.put('/api/tickets/' + item._id, item);
        };
    
        service.delete = function(id) {
            return $http.delete('/api/tickets/' + id);
        };

        return service;
    });