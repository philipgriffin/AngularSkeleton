/*
@desc       This directive will take an image as a parameter and detect when the image
            has loaded. It will then be applied to the background of the element
@example    Add a css background image using background: url('images/testImage.jpeg')
            Then apply to that element:
            <div pg-bg-image-load-swap high-res-image="images/testImage.jpeg"></div>
*/

(function() {
    angular.module('bgImageSwap')
        .directive('pgBgImageLoadSwap', bgImageLoadSwap);

    function bgImageLoadSwap() {
        return {
            restrict: 'A',
            scope: {
                highResImage: '@'
            },
            link: function (scope, element, attrs) {
                var image = document.createElement('img');
                image.src = scope.highResImage;
                image.onload = function () {
                    element.css({
                        'background': 'url(' + scope.highResImage + ') no-repeat center center fixed',
                        'background-size': 'cover'});
                };
            }
        };
    }
})();
