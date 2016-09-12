angular.module('mc.resizer', []).directive('resizer', function($document) {

    return function($scope, $element, $attrs) {

        $element.on('mousedown', function(event) {
            event.preventDefault();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {


            if ($attrs.resizer == 'vertical') {
                // Handle vertical resizer
                var x = event.pageX;

                if ($attrs.resizerMax && x > $attrs.resizerMax) {
                    x = parseInt($attrs.resizerMax);
                }

                if ($attrs.resizerMin && x < $attrs.resizerMin) {
                    x = parseInt($attrs.resizerMin);
                }

                $element.css({
                    left: x + 'px'
                });

                $($attrs.resizerLeft).css({
                    width: x + 'px'
                });
                $($attrs.resizerRight).css({
                    left: (x + parseInt($attrs.resizerWidth)) + 'px'
                });


            }

            // The following elif statement adds support for panels
            // being positioned right of page center axis
			// Note: use of $("html") is a really bad practice
			// but in this case it is being used to demonstrate
			// the width of container element

            else if($attrs.resizer == 'vertical-right'){
                var x = event.pageX;
                var pageWidth = parseInt($("html").css("width")); // get container element width
                var pageRightOffset = parseInt($("html").css("width")) - x; 

                if(pageRightOffset<$attrs.resizerMin){ // being fired if user tries to drag resizer below minimum value
                    x = pageWidth - parseInt($attrs.resizerMin);
                    $element.css({
                        left: x + 'px' // keeping the resizer bar at minimum allowed value
                    })
                    $($attrs.resizerRight).css({
                        width: (parseInt($attrs.resizerMin) + 'px') // same goes for right div
                    });
                    $($attrs.resizerLeft).css({
                        right: (parseInt($attrs.resizerMin) + 'px') // and left
                    });
                }

                else if (pageRightOffset>$attrs.resizerMax){
                    x = pageWidth - parseInt($attrs.resizerMax);
                    $element.css({
                        left: x + 'px'
                    });
                    $($attrs.resizerRight).css({
                        width: (parseInt($attrs.resizerMax) + 'px')
                    });
                    $($attrs.resizerLeft).css({
                        right: (parseInt($attrs.resizerMax) + 'px')
                    });

                }

                else {
                    $element.css({
                          left: x + 'px'
                      })
                    $($attrs.resizerRight).css({
                          width: pageWidth-x + 'px'
                      });
                    $($attrs.resizerLeft).css({
                        right: pageWidth-x + 'px'
                    });
                }

            }

            else {
                // Handle horizontal resizer
                var y = window.innerHeight - event.pageY;

                if ($attrs.resizerMax && y > $attrs.resizerMax) {
                    y = parseInt($attrs.resizerMax);
                }

                if ($attrs.resizerMin && y < $attrs.resizerMin) {
                    y = parseInt($attrs.resizerMin);
                }

                $element.css({
                    // bottom: y + 'px'
                    bottom:y + 'px'
                });

                $($attrs.resizerTop).css({
                    bottom:  (y + parseInt($attrs.resizerHeight)) + 'px'
                });
                $($attrs.resizerBottom).css({
                    height: y + 'px'
                });
            }
            
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    };
});
