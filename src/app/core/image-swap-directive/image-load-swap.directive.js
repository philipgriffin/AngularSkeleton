/*
 @desc       This directive will take an image as a parameter and detect when the image
 has loaded. Once loaded it be applied to the src tag or background depending on usage.
 @example    When applied to <img> tags: - Image is added on src / ng-src attribute
 <img ng-src="low-res.jpg" image-load-swap high-res-image="high-res.jpg"></img>

 When applied to any other tag: - Image is added as a background image
 <div style="background:url('low-res.jpg')" image-load-swap 
 high-res-image="images/testImage.jpeg"></div>
 */
(function() {
    angular.module('core')
        .directive('imageLoadSwap', imageLoadSwapDirective);

    function imageLoadSwapDirective() {
        return {
            restrict: 'A',
            scope: {
                highResImage: '@'
            },
            link: function(scope, element, attrs) {
                var image = document.createElement('img');
                image.src = scope.highResImage;
                image.onload = function() {
                    if (element.prop('tagName') == 'IMG') {
                        element.attr('src', scope.highResImage);
                    } else {
                        element.css({
                            'background': 'url(' + scope.highResImage + ')'
                        });
                    }
                };
            }
        };
    }
})();