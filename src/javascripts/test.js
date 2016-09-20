var app = angular.module('myApp', ['draggable', 'resizable', 'collapse']);

app.controller('MainCtrl', function($scope, $element, $document) {
	console.log(angular.element($document[0].body).css('cursor'));
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




