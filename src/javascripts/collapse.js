var app = angular.module('collapse', []);

app.directive('myCollapse', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
			function delClk(Event) {
				element.parent().remove();
			}
				
			element.on('click', delClk);
    }
  };
}]);