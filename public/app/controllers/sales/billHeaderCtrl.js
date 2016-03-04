angular.module('app')
    .controller('billHeaderCtrl', function($scope,$http) {        
        $scope.saveBillHeader = function() {  
                
            $http.post('/api/sales/billheader', {
                    bill_header_title: $scope.bill_header_title,
                    bill_header_subtitle : $scope.bill_header_subtitle
                                        
                })
                .then(function(response) {
                    console.log(response)
                    

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.setup = function(){
            $http.get('/api/sales/billheader')
                .then(function(response) {
                    console.log(response);
                    $scope.bill_header_title = response.data.bill_header_title;
                    $scope.bill_header_subtitle = response.data.bill_header_subtitle;

                }, function(response) {
                    console.log(response)
                });            
        }


        $scope.setup();
    })
