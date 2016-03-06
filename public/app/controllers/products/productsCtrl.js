angular.module('app')
    .controller('productsCtrl', function($scope, $http) {
        $scope.loading = true;
        $scope.setup = function() {

            $http.get('/api/products')
                .then(function(response) {
                    $scope.model = response.data;
                     $scope.loading = false;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();

         $scope.deleteProduct = function(product_id) {          
            if (!confirm('Are you sure?')) return;
            $http.delete('/api/products/'+ product_id)
                .then(function(response) {
                    console.log(response)                    
                    $scope.setup();

                }, function(response) {
                    console.log(response)
                    // if error occurs
                });

        }

    })
