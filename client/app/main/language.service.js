'use strict';

angular.module('lunorthApp')
    .factory('languageService', function ($http, $localStorage, $rootScope) {
        var service = {};

        service.set = function(value) {
            $localStorage.language = value;
            
            $rootScope.$emit('language-service-event');
            
            return $localStorage.language;
        };
    
        service.get = function() {
            return get();
        };
    
        service.subscribe = function(scope, callback) {
            var handler = $rootScope.$on('language-service-event', callback);
            scope.$on('$destroy', handler);
        };
    
        service.texts = function(){
            var language = get(),
                messages = {};
            
            if(language === 'dansk'){
                messages.accountReturn = "Tilbage til profil";
                messages.readMore = "Læs mere";
                messages.invalidPassword = 'Indtast email og password.';
                messages.invalidEmail = 'Indtast gyldig email.';
                messages.invalidName = 'Indtast gyldigt navn.';
                messages.askForEmail = 'Hvad er din email?';
                messages.signUp = 'Registrer';
                messages.login = 'Log ind';
                messages.minLengthPassword = 'Password skal minimum være på 3 tegn.';
                messages.name = 'Navn';
                messages.itemName = 'Vare navn';
                messages.itemDescription = 'Beskrivelse';
                messages.itemPrice = 'Pris';
                messages.reserve = 'Reservér';
                messages.bill = 'Regning';
                messages.billConfirmation = 'Bekræftelse på reservation';
                messages.billAdditions = 'Ved betaling vedhæft følgende';
                messages.billBookingNr = 'Reservations nr';
                messages.billPaymentTo = 'Betaling til';
                messages.billAccountNr = 'Konto nr';
                messages.billAccountOwner = 'Ejer';
                messages.billDueDate = 'Indbetaling senest';
                messages.billTotal = 'Ialt at betale';
                messages.billPrint = 'Klik for at printe regning';
                messages.users = 'Brugere';
                messages.ticket = 'Billetter';
                messages.ticketList = 'Billet liste';
                messages.ticketMyList = 'Mine billetter';
                messages.ticketOrdered = 'Bestilte billetter';
                messages.ticketPrint = 'Print billet';
                messages.ticketClickToPrint = 'Klik for at printe billet';
                messages.ticketSend = 'Billetten er sendt';
                messages.ticketNotSend = 'Billetten er ikke sendt';
                messages.signOut = 'Log ud';
                messages.account = 'Profil';
                messages.email = 'Email';
                messages.password = 'Adgangskode';
                messages.change = 'Ændre';
                messages.paymentWaiting = 'Betaling afventes';
                messages.paymentOverdue = 'Betalingsfrist overskredet';
                messages.paymentApproved = 'Betaling gennemført';
                messages.owner = 'Ejer';
                messages.status = 'Status';
                messages.paid = 'Betalt';
                messages.delete = 'Slet';
                messages.bookingNr = 'Reservations nr';
                messages.navHome = 'Forside';
                messages.navRules = 'Regler';
                messages.navConcept = 'Koncept';
                messages.navTickets = 'Billetter';
                messages.navIntroduction = 'Introduktion';
                messages.navTournament = 'Turnering';
                messages.navCharacters = 'Helte & Skurke';
                messages.navWorld = 'Verdenen';
                messages.navPractical = 'Praktisk';
            }
            if(language === 'english'){
                messages.accountReturn = "Return to profile";
                messages.readMore = "Read more";
                messages.invalidPassword = 'Please enter your email and password.';
                messages.invalidEmail = 'Please enter a valid email.';
                messages.invalidName = 'Please enter a valid name.';
                messages.askForEmail = "What's your email address?";
                messages.signUp = 'Sign up';
                messages.login = 'Login';
                messages.minLengthPassword = 'Password must be at least 3 characters.';
                messages.name = 'Name';
                messages.itemName = 'Item name';
                messages.itemDescription = 'Description';
                messages.itemPrice = 'Price';
                messages.reserve = 'Reserve';
                messages.bill = 'Bill';
                messages.billConfirmation = 'Booking confirmation';
                messages.billAdditions = 'When paying attach the following';
                messages.billBookingNr = 'Booking no';
                messages.billPaymentTo = 'Payment to';
                messages.billAccountNr = 'Account no';
                messages.billAccountOwner = 'Owner';
                messages.billDueDate = 'Payment before';
                messages.billTotal = 'Total cost';
                messages.billPrint = 'Click to print bill';
                messages.users = 'Users';
                messages.ticket = 'Tickets';
                messages.ticketList = 'Tickets list';
                messages.ticketMyList = 'My tickets';
                messages.ticketOrdered = 'Ordered tickets';
                messages.ticketPrint = 'Print ticket';
                messages.ticketClickToPrint = 'Click to print ticket';
                messages.ticketSend = 'Ticket has been send';
                messages.ticketNotSend = "Ticket hasn't been send yet";
                messages.signOut = 'Sign out';
                messages.account = 'Account';
                messages.email = 'Email';
                messages.password = 'Password';
                messages.change = 'Change';
                messages.paymentWaiting = 'Payment awaiting';
                messages.paymentOverdue = 'Payment overdue';
                messages.paymentApproved = 'Paid';
                messages.owner = 'Owner';
                messages.status = 'Status';
                messages.paid = 'Paid';
                messages.delete = 'Remove';
                messages.bookingNr = 'Booking nr';
                messages.navHome = 'Home';
                messages.navRules = 'Rules';
                messages.navConcept = 'Concept';
                messages.navTickets = 'Tickets';
                messages.navIntroduction = 'Introduction';
                messages.navTournament = 'Tournament';
                messages.navCharacters = 'Heroes & Rogues';
                messages.navWorld = 'The World';
                messages.navPractical = 'Practical';
            }
            if(language === 'deutsch'){
                messages.accountReturn = "Zurück zum Profil";
                messages.readMore = "Weiterlesen";
                messages.invalidPassword = 'Bitte geben Sie Ihre E-Mail und Passwort.';
                messages.invalidEmail = 'Bitte geben Sie eine gültige Email-Adresse ein.';
                messages.invalidName = 'Bitte geben Sie einen gültigen Namen ein.';
                messages.askForEmail = 'Wie ist deine E-Mail-Adresse?';
                messages.signUp = 'Anmeldung';
                messages.login = 'Anmelden';
                messages.minLengthPassword = 'Das Passwort muss mindestens 3 Zeichen lang sein.';
                messages.name = 'Name';
                messages.itemName = 'Artikelbezeichnung';
                messages.itemDescription = 'Beschreibung';
                messages.itemPrice = 'Preis';
                messages.reserve = 'Reservieren';
                messages.bill = 'Rechnung';
                messages.billConfirmation = 'Buchungsbestätigung';
                messages.billAdditions = 'Bei Zahlung fügen Sie die folgenden';
                messages.billBookingNr = 'Reservierung nr';
                messages.billPaymentTo = 'Zahlung an';
                messages.billAccountNr = 'Konto nr';
                messages.billAccountOwner = 'Inhaber';
                messages.billDueDate = 'Zahlung vor';
                messages.billTotal = 'Gesamtkosten';
                messages.billPrint = 'Klicken Sie hier um bill drucken';
                messages.users = 'Benutzer';
                messages.ticket = 'Karten';
                messages.ticketList = 'Karten liste';
                messages.ticketMyList = 'Meine Karten';
                messages.ticketOrdered = 'Bestellten Karten';
                messages.ticketPrint = 'Drucken Sie Ihr Ticket';
                messages.ticketClickToPrint = 'Klicken, um Ticket ausdrucken';
                messages.ticketSend = 'Karte wurde gesendet';
                messages.ticketNotSend = "Karten noch nicht gesendet worden";
                messages.signOut = 'Abmelden';
                messages.account = 'Profil';
                messages.email = 'Email';
                messages.password = 'Passwort';
                messages.change = 'Veränderung';
                messages.paymentWaiting = 'Zahlung Ausstehend';
                messages.paymentOverdue = 'Zahlung überfällig';
                messages.paymentApproved = 'Bezahlt';
                messages.owner = 'Inhaber';
                messages.status = 'Status';
                messages.paid = 'Bezahlt';
                messages.delete = 'Entfernen';
                messages.bookingNr = 'Reservierung nr';
                messages.navHome = 'Willkommen';
                messages.navRules = 'Regeln';
                messages.navConcept = 'Konzept';
                messages.navTickets = 'Karten';
                messages.navIntroduction = 'Einführung';
                messages.navTournament = 'Turnier';
                messages.navCharacters = 'Helden & Schurken';
                messages.navWorld = 'Die Welt';
                messages.navPractical = 'Praktisch';
            }
            
            return messages;
        };
    
        function get(){
            if($localStorage.language === undefined){
                $localStorage.language = 'dansk';
            }
            
            return $localStorage.language;
        };

        return service;
    });