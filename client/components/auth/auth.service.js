'use strict';

angular.module('lunorthApp')
    .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
        var currentUser = {};
        if ($cookieStore.get('token')) {
            currentUser = User.get();
        }

        return {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/auth/local', {
                    email: user.email,
                    password: user.password
                }).
                success(function (data) {
                    $cookieStore.put('token', data.token);
                    currentUser = User.get();
                    deferred.resolve(data);
                    
                    $rootScope.$emit('auth-service-event');
                    
                    return cb();
                }).
                error(function (err) {
                    this.logout();
                    deferred.reject(err);
                    
                    console.log('login error : ', err);
                    $rootScope.$emit('auth-service-event');
                    
                    return cb(err);
                }.bind(this));
                
                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                $cookieStore.remove('token');
                currentUser = {};
                
                $rootScope.$emit('auth-service-event');
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function (user, callback) {
                var cb = callback || angular.noop;
                
                $rootScope.$emit('auth-service-event');
                
                return User.save(user,
                    function (data) {
                        $cookieStore.put('token', data.token);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function (err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({
                    id: currentUser._id
                }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function (user) {
                    $rootScope.$emit('auth-service-event');
                    return cb(user);
                }, function (err) {
                    $rootScope.$emit('auth-service-event');
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function () {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                return currentUser.hasOwnProperty('role');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function (cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function () {
                        $rootScope.$emit('auth-service-event');
                        cb(true);
                    }).catch(function () {
                        $rootScope.$emit('auth-service-event');
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('role')) {
                    $rootScope.$emit('auth-service-event');
                    cb(true);
                } else {
                    $rootScope.$emit('auth-service-event');
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function () {
                return currentUser.role === 'admin';
            },

            /**
             * Get auth token
             */
            getToken: function () {
                return $cookieStore.get('token');
            },
            
            /**
             *  Event listener
             */
            subscribe: function(scope, callback) {
                var handler = $rootScope.$on('auth-service-event', callback);
                scope.$on('$destroy', handler);
            }
        };
    });