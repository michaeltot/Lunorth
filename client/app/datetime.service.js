'use strict';

angular.module('lunorthApp')
    .factory('datetimeService', function ($http) {
        var service = {};
    
        //  Add days to a given date. 
        service.addDays = function(startDate, numberOfDays) {
            var result = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + numberOfDays,
                    startDate.getHours(),
                    startDate.getMinutes(),
                    startDate.getSeconds()
                );
            
            return result;
        };
    
        service.addZero = function(digits) {
            return ("0" + digits).slice(-2);
        };

        return service;
    });