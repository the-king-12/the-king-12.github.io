(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"asyiqin_project_atlas_1", frames: [[0,0,2048,1365]]},
		{name:"asyiqin_project_atlas_2", frames: [[0,0,1536,1024]]},
		{name:"asyiqin_project_atlas_3", frames: [[0,0,1536,1024]]},
		{name:"asyiqin_project_atlas_4", frames: [[0,0,1024,1536]]},
		{name:"asyiqin_project_atlas_5", frames: [[0,0,1024,1024]]},
		{name:"asyiqin_project_atlas_6", frames: [[0,1932,264,48],[0,1982,264,48],[161,1754,208,48],[161,1804,208,48],[0,1754,159,87],[0,1843,159,87],[0,1026,1088,726],[0,0,1024,1024]]}
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



(lib.CachedBmp_23 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Blackhockeypuckontransparentbackground = function() {
	this.initialize(ss["asyiqin_project_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Focusedontheice__endoftext__ = function() {
	this.initialize(ss["asyiqin_project_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.HockeyAnimation_atlas_6 = function() {
	this.initialize(ss["asyiqin_project_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.hockey_rink_blurry = function() {
	this.initialize(ss["asyiqin_project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.RedHawksteamlogodesign = function() {
	this.initialize(ss["asyiqin_project_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Screenshot20260331103716 = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Wornhockeypuckongraysurface = function() {
	this.initialize(ss["asyiqin_project_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.ice_skate = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.HockeyAnimation_atlas_6();
	this.instance.setTransform(185.9,0,0.121,0.1436,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185.9,147.1);


(lib.Button_puck = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(56.05,58.4,0.5,0.5);

	this.instance_1 = new lib.Blackhockeypuckontransparentbackground();
	this.instance_1.setTransform(0,0,0.1246,0.1559);

	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(56.05,58.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance_2}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,191.4,159.6);


(lib.button_wiki = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(44,80.8,0.5,0.5);

	this.instance_1 = new lib.ice_skate();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.ice_skate(), 3);

	this.instance_2 = new lib.CachedBmp_23();
	this.instance_2.setTransform(44,80.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{alpha:1}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{alpha:0.6016}},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185.9,147.1);


(lib.button_restart = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(44,73.55,0.5,0.5);

	this.instance_1 = new lib.ice_skate();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.ice_skate(), 3);

	this.instance_2 = new lib.CachedBmp_21();
	this.instance_2.setTransform(44,73.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{alpha:1}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{alpha:0.6016}},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185.9,147.1);


// stage content:
(lib.HockeyAnimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [44,69];
	// timeline functions:
	this.frame_44 = function() {
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
		
		this.button_1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(46);
		}
	}
	this.frame_69 = function() {
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
		
		this.button_restart.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_2.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_2()
		{
			this.gotoAndPlay(1);
		}
		
		
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.button_wiki.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.open("https://www.instagram.com/nhlblackhawks/", "_blank");
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(44).call(this.frame_44).wait(25).call(this.frame_69).wait(2));

	// wiki_button
	this.button_wiki = new lib.button_wiki();
	this.button_wiki.name = "button_wiki";
	this.button_wiki.setTransform(722,251,1,1,0,0,0,93,73.5);
	this.button_wiki._off = true;
	new cjs.ButtonHelper(this.button_wiki, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_wiki).wait(69).to({_off:false},0).to({_off:true},1).wait(1));

	// restart_button
	this.button_restart = new lib.button_restart();
	this.button_restart.name = "button_restart";
	this.button_restart.setTransform(722,88.95,1,1,0,0,0,93,73.5);
	this.button_restart._off = true;
	new cjs.ButtonHelper(this.button_restart, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_restart).wait(69).to({_off:false},0).to({_off:true},1).wait(1));

	// hockey_guy
	this.instance = new lib.Focusedontheice__endoftext__();
	this.instance.setTransform(699,29,0.2801,0.4783);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(45).to({_off:false},0).wait(1).to({x:638},0).wait(1).to({x:587},0).wait(1).to({x:556},0).wait(1).to({x:477,y:38},0).wait(1).to({x:436},0).wait(1).to({x:385},0).wait(1).to({x:346},0).wait(1).to({x:323},0).wait(1).to({x:295},0).wait(1).to({x:253},0).wait(1).to({x:208},0).wait(1).to({x:174},0).to({_off:true},13).wait(1));

	// Hokcey_puck
	this.instance_1 = new lib.Wornhockeypuckongraysurface();
	this.instance_1.setTransform(688,545,0.0451,0.0452);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(45).to({_off:false},0).wait(1).to({x:632},0).wait(1).to({x:578},0).wait(1).to({x:540,y:554},0).wait(1).to({x:467},0).wait(1).to({x:423},0).wait(1).to({x:377},0).wait(1).to({x:340},0).wait(1).to({x:312},0).wait(1).to({x:284},0).wait(1).to({x:245},0).wait(1).to({x:192},0).wait(1).to({x:159},0).wait(1).to({x:127,y:544},0).wait(1).to({x:95,y:517},0).wait(1).to({x:68,y:501},0).wait(1).to({x:51,y:486},0).wait(1).to({x:34,y:469},0).wait(1).to({x:-9,y:459},0).to({_off:true},7).wait(1));

	// background2
	this.instance_2 = new lib.Screenshot20260331103716();
	this.instance_2.setTransform(0,0,0.7353,0.8264);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(45).to({_off:false},0).wait(24).to({_off:true},1).wait(1));

	// Button_Puck
	this.instance_3 = new lib.Blackhockeypuckontransparentbackground();
	this.instance_3.setTransform(299,561,0.1246,0.1559);
	this.instance_3._off = true;

	this.button_1 = new lib.Button_puck();
	this.button_1.name = "button_1";
	this.button_1.setTransform(394.7,539.65,1,1,0,0,0,95.7,79.8);
	new cjs.ButtonHelper(this.button_1, 0, 1, 2, false, new lib.Button_puck(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},36).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.button_1}]},4).to({state:[]},1).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(36).to({_off:false},0).wait(1).to({y:522},0).wait(1).to({y:486},0).wait(1).to({y:469},0).wait(1).to({y:459},0).to({_off:true},4).wait(27));

	// logo_red_hawks
	this.instance_4 = new lib.RedHawksteamlogodesign();
	this.instance_4.setTransform(137,67,0.5294,0.4786);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({scaleX:0.4147,x:196},0).wait(1).to({scaleX:0.2919,x:259},0).wait(1).to({scaleX:0.2106,x:301},0).wait(1).to({scaleX:0.1213,x:347},0).wait(1).to({scaleX:0.0751,x:371,y:61},0).wait(1).to({scaleX:0.0336,x:392},0).wait(1).to({scaleX:0.0254,skewY:180,x:422},0).wait(1).to({scaleX:0.0779,x:448.75},0).wait(1).to({scaleX:0.1338,x:477},0).wait(1).to({scaleX:0.1927,x:507.3},0).wait(1).to({scaleX:0.2469,x:534.8},0).wait(1).to({scaleX:0.3233,x:574.05},0).wait(1).to({scaleX:0.3743,x:600.25},0).wait(1).to({scaleX:0.4348,x:631.25},0).wait(1).to({scaleX:0.4571,x:643.05},0).wait(1).to({scaleX:0.5081,x:669.25},0).wait(1).to({scaleX:0.4523,x:640.2},0).wait(1).to({scaleX:0.3344,x:579.4},0).wait(1).to({scaleX:0.234,x:527.6},0).wait(1).to({scaleX:0.1351,x:477.4},0).wait(1).to({scaleX:0.0809,x:449.9},0).wait(1).to({scaleX:0.0448,x:431.85},0).wait(1).to({scaleX:0.0301,skewY:0,x:394},0).wait(1).to({scaleX:0.0842,x:366},0).wait(1).to({scaleX:0.14,x:337},0).wait(1).to({scaleX:0.2038,x:304},0).wait(1).to({scaleX:0.2596,x:275},0).wait(1).to({scaleX:0.317,x:246},0).wait(1).to({scaleX:0.4143,x:196},0).wait(1).to({scaleX:0.4876,x:158},0).wait(1).to({scaleX:0.5402,scaleY:0.4898,x:131,y:55},0).wait(1).to({scaleX:0.4953,x:154},0).wait(1).to({scaleX:0.5294,scaleY:0.4786,x:129,y:71},0).wait(11).to({_off:true},1).wait(26));

	// blurry_rink_BG
	this.instance_5 = new lib.hockey_rink_blurry();
	this.instance_5.setTransform(0,0,0.3926,0.4462);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(44).to({_off:true},1).wait(26));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,985.9,772.7);
// library properties:
lib.properties = {
	id: 'CEF592E552014A4E801BEFE015BBECDB',
	width: 800,
	height: 600,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/asyiqin_project_atlas_1.png", id:"asyiqin_project_atlas_1"},
		{src:"images/asyiqin_project_atlas_2.png", id:"asyiqin_project_atlas_2"},
		{src:"images/asyiqin_project_atlas_3.png", id:"asyiqin_project_atlas_3"},
		{src:"images/asyiqin_project_atlas_4.png", id:"asyiqin_project_atlas_4"},
		{src:"images/asyiqin_project_atlas_5.png", id:"asyiqin_project_atlas_5"},
		{src:"images/asyiqin_project_atlas_6.png", id:"asyiqin_project_atlas_6"}
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
an.compositions['CEF592E552014A4E801BEFE015BBECDB'] = {
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