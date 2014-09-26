'use strict';
githubApp.factory('Github', ['$http', function($http){

    function Github() {
    }

    // get results fro github and return the promise
    Github.prototype.searchAngularRepos = function(term, category) {
        return $http.get('https://api.github.com/search/'+category, { params: { q: term } });
    };

    return Github;
}]);