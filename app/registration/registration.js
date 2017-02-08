'use strict';

angular.module('myApp.registration', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('/registration', {
    	url:'/Registration',
    	views:{
    		'content':{
                templateUrl: 'registration/registration.html',
                controller: 'RegistrationCtrl'
			}
		}

  });
}])

.controller('RegistrationCtrl', ['$scope','$rootScope', 'MetaService','$http','$state', function($scope, $rootScope, MetaService, $http, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Registration | angular-seed","desc","");

     $scope.userData = {};

	   $scope.registerUser = function(info){
	   	console.log(info);
		  	$scope.loading = true;
		   	//$http.defaults.headers.post["Content-Type"] = "application/json";
		    var startTime = new Date().getTime();
		    $http.post(SERVERAPI + 'api/registration', info, {timeout : TIMEOUT}).then( 
		    function(result) {
		    	console.log(result);
		        if (result.data.status) {
					$scope.loading = false;
					alert('You are registered successfully.');
					$state.go('/login');
		        } else {
			        $scope.loading = false;
			        alert(result.data.message);
		        } 
		    },function(error) {
		        $scope.loading = false;
		        var respTime = new Date().getTime() - startTime;
		        if(respTime >= TIMEOUT){
		            alert('Server is busy, please try again.');
		        }else{
		          alert('Something went wrong, Please contact administrator.');
		        }
		    });
		    
	   }


}]);