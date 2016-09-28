var app = angular.module('collapse', []);

app.directive('myCollapse', function() {
  return function(scope, element, attr) {
		element.ready(function () {
			function delClk(Event) {
				angular.element(element.parent()).remove();
			}
			
			element.prepend("<img src='./collapse.png' class='del' ng-disabled='selectDisabled'/>")
				
			angular.element(element.children()[0]).on('click', delClk);
		});
  };
});
