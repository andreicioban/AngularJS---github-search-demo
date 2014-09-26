'use strict';
githubApp.directive('onEnter',[ function() {

    // directive used to intercept enter key press and evaluate the expression inside attribute value
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.onEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
}]);