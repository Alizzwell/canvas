;(function (angluar) {
  var app = angular.module('ui.flubber');

  app.directive('flubberCollapse', function() {
    return function(scope, element, attr) {
  		element.ready(function () {
  			function colClk(evt) {
  				element.remove();
  			}

  			function mouseDown() {
  				var children = element.children();
  				var colElem = null;
  				for(var idx = 0; idx < children.length; idx++)
  				{
  					if(children[idx].className == "del")
  						colElem = angular.element(children[idx]);
  				}

  				if(colElem == null)
  				{
  					if (scope.$parent.colElem != null)
  						scope.$parent.colElem.remove();
  					element.prepend("<div class='del' ng-disabled='selectDisabled'/>")
  					colElem = angular.element(element.children()[0]);
  					scope.$parent.colElem = colElem;
  					colElem.css("width", "30px");
  					colElem.css("left", parseInt(element.css("width")) - parseInt(element.css("padding")) - parseInt(colElem.css("width")) + "px");
  					colElem.on('click', colClk);
  				}
  			}
  			element.on('mousedown', mouseDown);
  		});
    };
  });
})(angular);
