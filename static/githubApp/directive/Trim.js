'use strict';
githubApp.directive('myTruncate', [ function() {

    // this directive is used to limit the value inside a html tag to 8 chars
    return {
        link: function link(scope, element, attrs) {
            element.text(
                    attrs.myTruncate.length > 10 ? attrs.myTruncate.substr(0,8)+'...' : attrs.myTruncate
            );
        }
    };

}]);