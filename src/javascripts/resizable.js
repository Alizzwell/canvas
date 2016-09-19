var app = angular.module('resizable', []);

app.directive('initResizable', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 0; idx <= scope.arr.length; idx++)
			{
				if (angular.element(element).attr("id") == 'resizable'+idx) {
					var elem = angular.element(element);
					var delElem = angular.element(element.children()[1]);
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
      var startX = 0, startY = 0, startWidth = 0, startHeight = 0, startTop = 0, startLeft = 0, x = 0, y = 0, flag = 0, pos = -1;

      function mouseDown(event) {
				if(scope.$parent.cursorState == 1)
				{
					element.css('z-index', 9999);
					// Prevent default dragging of selected content
					event.preventDefault();
					startX = event.pageX - x;
					startY = event.pageY - y;
					startWidth = parseInt(element.css('width'));
					startHeight = parseInt(element.css('height'));
					startTop = parseInt(element.css('top'));
					startLeft = parseInt(element.css('left'));
					flag = 1;
					$document.on('mouseup', mouseup);
				}
      }

      function mousemove(evt) {
				if(flag == 1 && pos >= 0)
				{
					var difY = evt.pageY - startY;
					var difX = evt.pageX - startX;
					/*element.css({
						height: startHeight + y + 'px',
						width:  startWidth + x + 'px'
					});*/
					//var elem = angular.element($scope.ResizableElem);
					var delElem = angular.element(element.children()[1]);
					var height, width, left, top;
					switch(pos)
					{
						case 0:
							if(parseInt(element.css('height')) - difY >= 50)
							{
								element.css('height', startHeight - difY + "px");
								element.css('top', startTop + difY + "px");
							}
							break;
						
						case 1:
							if(parseInt(element.css('width')) + difX >= 50)
							{
								element.css('width', startWidth + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							if(parseInt(element.css('height')) - difY >= 50)
							{
								element.css('height', startHeight - difY + "px");
								element.css('top', startTop + difY + "px");
							}
							break;
							
						case 2:
							if(parseInt(element.css('width')) + difX >= 50)
							{
								element.css('width', startWidth + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							break;
						
						case 3:
							if(parseInt(element.css('width')) + difX >= 50)
							{
								element.css('width', startWidth + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							if(parseInt(element.css('height')) + difY >= 50)
							{
								element.css('height', startHeight + difY + "px");
							}
							break;
						
						case 4:
							if(parseInt(element.css('height')) + difY >= 50)
							{
								element.css('height', startHeight + difY + "px");
							}
							break;
						
						case 5:
							if(parseInt(element.css('width')) - difX >= 50)
							{
								element.css('width', startWidth - difX + "px");
								element.css('left', startLeft + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							if(parseInt(element.css('height')) + difY >= 50)
							{
								element.css('height', startHeight + difY + "px");
							}
							break;
						
						case 6:
							if(parseInt(element.css('width')) - difX >= 50)
							{
								element.css('width', startWidth - difX + "px");
								element.css('left',startLeft + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							break;
						
						case 7:
							if(parseInt(element.css('width')) - difX >= 50)
							{
								element.css('width', startWidth - difX + "px");
								element.css('left', startLeft + difX + "px");
								delElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(delElem.css('width')) + "px");
							}
							if(parseInt(element.css('height')) - difY >= 50)
							{
								element.css('height', startHeight - difY + "px");
								element.css('top', startTop + difY + "px");
							}
							break;
						
						default:
							element.css('cursor', 'default');
							flag = 0;
					}
				}
      }
			
			function resizeMove(evt) {
				if (flag == 0)
				{
					if (scope.$parent.cursorState == 1)
					{
						if (evt.offsetY <= parseInt(element.css('padding-top'))) 
						{
							if (evt.offsetX <= parseInt(element.css('padding-left'))) 
							{
								pos = 7;
								element.css('cursor', 'nw-resize');
							}
							else if (evt.offsetX < parseInt(element.css('width')) - parseInt(element.css('padding-right')))
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
						else if (evt.offsetY < parseInt(element.css('height')) - parseInt(element.css('padding-bottom')))
						{
							if (evt.offsetX <= parseInt(element.css('padding-left')))
							{
								pos = 6;
								element.css('cursor', 'w-resize');
							}
							else if (evt.offsetX >= parseInt(element.css('width')) - parseInt(element.css('padding-right')))
							{
								pos = 2;
								element.css('cursor', 'e-resize');
							}
							else
							{
								//$scope.cursorState = 0;
								//console.log($scope.cursorState);
								pos = -1;
								element.css('cursor', 'default');
							}
						}
						else
						{
							if (evt.offsetX <= parseInt(element.css('padding-left'))) 
							{
								pos = 5;
								element.css('cursor', 'sw-resize');
							}
							else if (evt.offsetX < parseInt(element.css('width')) - parseInt(element.css('padding-right')))
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
					else
					{
						element.css('cursor', 'default');
					}
				}
				/*else if(flag == 1)
				{
					y = evt.pageY - startY;
					x = evt.pageX - startX;
					element.css({
						height: startHeight + y + 'px',
						width:  startWidth + x + 'px'
					});
				}*/
      }

      function mouseup() {
				if(flag == 1)
				{
					element.css('z-index', scope.$parent.curZ++);
					$document.off('mouseup', mouseup);
					flag = x = y = 0;
				}
      }
			
			function mouseLeave() {
				scope.$parent.cursorState = 0;
				element.css('cursor', 'default');
				element.off('mousemove', resizeMove);
			}
			
			function mouseEnter() {
				scope.$parent.cursorState = 1;
				//element.css('cursor', 'e-resize');
				element.on('mousemove', resizeMove);
			}
			
			$document.on('mousemove', mousemove);
      //element.on('mousedown', resizeMove);
      element.on('mousedown', mouseDown);
			element.on('mouseleave', mouseLeave);
			element.on('mouseenter', mouseEnter);
    }
  };
}]);