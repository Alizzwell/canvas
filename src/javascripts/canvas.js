var app = angular.module('myApp', ['draggable', 'resizable', 'collapse']);

app.controller('MainCtrl', function($scope, $element, $document) {
	$scope.arr = [
		{index: 0, isSelect: 0}, 
		{index: 1, isSelect: 1}, 
		{index: 2, isSelect: 0}
	];
	$scope.cursorState = 0;
	$scope.curZ = 1;
	$scope.pos = 0;
});
