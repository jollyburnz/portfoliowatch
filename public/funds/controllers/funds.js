'use strict';

angular.module('mean.funds').controller('FundsController', ['$scope', '$stateParams', '$location', 'Global', 'Funds', function ($scope, $stateParams, $location, Global, Funds) {
    $scope.global = Global;

    $scope.create = function() {
        var fund = new Funds({
            title: this.title,
            content: this.content
        });
        fund.$save(function(response) {
            $location.path('funds/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(fund) {
        if (fund) {
            fund.$remove();

            for (var i in $scope.funds) {
                if ($scope.funds[i] === fund) {
                    $scope.funds.splice(i, 1);
                }
            }
        }
        else {
            $scope.fund.$remove();
            $location.path('funds');
        }
    };

    $scope.update = function() {
        var fund = $scope.fund;
        if (!fund.updated) {
            fund.updated = [];
        }
        fund.updated.push(new Date().getTime());

        fund.$update(function() {
            $location.path('funds/' + fund._id);
        });
    };

    $scope.find = function() {
        Funds.query(function(funds) {
            $scope.funds = funds;
        });
    };

    $scope.findOne = function() {
        Funds.get({
            fundId: $stateParams.fundId
        }, function(fund) {
            $scope.fund = fund;
        });
    };
}]);