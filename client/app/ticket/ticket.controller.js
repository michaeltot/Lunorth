'use strict';

angular.module('lunorthApp')
    .controller('TicketCtrl', function ($scope, $state, languageService, ticketService, datetimeService, Auth, Print) {
        if (!Auth.isLoggedIn()) {
            $state.go('login');
        }

        var items = [
                {
                    danish: {
                        name: 'spiller-billet',
                        description: 'Billetten giver adgang for een person til rollespillet "Lunorth Turneringen" den 9 til 11 september 2016.<br/>Sted: Kirketoften 4, 9500 Hobro, Danmark',
                        price: 100.00
                    },
                    english: {
                        name: 'player-ticket',
                        description: 'The ticket grants one person access to the LARP event "The Lunorth Tournament" the 9th to 11th september 2016.<br/>Location: Kirketoften 4, 9500 Hobro, Denmark',
                        price: 100.00
                    },
                    german: {
                        name: 'spieler-ticket',
                        description: 'Das Ticket gewährt eine Person Zugriff auf die LARP-Event "Die Lunorth Turnier" 9. bis 11. September 2016.<br/>Lage: Kirketoften 4, 9500 Hobro, Dänemark',
                        price: 100.00
                    }
                }
            ],
            dueDate = datetimeService.addDays(new Date(), 14);
        $scope.language = languageService.get();
        $scope.messages = languageService.texts();
        $scope.items = [];
        $scope.total = 0;
        $scope.error = '';
        $scope.message = '';
        $scope.cart = {
            dueDate: '' + dueDate.getFullYear() + '/' + (dueDate.getMonth() + 1) + '/' + dueDate.getDate(),
            items: [],
            payGroup: ''
        };
        $scope.user = Auth.getCurrentUser();
        setItems();
        
        function setItems() {
            var result = [],
                language = $scope.language;

            for (var i = 0; i < items.length; i++) {
                if (language === 'dansk') {
                    result.push(items[i].danish);
                }
                if (language === 'english') {
                    result.push(items[i].english);
                }
                if (language === 'deutsch') {
                    result.push(items[i].german);
                }
            }

            $scope.total = 0;
            $scope.items = result;
        };

        $scope.sum = function () {
            var result = 0,
                arr = $scope.items;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].amount > 0) {
                    result += (arr[i].price * arr[i].amount);
                }
            }

            $scope.total = result;
        };

        $scope.makeReservation = function () {
            $scope.error = '';
            $scope.message = '';

            var language = $scope.language,
                datetime = new Date();

            if ($scope.total === 0) {
                if (language === 'dansk') {
                    $scope.error = 'Da der ikke var valgt nogen billetter blev reserverationen annulleret.';
                }
                if (language === 'english') {
                    $scope.error = "Since no tickets where chosen, the reservation was cancelled.";
                }
                if (language === 'deutsch') {
                    $scope.error = 'Da keine Tickets wurden so gewählt, wurde die Reservierung storniert.';
                }
            } else {
                var cart = [],
                    arr = $scope.items;

                $scope.cart.items = [];
                $scope.cart.payGroup = '' + datetime.getFullYear() + datetimeService.addZero(datetime.getMonth() + 1) + datetimeService.addZero(datetime.getDate()) + '-' + datetimeService.addZero(datetime.getHours()) + datetimeService.addZero(datetime.getMinutes()) + datetimeService.addZero(datetime.getSeconds());

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].amount > 0) {
                        $scope.cart.items.push(arr[i]);

                        for (var j = 0; j < arr[i].amount; j++) {
                            cart.push(arr[i]);
                        }
                    }
                }

                save(cart, 0);
            }
        };

        function save(cart, index) {
            var currentIndex = index,
                current = {
                    owner: Auth.getCurrentUser()._id,
                    information: {
                        reservationNumber: $scope.cart.payGroup + '-' + currentIndex,
                        description: cart[index].description,
                        title: cart[index].name
                    },
                    price: cart[index].price,
                    paid: false,
                    payGroup: $scope.cart.payGroup,
                    payDate: dueDate,
                    reservationDate: new Date()
                },
                language = languageService.get();

            index++;

            ticketService.save(current)
                .then(function (reponse) {
                    if (cart.length > index) {
                        save(cart, index);
                    } else {
                        ticketService.find()
                            .then(function (response) {
                                if (response.data.length > 100) {
                                    if (language === 'dansk') {
                                        $scope.message = 'Da vi har overskredet maks antallet af deltagere til dette scenarie, undskylder vi for at vi ikke kan gennemføre bestillingen. Skulle der blive pladser ledige vil du straks få besked da vi har gemt din reservering.';
                                    }
                                    if (language === 'english') {
                                        $scope.message = "Since we have reached the limit of participants for this event, we appologies for not completing the booking. Should tickets become available we will contact you since we have saved your reservation.";
                                    }
                                    if (language === 'deutsch') {
                                        $scope.message = 'Da wir die Grenze der Teilnehmer für diese Veranstaltung erreicht, Entschuldigungen, die wir für nicht Abschluss der Buchung. Sollten Tickets erhältlich sind, werden wir Sie kontaktieren, da wir Ihre Reservierung gespeichert.';
                                    }
                                } else {
                                    if (language === 'dansk') {
                                        $scope.message = 'Reserveringen er fuldført.';
                                    }
                                    if (language === 'english') {
                                        $scope.message = "Reservation succeded.";
                                    }
                                    if (language === 'deutsch') {
                                        $scope.message = 'Reservierung gelungen.';
                                    }
                                    
                                    $state.go('printBill', { id: $scope.cart.payGroup });
                                }
                            })
                            .catch(function (error) {
                                console.log('Error : ', error);
                                $scope.error = error.message;
                            });
                    }
                })
                .catch(function (error) {
                    $scope.error = error;
                });
        }

        languageService.subscribe($scope, function () {
            $scope.language = languageService.get();
            $scope.messages = languageService.texts();
            setItems();
        });
    });