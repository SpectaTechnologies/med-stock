angular.module('app',[
'ngRoute','ui.router','tc.chartjs','ui.bootstrap'
])
angular.module('app')
    .controller('ErrorCtrl', function($scope, $rootScope) {
        $scope.hello = "this is from the controller hello"
        console.log($scope.hello)



    })

angular.module('app')
    .controller('HomeCtrl', function($scope, $http) {
        $scope.model = "";

        $scope.setup = function() {

            $http.get('/api/companies/count')
                .then(function(response) {
                    $scope.model.companies = response.data;

                }, function(err) {
                    console.log(err)
                });

            $http.get('/api/stockists/count')
                .then(function(response) {
                    $scope.model.stockists = response.data;

                }, function(err) {
                    console.log(err)
                });

            $http.get('/api/employees/count')
                .then(function(response) {
                    $scope.model.employees = response.data;

                }, function(err) {
                    console.log(err)
                });

        }

        $scope.setup();


        $scope.data = [{
            value: 50,
            color: '#F7464A',
            highlight: '#FF5A5E',
            label: 'Companies'
        }, {
            value: 20,
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: 'Stockists'
        }, {
            value: 6,
            color: '#FFFF00',
            highlight: '#e5e500',
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


        $scope.$on('login', function(_, user) {
            console.log("Logged In");
            $scope.currentUser = user
            $rootScope.currentUser = user            
            localStorage.setItem('logged_user', $rootScope.currentUser.username)
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


        .state('app.settings', {
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
    .service('UserSvc', function($http, $window, $location) {
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
                    $window.sessionStorage["user_token"] = JSON.stringify(svc.token)
                    localStorage.setItem("user_token", JSON.stringify(svc.token));
                    $http.defaults.headers.common['x-auth'] = val.data
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

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImVycm9yLmN0cmwuanMiLCJob21lQ3RybC5qcyIsImxvZ2luLmN0cmwuanMiLCJtYXN0ZXJDdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJlZ2lzdGVyLmN0cmwuanMiLCJyb3V0ZVNlZ21lbnQuanMiLCJyb3V0ZXMuanMiLCJ1c2VyLnN2Yy5qcyIsInByb2R1Y3RzL2VkaXRQcm9kdWN0Q3RybC5qcyIsInByb2R1Y3RzL25ld1Byb2R1Y3RDdHJsLmpzIiwicHJvZHVjdHMvcHJvZHVjdHNDdHJsLmpzIiwicmVzb3VyY2VzL2NvbXBhbmllc0N0cmwuanMiLCJyZXNvdXJjZXMvZWRpdENvbXBhbnlDdHJsLmpzIiwicmVzb3VyY2VzL2VtcGxveWVlc0N0cmwuanMiLCJyZXNvdXJjZXMvbmV3Q29tcGFueUN0cmwuanMiLCJyZXNvdXJjZXMvbmV3RW1wbG95ZWVDdHJsLmpzIiwicmVzb3VyY2VzL25ld1N0b2NraXN0Q3RybC5qcyIsInJlc291cmNlcy9zdG9ja2lzdHNDdHJsLmpzIiwic2FsZXMvaW52b2ljZUVudHJ5Q3RybC5qcyIsInZlaGljbGVzL2VkaXQvaW5mby5qcyIsInZlaGljbGVzL25ldy9pbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDclFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLFtcbiduZ1JvdXRlJywndWkucm91dGVyJywndGMuY2hhcnRqcycsJ3VpLmJvb3RzdHJhcCdcbl0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0Vycm9yQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSkge1xuICAgICAgICAkc2NvcGUuaGVsbG8gPSBcInRoaXMgaXMgZnJvbSB0aGUgY29udHJvbGxlciBoZWxsb1wiXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5oZWxsbylcblxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICAkc2NvcGUubW9kZWwgPSBcIlwiO1xuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzL2NvdW50JylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwuY29tcGFuaWVzID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9zdG9ja2lzdHMvY291bnQnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbC5zdG9ja2lzdHMgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2VtcGxveWVlcy9jb3VudCcpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLmVtcGxveWVlcyA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS5kYXRhID0gW3tcbiAgICAgICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgICAgIGNvbG9yOiAnI0Y3NDY0QScsXG4gICAgICAgICAgICBoaWdobGlnaHQ6ICcjRkY1QTVFJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ29tcGFuaWVzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWx1ZTogMjAsXG4gICAgICAgICAgICBjb2xvcjogJyM0NkJGQkQnLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiAnIzVBRDNEMScsXG4gICAgICAgICAgICBsYWJlbDogJ1N0b2NraXN0cydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsdWU6IDYsXG4gICAgICAgICAgICBjb2xvcjogJyNGRkZGMDAnLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI2U1ZTUwMCcsXG4gICAgICAgICAgICBsYWJlbDogJ0VtcGxveWVlcydcbiAgICAgICAgfV07XG5cbiAgICAgICAgLy8gQ2hhcnQuanMgT3B0aW9uc1xuICAgICAgICAkc2NvcGUub3B0aW9ucyA9IHtcblxuICAgICAgICAgICAgLy8gU2V0cyB0aGUgY2hhcnQgdG8gYmUgcmVzcG9uc2l2ZVxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcblxuICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB3ZSBzaG91bGQgc2hvdyBhIHN0cm9rZSBvbiBlYWNoIHNlZ21lbnRcbiAgICAgICAgICAgIHNlZ21lbnRTaG93U3Ryb2tlOiB0cnVlLFxuXG4gICAgICAgICAgICAvL1N0cmluZyAtIFRoZSBjb2xvdXIgb2YgZWFjaCBzZWdtZW50IHN0cm9rZVxuICAgICAgICAgICAgc2VnbWVudFN0cm9rZUNvbG9yOiAnI2ZmZicsXG5cbiAgICAgICAgICAgIC8vTnVtYmVyIC0gVGhlIHdpZHRoIG9mIGVhY2ggc2VnbWVudCBzdHJva2VcbiAgICAgICAgICAgIHNlZ21lbnRTdHJva2VXaWR0aDogMixcblxuICAgICAgICAgICAgLy9OdW1iZXIgLSBUaGUgcGVyY2VudGFnZSBvZiB0aGUgY2hhcnQgdGhhdCB3ZSBjdXQgb3V0IG9mIHRoZSBtaWRkbGVcbiAgICAgICAgICAgIHBlcmNlbnRhZ2VJbm5lckN1dG91dDogNTAsIC8vIFRoaXMgaXMgMCBmb3IgUGllIGNoYXJ0c1xuXG4gICAgICAgICAgICAvL051bWJlciAtIEFtb3VudCBvZiBhbmltYXRpb24gc3RlcHNcbiAgICAgICAgICAgIGFuaW1hdGlvblN0ZXBzOiAxMDAsXG5cbiAgICAgICAgICAgIC8vU3RyaW5nIC0gQW5pbWF0aW9uIGVhc2luZyBlZmZlY3RcbiAgICAgICAgICAgIGFuaW1hdGlvbkVhc2luZzogJ2Vhc2VPdXRCb3VuY2UnLFxuXG4gICAgICAgICAgICAvL0Jvb2xlYW4gLSBXaGV0aGVyIHdlIGFuaW1hdGUgdGhlIHJvdGF0aW9uIG9mIHRoZSBEb3VnaG51dFxuICAgICAgICAgICAgYW5pbWF0ZVJvdGF0ZTogdHJ1ZSxcblxuICAgICAgICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB3ZSBhbmltYXRlIHNjYWxpbmcgdGhlIERvdWdobnV0IGZyb20gdGhlIGNlbnRyZVxuICAgICAgICAgICAgYW5pbWF0ZVNjYWxlOiBmYWxzZSxcblxuICAgICAgICAgICAgLy9TdHJpbmcgLSBBIGxlZ2VuZCB0ZW1wbGF0ZVxuICAgICAgICAgICAgbGVnZW5kVGVtcGxhdGU6ICc8dWwgY2xhc3M9XCJ0Yy1jaGFydC1qcy1sZWdlbmRcIj48JSBmb3IgKHZhciBpPTA7IGk8c2VnbWVudHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPidcblxuICAgICAgICB9O1xuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlclN2YywgJGxvY2F0aW9uKSB7ICAgICAgICBcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICBVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50aW5nIHJlc3BvbnNlXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnbG9naW4nLCByZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2hvbWUnKVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuXG4gICAgICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgSW5cIik7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gdXNlciAgICAgICAgICAgIFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlci51c2VybmFtZSlcbiAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignUG9zdHNDdHJsJyxmdW5jdGlvbigkc2NvcGUsUG9zdHNTdmMpeyBcbiAgUG9zdHNTdmMuZmV0Y2goKVxuIFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKXtcbiBcdFx0JHNjb3BlLnBvc3RzID0gcG9zdHNcblxuIFx0fSlcblx0XG4gXHQgJHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5wb3N0Qm9keSkge1xuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgLyp1c2VybmFtZTogJ3Zpc2hhbFJhbmphbicsKi9cbiAgICAgICAgICAgICAgYm9keTogICAgICRzY29wZS5wb3N0Qm9keSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgIC8vJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdClcbiAgICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gbnVsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICRzY29wZS4kb24oJ3dzOm5ld19wb3N0JyxmdW5jdGlvbihfLHBvc3Qpe1xuICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpXG4gICAgfSlcbiAgfSlcbiBcbn0pXG5cbiAiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uKCRodHRwKXtcbiAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7ICAgXHRcbiAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpXG4gICB9XG4gICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwb3N0KXtcbiAgIFx0XG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycscG9zdClcbiAgIH1cbiB9KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsZnVuY3Rpb24oJHNjb3BlLFVzZXJTdmMgLCRsb2NhdGlvbil7XG5cdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsdXNlcm5hbWUscGFzc3dvcmQpe1xuXHRcdFVzZXJTdmMucmVnaXN0ZXIobmFtZSx1c2VybmFtZSxwYXNzd29yZClcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHRcdFx0XG5cdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJyxyZXNwb25zZS5kYXRhKVxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9ob21lJylcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcblx0XHRcdGNvbnNvbGUubG9nKGVycilcblx0XHR9KVxuXHR9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdzZWdtZW50JywgZnVuY3Rpb24oJGh0dHAsJHdpbmRvdywkbG9jYXRpb24pe1xuICBcbiAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oJHEsICRodHRwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XG4gICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICB9XG4gICAgfTtcblxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnaGVhZGVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5sb2dpbicsIHtcbiAgICAgICAgICAgIHVybDogJ2xvZ2luJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAucmVnaXN0ZXInLCB7XG4gICAgICAgICAgICB1cmw6ICdyZWdpc3RlcicsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICdob21lJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5ob21lLnZlaGljbGVzJywge1xuICAgICAgICAgICAgdXJsOiAnL3ZlaGljbGVzL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2ZWhpY2xlcy9uZXdWZWhpY2xlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVmVoaWNsZXNOZXdJbmZvQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5wcm9kdWN0cycsIHtcbiAgICAgICAgICAgIHVybDogJ3Byb2R1Y3RzJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2R1Y3RzL3Byb2R1Y3RzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncHJvZHVjdHNDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnByb2R1Y3RzLm5ldycsIHtcbiAgICAgICAgICAgIHVybDogJy9uZXcnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMvbmV3UHJvZHVjdC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25ld1Byb2R1Y3RDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnByb2R1Y3RzLmRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvOmlkJyxcblxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMvZWRpdFByb2R1Y3QuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0UHJvZHVjdEN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyAgUmVzb3VyY2VzIE1lbnUgXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuY29tcGFuaWVzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL2NvbXBhbmllcycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvY29tcGFuaWVzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY29tcGFuaWVzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmNvbXBhbmllcy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld0NvbXBhbnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduZXdDb21wYW55Q3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5jb21wYW5pZXMuZGV0YWlscycsIHtcbiAgICAgICAgICAgIHVybDogJy86aWQnLFxuXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvZWRpdENvbXBhbnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0Q29tcGFueUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc3RvY2tpc3RzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL3N0b2NraXN0cycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvc3RvY2tpc3RzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc3RvY2tpc3RzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnN0b2NraXN0cy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld1N0b2NraXN0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3U3RvY2tpc3RDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuZW1wbG95ZWVzJywge1xuICAgICAgICAgICAgdXJsOiAncmVzb3VyY2VzL2VtcGxveWVlcycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXNvdXJjZXMvZW1wbG95ZWVzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZW1wbG95ZWVzQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmVtcGxveWVlcy5uZXcnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG5cbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL25ld0VtcGxveWVlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3RW1wbG95ZWVDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLy8gIFNhbGVzIE1lbnUgXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuaW52b2ljZWVudHJ5Jywge1xuICAgICAgICAgICAgdXJsOiAnc2FsZXMvaW52b2ljZS1lbnRyeScsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzYWxlcy9pbnZvaWNlRW50cnkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbnZvaWNlRW50cnlDdHJsJ1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmJpbGxoZWFkZXInLCB7XG4gICAgICAgICAgICB1cmw6ICdzYWxlcy9iaWxsaGVhZGVyJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NhbGVzL2JpbGxIZWFkZXIuaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc2FsZXNyZXR1cm4nLCB7XG4gICAgICAgICAgICB1cmw6ICdzYWxlcy9zYWxlcy1yZXR1cm4nLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2FsZXMvc2FsZXNSZXR1cm4uaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyBQdXJjaGFzZSBNZW51XG5cbiAgICAgICAgLnN0YXRlKCdhcHAucHVyY2hhc2VlbnRyeScsIHtcbiAgICAgICAgICAgIHVybDogJ3NhbGVzL3B1cmNoYXNlLWVudHJ5JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3B1cmNoYXNlL3B1cmNoYXNlRW50cnkuaHRtbCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAuc3RhdGUoJ2FwcC5zZXR0aW5ncycsIHtcbiAgICAgICAgICAgIHVybDogJ2Fib3V0JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NldHRpbmdzL2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cblxuICAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLnNlcnZpY2UoJ1VzZXJTdmMnLCBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBzdmMgPSB0aGlzXG4gICAgICAgIHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlcnMnKVxuICAgICAgICB9XG5cbiAgICAgICAgc3ZjLmxvZ2luID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3Nlc3Npb25zJywge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN2Yy50b2tlbiA9IHZhbC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbXCJ1c2VyX3Rva2VuXCJdID0gSlNPTi5zdHJpbmdpZnkoc3ZjLnRva2VuKVxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJfdG9rZW5cIiwgSlNPTi5zdHJpbmdpZnkoc3ZjLnRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9IHZhbC5kYXRhXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0VXNlcigpXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignR2lzdHMgZXJyb3InLCByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLzQwMScpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbGx5IGZpbmlzaGVkIGdpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdmMucmVnaXN0ZXIgPSBmdW5jdGlvbihuYW1lLCB1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHZhbDtcdFx0XHRcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdlZGl0UHJvZHVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICRzdGF0ZVBhcmFtcykge1xuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvcHJvZHVjdHMvJyArICRzdGF0ZVBhcmFtcy5pZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubW9kZWwpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnVwZGF0ZVByb2R1Y3REZXRhaWxzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9hcGkvcHJvZHVjdHMvJyArICRzdGF0ZVBhcmFtcy5pZCwge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X2NvZGU6ICRzY29wZS5tb2RlbC5wcm9kdWN0X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfbmFtZTogJHNjb3BlLm1vZGVsLnByb2R1Y3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9hcmVhY29kZTogJHNjb3BlLm1vZGVsLnByb2R1Y3RfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfYWRkcmVzczogJHNjb3BlLm1vZGVsLnByb2R1Y3RfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLm1vZGVsLnByb2R1Y3Rfb3BlbmluZ2JhbGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfYnN0Y29kZTogJHNjb3BlLm1vZGVsLnByb2R1Y3RfYnN0Y29kZSxcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3UHJvZHVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuXG4gICAgICAgICRzY29wZS5zYXZlUHJvZHVjdERldGFpbHMgPSBmdW5jdGlvbigpIHsgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUgaW4gdGhlIHByb2R1Y3QgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvcHJvZHVjdHMnLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfY29kZTogJHNjb3BlLnByb2R1Y3RfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9uYW1lOiAkc2NvcGUucHJvZHVjdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3BhY2tpbmc6ICRzY29wZS5wcm9kdWN0X3BhY2tpbmcsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfY29tcGFueTogJHNjb3BlLnByb2R1Y3RfY29tcGFueSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9zYWxlc3RheDogJHNjb3BlLnByb2R1Y3Rfc2FsZXN0YXgsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfZGlzY291bnQ6ICRzY29wZS5wcm9kdWN0X2Rpc2NvdW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X2JveHNpemU6ICRzY29wZS5wcm9kdWN0X2JveHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfcHVyY2hhc2U6ICRzY29wZS5wcm9kdWN0X3B1cmNoYXNlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X21ycDogJHNjb3BlLnByb2R1Y3RfbXJwLFxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvcHJvZHVjdHMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICAkc2NvcGUuYXZhaWxhYmxlQ29tcGFuaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29tcGFuaWVzID0gXy5tYXAocmVzcG9uc2UuZGF0YSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5jb21wYW55X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogb2JqLmNvbXBhbnlfYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb21wYW5pZXMpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVDb21wYW5pZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ3Byb2R1Y3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3Byb2R1Y3RzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignY29tcGFuaWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuICAgICAgICAkc2NvcGUuZGVsZXRlQ29tcGFueSA9IGZ1bmN0aW9uKGNvbXBhbnlfaWQpIHsgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZT8nKSkgcmV0dXJuO1xuICAgICAgICAgICAgJGh0dHAuZGVsZXRlKCcvYXBpL2NvbXBhbmllcy8nKyBjb21wYW55X2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICB9KVxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZWRpdENvbXBhbnlDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkc3RhdGVQYXJhbXMpIHtcblxuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKVxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2NvbXBhbmllcy8nICsgJHN0YXRlUGFyYW1zLmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbClcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudXBkYXRlQ29tcGFueURldGFpbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS9jb21wYW5pZXMvJyArICRzdGF0ZVBhcmFtcy5pZCwge1xuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2NvZGU6ICRzY29wZS5tb2RlbC5jb21wYW55X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfbmFtZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9hcmVhY29kZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYWRkcmVzczogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfb3BlbmluZ2JhbGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYnN0Y29kZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYnN0Y29kZSxcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZW1wbG95ZWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZW1wbG95ZWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ25ld0NvbXBhbnlDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZUNvbXBhbnlEZXRhaWxzID0gZnVuY3Rpb24oKSB7ICBcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJlIGluIHRoZSBjb21wYW55IGNvbnRyb2xsZXJcIikgOyAgICAgICAgIFxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2NvbXBhbmllcycsIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9jb2RlOiAkc2NvcGUuY29tcGFueV9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X25hbWU6ICRzY29wZS5jb21wYW55X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYXJlYWNvZGU6ICRzY29wZS5jb21wYW55X2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2FkZHJlc3M6ICRzY29wZS5jb21wYW55X2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5jb21wYW55X29wZW5pbmdiYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2JzdGNvZGU6ICRzY29wZS5jb21wYW55X2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9jb21wYW5pZXMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3RW1wbG95ZWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZUVtcGxveWVlRGV0YWlscyA9IGZ1bmN0aW9uKCkgeyAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSBpbiB0aGUgRW1wbG95ZWUgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5lbXBsb3llZV9jb2RlKVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2VtcGxveWVlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfY29kZTogJHNjb3BlLmVtcGxveWVlX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGVtcGxveWVlX25hbWU6ICRzY29wZS5lbXBsb3llZV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9hcmVhY29kZTogJHNjb3BlLmVtcGxveWVlX2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9hZGRyZXNzOiAkc2NvcGUuZW1wbG95ZWVfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5lbXBsb3llZV9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfYnN0Y29kZTogJHNjb3BlLmVtcGxveWVlX2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9lbXBsb3llZXMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3U3RvY2tpc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZVN0b2NraXN0RGV0YWlscyA9IGZ1bmN0aW9uKCkgeyAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSBpbiB0aGUgU3RvY2tpc3QgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zdG9ja2lzdF9jb2RlKVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3N0b2NraXN0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3RfY29kZTogJHNjb3BlLnN0b2NraXN0X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b2NraXN0X25hbWU6ICRzY29wZS5zdG9ja2lzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9hcmVhY29kZTogJHNjb3BlLnN0b2NraXN0X2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9hZGRyZXNzOiAkc2NvcGUuc3RvY2tpc3RfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3Rfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5zdG9ja2lzdF9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3RfYnN0Y29kZTogJHNjb3BlLnN0b2NraXN0X2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9zdG9ja2lzdHMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignc3RvY2tpc3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc3RvY2tpc3RzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2ludm9pY2VFbnRyeUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICRzY29wZS5tb2RlbCA9IHt9O1xuXG4gICAgICAgICRzY29wZS5hdmFpbGFibGVQcm9kdWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3Byb2R1Y3RzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucHJvZHVjdHMgPSBfLm1hcChyZXNwb25zZS5kYXRhLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogb2JqLnByb2R1Y3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBvYmoucHJvZHVjdF9jb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUNvbXBhbmllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2NvbXBhbmllcycpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLmNvbXBhbmllcyA9IF8ubWFwKHJlc3BvbnNlLmRhdGEsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvYmouY29tcGFueV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IG9iai5jb21wYW55X2FkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubW9kZWwuY29tcGFuaWVzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuYXZhaWxhYmxlUHJvZHVjdHMoKTtcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVDb21wYW5pZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGVuZGFySW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUudG9kYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS50b2RheSgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyogLy8gRGlzYWJsZSB3ZWVrZW5kIHNlbGVjdGlvblxuICAgICAgICAgICAgICRzY29wZS5kaXNhYmxlZCA9IGZ1bmN0aW9uKGRhdGUsIG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdkYXknICYmIChkYXRlLmdldERheSgpID09PSAwIHx8IGRhdGUuZ2V0RGF5KCkgPT09IDYpO1xuICAgICAgICAgICAgIH07Ki9cblxuICAgICAgICAgICAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5taW5EYXRlID0gJHNjb3BlLm1pbkRhdGUgPyBudWxsIDogbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS50b2dnbGVNaW4oKTtcbiAgICAgICAgICAgICRzY29wZS5tYXhEYXRlID0gbmV3IERhdGUoMjAyMCwgNSwgMjIpO1xuXG4gICAgICAgICAgICAkc2NvcGUub3BlbjEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9wdXAxLm9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUub3BlbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9wdXAyLm9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZHQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5kYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxuICAgICAgICAgICAgICAgIHN0YXJ0aW5nRGF5OiAxLFxuICAgICAgICAgICAgICAgIHNob3dXZWVrczogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5mb3JtYXRzID0gWydkZC1NTU1NLXl5eXknLCAneXl5eS9NTS9kZCcsICdkZC5NTS55eXl5JywgJ3Nob3J0RGF0ZSddO1xuICAgICAgICAgICAgJHNjb3BlLmZvcm1hdCA9ICRzY29wZS5mb3JtYXRzWzBdO1xuICAgICAgICAgICAgJHNjb3BlLmFsdElucHV0Rm9ybWF0cyA9IFsnTSEvZCEveXl5eSddO1xuXG4gICAgICAgICAgICAkc2NvcGUucG9wdXAxID0ge1xuICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5wb3B1cDIgPSB7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICB2YXIgYWZ0ZXJUb21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBhZnRlclRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICAkc2NvcGUuZXZlbnRzID0gW3tcbiAgICAgICAgICAgICAgICBkYXRlOiB0b21vcnJvdyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdmdWxsJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRhdGU6IGFmdGVyVG9tb3Jyb3csXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncGFydGlhbGx5J1xuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgICRzY29wZS5nZXREYXlDbGFzcyA9IGZ1bmN0aW9uKGRhdGUsIG1vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRheVRvQ2hlY2sgPSBuZXcgRGF0ZShkYXRlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5ldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RGF5ID0gbmV3IERhdGUoJHNjb3BlLmV2ZW50c1tpXS5kYXRlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRheVRvQ2hlY2sgPT09IGN1cnJlbnREYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2ZW50c1tpXS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdWZWhpY2xlc0VkaXRJbmZvQ3RybCcsZnVuY3Rpb24oJHNjb3BlLCRodHRwLCRsb2NhdGlvbiwkc3RhdGVQYXJhbXMpeyBcbiBcblxuJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zKVxuXHQkaHR0cC5nZXQoJy9hcGkvdmVoaWNsZS8nKyRzdGF0ZVBhcmFtcy5pZClcblx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cdCAgICBjb25zb2xlLmxvZygkc2NvcGUubW9kZWwpXG5cblx0ICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cdCAgfSk7XG5cdFxufVxuXG4kc2NvcGUuc2V0dXAoKTtcbiBcbiBcbiBcbn0pXG5cbiAiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdWZWhpY2xlc05ld0luZm9DdHJsJyxmdW5jdGlvbigkc2NvcGUsJGh0dHAsJGxvY2F0aW9uKXsgXG4gXG5cbiRzY29wZS5zYXZlVmVoaWNsZURldGFpbHMgPSBmdW5jdGlvbigpe1xuXHRjb25zb2xlLmxvZyhcImluIGNvbnRyb2xsZXIgMlwiKVxuXHRjb25zb2xlLmxvZygkc2NvcGUuZGV2X2lkICsgJHNjb3BlLnZfbnVtYmVyKVxuXHQgXG5cblx0JGh0dHAucG9zdCgnL2FwaS92ZWhpY2xlJyx7XG5cdFx0ZGV2X2lkOiAkc2NvcGUuZGV2X2lkLFxuICAgICAgICB2X251bWJlcjogJHNjb3BlLnZfbnVtYmVyLFxuICAgICAgICBkcml2ZXJfbmFtZSA6ICRzY29wZS5kcml2ZXJfbmFtZSxcbiAgICAgICAgc29zX251bWJlciA6ICRzY29wZS5zb3NfbnVtYmVyICAgICAgICAgICAgICAgICAgICAgICBcblx0fSlcblx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHQgICAgJGxvY2F0aW9uLnBhdGgoJy9ob21lJylcblxuXHQgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0ICB9KTtcblx0XG59XG4gXG4gXG4gXG59KVxuXG4gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
