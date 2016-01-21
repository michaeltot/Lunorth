'use strict';

angular.module('lunorthApp')
    .config(function ($stateProvider) {
        var findById = function (id, service) {
                return service.findById(id)
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        console.log('Error : ', error);
                        return undefined;
                    });
            },
            findByGroup = function (id, service) {
                return service.findByGroup(id)
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        console.log('Error : ', error);
                        return undefined;
                    });
            };

        $stateProvider
            .state('printTicket', {
                url: '/print/ticket/:id',
                templateUrl: 'app/print/ticket/ticket.html',
                controller: 'PrintTicketCtrl',
                authenticate: true,
                resolve: {
                    ticket: function($stateParams, ticketService){
                        return findById($stateParams.id, ticketService);
                    }
                }
            })
            .state('printBill', {
                url: '/print/bill/:id',
                templateUrl: 'app/print/bill/bill.html',
                controller: 'PrintBillCtrl',
                authenticate: true,
                resolve: {
                    bill: function($stateParams, ticketService){
                        return findByGroup($stateParams.id, ticketService);
                    }
                }
            });
    });