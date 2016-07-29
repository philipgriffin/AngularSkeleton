(function() {
angular.module('core')
    .directive('randomClickAnimation', function() {
        return {
            restrict: 'A',
            scope: {
                animateType: '@'
            },
            link: function(scope, element, attr) {
                element.bind('click', function() {
                    console.log('animatjdoa');
                    element.addClass('animated ' + scope.animateType);
                    element[0].addEventListener("animationend", function() {
                        element.removeClass('animated ' + scope.animateType);
                    }, false);
                });
            }
        };
    });
});
