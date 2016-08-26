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
			if($scope.elem) 
			{
				$scope.elem.parent().css('left', parseInt($scope.elem.parent().css('left')) + myE.pageX - $scope.prevX);
				$scope.elem.parent().css('top', parseInt($scope.elem.parent().css('top')) + myE.pageY - $scope.prevY);
			}
			
			if ($scope.pos >= 0 && $scope.ResizableElem)
			{
				var elem = $scope.ResizableElem;
				switch($scope.pos)
				{
					case 0:
						console.log(elem.css('height'));
						//elem.css('height', parseInt(elem.css('height')) + myE.pageY - $scope.prevY);
						break;
					
					case 1:
					
						break;
						
					case 2:
					
						break;
					
					case 3:
					
						break;
					
					case 4:
					
						break;
					
					case 5:
					
						break;
					
					case 6:
					
						break;
					
					case 7:
					
						break;
					
					default:
						$scope.ResizableElem.css('cursor', 'default');
						$scope.ResizableElem = null;
						
				}
			}
			
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
	}
	
	function CanvasDown(myE) {
		if($scope.elem == null)
		{
			$scope.elem = angular.element(myE.currentTarget);
			$scope.elem.css('z-index', 9999);
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
		}
	}
	
	function CanvasUp(myE) {
		if($scope.elem)
		{
			$scope.elem.css('z-index', ++$scope.curZ);
			$scope.elem = null;
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
		}
	}
	
	function CanvasEnter (evt) {
		$scope.cursorState = 0;
		angular.element(evt.currentTarget).parent().css('cursor', 'default');
	}
	
	function CanvasLeave(myE) {
		$scope.cursorState = 1;
		if($scope.elem)
		{
			$scope.elem.css('z-index', ++$scope.curZ);
			$scope.elem = null;
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
		}
	}
	
	function ResizableMove (evt) {
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
	
	function ResizableDown (evt) {
		if($scope.pos >= 0)
			$scope.ResizableElem = angular.element(evt.currentTarget);
	}
	
	function ResizableUp (evt) {
		$scope.ResizableElem = null;
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

	$scope.ContentMove = ContentMove;
	$scope.CanvasUp = CanvasUp;
	$scope.CanvasDown = CanvasDown;
	$scope.CanvasEnter = CanvasEnter;
	$scope.CanvasLeave = CanvasLeave;
	$scope.ResizableMove = ResizableMove;
	$scope.ResizableDown = ResizableDown;
	$scope.ResizableUp = ResizableUp;
	$scope.ResizableEnter = ResizableEnter;
	$scope.ResizableLeave = ResizableLeave;
	$scope.initEdit = initEdit;
	$scope.btnDelClk = btnDelClk;
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


