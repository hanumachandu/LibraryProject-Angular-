'use strict';

angular.module('myApp.list', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('/home.list', {
        url:"/list",
        templateUrl: 'list/list.html',
        controller: 'ListCtrl'

  });
}])

.controller('ListCtrl', ['$scope','$rootScope', 'MetaService','$http', function($scope, $rootScope, MetaService,$http) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("list | angular-seed","desc","blah blah");
    $scope.data = $rootScope.searchData;
    $http.get(SERVERAPI+'api/book').then(function (result) {
    	$rootScope.booklist=result.data.data;
    },
    function (error) {
    	alert('error');
    });




}]);

