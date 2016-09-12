var app = angular.module('myApp', ['canvas.ctrl']);

app.controller('MainCtrl', function($scope, $element) {
	$scope.arr = [0, 1, 2];
	
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


