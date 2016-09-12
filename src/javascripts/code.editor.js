;(function (angular) {
  'use strict';
  
  var app = angular.module('myApp', []);
	
	app.controller('EditCtrl', function($scope) {
		$scope.curStep = 0;
		
		function initOutputEdit() {
			$scope.outputEdit = CodeMirror.fromTextArea(document.getElementById("outputEdit"), {
				indentWithTabs: true,
				mode: $scope.mode,
				lineNumbers: true,
				lineWrapping: true,
				styleSelectedText: true,
				readOnly: true,
				gutters: ["CodeMirror-linenumbers", "breakpoints"]
			});

			$scope.outputEdit.on("gutterClick", function(cm, n) {
				var info = cm.lineInfo(n);
				
				if (!info) {
					return;
				}

				if (info.gutterMarkers) {
					cm.setGutterMarker(n, "breakpoints", null);  
					var pos = $scope.breakp.indexOf(n + 1);
					$scope.breakp.remove(pos, pos);
				}
				else {
					var marker = document.createElement("div");
					marker.style.color = "#933";
					marker.innerHTML = "¡Ü";
					cm.setGutterMarker(n, "breakpoints", marker);  
					$scope.breakp.push(n + 1);
				}
			});
			
			$scope.outputEdit.setValue($scope.data.code);
			markLine(0);

			$scope.data.breakp.forEach(function (bp) {
				var marker = document.createElement("div");
				marker.style.color = "#933";
				marker.innerHTML = "¡Ü";
				$scope.outputEdit.setGutterMarker(bp - 1, "breakpoints", marker);
			});
		}
		
		function btnStepClk() {
			for (var i = $scope.curLine + 1; i < $scope.outputEdit.lineCount(); i++)
			{
				if($scope.outputEdit.lineInfo(i).gutterMarkers)
				{
					$scope.curLine = i - 1;
					markLine($scope.curLine - 1);
					break;
				}
			}
		}
		
		function btnNextClk() {
			//markLine(++$scope.curLine);
			markLine($scope.data.info[$scope.curStep][0] - 1);
			console.log($scope.data.info[$scope.curStep++]);
		}
		
		var markText;
		
		function markLine(n) {
			if (markText) markText.clear();
			markText = $scope.outputEdit.markText({line: n, ch: 0}, {line: n}, {className: "styled-background"});
			$scope.outputEdit.setCursor(n);
		}
		
		$scope.initOutputEdit = initOutputEdit;
		$scope.btnStepClk = btnStepClk;
		$scope.btnNextClk = btnNextClk;
	});

})(angular);