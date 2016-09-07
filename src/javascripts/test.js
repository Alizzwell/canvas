var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope, $element) {
	$scope.arr = [0, 1, 2];
	$scope.curZ = 0;
	$scope.cursorState = 0;
	$scope.pos = 0;
	$scope.ResizableElem = null;
	
	function ContentMove(myE) {
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
		$scope.cursorState = 0;
		angular.element(angular.element(evt.currentTarget).parent()).css('cursor', 'default');
	}
	
	function CanvasLeave(myE) {
		$scope.cursorState = 1;
	}
	
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
						$scope.cursorState = 0;
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
		//console.log("ResizableEnter");
	}
	
	function ResizableLeave (evt) {
		$scope.cursorState = 0;
		//console.log("ResizableLeave");
		angular.element(evt.currentTarget).css('cursor', 'default');
	}
	
	function btnDelClk(Event) {
		angular.element(Event.currentTarget).parent().parent().remove();
	}
	
	function btnTestClk(Event) {
		var elem = angular.element("#resizable1");
		var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
    matches = elem.css('transform').match(matrixRegex);
		console.log(matches);
		if(matches == null || matches[1] == "1")
			elem.css('transform', "scale(0.5)");
		else if (matches[1] == "0.5")
			elem.css('transform', "scale(1)");
	}
	
	$scope.ContentMove = ContentMove;
	$scope.ContentUp = ContentUp;
	$scope.ContentLeave = ContentLeave;
	$scope.CanvasDown = CanvasDown;
	$scope.CanvasEnter = CanvasEnter;
	$scope.CanvasLeave = CanvasLeave;
	$scope.ResizableMove = ResizableMove;
	$scope.ResizableDown = ResizableDown;
	$scope.ResizableEnter = ResizableEnter;
	$scope.ResizableLeave = ResizableLeave;
	$scope.btnDelClk = btnDelClk;
	$scope.btnTestClk = btnTestClk;
});

app.directive('myResizable', function () {
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

app.directive('myCanvas', function () {
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


