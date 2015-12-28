'use strict';

angular.module('lunorthApp')
    .factory('Print', function Auth() {
        return {

            /**
             *  Event listener
             */
            start: function() {
                var elemToPrint = document.getElementById('printSection');

                if (elemToPrint) {
                    window.print();
                }

                window.onafterprint = function () {
                    // clean the print section before adding new content
                    elemToPrint.innerHTML = '';
                }
            }
        };
    });