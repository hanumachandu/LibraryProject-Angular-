'use strict';

angular.module('myApp.home', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('/home', {
            url:'/home',
            views:{
                'header':{
                    templateUrl: 'home/home.html',
                    controller: 'homeCtrl'
                },
                'content':{
                    template:"<div ui-view></div>"
                }
            }

        });
    }])

//controller file
    .controller('homeCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE', function($scope, $rootScope, MetaService,USERSERVICE) {
        // Configure Meta Tags and Title
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set("home | angular-seed", "desc", "");
        $rootScope.UserData=USERSERVICE.getUser();

    }]);