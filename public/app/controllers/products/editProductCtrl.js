angular.module('app')
    .controller('editProductCtrl', function($scope, $http, $location, $stateParams) {


        $scope.setup = function() {
            console.log($stateParams)
            $http.get('/api/products/' + $stateParams.id)
                .then(function(response) {
                    $scope.model = response.data;
                    console.log($scope.model)

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.updateProductDetails = function() {
            $http.put('/api/products/' + $stateParams.id, {
                    product_code: $scope.model.product_code,
                    product_name: $scope.model.product_name,
                    product_areacode: $scope.model.product_areacode,
                    product_address: $scope.model.product_address,
                    product_openingbalance: $scope.model.product_openingbalance,
                    product_bstcode: $scope.model.product_bstcode,

                })
                .then(function(response) {
                    console.log(response)

                }, function(response) {
                    console.log(response)
                });

        }



        $scope.setup();



    })
