'use strict';

angular.module('myApp.changepassword', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('/home.changepassword', {
            url:'/changepassword',
           
                    templateUrl: 'changepassword/changepassword.html',
                    controller: 'changepasswordCtrl'
              
        });
    }])

    .controller('changepasswordCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$http','$state', function($scope, $rootScope, MetaService,USERSERVICE, $http,$state) {
        // Configure Meta Tags and Title
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set("changepassword | angular-seed","desc","");
        $scope.userData = {};
        $scope.loginUser = function(info){
            console.log(info);
            $scope.loading = true;

            //$http.defaults.headers.post["Content-Type"] = "application/json";
            var startTime = new Date().getTime();
            $http.post(SERVERAPI + 'api/updateprofile', info, {timeout : TIMEOUT}).then(
                function(result) {
                    //console.log(result);
                    if (result.data.status) {
                        console.log(result);
                        $scope.loading = false;
                        USERSERVICE.setUser(result.data.data);
                        $state.go('/login');


                    } else {
                        $scope.loading = false;
                        alert(result.data.message);
                        $state.go($state.current,{},{reload:true})
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
    }]);

