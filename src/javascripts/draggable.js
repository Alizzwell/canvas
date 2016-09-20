var app = angular.module('draggable', []);

app.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0, startLeft = 0, startTop = 0;
			
			function dragDown(evt) {
				evt.preventDefault();
				startX = evt.pageX - x;
				startY = evt.pageY - y;
				startLeft = parseInt(element.parent().css('left'));
				startTop = parseInt(element.parent().css('top'));
				$document.on('mousemove', dragMove);
				$document.on('mouseup', dragUp);
      }

      function dragMove(evt) {
				y = evt.pageY - startY;
				x = evt.pageX - startX;
				element.parent().css({
					top: startTop + y + 'px',
					left:  startLeft + x + 'px'
				});
      }

      function dragUp() {
				element.parent().css('z-index', scope.$parent.curZ++);
				$document.off('mousemove', dragMove);
				$document.off('mouseup', dragUp);
				x = y = 0;
			}
			
      element.on('mousedown', dragDown);
    }
  };
}]);