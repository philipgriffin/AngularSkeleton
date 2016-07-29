/*
 @desc       This directive will animate an element on click using the specified animate-css animation
 has loaded. Once loaded it be applied to the src tag or background depending on usage.
 @example    <div></div>
 */
angular.module('core')
    .directive('clickAnimation', function() {
        return {
            restrict: 'A',
            scope: {
                animateType: '@'
            },
            link: function(scope, element, attr) {
                element.bind('click', function() {
                    element.addClass('animated ' + scope.animateType);
                    element[0].addEventListener("animationend", function() {
                        element.removeClass('animated ' + scope.animateType);
                    }, false);
                });
            }
        };
    });