/**
 * Created by arun on 10/11/15.
 */
var app = angular.module("myApp");

var MainController = function($scope,github, $interval, $location, $anchorScroll, $log) {
    $scope.message = "Hello Arun !";

    var onComplete = function(data){
        $scope.user = data;
        getUserRepos($scope.user);
    };

    var onError = function(reason){
        $scope.error = "Some error";
    };

    var onReposComplete = function(data){
        $scope.repos = data;
        $location.hash("repositories");
        $anchorScroll();
    };

    var onReposError = function(reason){
        $scope.error = "Some error";
    };

    var getUserInfo = function(user){
          $scope.countdown = null;
          github.getUserInfo(user).then(onComplete, onError)
          if(countDownTimer){
              $interval.cancel(countDownTimer);
          }
    };

    var getUserRepos = function(user){
        $log.info(user);
        github.getUserRepos(user).then(onReposComplete, onReposError);
    };

    $scope.countdown = 5;

    var decrementCounter = function(){
        $scope.countdown -= 1;
        if($scope.countdown < 1){
            $scope.getUserInfo($scope.username);
        }
    };

    var countDownTimer = null;

    var startCountdown = function(){
        countDownTimer = $interval(decrementCounter, 1000, $scope.countdown);
    }


    $scope.getUserInfo = getUserInfo;
    $scope.username = "angular";
    startCountdown();

}

app.controller('MainController', ['$scope', 'github', '$interval', '$location', '$anchorScroll', '$log', MainController]);