;(function (angular) {
  'use strict';

  var app = angular.module('ui.flubber');

  app.directive('flubberResizable', function($document, flubberCommon) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, startWidth = 0, startHeight = 0, startTop = 0, startLeft = 0, x = 0, y = 0, pos = -1;
  		var colElem = null;
  		var left, top, pLeft, pTop, pBottom, pRight, width, height, offsetX, offsetY;
			var nElem, neElem, eElem, seElem, sElem, swElem, wElem, nwElem;

  		element.css("width", window.getComputedStyle(element[0], null).width);
  		element.css("height", window.getComputedStyle(element[0], null).height);
  		element.css("left", window.getComputedStyle(element[0], null).left);
  		element.css("top", window.getComputedStyle(element[0], null).top);
  		element.css("padding-left", window.getComputedStyle(element[0], null).paddingLeft);
  		element.css("padding-right", window.getComputedStyle(element[0], null).paddingRight);
  		element.css("padding-top", window.getComputedStyle(element[0], null).paddingTop);
  		element.css("padding-bottom", window.getComputedStyle(element[0], null).paddingBottom);
			
			element.prepend("<div id='n' class='resize' ng-disabled='selectDisabled'/>")
			nElem = angular.element(element.children()[0]);
			nElem.css('width', parseInt(element.css('width')) - parseInt(element.css('padding-left')) - parseInt(element.css('padding-right')) + "px");
			nElem.css('height', element.css('padding-top'));
			nElem.css('background-size',parseInt(nElem.css('width')) + "px " + parseInt(nElem.css('height')) + "px");
			nElem.css('left', parseInt(element.css('padding-left')));
			nElem.css('top', "0px");

			element.prepend("<div id='ne' class='resize' ng-disabled='selectDisabled'/>")
			neElem = angular.element(element.children()[0]);
			neElem.css('width', element.css('padding-right'));
			neElem.css('height', element.css('padding-top'));
			neElem.css('background-size',parseInt(neElem.css('width')) + "px " + parseInt(neElem.css('height')) + "px");
			neElem.css('left', parseInt(element.css('width')) - parseInt(neElem.css('width'))+ "px");
			neElem.css('top', "0px");
			
			element.prepend("<div id='e' class='resize' ng-disabled='selectDisabled'/>")
			eElem = angular.element(element.children()[0]);
			eElem.css('width', element.css('padding-right'));
			eElem.css('height', parseInt(element.css('height')) - parseInt(element.css('padding-top')) - parseInt(element.css('padding-bottom')) + "px");
			eElem.css('background-size',parseInt(eElem.css('width')) + "px " + parseInt(eElem.css('height')) + "px");
			eElem.css('left', parseInt(element.css('width')) - parseInt(neElem.css('width'))+ "px");
			eElem.css('top', element.css('padding-top'));
			
			element.prepend("<div id='se' class='resize' ng-disabled='selectDisabled'/>")
			seElem = angular.element(element.children()[0]);
			seElem.css('width', element.css('padding-right'));
			seElem.css('height', element.css('padding-bottom'));
			seElem.css('background-size', parseInt(seElem.css('width')) + "px " + parseInt(seElem.css('height')) + "px");
			seElem.css('left', parseInt(element.css('width')) - parseInt(seElem.css('width'))+ "px");
			seElem.css('top', parseInt(element.css('height')) - parseInt(element.css('padding-bottom')) + "px");
			
			element.prepend("<div id='s' class='resize' ng-disabled='selectDisabled'/>")
			sElem = angular.element(element.children()[0]);
			sElem.css('width', parseInt(element.css('width')) - parseInt(element.css('padding-left')) - parseInt(element.css('padding-right')) + "px");
			sElem.css('height', element.css('padding-bottom'));
			sElem.css('background-size' ,parseInt(sElem.css('width')) + "px " + parseInt(sElem.css('height')) + "px");
			sElem.css('left', element.css('padding-left'));
			sElem.css('top', parseInt(element.css('height')) - parseInt(element.css('padding-bottom')) + "px");
			
			
			
			element.prepend("<div id='sw' class='resize' ng-disabled='selectDisabled'/>")
			swElem = angular.element(element.children()[0]);
			swElem.css('width', element.css('padding-left'));
			swElem.css('height', element.css('padding-bottom'));
			swElem.css('background-size',parseInt(swElem.css('width')) + "px " + parseInt(swElem.css('height')) + "px");
			swElem.css('left', "0px");
			swElem.css('top', parseInt(element.css('height')) - parseInt(element.css('padding-bottom')) + "px");
			
			element.prepend("<div id='w' class='resize' ng-disabled='selectDisabled'/>")
			wElem = angular.element(element.children()[0]);
			wElem.css('width', element.css('padding-left'));
			wElem.css('height', parseInt(element.css('height')) - parseInt(element.css('padding-top')) - parseInt(element.css('padding-bottom')) + "px");
			wElem.css('background-size',parseInt(wElem.css('width')) + "px " + parseInt(wElem.css('height')) + "px");
			wElem.css('left', "0px");
			wElem.css('top', element.css('padding-top'));
			
			element.prepend("<div id='nw' class='resize' ng-disabled='selectDisabled'/>")
			nwElem = angular.element(element.children()[0]);
			nwElem.css('width', element.css('padding-left'));
			nwElem.css('height', element.css('padding-top'));
			nwElem.css('background-size',parseInt(nwElem.css('width')) + "px " + parseInt(nwElem.css('height')) + "px");
			nwElem.css('left', "0px");
			nwElem.css('top', "0px");
			
      function resizeDown(evt) {
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
