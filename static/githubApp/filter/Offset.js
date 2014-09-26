'use strict';
githubApp.filter('offset', function() {

    // used in pagination
    return function(input, start) {
        if(input){
            start = parseInt(start, 10);
            return input.slice(start);
        }
    };
});