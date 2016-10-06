var app = angular.module('draggable', []);

app.directive('myDraggable', ['$document', function($document) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0, startLeft = 0, startTop = 0;
		
		element.css("width", window.getComputedStyle(element[0], null).width);
		element.css("height", window.getComputedStyle(element[0], null).height);
		element.css("left", window.getComputedStyle(element[0], null).left);
		element.css("top", window.getComputedStyle(element[0], null).top);
			
		function mouseDown() {
			var children = element.children();
			var dragElem = null;
			for(var idx = 0; idx < children.length; idx++)
			{
				if(children[idx].className == "drag")
					dragElem = angular.element(children[idx]);
			}
			
			if(dragElem == null)
			{
				if (scope.$parent.dragElem != null)
					scope.$parent.dragElem.remove();
				element.prepend("<img src='./img/move.png' class='drag' ng-disabled='selectDisabled'/>")
				dragElem = angular.element(element.children()[0]);
				scope.$parent.dragElem = dragElem;
				dragElem.on('mousedown', dragDown);
			}
			element.css("z-index", scope.$parent.curZ++);
		}
		
		function dragDown(evt) {
			evt.preventDefault();
			startX = evt.pageX - x;
			startY = evt.pageY - y;
			startLeft = parseInt(element.css('left'));
			startTop = parseInt(element.css('top'));
			$document.on('mousemove', dragMove);
			$document.on('mouseup', dragUp);
    }

		function dragMove(evt) {
			y = evt.pageY - startY;
			x = evt.pageX - startX;
			element.css({
				top: startTop + y + 'px',
				left:  startLeft + x + 'px'
			});
    }

    function dragUp() {
			$document.off('mousemove', dragMove);
			$document.off('mouseup', dragUp);
			x = y = 0;
			element.css("z-index", scope.$parent.curZ++);
		}
			
    element.on('mousedown', mouseDown);
  }
}]);
