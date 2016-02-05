angular.module('app',[
'ngRoute','ui.router','tc.chartjs','ui.bootstrap'
])

angular.module('app')
    .run(['$http', '$window', function($http, $window) {
        $http.defaults.headers.common['x-auth'] = $window.sessionStorage.user_token
    }]);
