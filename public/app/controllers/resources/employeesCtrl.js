angular.module('app')
    .controller('employeesCtrl', function($scope, $http) {
        
        $scope.setup = function() {

            $http.get('/api/employees')
                .then(function(response) {
                    $scope.model = response.data;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();

         $scope.deleteEmployee = function(employee_id) {          
            if (!confirm('Are you sure?')) return;
            $http.delete('/api/employees/'+ employee_id)
                .then(function(response) {
                    console.log(response)                    
                    $scope.setup();

                }, function(response) {
                    console.log(response)
                    // if error occurs
                });

        }


    })

