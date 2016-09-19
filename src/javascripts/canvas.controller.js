
var app = angular.module('canvas.ctrl', []);

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
				element.css('cursor', 'e-resize');
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

app.directive('initCanvas', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 0; idx <= scope.arr.length; idx++)
			{
				if(element.attr('id') == 'canvas'+idx) 
				{
					//d3 code
				}
			}
    });
  };
});

app.directive('collapseCtrl', function() {
		return {
			template: '<img id="del{{k}}" src="./collapse.png" class="del" ng-click="btnDelClk($event)" ng-disabled="selectDisabled">',
      controller: function($scope, $element){
				function btnDelClk(Event) {
					angular.element(Event.currentTarget).parent().remove();
				}
				
				$scope.btnDelClk = btnDelClk;
			}
		}
});
/*
app.directive('canvasCtrl', function() {
		return {
			template: '<div id="canvas{{k}}" class="canvas" ng-mousedown="CanvasDown($event)" ng-mouseenter="CanvasEnter($event)" ng-mouseleave="CanvasLeave($event)" my-canvas></div>',
      controller: function($scope, $element){
				function CanvasDown(myE) {
					if(myE.button == 0)
					{
						$scope.elem = angular.element(myE.currentTarget);
						angular.element($scope.elem.parent()).css('z-index', 9999);
						$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
						$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
						$scope.ResizeableElem = null;
					}			
				}
				
				function CanvasEnter (evt) {
					//$scope.cursorState = 0;
					angular.element(angular.element(evt.currentTarget).parent()).css('cursor', 'default');
				}
				
				function CanvasLeave(myE) {
					//$scope.cursorState = 1;
				}
				
				$scope.CanvasDown = CanvasDown;
				$scope.CanvasEnter = CanvasEnter;
				$scope.CanvasLeave = CanvasLeave;
      }
    }
	});

app.directive('contentCtrl', function() {
		return {
			template: '<div id="top-content" ng-mousemove="ContentMove($event)" ng-mouseup="ContentUp($event)" ng-mouseleave="ContentLeave($event)"><div ng-repeat="k in arr"><div resize-ctrl></div></div></div></div>',
      controller: function($scope, $element){
				$scope.curZ = 0;
				$scope.cursorState = 0;
				$scope.pos = 0;
				$scope.ResizableElem = null;
				
				function ContentMove(myE) {
					console.log("content : " +$scope.cursorState);
					var difX = myE.pageX - $scope.prevX;
					var difY = myE.pageY - $scope.prevY;
					if($scope.elem) 
					{
						angular.element($scope.elem).parent().css("left", parseInt($scope.elem.parent().css('left')) + difX+"px");
						angular.element($scope.elem).parent().css("top", parseInt($scope.elem.parent().css('top')) + difY+"px");
					}
					else if ($scope.pos >= 0 && $scope.ResizableElem)
					{
						var elem = angular.element($scope.ResizableElem);
						var delElem = angular.element($scope.ResizableElem.children()[1]);
						var height, width, left, top;
						switch($scope.pos)
						{
							case 0:
								if(parseInt(elem.css('height')) - difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) - difY + "px");
									elem.css('top', parseInt(elem.css('top')) + difY + "px");
								}
								break;
							
							case 1:
								if(parseInt(elem.css('width')) + difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								if(parseInt(elem.css('height')) - difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) - difY + "px");
									elem.css('top', parseInt(elem.css('top')) + difY + "px");
								}
								break;
								
							case 2:
								if(parseInt(elem.css('width')) + difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								break;
							
							case 3:
								if(parseInt(elem.css('width')) + difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								if(parseInt(elem.css('height')) + difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) + difY + "px");
								}
								break;
							
							case 4:
								if(parseInt(elem.css('height')) + difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) + difY + "px");
								}
								break;
							
							case 5:
								if(parseInt(elem.css('width')) - difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) - difX + "px");
									elem.css('left', parseInt(elem.css('left')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								if(parseInt(elem.css('height')) + difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) + difY + "px");
								}
								break;
							
							case 6:
								if(parseInt(elem.css('width')) - difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) - difX + "px");
									elem.css('left', parseInt(elem.css('left')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								break;
							
							case 7:
								if(parseInt(elem.css('width')) - difX >= 50)
								{
									elem.css('width', parseInt(elem.css('width')) - difX + "px");
									elem.css('left', parseInt(elem.css('left')) + difX + "px");
									delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
								}
								if(parseInt(elem.css('height')) - difY >= 50)
								{
									elem.css('height', parseInt(elem.css('height')) - difY + "px");
									elem.css('top', parseInt(elem.css('top')) + difY + "px");
								}
								break;
							
							default:
								elem.css('cursor', 'default');
								$scope.ResizableElem = null;
						}
					}
					
					$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
					$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
				}
				
				function ContentUp (evt) 
				{
					if($scope.ResizableElem)
					{
						angular.element($scope.ResizableElem).css('z-index', ++$scope.curZ);
					}
					
					if($scope.elem)
					{
						angular.element($scope.elem.parent()).css('z-index', ++$scope.curZ);
					}
					$scope.elem = null;
					$scope.ResizableElem = null;
				}
				
				function ContentLeave (evt) 
				{
					if($scope.ResizableElem)
					{
						angular.element($scope.ResizableElem).css('z-index', ++$scope.curZ);
					}
					
					if($scope.elem)
					{
						angular.element($scope.elem.parent()).css('z-index', ++$scope.curZ);
					}
					
					$scope.elem = null;
					$scope.ResizableElem = null;
				}
				
				$scope.ContentMove = ContentMove;
				$scope.ContentUp = ContentUp;
				$scope.ContentLeave = ContentLeave;
			}
		}
});

app.directive('resizeCtrl', function() {
		return {
			template: '<div id="resizable{{k}}" class="resizable" ng-mousemove="ResizableMove($event)" ng-mouseenter="ResizableEnter($event)" ng-mouseleave="ResizableLeave($event)" ng-mousedown="ResizableDown($event)" my-resizable canvas-ctrl></div>',
      controller: function($scope, $element){
				function ResizableMove (evt) {
					if ($scope.ResizableElem == null)
					{
						var elem = angular.element(evt.currentTarget);
						if ($scope.cursorState)
						{
							if (evt.offsetY <= parseInt(elem.css('padding-top'))) 
							{
								if (evt.offsetX <= parseInt(elem.css('padding-left'))) 
								{
									$scope.pos = 7;
									elem.css('cursor', 'nw-resize');
								}
								else if (evt.offsetX < parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
								{
									$scope.pos = 0;
									elem.css('cursor', 'n-resize');
								}
								else
								{
									$scope.pos = 1;
									elem.css('cursor', 'ne-resize');
								}
							}	
							else if (evt.offsetY < parseInt(elem.css('height')) - parseInt(elem.css('padding-bottom')))
							{
								if (evt.offsetX <= parseInt(elem.css('padding-left')))
								{
									$scope.pos = 6;
									elem.css('cursor', 'w-resize');
								}
								else if (evt.offsetX >= parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
								{
									$scope.pos = 2;
									elem.css('cursor', 'e-resize');
								}
								else
								{
									//$scope.cursorState = 0;
									//console.log($scope.cursorState);
									$scope.pos = -1;
									elem.css('cursor', 'default');
								}
							}
							else
							{
								if (evt.offsetX <= parseInt(elem.css('padding-left'))) 
								{
									$scope.pos = 5;
									elem.css('cursor', 'sw-resize');
								}
								else if (evt.offsetX < parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
								{
									$scope.pos = 4;
									elem.css('cursor', 's-resize');
								}
								else 
								{
									$scope.pos = 3;
									elem.css('cursor', 'se-resize');
								}
							}
						}
						else
						{
							elem.css('cursor', 'default');
						}
					}
				}
				
				function ResizableDown (evt) {
					if(evt.button == 0 && $scope.elem == null)
					{
						$scope.ResizableElem = angular.element(evt.currentTarget);
						$scope.ResizableElem.css('z-index', 9999);
						$scope.elem = null;
					}
				}
				
				function ResizableEnter (evt) {
					$scope.cursorState = 1;
					console.log("resize : " + $scope.cursorState);
					//console.log("ResizableEnter");
				}
				
				function ResizableLeave (evt) {
					//$scope.cursorState = 0;
					//console.log("ResizableLeave");
					angular.element(evt.currentTarget).css('cursor', 'default');
				}
				
				
				$scope.ResizableMove = ResizableMove;
				$scope.ResizableDown = ResizableDown;
				$scope.ResizableEnter = ResizableEnter;
				$scope.ResizableLeave = ResizableLeave;
			}
		}
});
*/