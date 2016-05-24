angular.module('app')
    .controller('editStockistCtrl', function($scope, $http, $location, $stateParams) {


        $scope.setup = function() {
            console.log($stateParams)
            $http.get('/api/stockists/' + $stateParams.id)
                .then(function(response) {
                    $scope.model = response.data;
                    console.log($scope.model)

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.updateStockistDetails = function() {
            $http.put('/api/stockists/' + $stateParams.id, {
                    stockist_code: $scope.model.stockist_code,
                    stockist_name: $scope.model.stockist_name,
                    stockist_areacode: $scope.model.stockist_areacode,
                    stockist_address: $scope.model.stockist_address,
                    stockist_openingbalance: $scope.model.stockist_openingbalance,
                    stockist_bstcode: $scope.model.stockist_bstcode,

                })
                .then(function(response) {
                    console.log(response)

                }, function(response) {
                    console.log(response)
                });

        }



        $scope.setup();



    })
