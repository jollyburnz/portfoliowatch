'use strict';

//Setting up route
angular.module('mean.funds').config(['$stateProvider',
    function($stateProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all funds', {
                url: '/funds',
                templateUrl: 'public/funds/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create fund', {
                url: '/funds/create',
                templateUrl: 'public/funds/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit fund', {
                url: '/funds/:fundId/edit',
                templateUrl: 'public/funds/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('fund by id', {
                url: '/funds/:fundId',
                templateUrl: 'public/funds/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
