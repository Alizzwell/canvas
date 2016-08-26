angular.module('algorithms.add', 
  ['algorithms.category', 'ui.bootstrap', 'ngAnimate', 'ui.codemirror'])

.controller('AddCtrl', function($scope, $http, categorys) {

  $scope.categorys = categorys;
  $scope.category = categorys[0];
  $scope.algorithms = [];

  $scope.inputEdit = undefined;
  $scope.mode = 'text/x-csrc'
  $scope.breakp = [];

  $scope.subject = "";
  $scope.input = "";

  $scope.thumb = "/images/thumb/add.jpg";

	$('#slider').slideReveal({
	  trigger: $("#trigger")
	});

  function dropboxitemselected(item) {
    $scope.category = item;
  }
	
	function getAlgorithmList() {
    $http({
      method: 'GET',
      url: '/api/algorithms'
    }).then(function successCallback(res) {
      // TODO: error handle
      $scope.algorithms = res.data;
    }, function errorCallback(res) {
      // TODO: error handle
    });
  }

  function initInputEdit() {
    $scope.inputEdit = CodeMirror.fromTextArea(document.getElementById("inputEdit"), {
      indentWithTabs: true,
      mode: $scope.mode,
      styleActiveLine: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints"]
    });

    $scope.inputEdit.on("gutterClick", function(cm, n) {
      var info = cm.lineInfo(n);
      
      if (!info) {
        return;
      }

      if (info.gutterMarkers) {
        cm.setGutterMarker(n, "breakpoints", null);  
      }
      else {
        var marker = document.createElement("div");
        marker.style.color = "#933";
        marker.innerHTML = "●";
        cm.setGutterMarker(n, "breakpoints", marker);  
      }
    });
  }

  function uploadThumbFile(files) {
    var formdata = new FormData();
    formdata.append("thumb", files[0]);
    $http.post('/api/image_upload', formdata, {
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity

    }).success(function (res) {
      $scope.thumb = res.image_file_name;
    }).error(function () {
      console.log("err");
      // TODO: error handler
    });
  }

  function btnCreateClk() {
			$scope.breakp = [];
			for (var i = 0; i < $scope.inputEdit.lineCount(); i++)
			{
				if($scope.inputEdit.lineInfo(i).gutterMarkers)
				{
					$scope.breakp.push(i + 1);
				}
			}
			
      var dataObject = {
        "category": $scope.category.id,
        "subject": $scope.subject,
        "inputData": $scope.input,
        "targets": $scope.target,
        "code": $scope.inputEdit.getValue(),
        "image_file_name": $scope.thumb,
        "breaks": $scope.breakp
      };

      $http({
        method: 'POST',
        url: '/api/algorithms/',
        data: dataObject,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      })
      .success(function(data, status) {
        document.location.href = "/algorithms";
      })
      .error(function(data, status) {
        // TODO: error handler
      });
  }

  function btnHomeClk() {
    document.location.href = "/algorithms";
  }
	
	function btnLangClk() {
    $scope.inputEdit.setOption("mode", $scope.mode);
  }

	$scope.btnLangClk = btnLangClk;
  $scope.dropboxitemselected = dropboxitemselected;
  $scope.initInputEdit = initInputEdit;
  $scope.uploadThumbFile = uploadThumbFile;
  $scope.btnCreateClk = btnCreateClk;
  $scope.btnHomeClk = btnHomeClk;
  $scope.getAlgorithmList = getAlgorithmList;

})
.directive('ngFiles', ['$parse', function ($parse) {
  
  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };
  return {
    link: fn_link
  };
}]);
