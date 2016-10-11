;(function (angular) {
  'use strict';

  var app = angular.module('ui.flubber');

  app.directive('flubberResizable', function($document, flubberCommon) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, startWidth = 0, startHeight = 0, startTop = 0, startLeft = 0, x = 0, y = 0, pos = -1;
  		var colElem = null;
  		var left, top, pLeft, pTop, pBottom, pRight, width, height, offsetX, offsetY;

  		element.css("width", window.getComputedStyle(element[0], null).width);
  		element.css("height", window.getComputedStyle(element[0], null).height);
  		element.css("left", window.getComputedStyle(element[0], null).left);
  		element.css("top", window.getComputedStyle(element[0], null).top);
  		element.css("padding-left", window.getComputedStyle(element[0], null).paddingLeft);
  		element.css("padding-right", window.getComputedStyle(element[0], null).paddingRight);
  		element.css("padding-top", window.getComputedStyle(element[0], null).paddingTop);
  		element.css("padding-bottom", window.getComputedStyle(element[0], null).paddingBottom);

      function resizeDown(evt) {
  		// Prevent default dragging of selected content
  			if(pos >= 0)
  			{
  				evt.preventDefault();
  				startX = evt.pageX - x;
  				startY = evt.pageY - y;
  				startWidth = parseInt(element.css('width'));
  				startHeight = parseInt(element.css('height'));
  				startTop = parseInt(element.css('top'));
  				startLeft = parseInt(element.css('left'));

  				for(var idx = 0; idx < element.children().length; idx++)
  				{
  					if(element.children()[idx].className == "del")
  						colElem = angular.element(element.children()[idx]);
  				}

  				element.off('mousemove', resizeMove);
  				$document.on('mousemove', mouseMove);
  				$document.on('mouseup', resizeUp);
  				angular.element(element.parent().parent()).css('cursor', element.css('cursor'));
  			}

  			element.css("z-index", flubberCommon.curZ++);
  			scope.$apply();
      }

  		function mouseMove(evt) {
  		var difY = evt.pageY - startY;
  		var difX = evt.pageX - startX;
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
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) + difX + "px");
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
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) + difX + "px");
  					}
  					break;

  				case 3:
  					if(startWidth + difX >= 50)
  					{
  						element.css('width', startWidth + difX + "px");
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) + difX + "px");
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
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) - difX + "px");
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
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) - difX + "px");
  					}
  					break;

  				case 7:
  					if(startWidth - difX >= 50)
  					{
  						element.css('width', startWidth - difX + "px");
  						element.css('left', startLeft + difX + "px");
  						if(colElem != null)
  							colElem.css('left', startWidth - parseInt(element.css("padding-right")) - parseInt(colElem.css('width')) - difX + "px");
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
  			element.on('mousemove', resizeMove);
  			$document.off('mousemove', mouseMove);
  			$document.off('mouseup', resizeUp);
  			angular.element(element.parent().parent()).css('cursor', 'default');
  			x = y = 0;
      }

      element.on('mousedown', resizeDown);
      element.on('mousemove', resizeMove);
    }
  });

})(angular);
