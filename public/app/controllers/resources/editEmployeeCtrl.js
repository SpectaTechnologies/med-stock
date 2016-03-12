angular.module('app')
    .controller('editEmployeesCtrl', function($scope, $http, $location, $stateParams) {


        $scope.setup = function() {
            console.log($stateParams)
            $http.get('/api/employees/' + $stateParams.id)
                .then(function(response) {
                    $scope.model = response.data;
                    console.log($scope.model)

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.updateEmployeeDetails = function() {
            $http.put('/api/employees/' + $stateParams.id, {
                    employee_code: $scope.model.employee_code,
                    employee_name: $scope.model.employee_name,
                    employee_areacode: $scope.model.employee_areacode,
                    employee_address: $scope.model.employee_address,
                    employee_openingbalance: $scope.model.employee_openingbalance,
                    employee_bstcode: $scope.model.employee_bstcode,

                })
                .then(function(response) {
                    console.log(response)

                }, function(response) {
                    console.log(response)
                });

        }



        $scope.setup();



    })
