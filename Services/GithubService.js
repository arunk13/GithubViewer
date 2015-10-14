/**
 * Created by arun on 10/13/15.
 */
(function () {

    var GithubService = function ($http) {

        var getUserInfo = function (username) {
            var pUserInfo = $http.get("https://api.github.com/users/" + username);
            return pUserInfo.then(
                function (response) {
                    return response.data;
                });
        };

        var getUserRepos = function (user) {
            var pUserRepos = $http.get(user.repos_url);
            return pUserRepos.then(
                function (response) {
                    return response.data;
                }
            );
        };

        return {
            getUserInfo: getUserInfo,
            getUserRepos: getUserRepos

        };

    }

    var module = angular.module("myApp");
    module.factory('github', ['$http', GithubService]);
}())