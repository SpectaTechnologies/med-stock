angular.module('app')
    .controller('newProductCtrl', function($scope, $http, $location) {


        $scope.saveProductDetails = function() {  
        console.log("Here in the product controller") ;         
            
            $http.post('/api/products', {
                    product_code: $scope.product_code,
                    product_name: $scope.product_name,
                    product_packing: $scope.product_packing,
                    product_company: $scope.product_company,
                    product_salestax: $scope.product_salestax,
                    product_discount: $scope.product_discount,
                    product_boxsize: $scope.product_boxsize,
                    product_purchase: $scope.product_purchase,
                    product_mrp: $scope.product_mrp,

                    
                })
                .then(function(response) {
                    console.log(response)
                    $location.path('/products')

                }, function(response) {
                    console.log(response)
                });

        }

         $scope.availableCompanies = function() {
            $http.get('/api/companies')
                .then(function(response) {
                    $scope.companies = _.map(response.data, function(obj) {
                        return {
                            name: obj.company_name,
                            address: obj.company_address
                        }

                    })
                    console.log($scope.companies);

                }, function(err) {
                    console.log(err)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        }


        $scope.setup = function() {            
            $scope.availableCompanies();
        }

        $scope.setup();


    })
