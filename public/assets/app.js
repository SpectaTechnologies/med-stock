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


        $scope.setup = function() {

            $http.get('/api/vehicle')
                .then(function(response) {
                    $scope.model = response.data;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.setup();


        $scope.data = [
      {
        value: 50,
        color:'#F7464A',
        highlight: '#FF5A5E',
        label: 'Companies'
      },
      {
        value: 20,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Products'
      },
      {
        value: 6,
        color: '#FFFF00',
        highlight: '#e5e500',
        label: 'Employees'
      }
    ];

    // Chart.js Options
    $scope.options =  {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : '#fff',

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 50, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : 'easeOutBounce',

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

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



    })

angular.module('app')
    .controller('productsCtrl', function($scope, $http) {


        $scope.setup = function() {

            $http.get('/api/products')
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


        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

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
        //$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        console.log("in invoice ctrl")
        $scope.availableProducts = function() {
            console.log("in invoice ctrl function")
            $http.get('/api/products')
                .then(function(response) {                    
                    $scope.model = _.map(response.data, function(obj) {
                        return obj.product_name;
                      
                    })
                    console.log($scope.model);

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
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

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImVycm9yLmN0cmwuanMiLCJob21lQ3RybC5qcyIsImxvZ2luLmN0cmwuanMiLCJtYXN0ZXJDdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJlZ2lzdGVyLmN0cmwuanMiLCJyb3V0ZVNlZ21lbnQuanMiLCJyb3V0ZXMuanMiLCJ1c2VyLnN2Yy5qcyIsInByb2R1Y3RzL25ld1Byb2R1Y3RDdHJsLmpzIiwicHJvZHVjdHMvcHJvZHVjdHNDdHJsLmpzIiwicmVzb3VyY2VzL2NvbXBhbmllc0N0cmwuanMiLCJyZXNvdXJjZXMvZWRpdENvbXBhbnlDdHJsLmpzIiwicmVzb3VyY2VzL2VtcGxveWVlc0N0cmwuanMiLCJyZXNvdXJjZXMvbmV3Q29tcGFueUN0cmwuanMiLCJyZXNvdXJjZXMvbmV3RW1wbG95ZWVDdHJsLmpzIiwicmVzb3VyY2VzL25ld1N0b2NraXN0Q3RybC5qcyIsInJlc291cmNlcy9zdG9ja2lzdHNDdHJsLmpzIiwic2FsZXMvaW52b2ljZUVudHJ5Q3RybC5qcyIsInZlaGljbGVzL2VkaXQvaW5mby5qcyIsInZlaGljbGVzL25ldy9pbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsW1xuJ25nUm91dGUnLCd1aS5yb3V0ZXInLCd0Yy5jaGFydGpzJywndWkuYm9vdHN0cmFwJ1xuXSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignRXJyb3JDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgICRzY29wZS5oZWxsbyA9IFwidGhpcyBpcyBmcm9tIHRoZSBjb250cm9sbGVyIGhlbGxvXCJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmhlbGxvKVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3ZlaGljbGUnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS5kYXRhID0gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgIGNvbG9yOicjRjc0NjRBJyxcbiAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGNUE1RScsXG4gICAgICAgIGxhYmVsOiAnQ29tcGFuaWVzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgICBjb2xvcjogJyM0NkJGQkQnLFxuICAgICAgICBoaWdobGlnaHQ6ICcjNUFEM0QxJyxcbiAgICAgICAgbGFiZWw6ICdQcm9kdWN0cydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiA2LFxuICAgICAgICBjb2xvcjogJyNGRkZGMDAnLFxuICAgICAgICBoaWdobGlnaHQ6ICcjZTVlNTAwJyxcbiAgICAgICAgbGFiZWw6ICdFbXBsb3llZXMnXG4gICAgICB9XG4gICAgXTtcblxuICAgIC8vIENoYXJ0LmpzIE9wdGlvbnNcbiAgICAkc2NvcGUub3B0aW9ucyA9ICB7XG5cbiAgICAgIC8vIFNldHMgdGhlIGNoYXJ0IHRvIGJlIHJlc3BvbnNpdmVcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG5cbiAgICAgIC8vQm9vbGVhbiAtIFdoZXRoZXIgd2Ugc2hvdWxkIHNob3cgYSBzdHJva2Ugb24gZWFjaCBzZWdtZW50XG4gICAgICBzZWdtZW50U2hvd1N0cm9rZSA6IHRydWUsXG5cbiAgICAgIC8vU3RyaW5nIC0gVGhlIGNvbG91ciBvZiBlYWNoIHNlZ21lbnQgc3Ryb2tlXG4gICAgICBzZWdtZW50U3Ryb2tlQ29sb3IgOiAnI2ZmZicsXG5cbiAgICAgIC8vTnVtYmVyIC0gVGhlIHdpZHRoIG9mIGVhY2ggc2VnbWVudCBzdHJva2VcbiAgICAgIHNlZ21lbnRTdHJva2VXaWR0aCA6IDIsXG5cbiAgICAgIC8vTnVtYmVyIC0gVGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGNoYXJ0IHRoYXQgd2UgY3V0IG91dCBvZiB0aGUgbWlkZGxlXG4gICAgICBwZXJjZW50YWdlSW5uZXJDdXRvdXQgOiA1MCwgLy8gVGhpcyBpcyAwIGZvciBQaWUgY2hhcnRzXG5cbiAgICAgIC8vTnVtYmVyIC0gQW1vdW50IG9mIGFuaW1hdGlvbiBzdGVwc1xuICAgICAgYW5pbWF0aW9uU3RlcHMgOiAxMDAsXG5cbiAgICAgIC8vU3RyaW5nIC0gQW5pbWF0aW9uIGVhc2luZyBlZmZlY3RcbiAgICAgIGFuaW1hdGlvbkVhc2luZyA6ICdlYXNlT3V0Qm91bmNlJyxcblxuICAgICAgLy9Cb29sZWFuIC0gV2hldGhlciB3ZSBhbmltYXRlIHRoZSByb3RhdGlvbiBvZiB0aGUgRG91Z2hudXRcbiAgICAgIGFuaW1hdGVSb3RhdGUgOiB0cnVlLFxuXG4gICAgICAvL0Jvb2xlYW4gLSBXaGV0aGVyIHdlIGFuaW1hdGUgc2NhbGluZyB0aGUgRG91Z2hudXQgZnJvbSB0aGUgY2VudHJlXG4gICAgICBhbmltYXRlU2NhbGUgOiBmYWxzZSxcblxuICAgICAgLy9TdHJpbmcgLSBBIGxlZ2VuZCB0ZW1wbGF0ZVxuICAgICAgbGVnZW5kVGVtcGxhdGUgOiAnPHVsIGNsYXNzPVwidGMtY2hhcnQtanMtbGVnZW5kXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD4nXG5cbiAgICB9O1xuICAgICAgICBcblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyU3ZjLCAkbG9jYXRpb24pIHsgICAgICAgIFxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgcmVzcG9uc2VcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdsb2dpbicsIHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvaG9tZScpXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJtYXN0ZXJDdHJsXCIpO1xuXG5cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTtcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyICAgICAgICAgICAgXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdQb3N0c0N0cmwnLGZ1bmN0aW9uKCRzY29wZSxQb3N0c1N2Yyl7IFxuICBQb3N0c1N2Yy5mZXRjaCgpXG4gXHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpe1xuIFx0XHQkc2NvcGUucG9zdHMgPSBwb3N0c1xuXG4gXHR9KVxuXHRcbiBcdCAkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnBvc3RCb2R5KSB7XG4gICAgICAgICAgICBQb3N0c1N2Yy5jcmVhdGUoe1xuICAgICAgICAgICAgICAvKnVzZXJuYW1lOiAndmlzaGFsUmFuamFuJywqL1xuICAgICAgICAgICAgICBib2R5OiAgICAgJHNjb3BlLnBvc3RCb2R5ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcbiAgICAgICAgICAgICAgLy8kc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KVxuICAgICAgICAgICAgICAkc2NvcGUucG9zdEJvZHkgPSBudWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgJHNjb3BlLiRvbignd3M6bmV3X3Bvc3QnLGZ1bmN0aW9uKF8scG9zdCl7XG4gICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdClcbiAgICB9KVxuICB9KVxuIFxufSlcblxuICIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ1Bvc3RzU3ZjJywgZnVuY3Rpb24oJGh0dHApe1xuICAgdGhpcy5mZXRjaCA9IGZ1bmN0aW9uICgpIHsgICBcdFxuICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJylcbiAgIH1cbiAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHBvc3Qpe1xuICAgXHRcbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJyxwb3N0KVxuICAgfVxuIH0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJyxmdW5jdGlvbigkc2NvcGUsVXNlclN2YyAsJGxvY2F0aW9uKXtcblx0JHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24obmFtZSx1c2VybmFtZSxwYXNzd29yZCl7XG5cdFx0VXNlclN2Yy5yZWdpc3RlcihuYW1lLHVzZXJuYW1lLHBhc3N3b3JkKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcdFx0XHRcblx0XHRcdCRzY29wZS4kZW1pdCgnbG9naW4nLHJlc3BvbnNlLmRhdGEpXG5cdFx0XHQkbG9jYXRpb24ucGF0aCgnL2hvbWUnKVxuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKVxuXHRcdH0pXG5cdH1cblxufSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ3NlZ21lbnQnLCBmdW5jdGlvbigkaHR0cCwkd2luZG93LCRsb2NhdGlvbil7XG4gIFxuICAgICByZXR1cm4ge1xuICAgICAgICBnZXREYXRhOiBmdW5jdGlvbigkcSwgJGh0dHApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZVwiKTtcbiAgICAgICAgICAgIHJldHVybiAyXG4gICAgICAgIH1cbiAgICB9O1xuXG59KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9uYXYuaHRtbCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmxvZ2luJywge1xuICAgICAgICAgICAgdXJsOiAnbG9naW4nLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnaGVhZGVyJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9uYXYuaHRtbCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcbiAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJ2hvbWUnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUudmVoaWNsZXMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvdmVoaWNsZXMvbmV3JyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZlaGljbGVzL25ld1ZlaGljbGUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdWZWhpY2xlc05ld0luZm9DdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnByb2R1Y3RzJywge1xuICAgICAgICAgICAgdXJsOiAncHJvZHVjdHMnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMvcHJvZHVjdHMuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwcm9kdWN0c0N0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAucHJvZHVjdHMubmV3Jywge1xuICAgICAgICAgICAgdXJsOiAnL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9kdWN0cy9uZXdQcm9kdWN0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3UHJvZHVjdEN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gIFJlc291cmNlcyBNZW51IFxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmNvbXBhbmllcycsIHtcbiAgICAgICAgICAgIHVybDogJ3Jlc291cmNlcy9jb21wYW5pZXMnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL2NvbXBhbmllcy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NvbXBhbmllc0N0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5jb21wYW5pZXMubmV3Jywge1xuICAgICAgICAgICAgdXJsOiAnL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Jlc291cmNlcy9uZXdDb21wYW55Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmV3Q29tcGFueUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuY29tcGFuaWVzLmRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvOmlkJyxcblxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL2VkaXRDb21wYW55Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdENvbXBhbnlDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnN0b2NraXN0cycsIHtcbiAgICAgICAgICAgIHVybDogJ3Jlc291cmNlcy9zdG9ja2lzdHMnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL3N0b2NraXN0cy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3N0b2NraXN0c0N0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5zdG9ja2lzdHMubmV3Jywge1xuICAgICAgICAgICAgdXJsOiAnL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Jlc291cmNlcy9uZXdTdG9ja2lzdC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25ld1N0b2NraXN0Q3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmVtcGxveWVlcycsIHtcbiAgICAgICAgICAgIHVybDogJ3Jlc291cmNlcy9lbXBsb3llZXMnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzb3VyY2VzL2VtcGxveWVlcy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2VtcGxveWVlc0N0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5lbXBsb3llZXMubmV3Jywge1xuICAgICAgICAgICAgdXJsOiAnL25ldycsXG4gICAgICAgICAgICB2aWV3czoge1xuXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Jlc291cmNlcy9uZXdFbXBsb3llZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25ld0VtcGxveWVlQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuXG4gICAgICAgIC8vICBTYWxlcyBNZW51IFxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmludm9pY2VlbnRyeScsIHtcbiAgICAgICAgICAgIHVybDogJ3NhbGVzL2ludm9pY2UtZW50cnknLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2FsZXMvaW52b2ljZUVudHJ5Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaW52b2ljZUVudHJ5Q3RybCdcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAuc3RhdGUoJ2FwcC5iaWxsaGVhZGVyJywge1xuICAgICAgICAgICAgdXJsOiAnc2FsZXMvYmlsbGhlYWRlcicsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzYWxlcy9iaWxsSGVhZGVyLmh0bWwnXG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnNhbGVzcmV0dXJuJywge1xuICAgICAgICAgICAgdXJsOiAnc2FsZXMvc2FsZXMtcmV0dXJuJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NhbGVzL3NhbGVzUmV0dXJuLmh0bWwnXG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLy8gUHVyY2hhc2UgTWVudVxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLnB1cmNoYXNlZW50cnknLCB7XG4gICAgICAgICAgICB1cmw6ICdzYWxlcy9wdXJjaGFzZS1lbnRyeScsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwdXJjaGFzZS9wdXJjaGFzZUVudHJ5Lmh0bWwnXG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICB1cmw6ICdhYm91dCcsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzZXR0aW5ncy9hYm91dC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG5cbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5zZXJ2aWNlKCdVc2VyU3ZjJywgZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgc3ZjID0gdGhpc1xuICAgICAgICBzdmMuZ2V0VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzJylcbiAgICAgICAgfVxuXG4gICAgICAgIHN2Yy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9zZXNzaW9ucycsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBzdmMudG9rZW4gPSB2YWwuZGF0YVxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LnNlc3Npb25TdG9yYWdlW1widXNlcl90b2tlblwiXSA9IEpTT04uc3RyaW5naWZ5KHN2Yy50b2tlbilcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX3Rva2VuXCIsIEpTT04uc3RyaW5naWZ5KHN2Yy50b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSB2YWwuZGF0YVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ZjLmdldFVzZXIoKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dpc3RzIGVycm9yJywgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy80MDEnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluYWxseSBmaW5pc2hlZCBnaXN0c1wiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3ZjLnJlZ2lzdGVyID0gZnVuY3Rpb24obmFtZSwgdXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3VzZXJzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB2YWw7XHRcdFx0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN2Yy5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3UHJvZHVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcblxuXG4gICAgICAgICRzY29wZS5zYXZlUHJvZHVjdERldGFpbHMgPSBmdW5jdGlvbigpIHsgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUgaW4gdGhlIHByb2R1Y3QgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvcHJvZHVjdHMnLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfY29kZTogJHNjb3BlLnByb2R1Y3RfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9uYW1lOiAkc2NvcGUucHJvZHVjdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3BhY2tpbmc6ICRzY29wZS5wcm9kdWN0X3BhY2tpbmcsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfY29tcGFueTogJHNjb3BlLnByb2R1Y3RfY29tcGFueSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF9zYWxlc3RheDogJHNjb3BlLnByb2R1Y3Rfc2FsZXN0YXgsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfZGlzY291bnQ6ICRzY29wZS5wcm9kdWN0X2Rpc2NvdW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X2JveHNpemU6ICRzY29wZS5wcm9kdWN0X2JveHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfcHVyY2hhc2U6ICRzY29wZS5wcm9kdWN0X3B1cmNoYXNlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X21ycDogJHNjb3BlLnByb2R1Y3RfbXJwLFxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvcHJvZHVjdHMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcigncHJvZHVjdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuXG5cbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9wcm9kdWN0cycpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignY29tcGFuaWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvY29tcGFuaWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuICAgICAgICAkc2NvcGUuZGVsZXRlQ29tcGFueSA9IGZ1bmN0aW9uKGNvbXBhbnlfaWQpIHsgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZT8nKSkgcmV0dXJuO1xuICAgICAgICAgICAgJGh0dHAuZGVsZXRlKCcvYXBpL2NvbXBhbmllcy8nKyBjb21wYW55X2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICB9KVxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZWRpdENvbXBhbnlDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkc3RhdGVQYXJhbXMpIHtcblxuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKVxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2NvbXBhbmllcy8nICsgJHN0YXRlUGFyYW1zLmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5tb2RlbClcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUudXBkYXRlQ29tcGFueURldGFpbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS9jb21wYW5pZXMvJyArICRzdGF0ZVBhcmFtcy5pZCwge1xuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2NvZGU6ICRzY29wZS5tb2RlbC5jb21wYW55X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfbmFtZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9hcmVhY29kZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYXJlYWNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYWRkcmVzczogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9vcGVuaW5nYmFsYW5jZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfb3BlbmluZ2JhbGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYnN0Y29kZTogJHNjb3BlLm1vZGVsLmNvbXBhbnlfYnN0Y29kZSxcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZW1wbG95ZWVzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvZW1wbG95ZWVzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ25ld0NvbXBhbnlDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZUNvbXBhbnlEZXRhaWxzID0gZnVuY3Rpb24oKSB7ICBcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJlIGluIHRoZSBjb21wYW55IGNvbnRyb2xsZXJcIikgOyAgICAgICAgIFxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2NvbXBhbmllcycsIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueV9jb2RlOiAkc2NvcGUuY29tcGFueV9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X25hbWU6ICRzY29wZS5jb21wYW55X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfYXJlYWNvZGU6ICRzY29wZS5jb21wYW55X2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2FkZHJlc3M6ICRzY29wZS5jb21wYW55X2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5jb21wYW55X29wZW5pbmdiYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICBjb21wYW55X2JzdGNvZGU6ICRzY29wZS5jb21wYW55X2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9jb21wYW5pZXMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3RW1wbG95ZWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZUVtcGxveWVlRGV0YWlscyA9IGZ1bmN0aW9uKCkgeyAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSBpbiB0aGUgRW1wbG95ZWUgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5lbXBsb3llZV9jb2RlKVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2VtcGxveWVlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfY29kZTogJHNjb3BlLmVtcGxveWVlX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGVtcGxveWVlX25hbWU6ICRzY29wZS5lbXBsb3llZV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9hcmVhY29kZTogJHNjb3BlLmVtcGxveWVlX2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZV9hZGRyZXNzOiAkc2NvcGUuZW1wbG95ZWVfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5lbXBsb3llZV9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVfYnN0Y29kZTogJHNjb3BlLmVtcGxveWVlX2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9lbXBsb3llZXMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmV3U3RvY2tpc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2F2ZVN0b2NraXN0RGV0YWlscyA9IGZ1bmN0aW9uKCkgeyAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSBpbiB0aGUgU3RvY2tpc3QgY29udHJvbGxlclwiKSA7ICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zdG9ja2lzdF9jb2RlKVxuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3N0b2NraXN0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3RfY29kZTogJHNjb3BlLnN0b2NraXN0X2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b2NraXN0X25hbWU6ICRzY29wZS5zdG9ja2lzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9hcmVhY29kZTogJHNjb3BlLnN0b2NraXN0X2FyZWFjb2RlLFxuICAgICAgICAgICAgICAgICAgICBzdG9ja2lzdF9hZGRyZXNzOiAkc2NvcGUuc3RvY2tpc3RfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3Rfb3BlbmluZ2JhbGFuY2U6ICRzY29wZS5zdG9ja2lzdF9vcGVuaW5nYmFsYW5jZSxcbiAgICAgICAgICAgICAgICAgICAgc3RvY2tpc3RfYnN0Y29kZTogJHNjb3BlLnN0b2NraXN0X2JzdGNvZGUsICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Jlc291cmNlcy9zdG9ja2lzdHMnKVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignc3RvY2tpc3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvc3RvY2tpc3RzJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG4gICAgfSlcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2ludm9pY2VFbnRyeUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG5cblxuICAgICAgICAkc2NvcGUudG9kYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS50b2RheSgpO1xuXG4gICAgICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmR0ID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBEaXNhYmxlIHdlZWtlbmQgc2VsZWN0aW9uXG4gICAgICAgICRzY29wZS5kaXNhYmxlZCA9IGZ1bmN0aW9uKGRhdGUsIG1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlID09PSAnZGF5JyAmJiAoZGF0ZS5nZXREYXkoKSA9PT0gMCB8fCBkYXRlLmdldERheSgpID09PSA2KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlTWluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubWluRGF0ZSA9ICRzY29wZS5taW5EYXRlID8gbnVsbCA6IG5ldyBEYXRlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xuICAgICAgICAkc2NvcGUubWF4RGF0ZSA9IG5ldyBEYXRlKDIwMjAsIDUsIDIyKTtcblxuICAgICAgICAkc2NvcGUub3BlbjEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3B1cDEub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3BlbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3B1cDIub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXG4gICAgICAgICAgICBzdGFydGluZ0RheTogMSxcbiAgICAgICAgICAgIHNob3dXZWVrczogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZm9ybWF0cyA9IFsnZGQtTU1NTS15eXl5JywgJ3l5eXkvTU0vZGQnLCAnZGQuTU0ueXl5eScsICdzaG9ydERhdGUnXTtcbiAgICAgICAgJHNjb3BlLmZvcm1hdCA9ICRzY29wZS5mb3JtYXRzWzBdO1xuICAgICAgICAkc2NvcGUuYWx0SW5wdXRGb3JtYXRzID0gWydNIS9kIS95eXl5J107XG5cbiAgICAgICAgJHNjb3BlLnBvcHVwMSA9IHtcbiAgICAgICAgICAgIG9wZW5lZDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucG9wdXAyID0ge1xuICAgICAgICAgICAgb3BlbmVkOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgIHZhciBhZnRlclRvbW9ycm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgYWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuICAgICAgICAkc2NvcGUuZXZlbnRzID0gW3tcbiAgICAgICAgICAgIGRhdGU6IHRvbW9ycm93LFxuICAgICAgICAgICAgc3RhdHVzOiAnZnVsbCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGF0ZTogYWZ0ZXJUb21vcnJvdyxcbiAgICAgICAgICAgIHN0YXR1czogJ3BhcnRpYWxseSdcbiAgICAgICAgfV07XG5cbiAgICAgICAgJHNjb3BlLmdldERheUNsYXNzID0gZnVuY3Rpb24oZGF0ZSwgbW9kZSkge1xuICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdkYXknKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRheVRvQ2hlY2sgPSBuZXcgRGF0ZShkYXRlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudERheSA9IG5ldyBEYXRlKCRzY29wZS5ldmVudHNbaV0uZGF0ZSkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheVRvQ2hlY2sgPT09IGN1cnJlbnREYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZlbnRzW2ldLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgICAgICAvLyRzY29wZS5zdGF0ZXMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIERha290YScsICdOb3J0aCBDYXJvbGluYScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gaW52b2ljZSBjdHJsXCIpXG4gICAgICAgICRzY29wZS5hdmFpbGFibGVQcm9kdWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBpbnZvaWNlIGN0cmwgZnVuY3Rpb25cIilcbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS9wcm9kdWN0cycpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwgPSBfLm1hcChyZXNwb25zZS5kYXRhLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoucHJvZHVjdF9uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubW9kZWwpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAgICAgICAgICAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignVmVoaWNsZXNFZGl0SW5mb0N0cmwnLGZ1bmN0aW9uKCRzY29wZSwkaHR0cCwkbG9jYXRpb24sJHN0YXRlUGFyYW1zKXsgXG4gXG5cbiRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcylcblx0JGh0dHAuZ2V0KCcvYXBpL3ZlaGljbGUvJyskc3RhdGVQYXJhbXMuaWQpXG5cdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXHQgICAgY29uc29sZS5sb2coJHNjb3BlLm1vZGVsKVxuXG5cdCAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHQgIH0pO1xuXHRcbn1cblxuJHNjb3BlLnNldHVwKCk7XG4gXG4gXG4gXG59KVxuXG4gIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignVmVoaWNsZXNOZXdJbmZvQ3RybCcsZnVuY3Rpb24oJHNjb3BlLCRodHRwLCRsb2NhdGlvbil7IFxuIFxuXG4kc2NvcGUuc2F2ZVZlaGljbGVEZXRhaWxzID0gZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2coXCJpbiBjb250cm9sbGVyIDJcIilcblx0Y29uc29sZS5sb2coJHNjb3BlLmRldl9pZCArICRzY29wZS52X251bWJlcilcblx0IFxuXG5cdCRodHRwLnBvc3QoJy9hcGkvdmVoaWNsZScse1xuXHRcdGRldl9pZDogJHNjb3BlLmRldl9pZCxcbiAgICAgICAgdl9udW1iZXI6ICRzY29wZS52X251bWJlcixcbiAgICAgICAgZHJpdmVyX25hbWUgOiAkc2NvcGUuZHJpdmVyX25hbWUsXG4gICAgICAgIHNvc19udW1iZXIgOiAkc2NvcGUuc29zX251bWJlciAgICAgICAgICAgICAgICAgICAgICAgXG5cdH0pXG5cdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0ICAgICRsb2NhdGlvbi5wYXRoKCcvaG9tZScpXG5cblx0ICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cdCAgfSk7XG5cdFxufVxuIFxuIFxuIFxufSlcblxuICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
