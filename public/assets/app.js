angular.module('app',[
'ngRoute','ui.router','tc.chartjs','ui.bootstrap'
])

angular.module('app')
    .run(['$http', '$window', function($http, $window) {
        $http.defaults.headers.common['x-auth'] = $window.sessionStorage.user_token
    }]);

angular.module('app')
    .controller('ErrorCtrl', function($scope, $rootScope) {
        $scope.hello = "this is from the controller hello"
        console.log($scope.hello)



    })

angular.module('app')
    .controller('HomeCtrl', function($scope, $http) {
        $scope.model = "";


        function setChart(comp, stock, emp) {
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


            $scope.linedata = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }, {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            };

            // Chart.js Options
            $scope.lineoptions = {

                // Sets the chart to be responsive
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - Whether the line is curved between points
                bezierCurve: true,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                // Function - on animation progress
                onAnimationProgress: function() {},

                // Function - on animation complete
                onAnimationComplete: function() {},

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };


            $scope.bardata = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.5)',
                    strokeColor: 'rgba(220,220,220,0.8)',
                    highlightFill: 'rgba(220,220,220,0.75)',
                    highlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }, {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.5)',
                    strokeColor: 'rgba(151,187,205,0.8)',
                    highlightFill: 'rgba(151,187,205,0.75)',
                    highlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            };

            // Chart.js Options
            $scope.baroptions = {

                // Sets the chart to be responsive
                responsive: true,

                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                scaleBeginAtZero: true,

                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - If there is a stroke on each bar
                barShowStroke: true,

                //Number - Pixel width of the bar stroke
                barStrokeWidth: 2,

                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,

                //Number - Spacing between data sets within X values
                barDatasetSpacing: 1,

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };



        }

        function getComp() {
            $http.get('/api/companies/count')
                .then(function(response) {
                    $scope.model.companies = response.data;
                    getStock(response.data);

                }, function(err) {
                    console.log(err)
                });
        }

        function getStock(comp) {
            console.log(comp)
            $http.get('/api/stockists/count')
                .then(function(response) {
                    getEmp(comp, response.data);

                }, function(err) {
                    console.log(err)
                });
        }

        function getEmp(comp, stock) {
            console.log(comp, stock)
            $http.get('/api/employees/count')
                .then(function(response) {
                    setChart(comp, stock, response.data);
                }, function(err) {
                    console.log(err)
                });
        }



        $scope.setup = function(getComp) {


            getComp();

        }

        $scope.setup(getComp);






    })

angular.module('app')
    .controller('LoginCtrl', function($scope, UserSvc, $location) {        
        $scope.login = function(username, password) {
            UserSvc.login(username, password)
                .then(function(response) {
                    console.log("printing response")
                    console.log(response.data)
                    $scope.$emit('login', response.data)
                    $location.path('/home')

                })
        }
    })

angular.module('app')
    .controller('masterCtrl', function($scope, $rootScope, $route) {
        console.log("masterCtrl");

        if(localStorage.getItem('logged_user')){
        	$rootScope.currentUser = localStorage.getItem('logged_user')
        }
        $scope.$on('login', function(_, user) {
            console.log("Logged In");            
            $rootScope.currentUser = user.name
            localStorage.setItem('logged_user', $rootScope.currentUser)
        })
    })

angular.module('app')
.controller('PostsCtrl',function($scope,PostsSvc){ 
  PostsSvc.fetch()
 	.success(function (posts){
 		$scope.posts = posts

 	})
	
 	 $scope.addPost = function () {
          if ($scope.postBody) {
            PostsSvc.create({
              /*username: 'vishalRanjan',*/
              body:     $scope.postBody              
            }).success(function (post) {
              //$scope.posts.unshift(post)
              $scope.postBody = null
            })
          }
        }

    $scope.$on('ws:new_post',function(_,post){
    $scope.$apply(function(){
      $scope.posts.unshift(post)
    })
  })
 
})

 
angular.module('app')
.service('PostsSvc', function($http){
   this.fetch = function () {   	
     return $http.get('/api/posts')
   }
   this.create = function (post){
   	
      return $http.post('/api/posts',post)
   }
 })
angular.module('app')
.controller('RegisterCtrl',function($scope,UserSvc ,$location){
	$scope.register = function(name,username,password){
		UserSvc.register(name,username,password)
		.then(function(response){			
			$scope.$emit('login',response.data)
			$location.path('/home')
		})
		.catch(function (err){
			console.log(err)
		})
	}

})

angular.module('app')
.service('segment', function($http,$window,$location){
  
     return {
        getData: function($q, $http) {
            console.log("here");
            return 2
        }
    };

})
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: '/nav.html'
                    },
                    'content': {
                        templateUrl: '/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

        .state('app.login', {
            url: 'login',
            views: {
                'header': {
                    templateUrl: '/nav.html'
                },
                'content': {
                    templateUrl: '/login.html',
                    controller: 'LoginCtrl'

                }
            }
        })

        .state('app.register', {
            url: 'register',
            views: {
                'content@': {
                    templateUrl: 'register.html',
                    controller: 'RegisterCtrl'
                }
            }

        })


        .state('app.home', {
            url: 'home',
            views: {
                'content@': {
                    templateUrl: 'users/home.html',
                    controller: 'HomeCtrl'
                }
            }

        })

        .state('app.home.vehicles', {
            url: '/vehicles/new',
            views: {
                'content@': {
                    templateUrl: 'vehicles/newVehicle.html',
                    controller: 'VehiclesNewInfoCtrl'
                }
            }

        })

        .state('app.products', {
            url: 'products',
            views: {
                'content@': {
                    templateUrl: 'products/products.html',
                    controller: 'productsCtrl'
                }
            }

        })

        .state('app.products.new', {
            url: '/new',
            views: {
                'content@': {
                    templateUrl: 'products/newProduct.html',
                    controller: 'newProductCtrl'
                }
            }

        })

        .state('app.products.details', {
            url: '/:id',

            views: {
                'content@': {
                    templateUrl: 'products/editProduct.html',
                    controller: 'editProductCtrl'
                }
            }

        })


        //  Resources Menu 

        .state('app.companies', {
            url: 'resources/companies',
            views: {
                'content@': {
                    templateUrl: 'resources/companies.html',
                    controller: 'companiesCtrl'

                }
            }

        })

        .state('app.companies.new', {
            url: '/new',
            views: {

                'content@': {
                    templateUrl: 'resources/newCompany.html',
                    controller: 'newCompanyCtrl'
                }
            }

        })

        .state('app.companies.details', {
            url: '/:id',

            views: {
                'content@': {
                    templateUrl: 'resources/editCompany.html',
                    controller: 'editCompanyCtrl'
                }
            }

        })

        .state('app.stockists', {
            url: 'resources/stockists',
            views: {
                'content@': {
                    templateUrl: 'resources/stockists.html',
                    controller: 'stockistsCtrl'

                }
            }

        })

        .state('app.stockists.new', {
            url: '/new',
            views: {

                'content@': {
                    templateUrl: 'resources/newStockist.html',
                    controller: 'newStockistCtrl'
                }
            }

        })


        .state('app.employees', {
            url: 'resources/employees',
            views: {
                'content@': {
                    templateUrl: 'resources/employees.html',
                    controller: 'employeesCtrl'

                }
            }

        })

        .state('app.employees.new', {
            url: '/new',
            views: {

                'content@': {
                    templateUrl: 'resources/newEmployee.html',
                    controller: 'newEmployeeCtrl'
                }
            }

        })


        //  Sales Menu 

        .state('app.invoiceentry', {
            url: 'sales/invoice-entry',
            views: {
                'content@': {
                    templateUrl: 'sales/invoiceEntry.html',
                    controller: 'invoiceEntryCtrl'


                }
            }

        })


        .state('app.billheader', {
            url: 'sales/billheader',
            views: {
                'content@': {
                    templateUrl: 'sales/billHeader.html'


                }
            }

        })

        .state('app.salesreturn', {
            url: 'sales/sales-return',
            views: {
                'content@': {
                    templateUrl: 'sales/salesReturn.html'


                }
            }

        })


        // Purchase Menu

        .state('app.purchaseentry', {
            url: 'sales/purchase-entry',
            views: {
                'content@': {
                    templateUrl: 'purchase/purchaseEntry.html'


                }
            }

        })

        // Settings Menu

        .state('app.password', {
            url: 'reset-password',
            views: {
                'content@': {
                    templateUrl: 'settings/changePassword.html',                    
                }
            }

        })

        .state('app.bug', {
            url: 'report-a-abug',
            views: {
                'content@': {
                    templateUrl: 'settings/bug.html',                    
                }
            }

        })

        .state('app.feedback', {
            url: 'feedback',
            views: {
                'content@': {
                    templateUrl: 'settings/feedback.html',                    
                }
            }

        })

        .state('app.about', {
            url: 'about',
            views: {
                'content@': {
                    templateUrl: 'settings/about.html',
                    controller: 'HomeCtrl'
                }
            }

        })



        $locationProvider.html5Mode(true)


    });

angular.module('app')
    .service('UserSvc', function($http, $window, $location, $rootScope) {
        var svc = this
        svc.getUser = function() {
            return $http.get('api/users')
        }

        svc.login = function(username, password) {
            return $http.post('api/sessions', {
                    username: username,
                    password: password
                }).then(function(val) {
                    svc.token = val.data
                    $window.sessionStorage["user_token"] = svc.token
                    localStorage.setItem('user_token', svc.token);
                    $http.defaults.headers.common['x-auth'] = $window.sessionStorage.user_token                    
                    return svc.getUser()
                }).catch(function(response) {
                    console.error('Gists error', response.status, response.data);
                    $location.path('/401')
                })
                .finally(function() {
                    console.log("finally finished gists");
                });
        }


        svc.register = function(name, username, password) {
            return $http.post('api/users', {
                name: name,
                username: username,
                password: password
            }).then(function(val) {
                //return val;           
                return svc.login(username, password)

            })
        }

    })

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



    })

angular.module('app')
    .controller('companiesCtrl', function($scope, $http) {
        
        $scope.setup = function() {

            $http.get('/api/companies')
                .then(function(response) {
                    $scope.model = response.data;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();


        $scope.deleteCompany = function(company_id) {          
            if (!confirm('Are you sure?')) return;
            $http.delete('/api/companies/'+ company_id)
                .then(function(response) {
                    console.log(response)                    
                    $scope.setup();

                }, function(response) {
                    console.log(response)
                    // if error occurs
                });

        }



    })


angular.module('app')
    .controller('editCompanyCtrl', function($scope, $http, $location, $stateParams) {


        $scope.setup = function() {
            console.log($stateParams)
            $http.get('/api/companies/' + $stateParams.id)
                .then(function(response) {
                    $scope.model = response.data;
                    console.log($scope.model)

                }, function(response) {
                    console.log(response)
                });

        }

        $scope.updateCompanyDetails = function() {
            $http.put('/api/companies/' + $stateParams.id, {
                    company_code: $scope.model.company_code,
                    company_name: $scope.model.company_name,
                    company_areacode: $scope.model.company_areacode,
                    company_address: $scope.model.company_address,
                    company_openingbalance: $scope.model.company_openingbalance,
                    company_bstcode: $scope.model.company_bstcode,

                })
                .then(function(response) {
                    console.log(response)

                }, function(response) {
                    console.log(response)
                });

        }



        $scope.setup();



    })

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



    })


angular.module('app')
    .controller('newCompanyCtrl', function($scope, $http, $location) {


        $scope.saveCompanyDetails = function() {  
        console.log("Here in the company controller") ;         

            $http.post('/api/companies', {
                    company_code: $scope.company_code,
                    company_name: $scope.company_name,
                    company_areacode: $scope.company_areacode,
                    company_address: $scope.company_address,
                    company_openingbalance: $scope.company_openingbalance,
                    company_bstcode: $scope.company_bstcode,                   
                    
                })
                .then(function(response) {
                    console.log(response)
                    $location.path('/resources/companies')

                }, function(response) {
                    console.log(response)
                });

        }



    })

angular.module('app')
    .controller('newEmployeeCtrl', function($scope, $http, $location) {


        $scope.saveEmployeeDetails = function() {  
        console.log("Here in the Employee controller") ;         
        console.log($scope.employee_code)

            $http.post('/api/employees', {
                    employee_code: $scope.employee_code,
                    employee_name: $scope.employee_name,
                    employee_areacode: $scope.employee_areacode,
                    employee_address: $scope.employee_address,
                    employee_openingbalance: $scope.employee_openingbalance,
                    employee_bstcode: $scope.employee_bstcode,                   
                    
                })
                .then(function(response) {
                    console.log(response)
                    $location.path('/resources/employees')

                }, function(response) {
                    console.log(response)
                });

        }



    })

angular.module('app')
    .controller('newStockistCtrl', function($scope, $http, $location) {


        $scope.saveStockistDetails = function() {  
        console.log("Here in the Stockist controller") ;         
        console.log($scope.stockist_code)

            $http.post('/api/stockists', {
                    stockist_code: $scope.stockist_code,
                    stockist_name: $scope.stockist_name,
                    stockist_areacode: $scope.stockist_areacode,
                    stockist_address: $scope.stockist_address,
                    stockist_openingbalance: $scope.stockist_openingbalance,
                    stockist_bstcode: $scope.stockist_bstcode,                   
                    
                })
                .then(function(response) {
                    console.log(response)
                    $location.path('/resources/stockists')

                }, function(response) {
                    console.log(response)
                });

        }



    })

angular.module('app')
    .controller('stockistsCtrl', function($scope, $http) {
        
        $scope.setup = function() {

            $http.get('/api/stockists')
                .then(function(response) {
                    $scope.model = response.data;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();



    })


angular.module('app')
    .controller('invoiceEntryCtrl', function($scope, $http) {
        $scope.model = {};

        $scope.availableProducts = function() {
            $http.get('/api/products')
                .then(function(response) {
                    $scope.model.products = _.map(response.data, function(obj) {
                        return {
                            name: obj.product_name,
                            code: obj.product_code
                        }

                    })

                }, function(err) {
                    console.log(err)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        }


        $scope.availableCompanies = function() {
            $http.get('/api/companies')
                .then(function(response) {
                    $scope.model.companies = _.map(response.data, function(obj) {
                        return {
                            name: obj.company_name,
                            address: obj.company_address
                        }

                    })
                    console.log($scope.model.companies);

                }, function(err) {
                    console.log(err)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        }


        $scope.setup = function() {
            $scope.availableProducts();
            $scope.availableCompanies();
        }

        $scope.setup();




        function calendarImplementation() {
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            /* // Disable weekend selection
             $scope.disabled = function(date, mode) {
                 return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
             };*/

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };

            $scope.toggleMin();
            $scope.maxDate = new Date(2020, 5, 22);

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [{
                date: tomorrow,
                status: 'full'
            }, {
                date: afterTomorrow,
                status: 'partially'
            }];

            $scope.getDayClass = function(date, mode) {
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            };
        }


    })

angular.module('app')
.controller('VehiclesEditInfoCtrl',function($scope,$http,$location,$stateParams){ 
 

$scope.setup = function(){
	console.log($stateParams)
	$http.get('/api/vehicle/'+$stateParams.id)
	.then(function(response) {
	    $scope.model = response.data;
	    console.log($scope.model)

	  }, function(response) {
	    console.log(response)
	  });
	
}

$scope.setup();
 
 
 
})

 
angular.module('app')
.controller('VehiclesNewInfoCtrl',function($scope,$http,$location){ 
 

$scope.saveVehicleDetails = function(){
	console.log("in controller 2")
	console.log($scope.dev_id + $scope.v_number)
	 

	$http.post('/api/vehicle',{
		dev_id: $scope.dev_id,
        v_number: $scope.v_number,
        driver_name : $scope.driver_name,
        sos_number : $scope.sos_number                       
	})
	.then(function(response) {
	    console.log(response)
	    $location.path('/home')

	  }, function(response) {
	    console.log(response)
	  });
	
}
 
 
 
})

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImVycm9yLmN0cmwuanMiLCJob21lQ3RybC5qcyIsImxvZ2luLmN0cmwuanMiLCJtYXN0ZXJDdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJlZ2lzdGVyLmN0cmwuanMiLCJyb3V0ZVNlZ21lbnQuanMiLCJyb3V0ZXMuanMiLCJ1c2VyLnN2Yy5qcyIsInByb2R1Y3RzL2VkaXRQcm9kdWN0Q3RybC5qcyIsInByb2R1Y3RzL25ld1Byb2R1Y3RDdHJsLmpzIiwicHJvZHVjdHMvcHJvZHVjdHNDdHJsLmpzIiwicmVzb3VyY2VzL2NvbXBhbmllc0N0cmwuanMiLCJyZXNvdXJjZXMvZWRpdENvbXBhbnlDdHJsLmpzIiwicmVzb3VyY2VzL2VtcGxveWVlc0N0cmwuanMiLCJyZXNvdXJjZXMvbmV3Q29tcGFueUN0cmwuanMiLCJyZXNvdXJjZXMvbmV3RW1wbG95ZWVDdHJsLmpzIiwicmVzb3VyY2VzL25ld1N0b2NraXN0Q3RybC5qcyIsInJlc291cmNlcy9zdG9ja2lzdHNDdHJsLmpzIiwic2FsZXMvaW52b2ljZUVudHJ5Q3RybC5qcyIsInZlaGljbGVzL2VkaXQvaW5mby5qcyIsInZlaGljbGVzL25ldy9pbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLFtcbiduZ1JvdXRlJywndWkucm91dGVyJywndGMuY2hhcnRqcycsJ3VpLmJvb3RzdHJhcCdcbl0pXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5ydW4oWyckaHR0cCcsICckd2luZG93JywgZnVuY3Rpb24oJGh0dHAsICR3aW5kb3cpIHtcbiAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gJHdpbmRvdy5zZXNzaW9uU3RvcmFnZS51c2VyX3Rva2VuXG4gICAgfV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Vycm9yQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSkge1xuICAgICAgICAkc2NvcGUuaGVsbG8gPSBcInRoaXMgaXMgZnJvbSB0aGUgY29udHJvbGxlciBoZWxsb1wiXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5oZWxsbylcblxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICAkc2NvcGUubW9kZWwgPSBcIlwiO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Q2hhcnQoY29tcCwgc3RvY2ssIGVtcCkge1xuICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IFt7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXAsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjRkZGRjAwJyxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjZTVlNTAwJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvbXBhbmllcydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3RvY2ssXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNDZCRkJEJyxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjNUFEM0QxJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N0b2NraXN0cydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZW1wLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI0Y3NDY0QScsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGNUE1RScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFbXBsb3llZXMnXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgLy8gQ2hhcnQuanMgT3B0aW9uc1xuICAgICAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSB7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXRzIHRoZSBjaGFydCB0byBiZSByZXNwb25zaXZlXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vQm9vbGVhbiAtIFdoZXRoZXIgd2Ugc2hvdWxkIHNob3cgYSBzdHJva2Ugb24gZWFjaCBzZWdtZW50XG4gICAgICAgICAgICAgICAgc2VnbWVudFNob3dTdHJva2U6IHRydWUsXG5cbiAgICAgICAgICAgICAgICAvL1N0cmluZyAtIFRoZSBjb2xvdXIgb2YgZWFjaCBzZWdtZW50IHN0cm9rZVxuICAgICAgICAgICAgICAgIHNlZ21lbnRTdHJva2VDb2xvcjogJyNmZmYnLFxuXG4gICAgICAgICAgICAgICAgLy9OdW1iZXIgLSBUaGUgd2lkdGggb2YgZWFjaCBzZWdtZW50IHN0cm9rZVxuICAgICAgICAgICAgICAgIHNlZ21lbnRTdHJva2VXaWR0aDogMixcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gVGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGNoYXJ0IHRoYXQgd2UgY3V0IG91dCBvZiB0aGUgbWlkZGxlXG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZUlubmVyQ3V0b3V0OiA1MCwgLy8gVGhpcyBpcyAwIGZvciBQaWUgY2hhcnRzXG5cbiAgICAgICAgICAgICAgICAvL051bWJlciAtIEFtb3VudCBvZiBhbmltYXRpb24gc3RlcHNcbiAgICAgICAgICAgICAgICBhbmltYXRpb25TdGVwczogMTAwLFxuXG4gICAgICAgICAgICAgICAgLy9TdHJpbmcgLSBBbmltYXRpb24gZWFzaW5nIGVmZmVjdFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVhc2luZzogJ2Vhc2VPdXRCb3VuY2UnLFxuXG4gICAgICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB3ZSBhbmltYXRlIHRoZSByb3RhdGlvbiBvZiB0aGUgRG91Z2hudXRcbiAgICAgICAgICAgICAgICBhbmltYXRlUm90YXRlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB3ZSBhbmltYXRlIHNjYWxpbmcgdGhlIERvdWdobnV0IGZyb20gdGhlIGNlbnRyZVxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY2FsZTogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICAvL1N0cmluZyAtIEEgbGVnZW5kIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGU6ICc8dWwgY2xhc3M9XCJ0Yy1jaGFydC1qcy1sZWdlbmRcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPidcblxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAkc2NvcGUubGluZWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseSddLFxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ015IEZpcnN0IGRhdGFzZXQnLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6ICdyZ2JhKDIyMCwyMjAsMjIwLDAuMiknLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJ3JnYmEoMjIwLDIyMCwyMjAsMSknLFxuICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiAncmdiYSgyMjAsMjIwLDIyMCwxKScsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiAncmdiYSgyMjAsMjIwLDIyMCwxKScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFs2NSwgNTksIDgwLCA4MSwgNTYsIDU1LCA0MF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTXkgU2Vjb25kIGRhdGFzZXQnLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6ICdyZ2JhKDE1MSwxODcsMjA1LDAuMiknLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJ3JnYmEoMTUxLDE4NywyMDUsMSknLFxuICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiAncmdiYSgxNTEsMTg3LDIwNSwxKScsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiAncmdiYSgxNTEsMTg3LDIwNSwxKScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFsyOCwgNDgsIDQwLCAxOSwgODYsIDI3LCA5MF1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ2hhcnQuanMgT3B0aW9uc1xuICAgICAgICAgICAgJHNjb3BlLmxpbmVvcHRpb25zID0ge1xuXG4gICAgICAgICAgICAgICAgLy8gU2V0cyB0aGUgY2hhcnQgdG8gYmUgcmVzcG9uc2l2ZVxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICAvLy9Cb29sZWFuIC0gV2hldGhlciBncmlkIGxpbmVzIGFyZSBzaG93biBhY3Jvc3MgdGhlIGNoYXJ0XG4gICAgICAgICAgICAgICAgc2NhbGVTaG93R3JpZExpbmVzOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgLy9TdHJpbmcgLSBDb2xvdXIgb2YgdGhlIGdyaWQgbGluZXNcbiAgICAgICAgICAgICAgICBzY2FsZUdyaWRMaW5lQ29sb3I6IFwicmdiYSgwLDAsMCwuMDUpXCIsXG5cbiAgICAgICAgICAgICAgICAvL051bWJlciAtIFdpZHRoIG9mIHRoZSBncmlkIGxpbmVzXG4gICAgICAgICAgICAgICAgc2NhbGVHcmlkTGluZVdpZHRoOiAxLFxuXG4gICAgICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB0aGUgbGluZSBpcyBjdXJ2ZWQgYmV0d2VlbiBwb2ludHNcbiAgICAgICAgICAgICAgICBiZXppZXJDdXJ2ZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gVGVuc2lvbiBvZiB0aGUgYmV6aWVyIGN1cnZlIGJldHdlZW4gcG9pbnRzXG4gICAgICAgICAgICAgICAgYmV6aWVyQ3VydmVUZW5zaW9uOiAwLjQsXG5cbiAgICAgICAgICAgICAgICAvL0Jvb2xlYW4gLSBXaGV0aGVyIHRvIHNob3cgYSBkb3QgZm9yIGVhY2ggcG9pbnRcbiAgICAgICAgICAgICAgICBwb2ludERvdDogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gUmFkaXVzIG9mIGVhY2ggcG9pbnQgZG90IGluIHBpeGVsc1xuICAgICAgICAgICAgICAgIHBvaW50RG90UmFkaXVzOiA0LFxuXG4gICAgICAgICAgICAgICAgLy9OdW1iZXIgLSBQaXhlbCB3aWR0aCBvZiBwb2ludCBkb3Qgc3Ryb2tlXG4gICAgICAgICAgICAgICAgcG9pbnREb3RTdHJva2VXaWR0aDogMSxcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gYW1vdW50IGV4dHJhIHRvIGFkZCB0byB0aGUgcmFkaXVzIHRvIGNhdGVyIGZvciBoaXQgZGV0ZWN0aW9uIG91dHNpZGUgdGhlIGRyYXduIHBvaW50XG4gICAgICAgICAgICAgICAgcG9pbnRIaXREZXRlY3Rpb25SYWRpdXM6IDIwLFxuXG4gICAgICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB0byBzaG93IGEgc3Ryb2tlIGZvciBkYXRhc2V0c1xuICAgICAgICAgICAgICAgIGRhdGFzZXRTdHJva2U6IHRydWUsXG5cbiAgICAgICAgICAgICAgICAvL051bWJlciAtIFBpeGVsIHdpZHRoIG9mIGRhdGFzZXQgc3Ryb2tlXG4gICAgICAgICAgICAgICAgZGF0YXNldFN0cm9rZVdpZHRoOiAyLFxuXG4gICAgICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB0byBmaWxsIHRoZSBkYXRhc2V0IHdpdGggYSBjb2xvdXJcbiAgICAgICAgICAgICAgICBkYXRhc2V0RmlsbDogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vIEZ1bmN0aW9uIC0gb24gYW5pbWF0aW9uIHByb2dyZXNzXG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25Qcm9ncmVzczogZnVuY3Rpb24oKSB7fSxcblxuICAgICAgICAgICAgICAgIC8vIEZ1bmN0aW9uIC0gb24gYW5pbWF0aW9uIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25Db21wbGV0ZTogZnVuY3Rpb24oKSB7fSxcblxuICAgICAgICAgICAgICAgIC8vU3RyaW5nIC0gQSBsZWdlbmQgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZTogJzx1bCBjbGFzcz1cInRjLWNoYXJ0LWpzLWxlZ2VuZFwiPjwlIGZvciAodmFyIGk9MDsgaTxkYXRhc2V0cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOjwlPWRhdGFzZXRzW2ldLnN0cm9rZUNvbG9yJT5cIj48L3NwYW4+PCVpZihkYXRhc2V0c1tpXS5sYWJlbCl7JT48JT1kYXRhc2V0c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD4nXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgICRzY29wZS5iYXJkYXRhID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknXSxcbiAgICAgICAgICAgICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdNeSBGaXJzdCBkYXRhc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiAncmdiYSgyMjAsMjIwLDIyMCwwLjUpJyxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICdyZ2JhKDIyMCwyMjAsMjIwLDAuOCknLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiAncmdiYSgyMjAsMjIwLDIyMCwwLjc1KScsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogJ3JnYmEoMjIwLDIyMCwyMjAsMSknLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDU5LCA4MCwgODEsIDU2LCA1NSwgNDBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ015IFNlY29uZCBkYXRhc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiAncmdiYSgxNTEsMTg3LDIwNSwwLjUpJyxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICdyZ2JhKDE1MSwxODcsMjA1LDAuOCknLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiAncmdiYSgxNTEsMTg3LDIwNSwwLjc1KScsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogJ3JnYmEoMTUxLDE4NywyMDUsMSknLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDQ4LCA0MCwgMTksIDg2LCAyNywgOTBdXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENoYXJ0LmpzIE9wdGlvbnNcbiAgICAgICAgICAgICRzY29wZS5iYXJvcHRpb25zID0ge1xuXG4gICAgICAgICAgICAgICAgLy8gU2V0cyB0aGUgY2hhcnQgdG8gYmUgcmVzcG9uc2l2ZVxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICAvL0Jvb2xlYW4gLSBXaGV0aGVyIHRoZSBzY2FsZSBzaG91bGQgc3RhcnQgYXQgemVybywgb3IgYW4gb3JkZXIgb2YgbWFnbml0dWRlIGRvd24gZnJvbSB0aGUgbG93ZXN0IHZhbHVlXG4gICAgICAgICAgICAgICAgc2NhbGVCZWdpbkF0WmVybzogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vQm9vbGVhbiAtIFdoZXRoZXIgZ3JpZCBsaW5lcyBhcmUgc2hvd24gYWNyb3NzIHRoZSBjaGFydFxuICAgICAgICAgICAgICAgIHNjYWxlU2hvd0dyaWRMaW5lczogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vU3RyaW5nIC0gQ29sb3VyIG9mIHRoZSBncmlkIGxpbmVzXG4gICAgICAgICAgICAgICAgc2NhbGVHcmlkTGluZUNvbG9yOiBcInJnYmEoMCwwLDAsLjA1KVwiLFxuXG4gICAgICAgICAgICAgICAgLy9OdW1iZXIgLSBXaWR0aCBvZiB0aGUgZ3JpZCBsaW5lc1xuICAgICAgICAgICAgICAgIHNjYWxlR3JpZExpbmVXaWR0aDogMSxcblxuICAgICAgICAgICAgICAgIC8vQm9vbGVhbiAtIElmIHRoZXJlIGlzIGEgc3Ryb2tlIG9uIGVhY2ggYmFyXG4gICAgICAgICAgICAgICAgYmFyU2hvd1N0cm9rZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gUGl4ZWwgd2lkdGggb2YgdGhlIGJhciBzdHJva2VcbiAgICAgICAgICAgICAgICBiYXJTdHJva2VXaWR0aDogMixcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gU3BhY2luZyBiZXR3ZWVuIGVhY2ggb2YgdGhlIFggdmFsdWUgc2V0c1xuICAgICAgICAgICAgICAgIGJhclZhbHVlU3BhY2luZzogNSxcblxuICAgICAgICAgICAgICAgIC8vTnVtYmVyIC0gU3BhY2luZyBiZXR3ZWVuIGRhdGEgc2V0cyB3aXRoaW4gWCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBiYXJEYXRhc2V0U3BhY2luZzogMSxcblxuICAgICAgICAgICAgICAgIC8vU3RyaW5nIC0gQSBsZWdlbmQgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBsZWdlbmRUZW1wbGF0ZTogJzx1bCBjbGFzcz1cInRjLWNoYXJ0LWpzLWxlZ2VuZFwiPjwlIGZvciAodmFyIGk9MDsgaTxkYXRhc2V0cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOjwlPWRhdGFzZXRzW2ldLmZpbGxDb2xvciU+XCI+PC9zcGFuPjwlaWYoZGF0YXNldHNbaV0ubGFiZWwpeyU+PCU9ZGF0YXNldHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+J1xuICAgICAgICAgICAgfTtcblxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldENvbXAoKSB7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzL2NvdW50JylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwuY29tcGFuaWVzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZ2V0U3RvY2socmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvY2soY29tcCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY29tcClcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9zdG9ja2lzdHMvY291bnQnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldEVtcChjb21wLCByZXNwb25zZS5kYXRhKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRFbXAoY29tcCwgc3RvY2spIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXAsIHN0b2NrKVxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2VtcGxveWVlcy9jb3VudCcpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q2hhcnQoY29tcCwgc3RvY2ssIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oZ2V0Q29tcCkge1xuXG5cbiAgICAgICAgICAgIGdldENvbXAoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKGdldENvbXApO1xuXG5cblxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyU3ZjLCAkbG9jYXRpb24pIHsgICAgICAgIFxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgcmVzcG9uc2VcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdsb2dpbicsIHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvaG9tZScpXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJtYXN0ZXJDdHJsXCIpO1xuXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIEluXCIpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHVzZXIubmFtZVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlcilcbiAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignUG9zdHNDdHJsJyxmdW5jdGlvbigkc2NvcGUsUG9zdHNTdmMpeyBcbiAgUG9zdHNTdmMuZmV0Y2goKVxuIFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKXtcbiBcdFx0JHNjb3BlLnBvc3RzID0gcG9zdHNcblxuIFx0fSlcblx0XG4gXHQgJHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5wb3N0Qm9keSkge1xuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgLyp1c2VybmFtZTogJ3Zpc2hhbFJhbmphbicsKi9cbiAgICAgICAgICAgICAgYm9keTogICAgICRzY29wZS5wb3N0Qm9keSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgIC8vJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdClcbiAgICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gbnVsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICRzY29wZS4kb24oJ3dzOm5ld19wb3N0JyxmdW5jdGlvbihfLHBvc3Qpe1xuICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpXG4gICAgfSlcbiAgfSlcbiBcbn0pXG5cbiAiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uKCRodHRwKXtcbiAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7ICAgXHRcbiAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpXG4gICB9XG4gICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwb3N0KXtcbiAgIFx0XG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycscG9zdClcbiAgIH1cbiB9KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsZnVuY3Rpb24oJHNjb3BlLFVzZXJTdmMgLCRsb2NhdGlvbil7XG5cdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsdXNlcm5hbWUscGFzc3dvcmQpe1xuXHRcdFVzZXJTdmMucmVnaXN0ZXIobmFtZSx1c2VybmFtZSxwYXNzd29yZClcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHRcdFx0XG5cdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJyxyZXNwb25zZS5kYXRhKVxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9ob21lJylcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcblx0XHRcdGNvbnNvbGUubG9nKGVycilcblx0XHR9KVxuXHR9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdzZWdtZW50JywgZnVuY3Rpb24oJGh0dHAsJHdpbmRvdywkbG9jYXRpb24pe1xuICBcbiAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oJHEsICRodHRwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XG4gICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICB9XG4gICAgfTtcblxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnaGVhZGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5sb2dpbicsIHtcbiAgICAgICAgICAgIHVybDogJ2xvZ2luJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICB1cmw6ICdyZWdpc3RlcicsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICdob21lJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5ob21lLnZlaGljbGVzJywge1xuICAgICAgICAgICAgdXJsOiAnL3ZlaGljbGVzL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2ZWhpY2xlcy9uZXdWZWhpY2xlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVmVoaWNsZXNOZXdJbmZvQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5wcm9kdWN0cycsIHtcbiAgICAgICAgICAgIHVybDogJ3Byb2R1Y3RzJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2R1Y3RzL3Byb2R1Y3RzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncHJvZHVjdHNDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnByb2R1Y3RzLm5ldycsIHtcbiAgICAgICAgICAgIHVybDogJy9uZXcnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMvbmV3UHJvZHVjdC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25ld1Byb2R1Y3RDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnByb2R1Y3RzLmRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvOmlkJyxcblxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMvZWRpdFByb2R1Y3QuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0UHJvZHVjdEN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyAgUmVzb3VyY2VzIE1lbnUgXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuY29tcGFuaWVzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL2NvbXBhbmllcycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvY29tcGFuaWVzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY29tcGFuaWVzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmNvbXBhbmllcy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld0NvbXBhbnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduZXdDb21wYW55Q3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5jb21wYW5pZXMuZGV0YWlscycsIHtcbiAgICAgICAgICAgIHVybDogJy86aWQnLFxuXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvZWRpdENvbXBhbnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0Q29tcGFueUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc3RvY2tpc3RzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL3N0b2NraXN0cycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvc3RvY2tpc3RzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc3RvY2tpc3RzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnN0b2NraXN0cy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld1N0b2NraXN0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3U3RvY2tpc3RDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuZW1wbG95ZWVzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL2VtcGxveWVlcycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvZW1wbG95ZWVzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZW1wbG95ZWVzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmVtcGxveWVlcy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld0VtcGxveWVlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3RW1wbG95ZWVDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLy8gIFNhbGVzIE1lbnUgXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuaW52b2ljZWVudHJ5Jywge1xuICAgICAgICAgICAgdXJsOiAnc2FsZXMvaW52b2ljZS1lbnRyeScsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzYWxlcy9pbnZvaWNlRW50cnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbnZvaWNlRW50cnlDdHJsJ1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmJpbGxoZWFkZXInLCB7XG4gICAgICAgICAgICB1cmw6ICdzYWxlcy9iaWxsaGVhZGVyJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NhbGVzL2JpbGxIZWFkZXIuaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc2FsZXNyZXR1cm4nLCB7XG4gICAgICAgICAgICB1cmw6ICdzYWxlcy9zYWxlcy1yZXR1cm4nLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2FsZXMvc2FsZXNSZXR1cm4uaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyBQdXJjaGFzZSBNZW51XG5cbiAgICAgICAgLnN0YXRlKCdhcHAucHVyY2hhc2VlbnRyeScsIHtcbiAgICAgICAgICAgIHVybDogJ3NhbGVzL3B1cmNoYXNlLWVudHJ5JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3B1cmNoYXNlL3B1cmNoYXNlRW50cnkuaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gU2V0dGluZ3MgTWVudVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnBhc3N3b3JkJywge1xuICAgICAgICAgICAgdXJsOiAncmVzZXQtcGFzc3dvcmQnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2V0dGluZ3MvY2hhbmdlUGFzc3dvcmQuaHRtbCcsICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5idWcnLCB7XG4gICAgICAgICAgICB1cmw6ICdyZXBvcnQtYS1hYnVnJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NldHRpbmdzL2J1Zy5odG1sJywgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmZlZWRiYWNrJywge1xuICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2V0dGluZ3MvZmVlZGJhY2suaHRtbCcsICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5hYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJ2Fib3V0JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NldHRpbmdzL2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG5cbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5zZXJ2aWNlKCdVc2VyU3ZjJywgZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRsb2NhdGlvbiwgJHJvb3RTY29wZSkge1xuICAgICAgICB2YXIgc3ZjID0gdGhpc1xuICAgICAgICBzdmMuZ2V0VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzJylcbiAgICAgICAgfVxuXG4gICAgICAgIHN2Yy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9zZXNzaW9ucycsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBzdmMudG9rZW4gPSB2YWwuZGF0YVxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LnNlc3Npb25TdG9yYWdlW1widXNlcl90b2tlblwiXSA9IHN2Yy50b2tlblxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl90b2tlbicsIHN2Yy50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9ICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2UudXNlcl90b2tlbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0VXNlcigpXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignR2lzdHMgZXJyb3InLCByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLzQwMScpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbGx5IGZpbmlzaGVkIGdpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdmMucmVnaXN0ZXIgPSBmdW5jdGlvbihuYW1lLCB1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHZhbDsgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBzdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2VkaXRQcm9kdWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHN0YXRlUGFyYW1zKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcylcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9wcm9kdWN0cy8nICsgJHN0YXRlUGFyYW1zLmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbClcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudXBkYXRlUHJvZHVjdERldGFpbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS9wcm9kdWN0cy8nICsgJHN0YXRlUGFyYW1zLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfY29kZTogJHNjb3BlLm1vZGVsLnByb2R1Y3RfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9uYW1lOiAkc2NvcGUubW9kZWwucHJvZHVjdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X2FyZWFjb2RlOiAkc2NvcGUubW9kZWwucHJvZHVjdF9hcmVhY29kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9hZGRyZXNzOiAkc2NvcGUubW9kZWwucHJvZHVjdF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X29wZW5pbmdiYWxhbmNlOiAkc2NvcGUubW9kZWwucHJvZHVjdF9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9ic3Rjb2RlOiAkc2NvcGUubW9kZWwucHJvZHVjdF9ic3Rjb2RlLFxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCduZXdQcm9kdWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbikge1xuXG5cbiAgICAgICAgJHNjb3BlLnNhdmVQcm9kdWN0RGV0YWlscyA9IGZ1bmN0aW9uKCkgeyAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSBpbiB0aGUgcHJvZHVjdCBjb250cm9sbGVyXCIpIDsgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9wcm9kdWN0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9jb2RlOiAkc2NvcGUucHJvZHVjdF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X25hbWU6ICRzY29wZS5wcm9kdWN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfcGFja2luZzogJHNjb3BlLnByb2R1Y3RfcGFja2luZyxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9jb21wYW55OiAkc2NvcGUucHJvZHVjdF9jb21wYW55LFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3NhbGVzdGF4OiAkc2NvcGUucHJvZHVjdF9zYWxlc3RheCxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9kaXNjb3VudDogJHNjb3BlLnByb2R1Y3RfZGlzY291bnQsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfYm94c2l6ZTogJHNjb3BlLnByb2R1Y3RfYm94c2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9wdXJjaGFzZTogJHNjb3BlLnByb2R1Y3RfcHVyY2hhc2UsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfbXJwOiAkc2NvcGUucHJvZHVjdF9tcnAsXG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9wcm9kdWN0cycpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgICRzY29wZS5hdmFpbGFibGVDb21wYW5pZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9jb21wYW5pZXMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jb21wYW5pZXMgPSBfLm1hcChyZXNwb25zZS5kYXRhLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb2JqLmNvbXBhbnlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBvYmouY29tcGFueV9hZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvbXBhbmllcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUNvbXBhbmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcigncHJvZHVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcHJvZHVjdHMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdjb21wYW5pZXNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9jb21wYW5pZXMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS5kZWxldGVDb21wYW55ID0gZnVuY3Rpb24oY29tcGFueV9pZCkgeyAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghY29uZmlybSgnQXJlIHlvdSBzdXJlPycpKSByZXR1cm47XG4gICAgICAgICAgICAkaHR0cC5kZWxldGUoJy9hcGkvY29tcGFuaWVzLycrIGNvbXBhbnlfaWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdlZGl0Q29tcGFueUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICRzdGF0ZVBhcmFtcykge1xuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzLycgKyAkc3RhdGVQYXJhbXMuaWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLm1vZGVsKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS51cGRhdGVDb21wYW55RGV0YWlscyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHAucHV0KCcvYXBpL2NvbXBhbmllcy8nICsgJHN0YXRlUGFyYW1zLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfY29kZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9uYW1lOiAkc2NvcGUubW9kZWwuY29tcGFueV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2FyZWFjb2RlOiAkc2NvcGUubW9kZWwuY29tcGFueV9hcmVhY29kZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9hZGRyZXNzOiAkc2NvcGUubW9kZWwuY29tcGFueV9hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X29wZW5pbmdiYWxhbmNlOiAkc2NvcGUubW9kZWwuY29tcGFueV9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9ic3Rjb2RlOiAkc2NvcGUubW9kZWwuY29tcGFueV9ic3Rjb2RlLFxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdlbXBsb3llZXNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9lbXBsb3llZXMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cbiAgICB9KVxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3Q29tcGFueUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuXG4gICAgICAgICRzY29wZS5zYXZlQ29tcGFueURldGFpbHMgPSBmdW5jdGlvbigpIHsgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUgaW4gdGhlIGNvbXBhbnkgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvY29tcGFuaWVzJywge1xuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2NvZGU6ICRzY29wZS5jb21wYW55X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfbmFtZTogJHNjb3BlLmNvbXBhbnlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9hcmVhY29kZTogJHNjb3BlLmNvbXBhbnlfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYWRkcmVzczogJHNjb3BlLmNvbXBhbnlfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLmNvbXBhbnlfb3BlbmluZ2JhbGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYnN0Y29kZTogJHNjb3BlLmNvbXBhbnlfYnN0Y29kZSwgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvcmVzb3VyY2VzL2NvbXBhbmllcycpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCduZXdFbXBsb3llZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuXG4gICAgICAgICRzY29wZS5zYXZlRW1wbG95ZWVEZXRhaWxzID0gZnVuY3Rpb24oKSB7ICBcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJlIGluIHRoZSBFbXBsb3llZSBjb250cm9sbGVyXCIpIDsgICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmVtcGxveWVlX2NvZGUpXG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvZW1wbG95ZWVzJywge1xuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9jb2RlOiAkc2NvcGUuZW1wbG95ZWVfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfbmFtZTogJHNjb3BlLmVtcGxveWVlX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcGxveWVlX2FyZWFjb2RlOiAkc2NvcGUuZW1wbG95ZWVfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGVtcGxveWVlX2FkZHJlc3M6ICRzY29wZS5lbXBsb3llZV9hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLmVtcGxveWVlX29wZW5pbmdiYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9ic3Rjb2RlOiAkc2NvcGUuZW1wbG95ZWVfYnN0Y29kZSwgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvcmVzb3VyY2VzL2VtcGxveWVlcycpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCduZXdTdG9ja2lzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuXG4gICAgICAgICRzY29wZS5zYXZlU3RvY2tpc3REZXRhaWxzID0gZnVuY3Rpb24oKSB7ICBcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJlIGluIHRoZSBTdG9ja2lzdCBjb250cm9sbGVyXCIpIDsgICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnN0b2NraXN0X2NvZGUpXG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvc3RvY2tpc3RzJywge1xuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9jb2RlOiAkc2NvcGUuc3RvY2tpc3RfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3RfbmFtZTogJHNjb3BlLnN0b2NraXN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0b2NraXN0X2FyZWFjb2RlOiAkc2NvcGUuc3RvY2tpc3RfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b2NraXN0X2FkZHJlc3M6ICRzY29wZS5zdG9ja2lzdF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLnN0b2NraXN0X29wZW5pbmdiYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9ic3Rjb2RlOiAkc2NvcGUuc3RvY2tpc3RfYnN0Y29kZSwgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvcmVzb3VyY2VzL3N0b2NraXN0cycpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdzdG9ja2lzdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9zdG9ja2lzdHMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cbiAgICB9KVxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignaW52b2ljZUVudHJ5Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgJHNjb3BlLm1vZGVsID0ge307XG5cbiAgICAgICAgJHNjb3BlLmF2YWlsYWJsZVByb2R1Y3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcHJvZHVjdHMnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbC5wcm9kdWN0cyA9IF8ubWFwKHJlc3BvbnNlLmRhdGEsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmoucHJvZHVjdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IG9iai5wcm9kdWN0X2NvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAkc2NvcGUuYXZhaWxhYmxlQ29tcGFuaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwuY29tcGFuaWVzID0gXy5tYXAocmVzcG9uc2UuZGF0YSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5jb21wYW55X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogb2JqLmNvbXBhbnlfYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbC5jb21wYW5pZXMpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVQcm9kdWN0cygpO1xuICAgICAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUNvbXBhbmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG5cbiAgICAgICAgZnVuY3Rpb24gY2FsZW5kYXJJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS50b2RheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLnRvZGF5KCk7XG5cbiAgICAgICAgICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKiAvLyBEaXNhYmxlIHdlZWtlbmQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgJHNjb3BlLmRpc2FibGVkID0gZnVuY3Rpb24oZGF0ZSwgbW9kZSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gbW9kZSA9PT0gJ2RheScgJiYgKGRhdGUuZ2V0RGF5KCkgPT09IDAgfHwgZGF0ZS5nZXREYXkoKSA9PT0gNik7XG4gICAgICAgICAgICAgfTsqL1xuXG4gICAgICAgICAgICAkc2NvcGUudG9nZ2xlTWluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1pbkRhdGUgPSAkc2NvcGUubWluRGF0ZSA/IG51bGwgOiBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xuICAgICAgICAgICAgJHNjb3BlLm1heERhdGUgPSBuZXcgRGF0ZSgyMDIwLCA1LCAyMik7XG5cbiAgICAgICAgICAgICRzY29wZS5vcGVuMSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5wb3B1cDEub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5vcGVuMiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5wb3B1cDIub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24oeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdEYXk6IDEsXG4gICAgICAgICAgICAgICAgc2hvd1dlZWtzOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmZvcm1hdHMgPSBbJ2RkLU1NTU0teXl5eScsICd5eXl5L01NL2RkJywgJ2RkLk1NLnl5eXknLCAnc2hvcnREYXRlJ107XG4gICAgICAgICAgICAkc2NvcGUuZm9ybWF0ID0gJHNjb3BlLmZvcm1hdHNbMF07XG4gICAgICAgICAgICAkc2NvcGUuYWx0SW5wdXRGb3JtYXRzID0gWydNIS9kIS95eXl5J107XG5cbiAgICAgICAgICAgICRzY29wZS5wb3B1cDEgPSB7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnBvcHVwMiA9IHtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgIHZhciBhZnRlclRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGFmdGVyVG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgICRzY29wZS5ldmVudHMgPSBbe1xuICAgICAgICAgICAgICAgIGRhdGU6IHRvbW9ycm93LFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Z1bGwnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGF0ZTogYWZ0ZXJUb21vcnJvdyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdwYXJ0aWFsbHknXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICAgICAgJHNjb3BlLmdldERheUNsYXNzID0gZnVuY3Rpb24oZGF0ZSwgbW9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlID09PSAnZGF5Jykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF5VG9DaGVjayA9IG5ldyBEYXRlKGRhdGUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgkc2NvcGUuZXZlbnRzW2ldLmRhdGUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF5VG9DaGVjayA9PT0gY3VycmVudERheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZlbnRzW2ldLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1ZlaGljbGVzRWRpdEluZm9DdHJsJyxmdW5jdGlvbigkc2NvcGUsJGh0dHAsJGxvY2F0aW9uLCRzdGF0ZVBhcmFtcyl7IFxuIFxuXG4kc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpe1xuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpXG5cdCRodHRwLmdldCgnL2FwaS92ZWhpY2xlLycrJHN0YXRlUGFyYW1zLmlkKVxuXHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgJHNjb3BlLm1vZGVsID0gcmVzcG9uc2UuZGF0YTtcblx0ICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbClcblxuXHQgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0ICB9KTtcblx0XG59XG5cbiRzY29wZS5zZXR1cCgpO1xuIFxuIFxuIFxufSlcblxuICIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1ZlaGljbGVzTmV3SW5mb0N0cmwnLGZ1bmN0aW9uKCRzY29wZSwkaHR0cCwkbG9jYXRpb24peyBcbiBcblxuJHNjb3BlLnNhdmVWZWhpY2xlRGV0YWlscyA9IGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKFwiaW4gY29udHJvbGxlciAyXCIpXG5cdGNvbnNvbGUubG9nKCRzY29wZS5kZXZfaWQgKyAkc2NvcGUudl9udW1iZXIpXG5cdCBcblxuXHQkaHR0cC5wb3N0KCcvYXBpL3ZlaGljbGUnLHtcblx0XHRkZXZfaWQ6ICRzY29wZS5kZXZfaWQsXG4gICAgICAgIHZfbnVtYmVyOiAkc2NvcGUudl9udW1iZXIsXG4gICAgICAgIGRyaXZlcl9uYW1lIDogJHNjb3BlLmRyaXZlcl9uYW1lLFxuICAgICAgICBzb3NfbnVtYmVyIDogJHNjb3BlLnNvc19udW1iZXIgICAgICAgICAgICAgICAgICAgICAgIFxuXHR9KVxuXHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cdCAgICAkbG9jYXRpb24ucGF0aCgnL2hvbWUnKVxuXG5cdCAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHQgIH0pO1xuXHRcbn1cbiBcbiBcbiBcbn0pXG5cbiAiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
