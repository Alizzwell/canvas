var app = angular.module('myApp', ['mc.resizer']);

app.controller('MainCtrl', function($scope, $element) {
  $scope.content = 'Hello World';
	$scope.arr = [1, 2, 3, 4, 5];
	$scope.curZ = 0;
	$scope.cursorState = 0;
	$scope.pos = 0;
	$scope.ResizableElem = null;

	function initEdit() {
    $scope.Edit = CodeMirror.fromTextArea(document.getElementById("Edit"), {
      indentWithTabs: true,
      mode: $scope.mode,
      styleActiveLine: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints"]
    });

    $scope.Edit.on("gutterClick", function(cm, n) {
      var info = cm.lineInfo(n);
      
      if (!info) {
        return;
      }

      if (info.gutterMarkers) {
        cm.setGutterMarker(n, "breakpoints", null);  
      }
      else {
        var marker = document.createElement("div");
        marker.style.color = "#933";
        marker.innerHTML = "●";
        cm.setGutterMarker(n, "breakpoints", marker);  
      }
    });
  }
	
	function ContentMove(myE) {
		var difX = myE.pageX - $scope.prevX;
		var difY = myE.pageY - $scope.prevY;
		if($scope.elem) 
		{
			$scope.elem.parent().css('left', parseInt($scope.elem.parent().css('left')) + difX);
			$scope.elem.parent().css('top', parseInt($scope.elem.parent().css('top')) + difY);
		}
		else if ($scope.pos >= 0 && $scope.ResizableElem)
		{
			var elem = $scope.ResizableElem;
			var height, width, left, top;
			switch($scope.pos)
			{
				case 0:
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
				
				case 1:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) + difX);
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
					
				case 2:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) + difX);
					}
					break;
				
				case 3:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) + difX);
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 4:
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 5:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) - difX);
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 6:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) - difX);
					}
					break;
				
				case 7:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						var btnElem = angular.element(elem.children().children()[1]);
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						btnElem.css('left', parseInt(btnElem.css('left')) - difX);
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
				
				default:
					$scope.ResizableElem.css('cursor', 'default');
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
			$scope.ResizableElem.css('z-index', ++$scope.curZ);
		}
		
		if($scope.elem)
		{
			$scope.elem.parent().css('z-index', ++$scope.curZ);
		}
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function ContentLeave (evt) 
	{
		if($scope.ResizableElem)
		{
			$scope.ResizableElem.css('z-index', ++$scope.curZ);
		}
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function CanvasDown(myE) {
		$scope.elem = angular.element(myE.currentTarget);
		$scope.elem.parent().css('z-index', 9999);
		$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
		$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
		$scope.ResizeableElem = null;
	}
	
	function CanvasEnter (evt) {
		$scope.cursorState = 0;
		angular.element(evt.currentTarget).parent().css('cursor', 'default');
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
		if($scope.cursorState && $scope.pos >= 0)
		{
			$scope.ResizableElem = angular.element(evt.currentTarget);
			$scope.ResizableElem.css('z-index', 9999);
			$scope.elem = null;
		}
	}
	
	function ResizableEnter (evt) {
		$scope.cursorState = 1;
	}
	
	function ResizableLeave (evt) {
		$scope.cursorState = 0;
		angular.element(evt.currentTarget).css('cursor', 'default');
	}
	
	function btnDelClk(Event) {
		angular.element(Event.currentTarget).parent().parent().remove();
	}
  
	function wheelUp(evt) {
		console.log(evt);
	}
  
	function wheelDown(evt) {
		console.log(evt);
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
	$scope.initEdit = initEdit;
	$scope.btnDelClk = btnDelClk;
	$scope.wheelUp = wheelUp;
	$scope.wheelDown = wheelDown;
});

app.directive('myCanvas', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 1; idx <= scope.arr.length; idx++)
			{
				if (element.attr('id') == 'resizable'+idx) {
					if(idx % 2)
					{
						element.css('left', '50px');
						element.css('top', 400*parseInt(((idx - 1) / 2))+'px');
					}
					else
					{
						element.css('left', '800px');
						element.css('top', 400*parseInt(((idx - 1) / 2))+'px');
					}
					
					var btnElem = angular.element(element.children().children()[1]);
					btnElem.css('left', parseInt(element.css('width')) - parseInt(btnElem.css('width')) - parseInt(element.css('padding-right')));
					btnElem.css('top', parseInt(element.css('padding-top')));
				}
			}
    });
  };
});


