'use strict';

angular.module('lunorthApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ticket', {
                url: '/ticket',
                templateUrl: 'app/ticket/ticket.html',
                controller: 'TicketCtrl',
                authenticate: true
            })
            .state('ticketList', {
                url: '/ticket/list',
                templateUrl: 'app/ticket/list/list.html',
                controller: 'TicketListCtrl',
                authenticate: true
            });
    });