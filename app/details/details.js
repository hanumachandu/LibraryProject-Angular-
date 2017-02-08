'use strict';

angular.module('myApp.details', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('/home.details', {
        url:"/details/:bookId",
        templateUrl: 'details/details.html',
        controller: 'detailsCtrl'

  });
}])

.controller('detailsCtrl', ['$scope','$rootScope', 'MetaService','$http','$stateParams', function($scope, $rootScope, MetaService,$http,$stateParams) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("details | angular-seed","desc","blah blah");
    $scope.data = $rootScope.searchData;
    $scope.bookId=$stateParams.bookId;
    console.log($scope.bookId);
    $http.get(SERVERAPI+'api/book?bookId='+$scope.bookId).then(function (result) {
    	$scope.details=result.data.data;
    },
    function (error) {
    	alert('error');
    });




}]);

