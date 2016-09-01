var app = angular.module('myApp', ['mc.resizer']);

app.controller('MainCtrl', function($scope, $element) {
  $scope.content = 'Hello World';
	$scope.arr = [1, 2, 3];
	$scope.curZ = 0;
	$scope.cursorState = 0;
	$scope.pos = 0;
	$scope.ResizableElem = null;

	function initEdit() {
    $scope.Edit = CodeMirror.fromTextArea(document.getElementById("Edit"), {
      indentWithTabs: true,
      mode: $scope.mode,
      styleActiveLine: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints"]
    });

    $scope.Edit.on("gutterClick", function(cm, n) {
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
	
	function ContentMove(myE) {
		var difX = myE.pageX - $scope.prevX;
		var difY = myE.pageY - $scope.prevY;
		
		if($scope.elem) 
		{
			$scope.elem.parent().css('left', parseInt($scope.elem.parent().css('left')) + difX);
			$scope.elem.parent().css('top', parseInt($scope.elem.parent().css('top')) + difY);
		}
		else if ($scope.pos >= 0 && $scope.ResizableElem)
		{
			var elem = $scope.ResizableElem;
			var height, width, left, top;
			switch($scope.pos)
			{
				case 0:
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
				
				case 1:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
					
				case 2:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					break;
				
				case 3:
					if(parseInt(elem.css('width')) + difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 4:
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 5:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					if(parseInt(elem.css('height')) + difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) + difY);
					}
					break;
				
				case 6:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					break;
				
				case 7:
					if(parseInt(elem.css('width')) - difX >= 50)
					{
						elem.css('width', parseInt(elem.css('width')) - difX);
						elem.css('left', parseInt(elem.css('left')) + difX);
						var btnElem = angular.element(elem.children().children()[0]);
						btnElem.css('left', parseInt(elem.css('width')) - parseInt(elem.css('padding-right')) - parseInt(btnElem.css('width')));
					}
					if(parseInt(elem.css('height')) - difY >= 50)
					{
						elem.css('height', parseInt(elem.css('height')) - difY);
						elem.css('top', parseInt(elem.css('top')) + difY);
					}
					break;
				
				default:
					$scope.ResizableElem.css('cursor', 'default');
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
			$scope.ResizableElem.css('z-index', ++$scope.curZ);
		}
		
		if($scope.elem)
		{
			$scope.elem.parent().css('z-index', ++$scope.curZ);
		}
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function ContentLeave (evt) 
	{
		if($scope.ResizableElem)
		{
			$scope.ResizableElem.css('z-index', ++$scope.curZ);
		}
		
		if($scope.elem)
		{
			$scope.elem.parent().css('z-index', ++$scope.curZ);
		}
		
		$scope.elem = null;
		$scope.ResizableElem = null;
	}
	
	function CanvasDown(myE) {
		if(myE.button == 0)
		{
			$scope.elem = angular.element(myE.currentTarget);
			$scope.elem.parent().css('z-index', 9999);
			$scope.prevX = JSON.parse(JSON.stringify(myE.pageX));
			$scope.prevY = JSON.parse(JSON.stringify(myE.pageY));
			$scope.ResizeableElem = null;
		}			
	}
	
	function CanvasEnter (evt) {
		$scope.cursorState = 0;
		angular.element(evt.currentTarget).parent().css('cursor', 'default');
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
	}
	
	function ResizableLeave (evt) {
		$scope.cursorState = 0;
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
	$scope.initEdit = initEdit;
	$scope.btnDelClk = btnDelClk;
	$scope.btnTestClk = btnTestClk;
	$scope.wheelUp = wheelUp;
	$scope.wheelDown = wheelDown;
});

app.directive('myResizable', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			for(var idx = 1; idx <= scope.arr.length; idx++)
			{
				if (element.attr('id') == 'resizable'+idx) {
					if(idx % 2)
					{
						element.css('left', '50px');
						element.css('top', 400*parseInt(((idx - 1) / 2))+'px');
					}
					else
					{
						element.css('left', '800px');
						element.css('top', 400*parseInt(((idx - 1) / 2))+'px');
					}
					
					var btnElem = angular.element(element.children().children()[0]);
					btnElem.css('left', parseInt(element.css('width')) - parseInt(btnElem.css('width')) - parseInt(element.css('padding-right')));
					btnElem.css('top', parseInt(element.css('padding-top')));
				}
			}
    });
  };
}); 

app.directive('myCanvas', function () {
  return function (scope, element, attrs) {
		element.ready(function () {
			if(element.attr('id') == 'canvas1') {
				var node_number = 0;
				var link_number = 0;

				var width = parseInt(element.css("width")),
						height = parseInt(element.css("height"));

				var radius = 30;

				var is_directed_array = true;

				var	force = d3.layout.force()
					.charge(-3000)
					.linkStrength(0.5)
					.linkDistance(100)
					.size([width, height])
					.links([])	
					.nodes([])
					.start();

					
				var nodes = [];
				var links = [];

				var svgContainer = d3.select("#canvas1")
					.append("svg")
					.attr("top", "0px")
					.attr("left", "0px")
					.attr("width", width)
					.attr("height", height);
	
				var getID = function(val) { 
					return document.getElementById(val);
				};
						
				function redraw() { 
					var link;
					var linktext;
					
					link = svgContainer.selectAll('path')
					.data(links);
						
					link
					.enter()
					.insert('path', '.node')
					.attr("class", "link")
					.attr("id", function(d) { return d.id ; });
					
					linktext = svgContainer.selectAll(".linktext")
					.data(links);
					
					linktext
					.enter()
					.insert("text")
					.attr("class", "linktext")
					.text(function(d) {
						if(d.link_value != null) { return d.link_value; }
						else return 0;
					});

				//		directed_link.enter().insert('path', '.node').attr("class", "link");

					var node;
					var nodetext;
					node = svgContainer.selectAll(".node")
					.data(nodes);
					
					node
					.enter()
					.insert("circle")
					.attr("class", "node")
					.attr("id", function(d) {return d.id;})
					.attr("r", radius)
					.call(force.drag)

							
					nodetext = svgContainer.selectAll(".nodetext")
					.data(nodes);
					
					nodetext
					.enter()
					.insert("text")
					.attr("class", "nodetext")
					.text(function(d) { return d.node_number; });
						
					force
					.nodes(nodes)
					.links(links)
					.on("tick", function() {	
							link.attr("d", function(d) {
								var dx = d.target.x - d.source.x,
									dy = d.target.y - d.source.y,
									dx = dx * 3, dy = dy * 3,
									dr = Math.sqrt(dx * dx + dy * dy),
									theta = Math.atan2(dy, dx) + Math.PI / 26.55,
									d90 = Math.PI / 2,
									dtxs = d.target.x - 1.22 * radius * Math.cos(theta),
									dtys = d.target.y - 1.22 * radius * Math.sin(theta);
									var val1 = 3.5, val2 = 10.5;
									return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0 1," + d.target.x + "," + d.target.y + "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y + "M" + dtxs + "," + dtys +  "l" + (val1 * Math.cos(d90 - theta) - val2 * Math.cos(theta)) + "," + (-val1 * Math.sin(d90 - theta) - val2 * Math.sin(theta)) + "L" + (dtxs - val1 * Math.cos(d90 - theta) - val2 * Math.cos(theta)) + "," + (dtys + val1 * Math.sin(d90 - theta) - val2 * Math.sin(theta)) + "z";
									//return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "M" + dtxs + "," + dtys +  "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
							});
							linktext.attr("transform", function(d){ 
								var dx = d.target.x - d.source.x,
								dy = d.target.y - d.source.y,
								dx = dx * 3, dy = dy * 3,
								dr = Math.sqrt(dx * dx + dy * dy),
								theta = Math.atan2(dy, dx) + Math.PI / 11.95,	
								d90 = Math.PI / 2,
								dtxs = d.target.x - 3 * radius * Math.cos(theta),
								dtys = d.target.y - 3 * radius * Math.sin(theta);
								return 'translate(' + [dtxs, dtys] + ')' ; 
							});
							node.attr("transform", function(d) { return 'translate(' + [d.x , d.y] + ')' ; })
								.attr("x", function(d) { return d.x })
								.attr("y", function(d) { return d.y});
							
							nodetext.attr("transform", function(d) { return 'translate(' + [d.x, d.y + 10] + ')' ; });
						})
					.start();	
					
					link.exit().remove();
					linktext.exit().remove();
					node.exit().remove();
					nodetext.exit().remove();
				}




				var makeNode = function(id){
					if(getID("node_"+id) === null) {
						node_number = node_number + 1;
						nodes.push({ id : "node_" + (id), node_number : id});
						redraw();
					}
				}

				var makeEdge = function(source, target, value){
					var i;
					var s_node, t_node;
					
					for(i = 0; i < node_number; i++) {
						if(nodes[i].node_number === source) s_node = nodes[i];
						if(nodes[i].node_number === target) t_node = nodes[i];
					}
					
					
					var edge = getID("link_" + source + "_" + target);
					if(edge === null){
						links.push({ id : "link_" + source + "_" + target, source : s_node, target : t_node, link_value : value, is_directed_array : false });
						link_number++;
						redraw();
					}
					else{
						for(i=0;i<link_number;i++){
							if(links[i].source.node_number === source && links[i].target.node_number === target){
								links[i].link_value = value;
								var _links = links;
								links = [];
								redraw();
								links = _links;
								redraw();
							}
						}
					}
				}
				
				var removeNode = function(id){
					var i ;
					
					for(i = 0; i < node_number; i++){
						if(nodes[i].node_number === id){
							nodes.splice(i, 1);
							break;
						}
					}
					for(i=0;i<link_number; i++){
						if(links[i].source.node_number === id) { links.splice(i, 1); i--; link_number--; }
						else if(links[i].target.node_number === id) { links.splice(i, 1); i--; link_number--; } 
					}

					var _nodes = nodes;
					var _links = links;
					
					nodes = [];
					links = [];
					redraw();

					nodes = _nodes;
					links = _links;
					redraw();
					node_number--;
					

				}

				var removeEdge = function(source, target){
					var i;
					for (i = 0; i < link_number; i++){
						if(links[i].id === "link_" + source + "_" + target){
							links.splice(i, 1);
							break;
						}
					}

					var _links = links;
					links = [];
					redraw();
					
					links = _links;
					redraw();
					link_number--;
				}



				var highLightNode = function(id){ 
					var node = d3.select("#node_" + id);
					if(node != null) { 
						node.transition().duration(500).style("fill", "red");
					}
				}

				var highLightEdge = function(source, target){
					var edge = d3.select("#link_" + source +"_"+target);
					if(edge != null) { 
						edge.transition().duration(500).style("stroke", "red");
					}
				}

				var unHighLightNode = function(id) { 
					var node = d3.select("#node_" + id);
					if(node != null) { 
						node.transition().duration(500).style("fill", "black");
					}
				}
				var unHighLightEdge = function(source, target){
					var edge = d3.select("#link_" + source +"_"+target);
					if(edge != null) { 
						edge.transition().duration(500).style("stroke", "#999");
					}
				}

				var unHighLightAll = function(){
					var i;
					for(i=0;i<node_number;i++){
						unHighLightNode(nodes[i].node_number);
					}

					for(i=0;i<link_number;i++){
						unHighLightEdge(links[i].source.node_number, links[i].target.node_number);
					}
				}


				makeNode(1);
				makeNode(2);
				makeNode(3);
				makeNode(4);
				highLightNode(4);
				makeEdge(1, 2, '');
				makeEdge(2, 3, 2);
				makeEdge(2, 4, 3);
				makeEdge(4, 2, 4);
				highLightEdge(3, 4);
				highLightEdge(2, 4);
			}
			
			if (element.attr('id') == 'canvas2')
			{
				var now = d3.time.year.floor(new Date());
 
				var spacetime = d3.select('#canvas2');
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


