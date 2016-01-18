angular.module('app')
    .controller('HomeCtrl', function($scope, $http, $rootScope) {
        $scope.model = "";



        function setChart(comp,stock,emp) {
            console.log(comp,stock,emp)
            $scope.resources = [{
                value: comp,
                color: '#FFFF00',
                highlight: '#e5e500',
                label: 'Companies'
            }, {
                value: stock,
                color: '#46BFBD',
                highlight: '#5AD3D1',
                label: 'Stockists'
            }, {
                value: emp,                
                color: '#F7464A',
                highlight: '#FF5A5E',
                label: 'Employees'
            }];

            // Chart.js Options
            $scope.options = {

                // Sets the chart to be responsive
                responsive: true,

                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,

                //String - The colour of each segment stroke
                segmentStrokeColor: '#fff',

                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,

                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 50, // This is 0 for Pie charts

                //Number - Amount of animation steps
                animationSteps: 100,

                //String - Animation easing effect
                animationEasing: 'easeOutBounce',

                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,

                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false,

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

            };
        }

        function getComp() {
            $http.get('/api/companies/count')
                .then(function(response) {
                    //$scope.model.companies = response.data;
                     console.log(response.data)
                     getStock(response.data);

                }, function(err) {
                    console.log(err)
                });
        }

        function getStock(comp) {
            console.log(comp)
            $http.get('/api/stockists/count')
                .then(function(response) {
                    //$scope.model.stockists = response.data;
                     getEmp(comp,response.data);

                }, function(err) {
                    console.log(err)
                });
        }

        function getEmp(comp,stock) {
            console.log(comp,stock)
            $http.get('/api/employees/count')
                .then(function(response) {
                    //$scope.model.employees = response.data;
                    setChart(comp,stock,response.data);
                }, function(err) {
                    console.log(err)
                });
        }



        $scope.setup = function(getComp) {
           

            getComp();

        }

        $scope.setup(getComp);




    })
