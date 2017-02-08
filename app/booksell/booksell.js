'use strict';

angular.module('myApp.booksell', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('/home.booksell', {
            url:"/booksell",
            templateUrl: 'booksell/booksell.html',
            controller: 'booksellCtrl'

        });
    }])

    .controller('booksellCtrl', ['$scope','$rootScope', 'MetaService','$http', function($scope, $rootScope, MetaService,$http) {
        // Configure Meta Tags and Title
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set("booksell | angular-seed","desc","blah blah");
        $scope.data = $rootScope.searchData;
        $http.get(SERVERAPI+'api/book').then(function (result) {
                $rootScope.booklist=result.data.data;
            },
            function (error) {
                alert('error');
            });

        $scope.sellbook=function (data) {
            $scope.userId=$rootScope.UserData._id;
            data.userId=$scope.userId;
            console.log(data);
            var startTime = new Date().getTime();

            $http.post(SERVERAPI+'api/sellbook',data).then(function (result) {
                    $scope.booksell=result.data.message;
                    //console.log($scope.booksell);
                    $scope.booksellres=$scope.booksell;

                },
                function (error) {
                    $scope.loading = false;
                    var respTime = new Date().getTime() - startTime;
                    if(respTime >= TIMEOUT){
                        alert('Server is busy, please try again.');
                    }else{
                        alert('Please check entered details');
                    }
                });
        }




    }]);

