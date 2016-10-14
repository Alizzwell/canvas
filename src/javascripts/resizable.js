;(function (angular) {
  'use strict';

  var app = angular.module('ui.flubber');

  app.directive('flubberResizable', function($document, flubberCommon) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, startWidth = 0, startHeight = 0, startTop = 0, startLeft = 0, x = 0, y = 0, pos = -1;
  		var colElem = null;
  		var left, top, pLeft, pTop, pBottom, pRight, width, height, offsetX, offsetY;
			var nElem, neElem, eElem, seElem, sElem, swElem, wElem, nwElem;
			var defaultSize = "10px";

  		element.css("width", window.getComputedStyle(element[0], null).width);
  		element.css("height", window.getComputedStyle(element[0], null).height);
  		element.css("left", window.getComputedStyle(element[0], null).left);
  		element.css("top", window.getComputedStyle(element[0], null).top);
  		element.css("padding-left", window.getComputedStyle(element[0], null).paddingLeft);
  		element.css("padding-right", window.getComputedStyle(element[0], null).paddingRight);
  		element.css("padding-top", window.getComputedStyle(element[0], null).paddingTop);
  		element.css("padding-bottom", window.getComputedStyle(element[0], null).paddingBottom);
  		element.css("border", window.getComputedStyle(element[0], null).border);

			function resizeCreate()
			{
				element.prepend("<div id='n' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.n = angular.element(element.children()[0]);
				flubberCommon.resizeElem.n.on('mousedown', resizeDown);

				element.prepend("<div id='ne' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.ne = angular.element(element.children()[0]);
				flubberCommon.resizeElem.ne.on('mousedown', resizeDown);

				element.prepend("<div id='e' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.e = angular.element(element.children()[0]);
				flubberCommon.resizeElem.e.on('mousedown', resizeDown);

				element.prepend("<div id='se' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.se = angular.element(element.children()[0]);
				flubberCommon.resizeElem.se.on('mousedown', resizeDown);

				element.prepend("<div id='s' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.s = angular.element(element.children()[0]);
				flubberCommon.resizeElem.s.on('mousedown', resizeDown);

				element.prepend("<div id='sw' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.sw = angular.element(element.children()[0]);
				flubberCommon.resizeElem.sw.on('mousedown', resizeDown);

				element.prepend("<div id='w' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.w = angular.element(element.children()[0]);
				flubberCommon.resizeElem.w.on('mousedown', resizeDown);

				element.prepend("<div id='nw' class='resize' ng-disabled='selectDisabled'/>")
				flubberCommon.resizeElem.nw = angular.element(element.children()[0]);
				flubberCommon.resizeElem.nw.on('mousedown', resizeDown);
			}

			function resizeRemove()
			{
				flubberCommon.resizeElem.n.remove();
				flubberCommon.resizeElem.ne.remove();
				flubberCommon.resizeElem.e.remove();
				flubberCommon.resizeElem.se.remove();
				flubberCommon.resizeElem.s.remove();
				flubberCommon.resizeElem.sw.remove();
				flubberCommon.resizeElem.w.remove();
				flubberCommon.resizeElem.nw.remove();
			}

			function resizeDraw()
			{
				var borderSize = parseInt(element.css('border').split(" ")[0]);
				var resizeSize = parseInt(defaultSize);

				flubberCommon.resizeElem.n.css('width', parseInt(element.css('width')) - (resizeSize + borderSize) + "px");
				flubberCommon.resizeElem.n.css('height', defaultSize);
				flubberCommon.resizeElem.n.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.n.css('left', (resizeSize - borderSize) / 2 + "px");
				flubberCommon.resizeElem.n.css('top', -(resizeSize + borderSize) / 2 + "px");

				flubberCommon.resizeElem.ne.css('width', defaultSize);
				flubberCommon.resizeElem.ne.css('height', defaultSize);
				flubberCommon.resizeElem.ne.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.ne.css('left', parseInt(flubberCommon.resizeElem.n.css('left')) + parseInt(flubberCommon.resizeElem.n.css('width')) + "px");
				flubberCommon.resizeElem.ne.css('top', flubberCommon.resizeElem.n.css('top'));

				flubberCommon.resizeElem.e.css('width', defaultSize);
				flubberCommon.resizeElem.e.css('height', parseInt(element.css('height')) - (resizeSize + borderSize) + "px");
				flubberCommon.resizeElem.e.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.e.css('left', flubberCommon.resizeElem.ne.css('left'));
				flubberCommon.resizeElem.e.css('top', parseInt(flubberCommon.resizeElem.ne.css('top')) + parseInt(flubberCommon.resizeElem.ne.css('height')) + "px");

				flubberCommon.resizeElem.se.css('width', defaultSize);
				flubberCommon.resizeElem.se.css('height', defaultSize);
				flubberCommon.resizeElem.se.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.se.css('left', flubberCommon.resizeElem.e.css('left'));
				flubberCommon.resizeElem.se.css('top', parseInt(flubberCommon.resizeElem.e.css('top')) + parseInt(flubberCommon.resizeElem.e.css('height')) + "px");

				flubberCommon.resizeElem.s.css('width', flubberCommon.resizeElem.n.css('width'));
				flubberCommon.resizeElem.s.css('height', defaultSize);
				flubberCommon.resizeElem.s.css('background-size' , defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.s.css('left', parseInt(flubberCommon.resizeElem.se.css('left')) - parseInt(flubberCommon.resizeElem.s.css('width')) + "px");
				flubberCommon.resizeElem.s.css('top', flubberCommon.resizeElem.se.css('top'));

				flubberCommon.resizeElem.sw.css('width', defaultSize);
				flubberCommon.resizeElem.sw.css('height', defaultSize);
				flubberCommon.resizeElem.sw.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.sw.css('left', parseInt(flubberCommon.resizeElem.s.css('left')) - parseInt(flubberCommon.resizeElem.sw.css('width')) + "px");
				flubberCommon.resizeElem.sw.css('top', flubberCommon.resizeElem.s.css('top'));

				flubberCommon.resizeElem.w.css('width', defaultSize);
				flubberCommon.resizeElem.w.css('height', flubberCommon.resizeElem.e.css('height'));
				flubberCommon.resizeElem.w.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.w.css('left', flubberCommon.resizeElem.sw.css('left'));
				flubberCommon.resizeElem.w.css('top', parseInt(flubberCommon.resizeElem.sw.css('top')) - parseInt(flubberCommon.resizeElem.w.css('height')) + "px");

				flubberCommon.resizeElem.nw.css('width', defaultSize);
				flubberCommon.resizeElem.nw.css('height', defaultSize);
				flubberCommon.resizeElem.nw.css('background-size', defaultSize + " " + defaultSize);
				flubberCommon.resizeElem.nw.css('left', flubberCommon.resizeElem.w.css('left'));
				flubberCommon.resizeElem.nw.css('top', flubberCommon.resizeElem.n.css('top'));
			}

			function flubberDown()
			{
  			var children = element.children();
  			var resizeElem = null;
  			for(var idx = 0; idx < children.length; idx++)
  			{
  				if(children[idx].className == "resize")
					{
  					resizeElem = angular.element(children[idx]);
						break;
					}
  			}

  			if(resizeElem == null)
  			{
  				if (flubberCommon.resizeElem.n != null)
  					resizeRemove();
  				resizeCreate();
					resizeDraw();
  			}
			}

      function resizeDown(evt) {
  			switch(evt.currentTarget.id)
				{
					case 'n':
						pos = 0;
						break;

					case 'ne':
						pos = 1;
						break;

					case 'e':
						pos = 2;
						break;

					case 'se':
						pos = 3;
						break;

					case 's':
						pos = 4;
						break;

					case 'sw':
						pos = 5;
						break;

					case 'w':
						pos = 6;
						break;

					case 'nw':
						pos = 7;
						break;

					default:
						pos = -1;
						break;
				}

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

  				$document.on('mousemove', mouseMove);
  				$document.on('mouseup', resizeUp);
  				//angular.element(element.parent().parent()).css('cursor', element.css('cursor'));
  			}

  			element.css("z-index", flubberCommon.curZ++);
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

				resizeDraw();
  		}

  		function resizeUp() {
  			$document.off('mousemove', mouseMove);
  			$document.off('mouseup', resizeUp);
  			//angular.element(element.parent().parent()).css('cursor', 'default');
  			x = y = 0;
      }

			element.on('mousedown', flubberDown);
      element.children().on('mousedown', flubberDown);
		}
	});
})(angular);
