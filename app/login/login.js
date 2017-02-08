'use strict';

angular.module('myApp.login', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('/login', {
        url:'/login',
        views:{
            'content':{
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl'
            }
        }

  });
}])

.controller('LoginCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$http','$state', function($scope, $rootScope, MetaService,USERSERVICE, $http,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Login | angular-seed","desc","");
    $scope.userData = {};
   $scope.loginUser = function(info){
   		console.log(info);
   		$scope.loading = true;

   		//$http.defaults.headers.post["Content-Type"] = "application/json";
	    var startTime = new Date().getTime();
	    $http.post(SERVERAPI + 'api/login', info, {timeout : TIMEOUT}).then( 
	    function(result) {
	    	//console.log(result);
	        if (result.data.status) {
	            console.log(result);
				$scope.loading = false;
				USERSERVICE.setUser(result.data.data);
		        $state.go('/home');

		        
	        } else {
		       $scope.loading = false;
		       result.data.message

		       if(result.data.message=="No user found"){
                   $scope.erroruser=result.data.message;
               }else {
                   $scope.errorpwd=result.data.message;
               }
	        }
	    },function(error) {
	        $scope.loading = false;
	        var respTime = new Date().getTime() - startTime;
	        if(respTime >= TIMEOUT){
	          alert('Server is busy, please try again.');
	        }else{
	          alert('Please check entered details');
	        }
	    });

   };
}])

.service('USERSERVICE', function(){
    var setUser = function(user_data) {
        window.localStorage.userDetails = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.userDetails || '{}');
    };
    var dropUser = function(){
        window.localStorage.removeItem("userDetails");
        return true;
    };

    return {
        getUser: getUser,
        setUser: setUser,
        dropUser: dropUser
    };
});
