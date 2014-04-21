'use strict';

//Funds service used for funds REST endpoint
angular.module('mean.funds').factory('Funds', ['$resource', function($resource) {
    return $resource('funds/:fundId', {
        fundId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);