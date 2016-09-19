var app = angular.module('draggable', []);

app.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0, startLeft = 0, startTop = 0, flag = 0;
			
			function mouseDown(event) {
        // Prevent default dragging of selected content
				if(scope.$parent.cursorState == 0)
				{
					element.parent().css('z-index', 9999);
					event.preventDefault();
					startX = event.pageX - x;
					startY = event.pageY - y;
					startLeft = parseInt(element.parent().css('left'));
					startTop = parseInt(element.parent().css('top'));
					flag = 1;
					$document.on('mouseup', mouseUp);
				}
      }

      function mouseMove(event) {
				if(flag == 1)
				{
					y = event.pageY - startY;
					x = event.pageX - startX;
					element.parent().css({
						top: startTop + y + 'px',
						left:  startLeft + x + 'px'
					});
				}
      }
			
			function dragMove(event) {
				scope.$parent.cursorState = 0;
			}

      function mouseUp() {
				if(flag == 1)
				{
					element.parent().css('z-index', scope.$parent.curZ++);
					$document.off('mouseup', mouseUp);
					flag = x = y = 0;
				}
      }
			
			function mouseLeave() {
				scope.$parent.cursorState = 1;
				element.css('cursor', 'e-resize');
			}
			
			function mouseEnter() {
				scope.$parent.cursorState = 0;
				element.css('cursor', 'default');
			}
			
      $document.on('mousemove', mouseMove);
      element.on('mousemove', dragMove);
      element.on('mousedown', mouseDown);
			element.on('mouseleave', mouseLeave);
			element.on('mouseenter', mouseEnter);
    }
  };
}]);