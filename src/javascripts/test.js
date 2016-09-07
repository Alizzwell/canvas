var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope, $element) {
  $scope.content = 'Hello World';
	$scope.arr = [0, 1, 2];
	$scope.curZ = 0;
	$scope.cursorState = 0;
	$scope.pos = 0;
	$scope.ResizableElem = null;
	$scope.resizeStyle = [];
	$scope.btnDelStyle = [];
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
        marker.innerHTML = "●";
        cm.setGutterMarker(n, "breakpoints", marker);  
        $scope.breakp.push(n + 1);
      }
    });
    
    $scope.outputEdit.setValue($scope.data.code);
    markLine(0);

    $scope.data.breakp.forEach(function (bp) {
      var marker = document.createElement("div");
      marker.style.color = "#933";
      marker.innerHTML = "●";
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
	
	function ContentMove(myE) {
		var difX = myE.pageX - $scope.prevX;
		var difY = myE.pageY - $scope.prevY;
		
		if($scope.elem) 
		{
			angular.element($scope.elem).parent().css("left", parseInt($scope.elem.parent().css('left')) + difX+"px");
			angular.element($scope.elem).parent().css("top", parseInt($scope.elem.parent().css('top')) + difY+"px");
		}
		else if ($scope.pos >= 0 && $scope.ResizableElem)
		{
			var elem = angular.element($scope.ResizableElem);
			var delElem = angular.element($scope.ResizableElem.children()[1]);
			var height, width, left, top;
			switch($scope.pos)
			{
				case 0:
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY + "px");
						elem.css('top', parseInt(elem.css('top')) + difY + "px");
					}
					break;
				
				case 1:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY + "px");
						elem.css('top', parseInt(elem.css('top')) + difY + "px");
					}
					break;
					
				case 2:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					break;
				
				case 3:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY + "px");
					}
					break;
				
				case 4:
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY + "px");
					}
					break;
				
				case 5:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX + "px");
						elem.css('left', parseInt(elem.css('left')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY + "px");
					}
					break;
				
				case 6:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX + "px");
						elem.css('left', parseInt(elem.css('left')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					break;
				
				case 7:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX + "px");
						elem.css('left', parseInt(elem.css('left')) + difX + "px");
						delElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css("padding-right")) - parseInt(delElem.css('width')) + "px");
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY + "px");
						elem.css('top', parseInt(elem.css('top')) + difY + "px");
					}
					break;
				
				default:
					elem.css('cursor', 'default');
					$scope.ResizableElem = null;
			}
		}
		
		$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
		$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
	}
	
	function ContentUp (evt) 
	{
		if($scope.ResizableElem)
		{
			angular.element($scope.ResizableElem).css('z-index', ++$scope.curZ);
		}
		
		if($scope.elem)
		{
			angular.element($scope.elem.parent()).css('z-index', ++$scope.curZ);
		}
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function ContentLeave (evt) 
	{
		if($scope.ResizableElem)
		{
			angular.element($scope.ResizableElem).css('z-index', ++$scope.curZ);
		}
		
		if($scope.elem)
		{
			angular.element($scope.elem.parent()).css('z-index', ++$scope.curZ);
		}
		
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function CanvasDown(myE) {
		if(myE.button == 0)
		{
			$scope.elem = angular.element(myE.currentTarget);
			angular.element($scope.elem.parent()).css('z-index', 9999);
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
			$scope.ResizeableElem = null;
		}			
	}
	
	function CanvasEnter (evt) {
		$scope.cursorState = 0;
		angular.element(angular.element(evt.currentTarget).parent()).css('cursor', 'default');
	}
	
	function CanvasLeave(myE) {
		$scope.cursorState = 1;
	}
	
	function ResizableMove (evt) {
		if ($scope.ResizableElem == null)
		{
			var elem = angular.element(evt.currentTarget);
			if ($scope.cursorState)
			{
				if (evt.offsetY <= parseInt(elem.css('padding-top'))) 
				{
					if (evt.offsetX <= parseInt(elem.css('padding-left'))) 
					{
						$scope.pos = 7;
						elem.css('cursor', 'nw-resize');
					}
					else if (evt.offsetX < parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
					{
						$scope.pos = 0;
						elem.css('cursor', 'n-resize');
					}
					else
					{
						$scope.pos = 1;
						elem.css('cursor', 'ne-resize');
					}
				}	
				else if (evt.offsetY < parseInt(elem.css('height')) - parseInt(elem.css('padding-bottom')))
				{
					if (evt.offsetX <= parseInt(elem.css('padding-left')))
					{
						$scope.pos = 6;
						elem.css('cursor', 'w-resize');
					}
					else if (evt.offsetX >= parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
					{
						$scope.pos = 2;
						elem.css('cursor', 'e-resize');
					}
					else
					{
						$scope.cursorState = 0;
						//console.log($scope.cursorState);
						$scope.pos = -1;
						elem.css('cursor', 'default');
					}
				}
				else
				{
					if (evt.offsetX <= parseInt(elem.css('padding-left'))) 
					{
						$scope.pos = 5;
						elem.css('cursor', 'sw-resize');
					}
					else if (evt.offsetX < parseInt(elem.css('width')) - parseInt(elem.css('padding-right')))
					{
						$scope.pos = 4;
						elem.css('cursor', 's-resize');
					}
					else 
					{
						$scope.pos = 3;
						elem.css('cursor', 'se-resize');
					}
				}
			}
			else
			{
				elem.css('cursor', 'default');
			}
		}
	}
	
	function ResizableDown (evt) {
		if(evt.button == 0 && $scope.elem == null)
		{
			$scope.ResizableElem = angular.element(evt.currentTarget);
			$scope.ResizableElem.css('z-index', 9999);
			$scope.elem = null;
		}
	}
	
	function ResizableEnter (evt) {
		$scope.cursorState = 1;
		//console.log("ResizableEnter");
	}
	
	function ResizableLeave (evt) {
		$scope.cursorState = 0;
		//console.log("ResizableLeave");
		angular.element(evt.currentTarget).css('cursor', 'default');
	}
	
	function btnDelClk(Event) {
		angular.element(Event.currentTarget).parent().parent().remove();
	}
	
	function btnTestClk(Event) {
		var elem = angular.element("#resizable1");
		var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
    matches = elem.css('transform').match(matrixRegex);
		console.log(matches);
		if(matches == null || matches[1] == "1")
			elem.css('transform', "scale(0.5)");
		else if (matches[1] == "0.5")
			elem.css('transform', "scale(1)");
	}
  
	function wheelUp(evt) {
		console.log(evt);
	}
  
	function wheelDown(evt) {
		console.log(evt);
	}

	$scope.ContentMove = ContentMove;
	$scope.ContentUp = ContentUp;
	$scope.ContentLeave = ContentLeave;
	$scope.CanvasDown = CanvasDown;
	$scope.CanvasEnter = CanvasEnter;
	$scope.CanvasLeave = CanvasLeave;
	$scope.ResizableMove = ResizableMove;
	$scope.ResizableDown = ResizableDown;
	$scope.ResizableEnter = ResizableEnter;
	$scope.ResizableLeave = ResizableLeave;
	//$scope.initEdit = initEdit;
	$scope.btnDelClk = btnDelClk;
	$scope.btnTestClk = btnTestClk;
	$scope.wheelUp = wheelUp;
	$scope.wheelDown = wheelDown;
  $scope.initOutputEdit = initOutputEdit;
  $scope.btnStepClk = btnStepClk;
  $scope.btnNextClk = btnNextClk;
});

app.directive('myResizable', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 0; idx <= scope.arr.length; idx++)
			{
				if (angular.element(element).attr("id") == 'resizable'+idx) {
					var elem = angular.element(element);
					var delElem = angular.element(element.children()[1]);
					elem.css("top", 400*parseInt((idx / 2))+"px");
					elem.css("width", "600px");
					elem.css("height", "300px");
					elem.css("padding", "10px");
					delElem.css("width", "30px");
					if(idx % 2 == 0)
						elem.css("left", "50px");
					else
						elem.css("left", "800px");
					
					delElem.css("left", parseInt(elem.css("width")) - parseInt(elem.css("padding-right")) - parseInt(delElem.css("width"))+"px");
					delElem.css("top", parseInt(elem.css("padding-top")) + "px");
					scope.minWidth = elem.css("padding-left") + elem.css("padding-right") + delElem.css("width");
					scope.minHeight = elem.css("padding-top") + elem.css("padding-bottom") + delElem.css("height");
				}
			}
    });
  };
}); 

app.directive('myCanvas', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			if(element.attr('id') == 'canvas0') {
				var margin = {top: 40, right: 20, bottom: 30, left: 40},
						width = 580 - margin.left - margin.right,
						height = 280 - margin.top - margin.bottom;


				var x = d3.scale.ordinal()
						.rangeRoundBands([0, width], .1);

				var y = d3.scale.linear()
						.range([height * 0.95, 0]);

				var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");



				var tip = d3.tip()
						.attr('class', 'd3-tip')
						.offset([-12, 0])
						.html(function(d) {
								return "<span style='color:red'>" + d + "</span>";
						})

				var svg = d3.select("#canvas0")
					.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				svg.call(tip);

				var data = [];
				var indexes;
				var duration = 700;

				// chart init
				indexes = [];
				for (var i = 0; i < data.length; i++) {
					indexes.push(i);
				}

				x.domain(indexes);
				y.domain(d3.extent(data));

				svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);

				svg.selectAll(".bar")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d, i) { return x(i); })
						.attr("width", x.rangeBand())
						.attr("y", function(d) { return y(d); })
						.attr("height", function(d) { return height - y(d); })
						.on('mouseover', tip.show)
						.on('mouseout', tip.hide);

				svg.select(".x.axis")
					.selectAll("text")
					.style("font-size", function() { return (width / 80) + "px" });

				// new_data가 undefined인 경우, data를 직접 swap하여 사용한다.
				// new_data가 주어지면 해당 data를 사용한다.
				function swap(i, j, new_data) {
					if (i === j) {
						//console.log("i, j are equal");
						return;
					}
					
					var data_num = svg.selectAll(".bar")
						.data().length;
						
					if (i >= data_num || j >= data_num || i < 0 || j < 0) {
						//console.log("index is not valid");
						return;
					}
					
					if (!new_data) {
						var temp = data[i];
						data[i] = data[j];
						data[j] = temp;
						new_data = data;
					}
					else {
						data = new_data;
					}
					
					var bar = svg.selectAll(".bar");
					bar.style("fill", function(d, idx) {
							if (idx == i || idx == j)
								return "orchid";
						})
						.transition()
						.duration(duration)
						.attr("x", function(d, idx) { 
							if (idx == i)
								return x(j);
							else if (idx == j)
								return x(i);
							else
								return x(idx);
						})
						.call(endall, function() {
							bar.data(new_data)
								.attr("x", function(d, idx) { return x(idx); })
								.attr("y", function(d) { return y(d); })
								.attr("height", function(d) { return height - y(d); })
								.style("fill", "orange");
						});
				}

				function change_canvas_size(w, h) {
					console.log("canvas size changed. width : " + w + ", height : " + h);
					
					width = w - margin.left - margin.right,
						height = h - margin.top - margin.bottom;
					
					x.rangeRoundBands([0, width], .1);
					y.range([height * 0.95, 0]);
					
					xAxis.scale(x);
					
					d3.select("div#canvas").select("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);
						
					svg.select(".x.axis").remove();
						
					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);
						
					svg.select(".x.axis")
						.selectAll("text")
						.style("font-size", function() { return (width / 80) + "px" });

					svg.selectAll(".bar")
						.attr("x", function(d, i) { return x(i); })
						.attr("width", x.rangeBand())
						.attr("y", function(d) { return y(d); })
						.attr("height", function(d) { return height - y(d); });
				};

				 function endall(transition, callback) { 
						if (!callback) callback = function(){};
						if (transition.size() === 0) { callback() }
						var n = 0; 
						transition 
								.each(function() { ++n; }) 
								.each("end", function() { if (!--n) callback.apply(this); }); 
				} 


				function resize(size) {
					var temp = [];
					for (var i = 0; i < size; i++) {
						temp[i] = data[i];
						if (!temp[i]) temp[i] = 0;
					}
					data = temp;
					var indexes;
					var duration = 700;

					// chart init
					indexes = [];
					for (var i = 0; i < data.length; i++) {
						indexes.push(i);
					}

					x.domain(indexes);
					y.domain(d3.extent(data));


					svg.select(".x.axis").remove();
						
					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);

					svg.select(".x.axis")
						.selectAll("text")
						.style("font-size", function() { return (width / 80) + "px" }); 


					svg.selectAll(".bar").remove();

					svg.selectAll(".bar")
						.data(data)
						.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d, i) { return x(i); })
						.attr("width", x.rangeBand())
						.attr("y", function(d) { return y(d); })
						.attr("height", function(d) { return height - y(d); })
						.on('mouseover', tip.show)
						.on('mouseout', tip.hide);
				}

				resize(5);
				function setData(idx, value) {
					data[idx] = value;
					y.domain(d3.extent(data));

					var bar = svg.selectAll(".bar");
					bar.data(data)
						.transition()
						.duration(300)
						.attr("x", function(d, idx) { return x(idx); })
						.attr("y", function(d) { return y(d); })
						.attr("height", function(d) { return height - y(d); })
						.style("fill", "orange");
				}

				function highlight(idx) {
					var bar = svg.selectAll(".bar");
					bar.data(data)
						.style("fill", function (d, i) {
							if (i == idx) return 'red';
							return 'orange';
						}); 
				}
			}
			
			if (element.attr('id') == 'canvas1')
			{
				var now = d3.time.year.floor(new Date());
 
				var spacetime = d3.select('#canvas1');
				var width = 960,
						height = 500,
						radius = Math.min(width, height);
				 
				var radii = {
					"sun": radius / 8,
					"earthOrbit": radius / 2.5,
					"earth": radius / 32,
					"moonOrbit": radius / 16,
					"moon": radius / 96
				};
				 
				// Space
				var svg = spacetime.append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
						.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
				 
				// Sun
				svg.append("circle")
					.attr("class", "sun")
					.attr("r", radii.sun)
					.style("fill", "rgba(255, 204, 0, 1.0)");
				 
				// Earth's orbit
				svg.append("circle")
					.attr("class", "earthOrbit")
					.attr("r", radii.earthOrbit)
					.style("fill", "none")
					.style("stroke", "rgba(255, 204, 0, 0.25)");
				 
				// Current position of Earth in its orbit
				var earthOrbitPosition = d3.svg.arc()
					.outerRadius(radii.earthOrbit + 1)
					.innerRadius(radii.earthOrbit - 1)
					.startAngle(0)
					.endAngle(0);
				svg.append("path")
					.attr("class", "earthOrbitPosition")
					.attr("d", earthOrbitPosition)
					.style("fill", "rgba(255, 204, 0, 0.75)");
				 
				// Earth
				svg.append("circle")
					.attr("class", "earth")
					.attr("r", radii.earth)
					.attr("transform", "translate(0," + -radii.earthOrbit + ")")
					.style("fill", "rgba(113, 170, 255, 1.0)");
				 
				// Time of day
				var day = d3.svg.arc()
					.outerRadius(radii.earth)
					.innerRadius(0)
					.startAngle(0)
					.endAngle(0);
				svg.append("path")
					.attr("class", "day")
					.attr("d", day)
					.attr("transform", "translate(0," + -radii.earthOrbit + ")")
					.style("fill", "rgba(53, 110, 195, 1.0)");
				 
				// Moon's orbit
				svg.append("circle")
					.attr("class", "moonOrbit")
					.attr("r", radii.moonOrbit)
					.attr("transform", "translate(0," + -radii.earthOrbit + ")")
					.style("fill", "none")
					.style("stroke", "rgba(113, 170, 255, 0.25)");
				 
				// Current position of the Moon in its orbit
				var moonOrbitPosition = d3.svg.arc()
					.outerRadius(radii.moonOrbit + 1)
					.innerRadius(radii.moonOrbit - 1)
					.startAngle(0)
					.endAngle(0);
				svg.append("path")
					.attr("class", "moonOrbitPosition")
					.attr("d", moonOrbitPosition)
					.attr("transform", "translate(0," + -radii.earthOrbit + ")")
					.style("fill", "rgba(113, 170, 255, 0.75)");
				 
				// Moon
				svg.append("circle")
					.attr("class", "moon")
					.attr("r", radii.moon)
					.attr("transform", "translate(0," + (-radii.earthOrbit + -radii.moonOrbit) + ")")
					.style("fill", "rgba(150, 150, 150, 1.0)");
				 
				// Update the clock every second
				setInterval(function () {
					now = new Date();
					
					var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), (2 * Math.PI * d3.time.hours(d3.time.year.floor(now), now).length / d3.time.hours(d3.time.year.floor(now), d3.time.year.ceil(now)).length));
					
					var interpolateDay = d3.interpolate(day.endAngle()(), (2 * Math.PI * d3.time.seconds(d3.time.day.floor(now), now).length / d3.time.seconds(d3.time.day.floor(now), d3.time.day.ceil(now)).length));
					
					var interpolateMoonOrbitPosition = d3.interpolate(moonOrbitPosition.endAngle()(), (2 * Math.PI * d3.time.hours(d3.time.month.floor(now), now).length / d3.time.hours(d3.time.month.floor(now), d3.time.month.ceil(now)).length));
					
					d3.transition().tween("orbit", function () {
						return function (t) {
							// Animate Earth orbit position
							d3.select(".earthOrbitPosition")
								.attr("d", earthOrbitPosition.endAngle(interpolateEarthOrbitPosition(t)));
				 
							// Transition Earth
							d3.select(".earth")
								.attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
				 
							// Animate day
							// Transition day
							d3.select(".day")
								.attr("d", day.endAngle(interpolateDay(t)))
								.attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
							
							// Transition Moon orbit
							d3.select(".moonOrbit")
								.attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
				 
							// Animate Moon orbit position
							// Transition Moon orbit position
							d3.select(".moonOrbitPosition")
								.attr("d", moonOrbitPosition.endAngle(interpolateMoonOrbitPosition(t)))
								.attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
							
							// Transition Moon
							d3.select(".moon")
								.attr("transform", "translate(" + (radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + radii.moonOrbit * Math.sin(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + "," + (-radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + -radii.moonOrbit * Math.cos(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + ")");
						};
					});
				}, 1000);
			}
			
			if (element.attr('id') == 'canvas3')
			{
				
			}
			if (element.attr('id') == 'canvas4')
			{
				
			}
			if (element.attr('id') == 'canvas5')
			{
				
			}
			
    });
  };
});


