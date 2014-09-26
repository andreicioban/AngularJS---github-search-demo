'use strict';

angular.module('MainCtrl', []).controller('MainCtrl', ['$scope','$compile' ,'Config','Github','Utils' ,
function($scope, $compile, Config, Github, Utils){

    // initialize values
    $scope.searchTerm = Config.searchTerm;
    $scope.categories = Config.searchCategories;
    $scope.searchCategory = Config.searchCategories[0].name;

    // create new github object
    var GithubApi = new Github();

    getResults();

    function getResults(){
        // make a call to github
        var searchRepos = GithubApi.searchAngularRepos($scope.searchTerm, $scope.searchCategory);

        // wait for call to finish
        searchRepos.success(function(data){
            // if we have a response
            if(data && data.items){
                // parse the response
                $scope.results = $scope.searchCategory == 'repositories' ?
                    Utils.extractInfoRepo(data.items) : Utils.extractInfoUser(data.items);
                // paginate results
                paginate();
            }
        });
    }


    $scope.doSearch = function(){
        getResults();
    };

    // configure pagination
    function paginate(){
        $scope.pconfig ={
            currentPage: 0,
            list: $scope.results,
            itemsPerPage: 6,
            id: 'pagination'
        };
        Utils.paginate($scope.pconfig);
        $compile($scope.pconfig.$editLine)($scope);
    }
}]);