'use strict';

angular.module('Utils', []).service("Utils", [function() {

    // extract repo information from results
    this.extractInfoRepo = function(gitHubResults){
        var relevantInfo = [];
        gitHubResults.forEach(function(result){
           var filteredResult = {}, owner = {};
            filteredResult.title = result.name;
            filteredResult.description = result.description || 'No description.';
            filteredResult.createdAt = result.created_at;
            filteredResult.url = result.html_url;
            filteredResult.watchers = result.watchers;
            filteredResult.score = result.score;
            owner.name = result.owner.login;
            owner.avatarUrl = result.owner.avatar_url;
            owner.profileUrl = result.owner.html_url;
            filteredResult.owner = owner;
            relevantInfo.push(filteredResult);
        });
        return relevantInfo;
    };

    // extract user information from result
    this.extractInfoUser = function(gitHubResults){
        var relevantInfo = [];
        gitHubResults.forEach(function(result){
            var filteredResult = {}, owner = {};
            filteredResult.title = result.login;
            filteredResult.description = 'No description.';
            filteredResult.url = result.html_url;
            filteredResult.score = result.score;
            owner.name = result.type;
            owner.avatarUrl = result.avatar_url;
            owner.profileUrl = result.html_url;
            filteredResult.owner = owner;
            relevantInfo.push(filteredResult);
        });
        return relevantInfo;
    };

    /****************************** Pagination ************************************/
    this.paginate = function(pconfig) {
        pconfig.range = function() {
            var rangeSize = 15;
            var ret = [];
            var start;

            start = pconfig.currentPage;
            if ( start > pconfig.pageCount()-rangeSize ) {
                start = pconfig.pageCount()-rangeSize+1;
            }

            for (var i=start; i<start+rangeSize; i++) {
                if(i>0)
                    ret.push(i);
            }
            return ret;
        };
        pconfig.pageCount = function() {
            return Math.ceil(pconfig.list.length/pconfig.itemsPerPage)-1;
        };
        pconfig.rows = function() {
            return pconfig.list.length;
        };
        pconfig.from = function() {
            return pconfig.currentPage*pconfig.itemsPerPage;
        };
        pconfig.to = function() {
            var initial = pconfig.currentPage*pconfig.itemsPerPage + pconfig.itemsPerPage;
            if(initial<pconfig.rows())
                return initial;
            else
                return pconfig.rows();
        };
        pconfig.prevPage = function() {
            if (pconfig.currentPage > 0) {
                pconfig.currentPage--;
            }
        };

        pconfig.prevPageDisabled = function() {
            return pconfig.currentPage === 0 ? "disabled" : "";
        };

        pconfig.nextPage = function() {
            if (pconfig.currentPage < pconfig.pageCount()) {
                pconfig.currentPage++;
            }
        };

        pconfig.nextPageDisabled = function() {
            return pconfig.currentPage === pconfig.pageCount() ? "disabled" : "";
        };
        pconfig.setPage = function(n) {
            pconfig.currentPage = n;
        };
        pconfig.$editLine = $('<ul class="pagination">' +
            '<li ng-class="pconfig.prevPageDisabled()"><a href="" ng-click="pconfig.prevPage()">&#171;</a></li>' +
            '<li ng-class="{active: 0 == pconfig.currentPage}" ng-click="pconfig.setPage(0)"><a href="">1</a></li>' +
            '<li ng-repeat="n in pconfig.range()" ng-class="{active: n == pconfig.currentPage}" ng-click="pconfig.setPage(n)">' +
            '<a href="">{{n+1}}</a></li>' +
            '<li ng-hide="pconfig.currentPage > pconfig.pageCount()-10" ng-click="pconfig.setPage(pconfig.pageCount())">' +
            '<a href="">{{pconfig.pageCount()+1}}</a></li>' +
            '<li ng-class="pconfig.nextPageDisabled()"><a href="" ng-click="pconfig.nextPage()">&#187;</a></li></ul>');
        $('#'+pconfig.id).html(pconfig.$editLine);
    };
}]);
