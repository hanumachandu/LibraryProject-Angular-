'use strict';

const SERVERAPI = "https://fierce-hollows-55761.herokuapp.com/";
const TIMEOUT = 15000;
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'metaservice',
  'myApp.login',
  'myApp.registration',
    'myApp.forgot',
    'myApp.changepassword',
    'myApp.home',
    'myApp.bookcheckin',
  'myApp.version',
    'myApp.search',
    'myApp.list',
    'myApp.booksell',
    'myApp.details'
  
]).
config(['$stateProvider', function( $stateProvider) {
 
 /* $stateProvider.go('/login');*/
}])
.run([ '$rootScope', '$location', '$anchorScroll', 'USERSERVICE', function( $rootScope, $location, $anchorScroll, USERSERVICE) {
  $rootScope.$on("$locationChangeSuccess", function(){
    $anchorScroll();
  });

}])
.controller('MainCtrl', ['$scope','USERSERVICE','$state','$rootScope', function($scope, USERSERVICE, $state, $rootScope){
    $scope.logout = function(){
      USERSERVICE.dropUser();
      $rootScope.UserData = USERSERVICE.getUser();
      $state.go('/login');
    };
}])
;
