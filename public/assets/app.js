angular.module('app',[
'ngRoute','ui.router'
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
.config(function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
    .state('app',{
        url: '/',
        views: {
            'header': {
                templateUrl: '/nav.html'
            },
            'content': {
                templateUrl: '/login.html' ,
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.login',{
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

     .state('app.products', {
        url: 'products',
        views: {
            'content@': {
                templateUrl: 'products/products.html'                
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

    

     


    
 
    
 
});

/*.config(function($routeProvider,$locationProvider) {
	$routeProvider
	.when('/',{controller:'LoginCtrl',templateUrl:'login.html'})	
	.when('/posts',{controller:'PostsCtrl',templateUrl:'posts.html'})
	.when('/register',{controller:'RegisterCtrl',templateUrl:'register.html'})
	.when('/home',{controller:'HomeCtrl',templateUrl:'users/home.html'})	
	.when('/vehicles/new/info',{controller:'VehiclesNewInfoCtrl',templateUrl:'vehicles/new/info.html'})	
	.when('/vehicles/edit/:deviceId/info',{controller:'VehiclesEditInfoCtrl',templateUrl:'vehicles/edit/info.html'})	
	.when('/vehicles/edit/:deviceId/map',{controller:'VehiclesEditMapCtrl',templateUrl:'vehicles/edit/map.html'})	
	.when('/401',{controller:'ErrorCtrl',templateUrl:'errors/401.html'})	

	$locationProvider.html5Mode(true)
	
})*/

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

 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImVycm9yLmN0cmwuanMiLCJob21lLmN0cmwuanMiLCJsb2dpbi5jdHJsLmpzIiwibWFzdGVyQ3RybC5qcyIsInBvc3RzLmN0cmwuanMiLCJwb3N0cy5zdmMuanMiLCJyZWdpc3Rlci5jdHJsLmpzIiwicm91dGVTZWdtZW50LmpzIiwicm91dGVzLmpzIiwidXNlci5zdmMuanMiLCJ2ZWhpY2xlcy9lZGl0L2luZm8uanMiLCJ2ZWhpY2xlcy9uZXcvaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLFtcbiduZ1JvdXRlJywndWkucm91dGVyJ1xuXSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignRXJyb3JDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgICRzY29wZS5oZWxsbyA9IFwidGhpcyBpcyBmcm9tIHRoZSBjb250cm9sbGVyIGhlbGxvXCJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmhlbGxvKVxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG5cblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3ZlaGljbGUnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlclN2YywgJGxvY2F0aW9uKSB7ICAgICAgICBcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICBVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50aW5nIHJlc3BvbnNlXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnbG9naW4nLCByZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2hvbWUnKVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuXG4gICAgICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgSW5cIik7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gdXNlciAgICAgICAgICAgIFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlci51c2VybmFtZSlcbiAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignUG9zdHNDdHJsJyxmdW5jdGlvbigkc2NvcGUsUG9zdHNTdmMpeyBcbiAgUG9zdHNTdmMuZmV0Y2goKVxuIFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKXtcbiBcdFx0JHNjb3BlLnBvc3RzID0gcG9zdHNcblxuIFx0fSlcblx0XG4gXHQgJHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5wb3N0Qm9keSkge1xuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgLyp1c2VybmFtZTogJ3Zpc2hhbFJhbmphbicsKi9cbiAgICAgICAgICAgICAgYm9keTogICAgICRzY29wZS5wb3N0Qm9keSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgIC8vJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdClcbiAgICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gbnVsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICRzY29wZS4kb24oJ3dzOm5ld19wb3N0JyxmdW5jdGlvbihfLHBvc3Qpe1xuICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpXG4gICAgfSlcbiAgfSlcbiBcbn0pXG5cbiAiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uKCRodHRwKXtcbiAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7ICAgXHRcbiAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpXG4gICB9XG4gICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwb3N0KXtcbiAgIFx0XG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycscG9zdClcbiAgIH1cbiB9KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsZnVuY3Rpb24oJHNjb3BlLFVzZXJTdmMgLCRsb2NhdGlvbil7XG5cdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsdXNlcm5hbWUscGFzc3dvcmQpe1xuXHRcdFVzZXJTdmMucmVnaXN0ZXIobmFtZSx1c2VybmFtZSxwYXNzd29yZClcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHRcdFx0XG5cdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJyxyZXNwb25zZS5kYXRhKVxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9ob21lJylcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcblx0XHRcdGNvbnNvbGUubG9nKGVycilcblx0XHR9KVxuXHR9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdzZWdtZW50JywgZnVuY3Rpb24oJGh0dHAsJHdpbmRvdywkbG9jYXRpb24pe1xuICBcbiAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oJHEsICRodHRwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XG4gICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICB9XG4gICAgfTtcblxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG4gXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuIFxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdhcHAnLHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnaGVhZGVyJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL25hdi5odG1sJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2xvZ2luLmh0bWwnICxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnYXBwLmxvZ2luJyx7XG4gICAgICAgIHVybDogJ2xvZ2luJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdoZWFkZXInOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiBcbiAgICAuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcbiAgICAgICAgdXJsOiAncmVnaXN0ZXInLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuIFxuICAgIH0pXG5cbiAgICAgLnN0YXRlKCdhcHAucHJvZHVjdHMnLCB7XG4gICAgICAgIHVybDogJ3Byb2R1Y3RzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2R1Y3RzL3Byb2R1Y3RzLmh0bWwnICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gXG4gICAgfSlcbiBcbiAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICB1cmw6ICdob21lJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gXG4gICAgfSlcblxuICAgIFxuXG4gICAgIFxuXG5cbiAgICBcbiBcbiAgICBcbiBcbn0pO1xuXG4vKi5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsJGxvY2F0aW9uUHJvdmlkZXIpIHtcblx0JHJvdXRlUHJvdmlkZXJcblx0LndoZW4oJy8nLHtjb250cm9sbGVyOidMb2dpbkN0cmwnLHRlbXBsYXRlVXJsOidsb2dpbi5odG1sJ30pXHRcblx0LndoZW4oJy9wb3N0cycse2NvbnRyb2xsZXI6J1Bvc3RzQ3RybCcsdGVtcGxhdGVVcmw6J3Bvc3RzLmh0bWwnfSlcblx0LndoZW4oJy9yZWdpc3Rlcicse2NvbnRyb2xsZXI6J1JlZ2lzdGVyQ3RybCcsdGVtcGxhdGVVcmw6J3JlZ2lzdGVyLmh0bWwnfSlcblx0LndoZW4oJy9ob21lJyx7Y29udHJvbGxlcjonSG9tZUN0cmwnLHRlbXBsYXRlVXJsOid1c2Vycy9ob21lLmh0bWwnfSlcdFxuXHQud2hlbignL3ZlaGljbGVzL25ldy9pbmZvJyx7Y29udHJvbGxlcjonVmVoaWNsZXNOZXdJbmZvQ3RybCcsdGVtcGxhdGVVcmw6J3ZlaGljbGVzL25ldy9pbmZvLmh0bWwnfSlcdFxuXHQud2hlbignL3ZlaGljbGVzL2VkaXQvOmRldmljZUlkL2luZm8nLHtjb250cm9sbGVyOidWZWhpY2xlc0VkaXRJbmZvQ3RybCcsdGVtcGxhdGVVcmw6J3ZlaGljbGVzL2VkaXQvaW5mby5odG1sJ30pXHRcblx0LndoZW4oJy92ZWhpY2xlcy9lZGl0LzpkZXZpY2VJZC9tYXAnLHtjb250cm9sbGVyOidWZWhpY2xlc0VkaXRNYXBDdHJsJyx0ZW1wbGF0ZVVybDondmVoaWNsZXMvZWRpdC9tYXAuaHRtbCd9KVx0XG5cdC53aGVuKCcvNDAxJyx7Y29udHJvbGxlcjonRXJyb3JDdHJsJyx0ZW1wbGF0ZVVybDonZXJyb3JzLzQwMS5odG1sJ30pXHRcblxuXHQkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblx0XG59KSovXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnVXNlclN2YycsIGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkbG9jYXRpb24pIHtcbiAgICAgICAgdmFyIHN2YyA9IHRoaXNcbiAgICAgICAgc3ZjLmdldFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VycycpXG4gICAgICAgIH1cblxuICAgICAgICBzdmMubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvc2Vzc2lvbnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgJHdpbmRvdy5zZXNzaW9uU3RvcmFnZVtcInVzZXJfdG9rZW5cIl0gPSBKU09OLnN0cmluZ2lmeShzdmMudG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcl90b2tlblwiLCBKU09OLnN0cmluZ2lmeShzdmMudG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gdmFsLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN2Yy5nZXRVc2VyKClcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHaXN0cyBlcnJvcicsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvNDAxJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsbHkgZmluaXNoZWQgZ2lzdHNcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN2Yy5yZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsIHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS91c2VycycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdmFsO1x0XHRcdFxuICAgICAgICAgICAgICAgIHJldHVybiBzdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignVmVoaWNsZXNFZGl0SW5mb0N0cmwnLGZ1bmN0aW9uKCRzY29wZSwkaHR0cCwkbG9jYXRpb24sJHN0YXRlUGFyYW1zKXsgXG4gXG5cbiRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcylcblx0JGh0dHAuZ2V0KCcvYXBpL3ZlaGljbGUvJyskc3RhdGVQYXJhbXMuaWQpXG5cdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAkc2NvcGUubW9kZWwgPSByZXNwb25zZS5kYXRhO1xuXHQgICAgY29uc29sZS5sb2coJHNjb3BlLm1vZGVsKVxuXG5cdCAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHQgIH0pO1xuXHRcbn1cblxuJHNjb3BlLnNldHVwKCk7XG4gXG4gXG4gXG59KVxuXG4gIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignVmVoaWNsZXNOZXdJbmZvQ3RybCcsZnVuY3Rpb24oJHNjb3BlLCRodHRwLCRsb2NhdGlvbil7IFxuIFxuXG4kc2NvcGUuc2F2ZVZlaGljbGVEZXRhaWxzID0gZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2coXCJpbiBjb250cm9sbGVyIDJcIilcblx0Y29uc29sZS5sb2coJHNjb3BlLmRldl9pZCArICRzY29wZS52X251bWJlcilcblx0IFxuXG5cdCRodHRwLnBvc3QoJy9hcGkvdmVoaWNsZScse1xuXHRcdGRldl9pZDogJHNjb3BlLmRldl9pZCxcbiAgICAgICAgdl9udW1iZXI6ICRzY29wZS52X251bWJlcixcbiAgICAgICAgZHJpdmVyX25hbWUgOiAkc2NvcGUuZHJpdmVyX25hbWUsXG4gICAgICAgIHNvc19udW1iZXIgOiAkc2NvcGUuc29zX251bWJlciAgICAgICAgICAgICAgICAgICAgICAgXG5cdH0pXG5cdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0ICAgICRsb2NhdGlvbi5wYXRoKCcvaG9tZScpXG5cblx0ICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cdCAgfSk7XG5cdFxufVxuIFxuIFxuIFxufSlcblxuICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
