var app = angular.module('myApp', ['canvas.ctrl']);

app.controller('MainCtrl', function($scope, $element, $document) {
	$scope.arr = [0, 1, 2];
	$scope.cursorState = 0;
	$scope.curZ = 1;
	$scope.pos = 0;
	
	$document.on('mousedown', function(event) {
    // Prevent default dragging of selected content
    event.preventDefault();
		console.log($scope.cursorState);
  });
});




