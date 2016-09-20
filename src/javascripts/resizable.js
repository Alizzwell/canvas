var app = angular.module('resizable', []);

app.directive('initResizable', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 0; idx <= scope.arr.length; idx++)
			{
				if (angular.element(element).attr("id") == 'resizable'+idx) {
					var elem = angular.element(element);
					var delElem = angular.element(element.children()[0]);
					elem.css("top", 400*parseInt((idx / 2))+"px");
					elem.css("width", "600px");
					elem.css("height", "300px");
					elem.css("padding", "10px");
					delElem.css("width", "30px");
					
					if(idx % 2 == 0)
						elem.css("left", "50px");
					else
						elem.css("left", "800px");
					
					delElem.css("left", parseInt(elem.css("width")) - parseInt(elem.css("padding-right")) - parseInt(delElem.css("width"))+"px");
					delElem.css("top", parseInt(elem.css("padding-top")) + "px");
					scope.minWidth = elem.css("padding-left") + elem.css("padding-right") + delElem.css("width");
					scope.minHeight = elem.css("padding-top") + elem.css("padding-bottom") + delElem.css("height");
				}
			}
    });
  };
}); 

app.directive('myResizable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, startWidth = 0, startHeight = 0, startTop = 0, startLeft = 0, x = 0, y = 0, pos = -1;
			var left, top, pLeft, pTop, pBottom, pRight, width, height, offsetX, offsetY;
      function resizeDown(evt) {
				// Prevent default dragging of selected content
				element.css('z-index', 9999);
				if(pos >= 0)
				{
					evt.preventDefault();
					startX = evt.pageX - x;
					startY = evt.pageY - y;
					startWidth = parseInt(element.css('width'));
					startHeight = parseInt(element.css('height'));
					startTop = parseInt(element.css('top'));
					startLeft = parseInt(element.css('left'));
					element.off('mousemove', resizeMove);
					$document.on('mousemove', mouseMove);
					$document.on('mouseup', resizeUp);
					angular.element(element.parent().parent()).css('cursor', element.css('cursor'));
				}
      }

      function mouseMove(evt) {
				var difY = evt.pageY - startY;
				var difX = evt.pageX - startX;
				var delElem = angular.element(element.children()[0]);
				var height, width, left, top;
				switch(pos)
				{
					case 0:
						if(startHeight - difY >= 50)
						{
							element.css('height', startHeight - difY + "px");
							element.css('top', startTop + difY + "px");
						}
						break;
					
					case 1:
						if(startWidth + difX >= 50)
						{
							element.css('width', startWidth + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + difX + "px");
						}
						if(startHeight - difY >= 50)
						{
							element.css('height', startHeight - difY + "px");
							element.css('top', startTop + difY + "px");
						}
						break;
						
					case 2:
						if(startWidth + difX >= 50)
						{
							element.css('width', startWidth + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + difX + "px");
						}
						break;
					
					case 3:
						if(startWidth + difX >= 50)
						{
							element.css('width', startWidth + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + difX + "px");
						}
						if(startHeight + difY >= 50)
						{
							element.css('height', startHeight + difY + "px");
						}
						break;
					
					case 4:
						if(startHeight + difY >= 50)
						{
							element.css('height', startHeight + difY + "px");
						}
						break;
					
					case 5:
						if(startWidth - difX >= 50)
						{
							element.css('width', startWidth - difX + "px");
							element.css('left', startLeft + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) - difX + "px");
						}
						if(startHeight + difY >= 50)
						{
							element.css('height', startHeight + difY + "px");
						}
						break;
					
					case 6:
						if(startWidth - difX >= 50)
						{
							element.css('width', startWidth - difX + "px");
							element.css('left',startLeft + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) - difX + "px");
						}
						break;
					
					case 7:
						if(startWidth - difX >= 50)
						{
							element.css('width', startWidth - difX + "px");
							element.css('left', startLeft + difX + "px");
							delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) - difX + "px");
						}
						if(startHeight - difY >= 50)
						{
							element.css('height', startHeight - difY + "px");
							element.css('top', startTop + difY + "px");
						}
						break;
					
					default:
						break;
				}
			}
			
			function resizeMove(evt) {
				top = parseInt(element.css('top'));
				left = parseInt(element.css('left'));
				width = parseInt(element.css('width'));
				height = parseInt(element.css('height'));
				offsetX = evt.clientX - left;
				offsetY = evt.clientY - top;
				pLeft = parseInt(element.css('padding-left'));
				pRight = parseInt(element.css('padding-right'));
				pTop = parseInt(element.css('padding-top'));
				pBottom = parseInt(element.css('padding-bottom'));
				if (offsetY <= pTop) 
				{
					if (offsetX <= pLeft) 
					{
						pos = 7;
						element.css('cursor', 'nw-resize');
					}
					else if (offsetX < width - pRight)
					{
						pos = 0;
						element.css('cursor', 'n-resize');
					}
					else
					{
						pos = 1;
						element.css('cursor', 'ne-resize');
					}
				}	
				else if (offsetY < height - pBottom)
				{
					if (offsetX <= pLeft)
					{
					pos = 6;
						element.css('cursor', 'w-resize');
					}
					else if (offsetX >= width - pRight)
					{
						pos = 2;
						element.css('cursor', 'e-resize');
					}
					else
					{
						pos = -1;
						element.css('cursor', 'default');
					}
				}
				else
				{
					if (offsetX <= pLeft) 
					{
						pos = 5;
						element.css('cursor', 'sw-resize');
					}
					else if (offsetX < width - pRight)
					{
						pos = 4;
						element.css('cursor', 's-resize');
					}
					else 
					{
						pos = 3;
						element.css('cursor', 'se-resize');
					}
				}
			}

			function resizeUp() {
				element.css('z-index', scope.$parent.curZ++);
				element.on('mousemove', resizeMove);
				$document.off('mousemove', mouseMove);
				$document.off('mouseup', resizeUp);
				angular.element(element.parent().parent()).css('cursor', 'default');
				x = y = 0;
      }
			
      element.on('mousedown', resizeDown);
      element.on('mousemove', resizeMove);
    }
  };
}]);