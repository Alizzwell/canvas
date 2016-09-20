var app = angular.module('collapse', []);

app.directive('myCollapse', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
			function delClk(Event) {
				element.remove();
			}
			
			element.prepend('<img id="del{{k}}" src="./collapse.png" class="del" ng-disabled="selectDisabled"/>')
				
			angular.element(element.children()[0]).on('click', delClk);
    }
  };
}]);