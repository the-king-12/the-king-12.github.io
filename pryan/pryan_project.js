(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"pryan_project_atlas_1", frames: [[1115,642,787,86],[0,722,787,86],[0,642,1113,78],[1284,481,236,140],[789,722,173,167],[964,730,165,166],[0,0,640,640],[642,0,640,640],[1131,730,163,161],[1284,0,646,479]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_347 = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_346 = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_345 = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_344 = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.japan = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.philippines = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.sky = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Space = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Uzbekistan = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.worldmap = function() {
	this.initialize(ss["pryan_project_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Uzbekistan1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Uzbekistan();
	this.instance.setTransform(0,0,0.5951,0.4037);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,97,65);


(lib.start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("boing");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(3));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#33CCFF").s().p("AoAIBQjUjUAAktQAAkrDUjVQDVjUErAAQEtAADTDUQDVDVAAErQAAEtjVDUQjTDUktAAQkrAAjVjUg");
	this.shape.setTransform(72.5,72.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,145,145);


(lib.ReplayText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_347();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,393.5,43);


(lib.Replay_Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#009933").s().p("A/wDwIAAnfMA/hAAAIAAHfg");
	this.shape.setTransform(203.3,24);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,406.6,48);


(lib.Philippines = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.philippines();
	this.instance.setTransform(0,0,0.6,0.3497);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,99,58.1);


(lib.Japans = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.japan();
	this.instance.setTransform(0,0,0.5838,0.3406);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,101,56.9);


(lib.Japan = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.japan();
	this.instance.setTransform(0,0,0.6069,0.3426);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,105,57.2);


(lib.C130J = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("EhGLgJSIAAveISuAAIXLOsIB1NRIAKAAActDNIS3AAQARAHAQAHEAvWADkQAXgFAYgEQBVgOBcAAQFSAADwC9QCYB5A4CXQANAkAHAnAERAQQDagUEHAAQHBAAE+A6QE9A7AABSQAAAFgBAFQgSBNkqA3Qk+A7nBAAQiDAAh4gFQkigNjggpQk+g7AAhTQAAhSE+g7QCCgYCagOgAwADNQAAhOFqg4QFqg4H/AAQAfAAAfABAH3GHQiLAFiZAAQn/AAlqg4Qlqg4AAhPEgvsADhIVSAAIgDgUIAAAAA6TDNIKTAAEA/IAKaUAWyAMvgmWABoMhYIAAAUgpqgS4AOQgCYQEHgtIwAtQAGAAAHAAEgvyADhQACAAADAAIABAAQFZgcH4AIIH+AAEg3HADhIHaAAEhGLgJSIAAMzICNAAIM3AAA8SqEMgp5AAy");
	this.shape.setTransform(4089.8369,69.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfALQFYgbH4AJIH+AAIAAAAIADASgA0xALQEHgrIwArg");
	this.shape_1.setTransform(3787.725,90.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AcmPZQkigMjhgpQk+g7AAhTQAAhTE+g6QCDgYCZgOQDagVEIAAQHBAAE9A7QE+A6AABTIgBAKQgSBNkrA3Qk9A6nBAAQiDAAh4gFgAKYOmQlqg3AAhPQAAhOFqg4QFqg4IAAAIA9ABQiZAOiDAYQk+A6AABTQAABTE+A7QDhApEiAMQiMAFiYAAQoAAAlqg4gAcmPZIAAAAgEgxcgPdIStAAIXMOsMgp5AAxg");
	this.shape_2.setTransform(3957.15,10.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("EgokARbUgpqgS4AOQgCYIiNAAIAAszMAp5gAyIB1NSIn+AAQn4gIlZAbIgBAAInaAAIANACIVfAAIAAgBIuXAAIAFgBIABAAIVSAAIgDgSIAAgBIAKAAIAAABIKTAAQAABOFqA4QFqA3H/AAQCZABCLgGQB4AGCDgBQHBABE+g7QEqg3AShMIS3AAIAhANIgvAJIAvgJQBVgOBcAAQFSAADwC9QCYB3A4CYQANAkAHAnQgHgngNgkUAWyAMvgmWABogEhD+gD1IM3AAQkYgWjOAAQjOAAiDAWg");
	this.shape_3.setTransform(4089.8369,116.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3630.5,-90,918.6999999999998,319);


(lib.Replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ReplayText();
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.Reolay = new lib.Replay_Button();
	this.Reolay.name = "Reolay";
	this.Reolay.setTransform(203.3,24,1,1,0,0,0,203.3,24);
	new cjs.ButtonHelper(this.Reolay, 0, 1, 2);

	this.instance_1 = new lib.CachedBmp_346();
	this.instance_1.setTransform(13.3,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.Reolay},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Replay, new cjs.Rectangle(0,0,406.8,48), null);


(lib.Bouncy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.start = new lib.start();
	this.start.name = "start";
	this.start.setTransform(72.5,72.5,1,1,0,0,0,72.5,72.5);
	new cjs.ButtonHelper(this.start, 0, 1, 2, false, new lib.start(), 3);

	this.timeline.addTween(cjs.Tween.get(this.start).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,145,145);


// stage content:
(lib.Ryan_S41_FYP = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [43,61,62,63,87,103];
	// timeline functions:
	this.frame_43 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.planet.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(45);
		}
	}
	this.frame_61 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.philippines.addEventListener("click", fl_ClickToGoToWebPage_9);
		
		function fl_ClickToGoToWebPage_9() {
			window.open("https://en.wikipedia.org/wiki/Tubbataha_Reef");
		}
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Replay.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(5);
		}
	}
	this.frame_62 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Uzbekistan.addEventListener("click", fl_ClickToGoToWebPage_10);
		
		function fl_ClickToGoToWebPage_10() {
			window.open("https://en.wikipedia.org/wiki/Silk_Roads:_Zarafshan-Karakum_Corridor");
		}
	}
	this.frame_63 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Japans.addEventListener("click", fl_ClickToGoToWebPage_12);
		
		function fl_ClickToGoToWebPage_12() {
			window.open("https://en.wikipedia.org/wiki/Itsukushima_Shrine");
		}
	}
	this.frame_87 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_103 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Reolay.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(43).call(this.frame_43).wait(18).call(this.frame_61).wait(1).call(this.frame_62).wait(1).call(this.frame_63).wait(24).call(this.frame_87).wait(16).call(this.frame_103).wait(1));

	// Uzbekistan
	this.Uzbekistan = new lib.Uzbekistan1();
	this.Uzbekistan.name = "Uzbekistan";
	this.Uzbekistan.setTransform(383.5,336.5,1,1,0,0,0,48.5,32.5);
	this.Uzbekistan._off = true;
	new cjs.ButtonHelper(this.Uzbekistan, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.Uzbekistan).wait(62).to({_off:false},0).to({_off:true},36).wait(6));

	// Japan
	this.Japans = new lib.Japans();
	this.Japans.name = "Japans";
	this.Japans.setTransform(656.5,339.4,1,1,0,0,0,50.5,28.4);
	this.Japans._off = true;
	new cjs.ButtonHelper(this.Japans, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.Japans).wait(63).to({_off:false},0).to({_off:true},34).wait(7));

	// Replay
	this.Replay = new lib.Replay();
	this.Replay.name = "Replay";
	this.Replay.setTransform(383.6,469.65,1,1,0,0,0,203.3,24);
	this.Replay._off = true;

	this.timeline.addTween(cjs.Tween.get(this.Replay).wait(61).to({_off:false},0).to({_off:true},42).wait(1));

	// planet
	this.instance = new lib.Bouncy();
	this.instance.setTransform(1032.9,130.5,1,1,0,0,0,72.5,72.5);
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.instance_1 = new lib.CachedBmp_344();
	this.instance_1.setTransform(369,300.25,0.5,0.5);

	this.planet = new lib.Bouncy();
	this.planet.name = "planet";
	this.planet.setTransform(396.45,337.4,1,1,0,0,0,72.5,72.5);
	new cjs.ButtonHelper(this.planet, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},10).to({state:[{t:this.planet},{t:this.instance_1}]},14).to({state:[]},1).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:410.5,y:518.45},10).to({x:72.5,y:264.95},9).to({x:466.45,y:59.4},10).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:369,y:300.25},14).wait(61));

	// title
	this.instance_2 = new lib.CachedBmp_345();
	this.instance_2.setTransform(138.35,88.75,0.5,0.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(42).to({_off:false},0).to({_off:true},2).wait(60));

	// plane
	this.instance_3 = new lib.C130J("synched",0);
	this.instance_3.setTransform(-652.95,86.1,0.2062,0.1798,0,0,0,361.6,158.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(44).to({_off:false},0).to({regX:361.9,regY:158.8,x:-664.7,y:85.1},1).to({regX:361.6,regY:158.5,x:74.05,y:60.1},15).to({_off:true},1).wait(43));

	// philippines
	this.philippines = new lib.Philippines();
	this.philippines.name = "philippines";
	this.philippines.setTransform(108.5,333,1,1,0,0,0,49.5,29);
	new cjs.ButtonHelper(this.philippines, 0, 1, 2);

	this.instance_4 = new lib.Japan();
	this.instance_4.setTransform(630.5,333.6,1,1,0,0,0,52.5,28.6);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.philippines}]},61).to({state:[{t:this.instance_4},{t:this.philippines}]},36).to({state:[]},1).wait(6));

	// sky
	this.instance_5 = new lib.sky();
	this.instance_5.setTransform(-2,0,1.2531,0.9344);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(44).to({_off:false},0).wait(14).to({x:0},0).wait(1).to({x:-2},0).to({_off:true},2).wait(43));

	// globe
	this.instance_6 = new lib.worldmap();
	this.instance_6.setTransform(0,-8,1.2322,0.6033);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s().p("Eg+pAaQMAAAg0fMB9TAAAMAAAA0fg");
	this.shape.setTransform(399,449);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape},{t:this.instance_6}]},61).to({state:[]},37).wait(6));

	// sky
	this.instance_7 = new lib.Space();
	this.instance_7.setTransform(-2,2,1.2531,0.9375);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({_off:true},61).wait(43));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1105.4,617);
// library properties:
lib.properties = {
	id: 'EF868B53DD91F0449284C4DFD78666AA',
	width: 800,
	height: 600,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/pryan_project_atlas_1.png", id:"pryan_project_atlas_1"},
		{src:"sounds/boing.mp3", id:"boing"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['EF868B53DD91F0449284C4DFD78666AA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;