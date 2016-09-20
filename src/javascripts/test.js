var app = angular.module('myApp', ['draggable', 'resizable', 'collapse']);

app.controller('MainCtrl', function($scope, $element, $document) {
	$scope.arr = [0, 1, 2];
	$scope.cursorState = 0;
	$scope.curZ = 1;
	$scope.pos = 0;
	
});




