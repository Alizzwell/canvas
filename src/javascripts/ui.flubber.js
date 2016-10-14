;(function (angular) {
	var app = angular.module('ui.flubber', []);

	app.value('flubberCommon', {
		curZ: 0,
		collapseElem: null,
		dragElem: null,
		resizeElem: {n:null, ne:null, e:null, se:null, s:null, sw:null, w:null, nw:null}
	});
})(angular);
