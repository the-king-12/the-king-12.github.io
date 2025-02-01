(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Emberlyn_project_atlas_1", frames: [[0,1023,1602,852],[0,0,1920,1021],[1922,0,1920,1018],[3124,1020,512,512],[3124,2048,612,428],[3844,403,186,345],[3844,0,172,401],[1026,1877,612,612],[0,1877,1024,1024],[1922,1020,1200,1200],[3638,1020,385,344],[3124,1534,512,512]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Background1 = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Background2 = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Background3 = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.digitaldoorlock = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Dooropen = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.doorunlock = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Door = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Intro = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Key = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.MagnifyingGlass = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.numcode = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.rightarrowsymbol = function() {
	this.initialize(ss["Emberlyn_project_atlas_1"]);
	this.gotoAndStop(11);
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


(lib.Symbol11 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.digitaldoorlock();
	this.instance.setTransform(-39,-49.75,0.1523,0.1943);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(-39,-49.7,78,99.5), null);


(lib.Symbol9 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AhMB2IAAgGQA9g3AXgjQAZgiAAgdQAAgWgNgOQgOgOgSAAQgRAAgNAKQgOAKgHATIgGAAQAFgfARgRQASgRAaAAQAcAAASASQAUASgBAZQABARgJASQgMAagdAfQgqAvgKAJIA8AAIAagBQAHgBAFgEQAGgFAFgHIAGAAIgQAsg");
	this.shape.setTransform(-0.45,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(-10.8,-21.3,21.700000000000003,83.5), null);


(lib.Symbol7 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.rightarrowsymbol();
	this.instance.setTransform(-42.05,-38.9,0.1643,0.1519);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(-42,-38.9,84.1,77.8), null);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.rightarrowsymbol();
	this.instance.setTransform(-39.25,-41.4,0.1533,0.1617);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(-39.2,-41.4,78.5,82.8), null);


(lib.Shadow = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.498)").s().p("EhFpA7gMBGlh4FMBEuB5Lg");
	this.shape.setTransform(1366.425,352.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.498)").s().p("EhFpA7hMBGlh4GMBEuB5Lg");
	this.shape_1.setTransform(445.825,387.8);
	this.shape_1._off = true;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.498)").s().p("EhFpA7hMBGlh4GUAjcBADAhSA5Ig");
	this.shape_2.setTransform(1385.525,387.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:1366.425,y:352.75}}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_1}]},4).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape,p:{x:1319.375,y:405.85}}]},2).to({state:[]},1).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1).to({_off:false},0).wait(3).to({_off:true},1).wait(3).to({_off:false},0).wait(2).to({x:1280.275,y:494},0).wait(4).to({x:445.825,y:387.8},0).wait(3).to({x:1280.275,y:494},0).wait(1).to({x:445.825,y:387.8},0).wait(2).to({x:1280.275,y:494},0).wait(1).to({x:445.825,y:387.8},0).to({_off:true},2).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-35,1831.4,916.8);


(lib.NumberCode = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.numcode();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,385,344);


(lib.magnifyingglass = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.MagnifyingGlass();
	this.instance.setTransform(0,0,0.0753,0.0553);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,90.4,66.4);


(lib.Light2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg75gyfMB3zAAAQDUAACWCYQCWCYAADXMAAABUyQAADXiWCYQiWCYjUAAMh3zAAAQjUAAiWiYQiWiYAAjXMAAAhUyQAAjXCWiYQCWiYDUAAg");
	this.shape.setTransform(423.975,311.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.4)").s().p("Eg75AyhQjUAAiWiYQiWiZAAjWMAAAhUyQAAjXCWiZQCWiXDUgBMB3zAAAQDUABCWCXQCWCZAADXMAAABUyQAADWiWCZQiWCYjUAAg");
	this.shape_1.setTransform(423.975,311.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.6,-12.9,871.2,648.5);


(lib.Key_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Key();
	this.instance.setTransform(68.2,0,0.2029,0.1951,19.9555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,263.5,258.7);


(lib.Intro_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Intro();
	this.instance.setTransform(0,0,1.3334,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,816,612);


(lib.Door_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Door();
	this.instance.setTransform(0,0,1.45,1.1596);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,249.4,465);


(lib.Buttonbackground = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.lf(["#5726D4","#0014E7","#8500FF"],[0.259,0.494,0.78],-137.9,0,138,0).s().p("AtvLDQjPAAiSiTQiTiSAAjPIAAmdQAAjPCTiSQCSiTDPAAIbfAAQDPAACSCTQCTCSAADPIAAGdQAADPiTCSQiSCTjPAAg");
	this.shape.setTransform(137.975,70.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,276,141.4);


(lib.Background3_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background3();
	this.instance.setTransform(0,0,0.4188,0.6248);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,804,636.1);


(lib.Background2_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background2();
	this.instance.setTransform(0,0,0.4207,0.5964);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,807.7,608.9);


(lib.Arrow = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.rightarrowsymbol();
	this.instance.setTransform(-78,119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,119,512,512);


(lib.Symbol12 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.NumberCode("synched",0);
	this.instance.setTransform(0.1,0.15,0.8111,0.6805,0,0,0,192.6,172.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(-156.1,-117,312.29999999999995,234.1), null);


(lib.Symbol10 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Key_1("synched",0);
	this.instance.setTransform(0.05,-0.05,1,1,0,0,0,131.8,129.3);
	var instanceFilter_1 = new cjs.ColorFilter(0.81,0.81,0.81,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-2,-2,268,263);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(-131.7,-129.3,263.5,258.70000000000005), null);


(lib.Symbol8 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_30 = new lib.Symbol12();
	this.movieClip_30.name = "movieClip_30";

	this.timeline.addTween(cjs.Tween.get(this.movieClip_30).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(-156.1,-117,312.29999999999995,234.1), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_28 = new lib.Symbol11();
	this.movieClip_28.name = "movieClip_28";

	this.timeline.addTween(cjs.Tween.get(this.movieClip_28).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-39,-49.7,78,99.5), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_27 = new lib.Symbol10();
	this.movieClip_27.name = "movieClip_27";

	this.timeline.addTween(cjs.Tween.get(this.movieClip_27).wait(1));
	this.movieClip_27.addEventListener("tick", AdobeAn.handleFilterCache);

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-131.7,-129.3,263.5,258.70000000000005), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Light2("synched",0);
	this.instance.setTransform(438.2,397.85,1,1,0,0,0,423.9,311.2);

	this.instance_1 = new lib.Background1();
	this.instance_1.setTransform(0,0,0.8435,1.1378);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,1351.4,969.4), null);


(lib.Link = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgyBAQgXgXAAgoQAAgnAWgYQAWgXAiAAQAhAAASATQASAUAAAjIAAAOIh3AAQAAAPAEALQAFAMAIAGQAHAIALAEQAKADAMAAQARAAARgHQAQgHAIgGIABAAIAAAeQgOAGgOAEQgPAEgQAAQgoAAgWgWgAgegxQgNANgCATIBdAAQgBgWgKgMQgLgLgWgBQgVABgNANg");
	this.shape.setTransform(264.875,72.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTBdQgNgNAAgeIAAhWIgTAAIAAgXIATAAIAAgvIAbAAIAAAvIA5AAIAAAXIg5AAIAABKIABAUQABAHADAHQACAFAHADQAFADAMAAQAGAAAHgCIALgDIACAAIAAAYIgRAEIgRABQgYAAgNgOg");
	this.shape_1.setTransform(250.15,70.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNBuIAAijIAbAAIAACjgAgPhQIAAgdIAeAAIAAAdg");
	this.shape_2.setTransform(240.05,69.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBRQgQgEgKgFIAAgfIABAAQANAKAQAGQARAFAOAAQASAAAJgFQALgGAAgNQAAgKgFgFQgHgFgPgDIgPgDIgQgEQgWgGgJgKQgJgLAAgQQAAgKAEgJQAEgJAIgHQAJgHAMgEQANgEAPAAQAPAAAPAEQAPADAKAFIAAAeIgCAAQgKgIgPgFQgQgGgOAAQgOAAgLAGQgKAGAAALQAAALAGAFQAGAFAOADIAQAEIAQADQATAEAKAKQALALAAASQAAAWgTAOQgSAPgfAAQgSAAgPgFg");
	this.shape_3.setTransform(228.3,72.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXBxQgKgDgKgGIgCAIIgaAAIAAjjIAcAAIAABRQALgJANgGQANgGAQAAQAcAAASAWQAQAWAAAoQAAAUgFARQgHAQgKALQgKAMgMAGQgMAFgPAAQgNAAgLgDgAgVgYQgMAFgKAIIAABdQALAFAJACQAIADALAAQAVAAAOgPQAMgPAAghQAAgdgJgOQgJgPgWAAQgLAAgNAFg");
	this.shape_4.setTransform(211.5,69.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgyBAQgXgXAAgoQAAgnAWgYQAWgXAiAAQAhAAASATQASAUAAAjIAAAOIh3AAQAAAPAEALQAFAMAIAGQAHAIALAEQAKADAMAAQARAAARgHQAQgHAIgGIABAAIAAAeQgOAGgOAEQgPAEgQAAQgoAAgWgWgAgegxQgNANgCATIBdAAQgBgWgKgMQgLgLgWgBQgVABgNANg");
	this.shape_5.setTransform(192.725,72.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAuBtIgui0IgsC0IggAAIg6jZIAeAAIAuC0IAti0IAcAAIAuC2IAti2IAdAAIg5DZg");
	this.shape_6.setTransform(170.375,69.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgmBRQgOgEgLgFIAAgfIACAAQANAKAQAGQAQAFAOAAQASAAAJgFQALgGAAgNQAAgKgGgFQgFgFgQgDIgOgDIgRgEQgWgGgJgKQgJgLAAgQQAAgKAEgJQAEgJAIgHQAJgHANgEQAMgEAPAAQAPAAAOAEQAPADAKAFIAAAeIgBAAQgKgIgQgFQgPgGgOAAQgOAAgKAGQgLAGAAALQAAALAGAFQAHAFANADIARAEIAPADQATAEALAKQAKALAAASQAAAWgSAOQgTAPgfAAQgTAAgPgFg");
	this.shape_7.setTransform(137.35,72.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTBdQgNgNAAgeIAAhWIgTAAIAAgXIATAAIAAgvIAbAAIAAAvIA5AAIAAAXIg5AAIAABKIABAUQABAHADAHQACAFAHADQAFADAMAAQAGAAAHgCIALgDIACAAIAAAYIgRAEIgQABQgZAAgNgOg");
	this.shape_8.setTransform(123.6,70.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AApBUIAAhcQAAgLgCgKQgBgKgEgGQgDgGgHgDQgHgDgLAAQgKAAgMAFQgNAGgLAJIAAB5IgbAAIAAijIAbAAIAAASQANgKAOgGQANgGAOAAQAbAAAOAQQAOAQgBAeIAABpg");
	this.shape_9.setTransform(108.1,72.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgyBAQgXgXAAgoQAAgnAWgYQAWgXAiAAQAhAAASATQASAUAAAjIAAAOIh3AAQAAAPAEALQAFAMAIAGQAHAIALAEQAKADAMAAQARAAARgHQAQgHAIgGIABAAIAAAeQgOAGgOAEQgPAEgQAAQgoAAgWgWgAgegxQgNANgCATIBdAAQgBgWgKgMQgLgLgWgBQgVABgNANg");
	this.shape_10.setTransform(89.675,72.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ag2BeQgRgXAAgoQAAgVAGgPQAGgQAKgMQAKgLANgGQAOgFAMAAQANAAALACQAKADAKAGIAAhHIAcAAIAADjIgcAAIAAgRQgMAKgNAGQgNAFgOAAQgdAAgRgWgAgegOQgNAPAAAeQAAAdAKAPQAKAPAWAAQALAAAMgFQAMgFAKgJIAAhcQgLgFgIgCQgKgCgKAAQgWAAgNAQg");
	this.shape_11.setTransform(70.8,69.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag1BFQgOgRAAgeIAAhpIAbAAIAABcIABAVQACAJADAHQAEAGAHADQAGADAMAAQAKAAAMgFQANgHALgIIAAh5IAbAAIAACjIgbAAIAAgSQgOALgNAFQgMAGgPAAQgaAAgOgPg");
	this.shape_12.setTransform(52.425,72.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTBdQgNgNAAgeIAAhWIgSAAIAAgXIASAAIAAgvIAcAAIAAAvIA3AAIAAAXIg3AAIAABKIABAUQAAAHADAHQADAFAFADQAGADALAAQAHAAAIgCIAKgDIABAAIAAAYIgRAEIgQABQgXAAgOgOg");
	this.shape_13.setTransform(37.25,70.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgtBsQgTgEgTgIIAAglIACAAQAQAOAWAHQAWAIATAAQAaAAAPgKQAPgKAAgRQAAgOgHgIQgHgGgPgEIgYgFIgagFQgdgGgOgOQgOgPAAgXQAAgcAXgRQAXgSAkAAQAWAAATAEQATAEAPAHIAAAiIgCAAQgMgKgUgHQgVgHgUAAQgXAAgOAJQgPAKAAAPQAAAOAHAIQAHAIASAEIAaAFQARACAMAEQAYAGANAMQAMAOAAAWQAAANgGANQgGAMgLAJQgLAKgQAEQgPAGgVAAQgYAAgTgFg");
	this.shape_14.setTransform(21.075,69.9);

	this.instance = new lib.Buttonbackground();
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,276,141.4);


(lib.doorwithlock = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.digitaldoorlock();
	this.instance.setTransform(440,262.3,0.1523,0.1943);

	this.instance_1 = new lib.Door_1("synched",0);
	this.instance_1.setTransform(386.7,312.8,1,1,0,0,0,124.7,232.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#75AD5D").s().p("Eg+lAotMAAAhRZMB9LAAAMAAABRZg");
	this.shape.setTransform(400.575,260.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,801.2,545.3);


(lib.Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("Ag8CVIAqhbIhYjOIAoAAIBDCgIBDigIAnAAIh/Epg");
	this.shape.setTransform(134.4,54.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhHBfQgUgTAAgfQAAgYAKgQQALgOATgJQAVgJAbgDQAbgDAggBIAAgGQAAgNgEgIQgFgIgIgFQgIgEgLgCQgLgBgKAAQgPAAgSAEQgSADgTAIIgBAAIAAgmIAegGQAVgEAUAAQAWAAARAEQARAEAMAJQANAJAGAOQAGAPAAAVIAACTIgkAAIAAgXIgNAJQgIAGgIADQgJAFgMADQgLADgQAAQgdAAgVgUgAARgCQgWACgNADQgQAEgKAKQgKAJAAARQAAATALAJQAMAKAXAAQATAAAQgIQAQgHANgLIAAg8IgnADg");
	this.shape_1.setTransform(110.2,50.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRCYIAAkvIAjAAIAAEvg");
	this.shape_2.setTransform(93.525,45.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AheCRIAAkhIBPAAQAZAAASAEQASAFAOAJQARALAJARQAJAQAAAaQAAATgHARQgGAQgNALQgPAPgUAHQgVAIgeAAIgnAAIAABsgAg4AEIAhAAQAXAAAOgEQAPgEAJgIQAJgKAEgKQAEgKAAgNQAAgPgFgLQgGgMgKgHQgKgGgMgCQgMgDgRAAIgnAAg");
	this.shape_3.setTransform(77.375,46.4);

	this.instance = new lib.Buttonbackground();
	this.instance.setTransform(103.35,44.05,0.7489,0.6228,0,0,0,138,70.7);
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,206.7,88.1);


(lib._2 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_26 = new lib.Symbol9();
	this.movieClip_26.name = "movieClip_26";
	this.movieClip_26.setTransform(10.85,21.35);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_26).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._2, new cjs.Rectangle(0,0,21.7,83.5), null);


(lib.Number = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib._2();
	this.instance.setTransform(409.15,116.35);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhDB5IAAgHQAVAAAUgKQATgKARgZQASgZAGgeQgaARgVAAQgZAAgRgSQgRgSAAggQAAgeARgYQAVgdAiAAQAcAAAUAYQAZAdAAArQAAAmgTAhQgTAhgiAWQgaATghAAgAgehfQgLAOAAAbQAAAkAOATQAMAPAPAAQAIAAAKgEQALgEAJgHQADgVAAgNQgBgRgFgTQgGgTgKgKQgLgLgLAAQgQAAgLAOg");
	this.shape.setTransform(478.7,280.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgzBkQgPgRAAgUQAAgPAKgPQALgPAZgSQgcgWgHgOQgIgNAAgPQAAgXARgQQARgQAdAAQAbAAARAPQASAPgBAUQABANgKANQgIAOgeASQAeAWAKANQANASAAATQAAAZgTARQgSARgeAAQghAAgSgUgAghAgQgGAOAAARQgBAWAMANQANANARAAQASAAAMgKQALgLgBgPQAAgMgGgKQgMgSgkgdQgOAMgHAOgAgchjQgLAKABANQAAAJAEAJQAFAJAIAIIAbAXQAUgSAGgLQAGgLAAgNQAAgSgLgKQgJgKgSAAQgQAAgMAKg");
	this.shape_1.setTransform(423.8,280.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgWB2IBEjQIg/AAQgTAAgIAFQgPAIgIAQIgFgCIAWg2IB7AAIAAAGIhMDlg");
	this.shape_2.setTransform(363.775,281.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgoBpQgggfAAgxQAAgeAMgcQANgcAXgWQAXgVAUgIQAVgHATAAIAKAAIAAAGQgXACgOAHQgOAHgOAOQgNANgJASQgKAQgGAYQAZgRAYAAQAXAAASATQARASAAAeQAAAdgRAYQgWAdgiAAQgXAAgRgPgAgPgLQgHACgPAJQgDAWAAAPQAAAQAGATQAGATAMAMQAJAIAMAAQAOAAAMgOQAMgOAAgaQAAgdgMgWQgLgUgVAAQgGAAgIADg");
	this.shape_3.setTransform(478.825,209.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag5BvQgKgHAAgJQAAgFAEgDQAEgEAGAAQAFAAADABIALAHQANAJANAAQATAAAQgPQAPgPAAgWQAAgVgOgSQgNgRgXgKQgTgIgggBIAthaIBSAAIgOAdIhEAAIgQAfQAtAHAaAbQAXAXAAAfQAAASgHAPQgIAQgLALQgMALgNAGQgTAKgVAAQgVAAgJgHg");
	this.shape_4.setTransform(423.425,209.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AATB2IAAg9IhhAAIAAgWIBriYIATAAIAACWIAfAAIAAAYIgfAAIAAA9gAg9AhIBQAAIAAhyg");
	this.shape_5.setTransform(363.575,209.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag5BzQgIgGAAgHQAAgFAFgEQADgDAGAAIAJABIAMAGIAPAHQAGABAHAAQARAAANgNQAMgOAAgSQABgNgHgNQgEgKgFgFQgIgHgMgFQgMgGgOAAIgFAAIAAgEQAOgCANgIQANgIAGgLQAGgLAAgOQAAgRgLgLQgLgLgQAAQgaAAgSAcIgFgCQAKgYAPgMQAPgNAWAAQAcAAAOASQAMANAAAQQgBAZggAbQAWAIALAPQALAPAAAWQAAAegTAWQgZAcguAAQgYAAgJgFg");
	this.shape_6.setTransform(478,137.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgpB2IAAgGQARAAAFgDQAEgCACgEQACgFAAgVIAAh8QAAgZgCgHQgBgGgDgCQgDgDgFAAQgGAAgLAGIgDgGIA4gbIAFAAIAADCQAAAUACAFQACAEAFADQAFADAQAAIAAAGg");
	this.shape_7.setTransform(363.825,137.725);

	this.instance_1 = new lib.digitaldoorlock();
	this.instance_1.setTransform(261.9,7.05,0.7931,1.0118);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6E4A21").s().p("Eg+gAskMAAAhZHMB9AAAAMAAABZHg");
	this.shape_8.setTransform(400.05,285.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.instance_1},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,800.1,570.4);


// stage content:
(lib.Emberlyn_project = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,24,199,299,324,349,374,424,499,674,774,799,849,874,914,959,979,1040,1089];
	this.streamSoundSymbolsList[499] = [{id:"DoorOpeningSoundEffect",startFrame:499,endFrame:524,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		playSound("Escaperoommusic");
		playSound("lightflickeringsoundeffect");
	}
	this.frame_24 = function() {
		// it will stop and play at frame 26 once click
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
		
		this.button_8.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_43.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_43()
		{
			this.gotoAndPlay(26);
		}
	}
	this.frame_199 = function() {
		//it will stop and play at frame 225 once click
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
		
		this.button_9.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_39.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_39()
		{
			this.gotoAndPlay(225);
		}
	}
	this.frame_299 = function() {
		//it will stop and play at frame 325 once click
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
		
		this.button_10.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_10.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_10()
		{
			this.gotoAndPlay(325);
		}
	}
	this.frame_324 = function() {
		//it will stop and play at frame 350 once click
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
		
		this.movieClip_11.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_46.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_46()
		{
			this.gotoAndPlay(350);
		}
	}
	this.frame_349 = function() {
		// it will stop and play at frame 375 once click
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
		
		this.button_12.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_30.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_30()
		{
			this.gotoAndPlay(375);
		}
	}
	this.frame_374 = function() {
		// it will stop and play at frame 400 once click
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
		
		this.button_13.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_31.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_31()
		{
			this.gotoAndPlay(400);
		}
	}
	this.frame_424 = function() {
		// it will stop and play at frame 451 once click
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
		
		this.button_14.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_32.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_32()
		{
			this.gotoAndPlay(451);
		}
	}
	this.frame_499 = function() {
		var soundInstance = playSound("DoorOpeningSoundEffect",0);
		this.InsertIntoSoundStreamData(soundInstance,499,524,1);
	}
	this.frame_674 = function() {
		// it will stop and play at frame 700 once click
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
		
		this.movieClip_15.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_14.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_14()
		{
			this.gotoAndPlay(700);
		}
	}
	this.frame_774 = function() {
		// it will stop and play at frame 800 once click
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
		
		this.button_17.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_16.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_16()
		{
			this.gotoAndPlay(800);
		}
	}
	this.frame_799 = function() {
		// it will stop and play at frame 825 once click
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
		
		this.button_18.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_54.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_54()
		{
			this.gotoAndPlay(825);
		}
	}
	this.frame_849 = function() {
		// it will stop and play at frame 875 once click
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
		
		this.movieClip_19.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_18.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_18()
		{
			this.gotoAndPlay(875);
		}
	}
	this.frame_874 = function() {
		// it will stop and play at frame 895 once click
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
		
		this.button_20.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_55.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_55()
		{
			this.gotoAndPlay(895);
		}
	}
	this.frame_914 = function() {
		// it will stop and play at frame 925 once click
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
		
		this.button_21.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_40.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_40()
		{
			this.gotoAndPlay(925);
		}
	}
	this.frame_959 = function() {
		// it will stop and play at frame 980 once click
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
		
		this.button_22.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_50.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_50()
		{
			this.gotoAndPlay(980);
		}
	}
	this.frame_979 = function() {
		// it will stop and play at frame 990 once click
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
		
		this.movieClip_4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_56.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_56()
		{
			this.gotoAndPlay(990);
		}
	}
	this.frame_1040 = function() {
		playSound("DoorOpeningSoundEffect_2");
	}
	this.frame_1089 = function() {
		// it will stop and when the restart button is pressed it will go to frame 1 and if the students website button is clicked it will go to my personal website
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
		
		this.button_23.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_57.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_57()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.button_29.addEventListener("click", fl_ClickToGoToWebPage_3);
		
		function fl_ClickToGoToWebPage_3() {
			window.open("https://sites.google.com/students.edu.sg/emberlyn-eportfilio/home");
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24).call(this.frame_24).wait(175).call(this.frame_199).wait(100).call(this.frame_299).wait(25).call(this.frame_324).wait(25).call(this.frame_349).wait(25).call(this.frame_374).wait(50).call(this.frame_424).wait(75).call(this.frame_499).wait(175).call(this.frame_674).wait(100).call(this.frame_774).wait(25).call(this.frame_799).wait(50).call(this.frame_849).wait(25).call(this.frame_874).wait(40).call(this.frame_914).wait(45).call(this.frame_959).wait(20).call(this.frame_979).wait(61).call(this.frame_1040).wait(49).call(this.frame_1089).wait(11));

	// Layer_1
	this.movieClip_4 = new lib.Symbol4();
	this.movieClip_4.name = "movieClip_4";
	this.movieClip_4.setTransform(479,369.75);

	this.instance = new lib.Door_1("synched",0);
	this.instance.setTransform(386.7,370.5,1,1,0,0,0,124.7,232.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg/RgvaMB+jAAAIAAJVMAAABRZIAAEHMh+jAAAg");
	this.shape.setTransform(396.025,301.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#75AD5D").s().p("Eg/RAvbMAAAhe1MB+iAAAIAAJVIACAAMAAABRZIgCAAMAAAhRZMAAABRZIAAEHg");
	this.shape_1.setTransform(396.1,301.525);

	this.instance_1 = new lib.Number();
	this.instance_1.setTransform(1440.45,-297.2);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 1);

	this.button_24 = new lib.Number();
	this.button_24.name = "button_24";
	this.button_24.setTransform(400,317.05,1,1,0,0,0,400.1,285.2);
	new cjs.ButtonHelper(this.button_24, 0, 1, 1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E4A21").s().p("Eg+fACfIAAk9MB9AAAAIAAE9g");
	this.shape_2.setTransform(399.95,15.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhrBFQAWgjA3gVIAWgJQAmgPAAgRQAAgTgjAAQgmAAAAAaQAAAKALAKQgJABgJAAQgYAAgOgGQgPgIAAgMQAAgSAfgMQAegMAsAAQAtAAAeAMQAfAMAAASQAAALgMAHQgMAHgkALIgbAIQgpANgaALIBrAAIArglIAABAg");
	this.shape_3.setTransform(417.375,95.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6E4A21").s().p("Eg+gACfIAAk9MB9AAAAIAAE9g");
	this.shape_4.setTransform(400.05,15.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhPA0QghgTAAgcQAAgfAkgWQAkgWA0AAQAiAAAZAJQAbAKAAALQAAAQgkAAQgTAAgMgEIAAgGQAAgOgbAAQgXAAgJAKQgKALAAAZQAWgQAkAAQAnAAAcANQAaAMABASQgBATgfAOQggANgtAAQgyAAgigTgAgZAKQgMAGAAALQAAAJALAHQALAGAPAAQAnAAAAgYQAAgKgLgGQgJgHgQAAQgRAAgLAIg");
	this.shape_5.setTransform(442.6,96.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhZBDIA8gfIAAhJIg8gdIB+AAIAABmIA1Afg");
	this.shape_6.setTransform(461.7,95.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhPA0QghgTAAgcQgBgfAlgWQAkgWA0AAQAiAAAZAJQAbAKAAALQAAAQgkAAQgTAAgMgEIAAgGQAAgOgbAAQgXAAgJAKQgKALAAAZQAWgQAkAAQAnAAAcANQAaAMABASQgBATgfAOQggANgtAAQgyAAgigTgAgZAKQgMAGAAALQAAAJALAHQALAGAPAAQAnAAAAgYQAAgKgLgGQgJgHgQAAQgRAAgLAIg");
	this.shape_7.setTransform(440.8,95.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhrBFQAWgjA3gVIAWgJQAmgPAAgRQAAgTgjAAQgmAAAAAaQAAAKALAKQgJABgJAAQgYAAgOgGQgPgIAAgMQAAgSAfgMQAegMAsAAQAtAAAeAMQAfAMAAASQAAALgMAHQgMAHgkALIgbAIQgpANgaALIBrAAIArglIAABAg");
	this.shape_8.setTransform(419.175,94.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance},{t:this.movieClip_4}]},979).to({state:[{t:this.shape_2,p:{y:15.925}},{t:this.button_24,p:{y:317.05,x:400}},{t:this.instance_1}]},10).to({state:[{t:this.shape_4},{t:this.button_24,p:{y:314.8,x:400}},{t:this.shape_3,p:{x:417.375,y:95.725}}]},10).to({state:[{t:this.shape_2,p:{y:15.925}},{t:this.button_24,p:{y:317.05,x:400}},{t:this.shape_3,p:{x:419.175,y:96.625}},{t:this.shape_5,p:{y:96.825}}]},10).to({state:[{t:this.shape_2,p:{y:15.925}},{t:this.button_24,p:{y:316.15,x:400.1}},{t:this.shape_3,p:{x:417.375,y:95.725}},{t:this.shape_7},{t:this.shape_6,p:{x:461.7,y:95.925}}]},11).to({state:[{t:this.shape_2,p:{y:13.675}},{t:this.button_24,p:{y:314.8,x:400}},{t:this.shape_8},{t:this.shape_5,p:{y:94.575}},{t:this.shape_6,p:{x:463.5,y:94.575}},{t:this.shape_3,p:{x:483.675,y:94.375}}]},10).to({state:[{t:this.shape_2,p:{y:13.675}},{t:this.button_24,p:{y:314.8,x:400}},{t:this.shape_8},{t:this.shape_5,p:{y:94.575}},{t:this.shape_6,p:{x:463.5,y:94.575}},{t:this.shape_3,p:{x:483.675,y:94.375}}]},9).to({state:[]},1).wait(60));

	// Background_3
	this.instance_2 = new lib.Background3_1("synched",0);
	this.instance_2.setTransform(402,318,1,1,0,0,0,402,318);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgbBCIAAgDIAEAAQAJAAADgFQACgEAAgLIAAhkIgQAAIgMABQgGACgDAGQgEAFgBAJIgDAAIABgfIBrAAIABAfIgDAAQgBgIgCgEQgDgFgFgDQgFgDgIAAIgTAAIAABkQAAANACADQAFAEAHAAIAFAAIAAADg");
	this.shape_9.setTransform(48.2,543.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgEIAAgJIAAgfQAAgPgBgDQgCgFgDgCQgDgDgFAAQgFAAgEADQgGADgGAGIAAAvQAAAJAAADQABACADACQADABAHAAIAAAEIgsAAIAAgEQAGAAADgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQACgEgBgIIAAhQQAAgPgBgEQAAgDgBgBIgFgBIgGABIgCgEIAbgLIAFAAIAABCQAKgMAGgDQAGgEAGAAQAIAAAGAFQAFAEADAJQACAFAAARIAAAfQgBAJACADQAAABABAAQAAABAAAAQABABAAAAQABAAAAABQADABAFAAIAAAEg");
	this.shape_10.setTransform(59.25,543);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgUBGIAAgEQAHAAACgBQACgBABgDQACgEAAgIIAAgiQAAgPgBgDQAAgBgBAAQAAgBAAgBQAAAAgBgBQAAAAAAAAIgEgBIgHABIgBgDIAagMIAEAAIAABHQAAAIABAEQABADADABQACABAGAAIAAAEgAgFg0QgDgDAAgEQAAgDADgEQADgDADAAQAEAAADADQADAEAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_11.setTransform(67.075,543);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgRAtIgGgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAIgDAAIAAggIADAAQADAOAHAHQAIAHAIAAQAIAAADgEQAFgEAAgGQAAgGgFgFQgFgFgNgHQgOgGgFgFQgDgGAAgIQgBgLAIgIQAIgHAMAAQADAAAIACIAHABIACAAIACgDIAEAAIAAAeIgEAAQgEgOgFgFQgGgGgIAAQgHAAgEAEQgEAEAAAEQAAAGADADQADAEAJAFIANAHQAVAJgBAPQABANgKAHQgJAHgMAAQgHAAgKgCg");
	this.shape_12.setTransform(73.85,545.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgSAtIgEgBQgBAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAIgDAAIAAggIADAAQADAOAHAHQAIAHAIAAQAHAAAFgEQAEgEAAgGQAAgGgFgFQgEgFgOgHQgOgGgFgFQgDgGAAgIQAAgLAHgIQAIgHAMAAQADAAAIACIAHABIACAAIADgDIADAAIAAAeIgDAAQgFgOgFgFQgGgGgIAAQgHAAgEAEQgEAEAAAEQAAAGADADQADAEAJAFIANAHQAVAJAAAPQAAANgKAHQgJAHgMAAQgHAAgLgCg");
	this.shape_13.setTransform(86.65,545.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAACgCQADgCABgEIAAgJIAAgfQAAgPgBgDQgCgFgDgCQgEgDgEAAQgFAAgEADQgGADgGAGIAAAvQAAAJABADQABACACACQADABAHAAIAAAEIgtAAIAAgEQAHAAADgCQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgEABgIIAAhQQAAgPgBgEQgBgDgCgBIgEgBIgHABIgBgEIAbgLIAFAAIAABCQAKgMAGgDQAGgEAHAAQAHAAAFAFQAGAEACAJQACAFAAARIAAAfQAAAJACADQAAABABAAQAAABAAAAQABABAAAAQAAAAABABQADABAGAAIAAAEg");
	this.shape_14.setTransform(95.4,543);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AggAfQgKgNAAgRQAAgLAGgNQAGgMAKgFQAKgGAKAAQAVAAAMAPQAKANAAARQAAALgFANQgGAMgKAGQgKAGgMAAQgUAAgMgQgAgMglQgFADgEAIQgDAIAAAMQAAASAIAOQAIAPALAAQAKAAAGgIQAGgIAAgTQAAgXgKgOQgHgJgKAAQgFAAgFADg");
	this.shape_15.setTransform(105.375,545.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AATAuIAAgSQgMAMgGADQgFADgHAAQgHAAgGgEQgFgEgCgIQgCgGAAgNIAAgmQAAgHgCgCQgBgDgDgBQgDgBgHgBIAAgDIAgAAIAAA7QAAANAEADQAEAEAHAAQADAAAFgDQAFgCAIgIIAAgxQAAgIgDgDQgDgCgJgBIAAgDIAfAAIAAA1QAAAQABAEQAAADACABQABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAIAHgBIABADIgbALg");
	this.shape_16.setTransform(115.375,545.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgUBGIAAgEQAGAAACgBQADgBABgDQABgEAAgIIAAhQQAAgPgBgEQAAgDgCgBIgEgBIgGABIgCgEIAagLIAEAAIAAB2QAAAIACAEQABACACACQADABAHAAIAAAEg");
	this.shape_17.setTransform(123.275,543);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAQBHIAAgNQgGAHgHADQgFADgIAAQgOAAgLgMQgLgNAAgTQAAgTANgPQALgQATAAQALAAAIAIIAAgRIgBgTIgCgFIgEgBIgGACIgCgEIAagLIAFAAIAABnQAAAQABADQAAABAAABQABAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAHgBIABADIgaALgAgTgJQgJAJAAAUQAAATAIALQAJAKAKAAQAJAAAIgJIAAguQAAgFgDgGQgDgFgFgDQgFgDgEAAQgIAAgHAIg");
	this.shape_18.setTransform(131.3,543.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgOBEQgIgDgJgFIAAhcIAAgTIgDgFIgEgBIgGACIgCgEIAbgLIAFAAIAABBQANgSAOAAQANAAALAMQAKALAAAUQAAAYgQAOQgOANgQAAQgHAAgIgDgAgFgGIgJAGIAAA2QAEAFAGACQAEADAGAAQAJAAAHgKQAIgKAAgSQAAgSgIgIQgHgJgKAAQgFAAgFADg");
	this.shape_19.setTransform(145.575,543.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgZAjQgMgNAAgVQAAgWAMgNQAMgMAQAAQAQAAAJAKQAKAJAAARIg9AAQAAATAKALQAJAMANAAQAIAAAHgFQAGgFAFgMIADACQgCAOgKALQgKAKgPAAQgPAAgLgMgAgPghQgHAGgBALIAoAAQAAgIgCgEQgCgFgFgDQgFgEgEAAQgIAAgGAHg");
	this.shape_20.setTransform(155.475,545.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgDA6QgFgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAFgCAGgFQAGgFAEgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQADAAADgCQAEgCABgEIAEAAQgEAKgGAEQgGAFgGAAQgFAAgDgCg");
	this.shape_21.setTransform(167.75,544.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAACgCQADgCABgEIAAgJIAAgfQAAgPgBgDQgCgFgDgCQgDgDgFAAQgFAAgEADQgFADgIAGIAAAvQAAAJACADQABACACACQADABAHAAIAAAEIgtAAIAAgEQAGAAAEgCQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQACgEAAgIIAAhQQAAgPgBgEQgBgDgCgBIgDgBIgIABIAAgEIAagLIAEAAIAABCQAMgMAFgDQAGgEAHAAQAHAAAFAFQAGAEACAJQACAFAAARIAAAfQAAAJACADQAAABABAAQAAABAAAAQABABAAAAQAAAAABABQADABAGAAIAAAEg");
	this.shape_22.setTransform(175.4,543);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgZAjQgMgNAAgVQAAgWAMgNQAMgMAQAAQAQAAAJAKQAKAJAAARIg9AAQAAATAKALQAJAMANAAQAIAAAHgFQAGgFAFgMIADACQgCAOgKALQgKAKgPAAQgPAAgLgMgAgPghQgHAGgBALIAoAAQAAgIgCgEQgCgFgFgDQgFgEgEAAQgIAAgGAHg");
	this.shape_23.setTransform(155.475,545.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgUBGIAAgEQAGAAACgBQADgBABgDQABgEAAgIIAAhQQAAgPgBgEQAAgDgCgBIgEgBIgGABIgCgEIAagLIAEAAIAAB2QAAAIACAEQABACACACQADABAHAAIAAAEg");
	this.shape_24.setTransform(123.275,543);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAMAsQgDgEAAgIQgNALgDABQgFADgGAAQgKAAgGgGQgGgHAAgKQAAgGADgGQAEgGAKgGQAKgFAWgJIAAgDQAAgNgEgFQgEgFgHAAQgHAAgDADQgEAEAAAEIAAAFQAAAFgCACQgCADgEAAQgEAAgCgDQgCgCAAgFQAAgIAIgHQAJgHAQAAQAKAAAIAEQAGADADAGQABAFAAAMIAAAeIABAPIABAFIADABIADgBIAIgIIAAAGQgLAPgKAAQgFAAgDgDgAgJAAQgIAEgDAFQgDAEAAAGQAAAIAEAEQAEAEAGAAQAHAAALgJIAAgiIgSAIg");
	this.shape_25.setTransform(204.625,545.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgEA6QgEgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAGgCAFgFQAFgFAFgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQAEAAADgCQADgCABgEIAEAAQgDAKgHAEQgGAFgHAAQgEAAgEgCg");
	this.shape_26.setTransform(219.45,544.075);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgRAtIgGgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAIgDAAIAAggIADAAQADAOAHAHQAIAHAIAAQAIAAADgEQAFgEAAgGQAAgGgFgFQgFgFgNgHQgOgGgFgFQgDgGAAgIQgBgLAIgIQAHgHANAAQAEAAAHACIAHABIACAAIACgDIAEAAIAAAeIgEAAQgEgOgFgFQgGgGgIAAQgHAAgEAEQgEAEAAAEQAAAGADADQADAEAJAFIANAHQAVAJgBAPQAAANgJAHQgJAHgMAAQgHAAgKgCg");
	this.shape_27.setTransform(212.8,545.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgHBCQgDgDAAgEQAAgFADgDQADgEAEAAQAEAAADAEQAEADAAAFQAAAEgEADQgDADgEAAQgEAAgDgDgAgBAgIgJhOIAAgIQAAgGADgEQADgEAEAAQAEAAADAEQAEAEAAAHIAAAHIgJBOg");
	this.shape_28.setTransform(225.45,543.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("Ag4BCIAAgDIAFAAQAJAAADgGQACgDAAgLIAAhVQAAgMgDgDQgDgFgIAAIgFAAIAAgDIA7AAIAAADQgKAAgEACQgEACgBAEQgCADAAAMIAABSQAAAIACADQAAAAAAABQAAAAABAAQAAABABAAQAAAAABABQACABAMAAIAKAAQAPAAAGgCQAHgDAFgFQAEgGAGgMIADAAIgLAkg");
	this.shape_29.setTransform(38.45,552.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgEA6QgEgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAGgCAFgFQAGgFAEgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQADAAAEgCQADgCABgEIAEAAQgEAKgGAEQgGAFgHAAQgEAAgEgCg");
	this.shape_30.setTransform(56.35,553.725);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAMArQgDgDAAgIQgNALgDABQgFADgGAAQgKAAgGgGQgGgHAAgKQAAgGADgFQAEgHAKgGQAKgFAWgIIAAgEQAAgNgEgFQgEgFgHAAQgHAAgDADQgEAEAAAEIAAAGQAAAEgCACQgCADgEAAQgEAAgCgDQgCgCAAgEQAAgJAIgHQAJgHAQAAQAKAAAIAEQAGADADAHQABADAAANIAAAeIABAQIABAEIADAAIADAAIAIgIIAAAGQgLAPgKAAQgFAAgDgEgAgJAAQgIAEgDAFQgDAEAAAGQAAAHAEAFQAEAFAGgBQAHAAALgJIAAgiIgSAIg");
	this.shape_31.setTransform(93.275,555.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AggAuIAAgDQAHAAAEgCQACgCABgEIABgJIAAgiQAAgQgBgDQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgHACIAAgEIAbgLIAEAAIAAAUQAKgUAMAAQAFAAAEADQADADAAAFQAAADgCADQgDADgDAAQgEAAgEgDQgEgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQgFAEgDAJIAAAqQAAAIABADQABADADACQADACAGAAIAAADg");
	this.shape_32.setTransform(100.875,555);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgaAjQgLgNABgWQAAgUAMgNQANgNAQAAQANAAAJAHQAIAHAAAHQAAAEgCACQgCACgFAAQgGAAgCgDQgCgCAAgGQgBgGgEgDQgDgDgGAAQgJAAgGAHQgIAKAAAQQAAAPAIAMQAIAMANAAQAJAAAIgGQAFgFAFgMIACACQgDARgKAKQgLAJgNAAQgOAAgMgMg");
	this.shape_33.setTransform(108.5,555.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgDIAAgJIAAghQAAgOgBgDQgCgFgDgDQgEgCgEAAQgFAAgEADQgFACgIAHIAAAwQAAAIABADQABACAEABQACACAHAAIAAAEIgsAAIAAgEQAFAAAEgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgDAAgIIAAhQQAAgQgBgEQAAgDgCgBIgDgBIgHABIgBgDIAagMIAEAAIAABCQAMgMAFgDQAGgDAGAAQAIAAAGADQAFAFADAJQABAFABAQIAAAhQAAAIABADQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAQACACAGAAIAAAEg");
	this.shape_34.setTransform(117.95,552.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgmBFIAAgDIAEAAQAEAAADgCQADgCACgDIABgNIAAg6IgSAAIAAgHIASAAIAAgGQAAgNAEgKQAEgJAJgGQAIgFALAAQAKAAAJAGQAGAFAAAFQAAADgDADQgCACgDAAIgFgBIgGgHQgEgGgDgCQgDgBgEAAQgEAAgDACQgCACgCAFQgBAFAAAVIAAAHIAWAAIAAAHIgWAAIAAA6QAAAMADADQACAFAGAAIAIAAIAAADg");
	this.shape_35.setTransform(132.675,552.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AggAuIAAgDQAHAAAEgCQACgCABgEIABgJIAAgiQAAgQgBgDQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgHACIAAgEIAbgLIAEAAIAAAUQAKgUAMAAQAFAAAEADQADADAAAFQAAADgCADQgDADgDAAQgEAAgEgDQgEgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQgFAEgDAJIAAAqQAAAIABADQABADADACQADACAGAAIAAADg");
	this.shape_36.setTransform(100.875,555);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAhAuIAAgDIABAAQAGgBADgCQACgCABgDIABgJIAAglQAAgMgDgEQgDgHgJAAQgFAAgFAEQgGACgHAHIAAABIAAAEIAAAqQAAAJABACQABACADACQADABAHABIAAADIgsAAIAAgDQAHAAACgCQADgCABgEIABgJIAAglQAAgMgDgFQgFgFgHgBQgFAAgFADQgJAEgEAGIAAAvQAAAIABADQACADACABQACABAIABIAAADIgtAAIAAgDQAHgBACgBQACgBABgDIABgLIAAgiIAAgTIgDgEIgDgBIgHACIgBgEIAbgLIAEAAIAAATIAMgLQAEgEAFgCQAFgCAFAAQAJAAAEAFQAHAEABAKQALgMAGgEQAIgDAHAAQAHAAAFADQAGAEADAJQACAFAAANIAAAlQAAAIABADIAEAEQADABAGABIAAADg");
	this.shape_37.setTransform(164.05,555);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AggAfQgKgNAAgRQAAgLAGgNQAGgMAKgFQAKgGAKAAQAVAAAMAPQAKANAAARQAAALgFANQgGAMgKAGQgKAGgMAAQgUAAgMgQgAgMglQgFADgEAIQgDAIAAAMQAAASAIAOQAIAPALAAQAKAAAGgIQAGgIAAgTQAAgXgKgOQgHgJgKAAQgFAAgFADg");
	this.shape_38.setTransform(139.575,555.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AggAuIAAgDQAHAAAEgCQACgCABgEIABgJIAAgiQAAgQgBgDQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgHACIAAgEIAbgLIAEAAIAAAUQAKgUAMAAQAFAAAEADQADADAAAFQAAADgCADQgDADgDAAQgEAAgEgDQgEgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQgFAEgDAJIAAAqQAAAIABADQABADADACQADACAGAAIAAADg");
	this.shape_39.setTransform(100.875,555);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgZAjQgMgNAAgVQAAgWAMgNQAMgMAQAAQAQAAAJAKQAKAJAAARIg9AAQAAATAKALQAJAMANAAQAIAAAHgFQAGgFAFgMIADACQgCAOgKALQgKAKgPAAQgPAAgLgMgAgPghQgHAGgBALIAoAAQAAgIgCgEQgCgFgFgDQgFgEgEAAQgIAAgGAHg");
	this.shape_40.setTransform(49.075,555.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgaAjQgKgNgBgWQAAgUANgNQANgNAQAAQANAAAIAHQAJAHAAAHQAAAEgCACQgDACgEAAQgGAAgDgDQgBgCgBgGQAAgGgDgDQgEgDgGAAQgJAAgGAHQgIAKAAAQQAAAPAIAMQAIAMAMAAQAKAAAHgGQAGgFAFgMIACACQgDARgKAKQgLAJgNAAQgOAAgMgMg");
	this.shape_41.setTransform(206.8,555.125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgUBGIAAgEQAGAAACgCQADgBABgCQABgDAAgIIAAhRQAAgPgBgEQAAgDgCgBIgEgBIgGABIgCgDIAagMIAEAAIAAB3QAAAIACADQABACACABQADACAHAAIAAAEg");
	this.shape_42.setTransform(214.125,552.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AATAuIAAgSQgMAMgGADQgFADgHAAQgHAAgGgEQgFgEgCgIQgCgGAAgNIAAgmQAAgHgCgCQgBgDgDgBQgDgCgHAAIAAgDIAgAAIAAA7QAAANAEADQAEAEAHAAQADAAAFgDQAFgCAIgIIAAgxQAAgIgDgCQgDgDgJgBIAAgDIAfAAIAAA1QAAAQABAEQAAACACACQABAAAAABQAAAAABAAQAAAAABAAQAAABABAAIAHgCIABADIgbALg");
	this.shape_43.setTransform(221.775,555.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgZAjQgMgNAAgVQAAgWAMgNQAMgMAQAAQAQAAAJAKQAKAJAAARIg9AAQAAATAKALQAJAMANAAQAIAAAHgFQAGgFAFgMIADACQgCAOgKALQgKAKgPAAQgPAAgLgMgAgPghQgHAGgBALIAoAAQAAgIgCgEQgCgFgFgDQgFgEgEAAQgIAAgGAHg");
	this.shape_44.setTransform(49.075,555.125);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgSAtIgEgBQgBAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAIgEAAIAAggIAEAAQACAOAJAHQAHAHAIAAQAHAAAFgEQAEgEAAgGQAAgGgFgFQgEgFgOgHQgOgGgFgFQgEgGAAgIQABgLAHgIQAIgHALAAQAEAAAIACIAHABIACAAIADgDIACAAIAAAeIgCAAQgEgOgGgFQgGgGgIAAQgHAAgEAEQgEAEAAAEQAAAGADADQADAEAJAFIAOAHQATAJABAPQAAANgKAHQgJAHgMAAQgHAAgLgCg");
	this.shape_45.setTransform(239.75,555.125);

	this.movieClip_15 = new lib.Symbol6();
	this.movieClip_15.name = "movieClip_15";
	this.movieClip_15.setTransform(740.25,302.4);

	this.instance_3 = new lib.doorwithlock("synched",0);
	this.instance_3.setTransform(400.6,330.3,1,1,0,0,0,400.6,272.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#75AD5D").s().p("Eg+lAvGIAAjxMB9LAAAIAADxgEg+lgmEIAApBMB9LAAAIAAJBg");
	this.shape_46.setTransform(400.575,301.425);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgpBHIAAiOIATAAIAAB9IBAAAIAAARg");
	this.shape_47.setTransform(36.725,526.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_48.setTransform(46.575,528.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_49.setTransform(46.575,528.775);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AAYBKIggg1IgQARIAAAkIgTAAIAAiTIATAAIAABbIAngwIAWAAIgiAnIApBBg");
	this.shape_50.setTransform(68.4,526.625);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAcAzQgGgDgCgIQgMAOgWAAQgMAAgJgJQgJgJAAgNQAAgQAOgKQAOgLAUAAQAGAAAIADQAAgagWAAQgRAAgKAKIgHgQQAFgEAJgDQAJgDAJAAQAWAAAKAKQAKAKAAAXIAAAkQAAAOAJAFIAAAJQgMAAgFgDgAgQAGQgJAHAAAKQAAARATAAQANAAALgOIAAgZIgNgBQgNAAgIAGg");
	this.shape_51.setTransform(84.125,528.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AggA9QgMgPAAgXQAAgXAOgQQAOgRASAAQAQAAAJAIIAAgxIASAAIAACTIgSAAIAAgIQgKAKgRAAQgUAAgMgOgAgQgGQgJAKAAARQAAAmAhAAQAFAAAGgDQAGgCACgEIAAg5QgHgKgMAAQgOAAgKALg");
	this.shape_52.setTransform(100.625,526.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_53.setTransform(46.575,528.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_54.setTransform(46.575,528.775);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgfA1IAAhnIATAAIAAAQQAKgSAUAAIANABIgHATQgGgFgGAAQgKAAgHAJQgHAJAAANIAAA7g");
	this.shape_55.setTransform(132.6,528.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgKBFQgDgEAAgGQAAgGADgEQAFgFAFAAQAGAAAFAFQADAEAAAGQAAAGgDAEQgFAFgGAAQgFAAgFgFgAgDAiQgIgwAAgTIAAgoIAWAAIAAAoQAAATgIAwg");
	this.shape_56.setTransform(139.5,526.825);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(1,1,1).p("ABSF4ILBAAIAADoIrBAAgAsRpfIYaAAIAACRI4aAAg");
	this.shape_57.setTransform(948.3,251);

	this.button_17 = new lib.Arrow();
	this.button_17.name = "button_17";
	this.button_17.setTransform(706.2,273.4,0.1711,0.1334,-0.4391);
	new cjs.ButtonHelper(this.button_17, 0, 1, 1);

	this.button_18 = new lib.magnifyingglass();
	this.button_18.name = "button_18";
	this.button_18.setTransform(589.2,180.2,1,1,0,0,0,45.2,33.2);
	new cjs.ButtonHelper(this.button_18, 0, 1, 1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#39462B").s().p("AgcAjIAHgjQANg+gVgOQgXgQgeAuQggAuAhAWQAMAIAVgFQgEANgIAKQgTAegWAMQgVAMgQgKQgWgPAKgwQALgvAlg4QAlg4AogcQAngcAXAPQANAJgBAVQAAAVgQA2IgMApQgSA+gHAqIBYiGIgKhWIBQA1IiwEJQgYg4AShWg");
	this.shape_58.setTransform(610.7688,216.8026);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#407D8B").s().p("AiJgWIBhAcIBMhNIgiheICICFIhsBsIAZBag");
	this.shape_59.setTransform(342.725,132.425);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#45321D").s().p("AgcBhQhHgcglgsQglgsAPgoQASgsA+gMQA/gLBJAcQAuASAgAbQAgAcgGAQQgIAVgygTQgbgKgQgLIAEgJQAIgUgngPQgggMgSAJQgTAKgOAkQAogKAyATQA3AVAgAgQAeAggKAaQgKAagzACIgGAAQgyAAg7gWgAgmgFQgUADgFAOQgGANAMAPQAMAPAXAJQA0AUANghQAFgPgKgOQgKgOgXgIQgPgGgPAAIgNABg");
	this.shape_60.setTransform(391.9114,343.137);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#284B85").s().p("AgwAQIAdgVQAxgmgHgZQgIgbgzAPQg3AQALAlQAEAPATAJQgMAGgMAEQgjAJgXgEQgYgFgFgRQgIgZAngeQAngeBBgTQA/gSAxAFQAxAFAHAZQAFAQgOAPQgPAPguAgIgkAWQg2AkgiAbICbgtIAwhHIAaBbIkxBYQASg6BFg3g");
	this.shape_61.setTransform(432.1145,247.0718);

	this.movieClip_19 = new lib.Symbol7();
	this.movieClip_19.name = "movieClip_19";
	this.movieClip_19.setTransform(734.05,251.9);

	this.button_20 = new lib.magnifyingglass();
	this.button_20.name = "button_20";
	this.button_20.setTransform(255.3,90.55);
	new cjs.ButtonHelper(this.button_20, 0, 1, 1);

	this.movieClip_25 = new lib.Symbol8();
	this.movieClip_25.name = "movieClip_25";
	this.movieClip_25.setTransform(446,163);

	this.button_21 = new lib.Arrow();
	this.button_21.name = "button_21";
	this.button_21.setTransform(690.95,333.65,0.2105,0.1486);
	new cjs.ButtonHelper(this.button_21, 0, 1, 1);

	this.instance_4 = new lib.NumberCode("synched",0);
	this.instance_4.setTransform(446.1,163.15,0.8111,0.6805,0,0,0,192.6,172.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgcBCIAAgDIAGAAQAHAAAEgFQACgEAAgLIAAhkIgPAAIgOABQgFACgEAGQgDAFAAAJIgFAAIACgfIBrAAIACAfIgEAAQgBgIgCgEQgDgFgFgDQgFgDgIAAIgTAAIAABkQAAANADADQAEAEAHAAIAFAAIAAADg");
	this.shape_62.setTransform(28.7,541.275);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(1,1,1).p("AgpggIBTAAIAABBIhTAAg");
	this.shape_63.setTransform(16.35,550.975);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#75AD5D").s().p("AgpAhIAAhBIBTAAIAABBg");
	this.shape_64.setTransform(16.35,550.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgDIAAgJIAAggQAAgPgBgDQgCgFgDgDQgDgCgFAAQgFAAgEADQgFACgIAHIAAAwQAAAIABADQACACADABQACACAHAAIAAAEIgsAAIAAgEQAFAAAEgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgEAAgHIAAhQQAAgQgBgEQAAgDgCgBIgDgBIgHABIgBgDIAagMIAEAAIAABCQAMgMAFgDQAGgDAHAAQAHAAAFADQAGAFADAJQABAFAAARIAAAgQABAIABADQAAABABAAQAAABAAAAQABABAAAAQAAAAABAAQACACAHAAIAAAEg");
	this.shape_65.setTransform(39.75,540.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AAMArQgDgDAAgIQgNALgDABQgFADgGAAQgKAAgGgGQgGgHAAgKQAAgGADgFQAEgHAKgGQAKgFAWgIIAAgEQAAgNgEgFQgEgFgHAAQgHAAgDADQgEAEAAAEIAAAGQAAAEgCACQgCADgEAAQgEAAgCgDQgCgCAAgEQAAgJAIgHQAJgHAQAAQAKAAAIAEQAGADADAHQABADAAANIAAAeIABAQIABADIADABIADAAIAIgIIAAAGQgLAPgKAAQgFAAgDgEgAgJAAQgIAEgDAFQgDAEAAAGQAAAHAEAFQAEAFAGgBQAHAAALgJIAAgiIgSAIg");
	this.shape_66.setTransform(49.525,543.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgRAtIgGgBQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAIgEAAIAAggIAEAAQADAOAHAHQAIAHAJAAQAGAAAEgEQAFgEAAgGQAAgGgFgFQgEgFgOgHQgOgGgEgFQgEgGgBgIQAAgLAIgIQAIgHALAAQAFAAAHACIAHABIADAAIABgDIADAAIAAAeIgDAAQgDgOgGgFQgGgGgIAAQgHAAgEAEQgEAEAAAEQAAAGADADQADAEAJAFIANAHQAUAJAAAPQAAANgJAHQgJAHgLAAQgIAAgKgCg");
	this.shape_67.setTransform(68.25,543.425);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgDIAAgJIAAggQAAgPgBgDQgCgFgDgDQgEgCgEAAQgFAAgEADQgFACgIAHIAAAwQAAAIABADQABACAEABQACACAHAAIAAAEIgsAAIAAgEQAFAAAEgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgEAAgHIAAhQQAAgQgBgEQAAgDgCgBIgDgBIgHABIgBgDIAagMIAEAAIAABCQAMgMAFgDQAGgDAGAAQAIAAAGADQAFAFADAJQABAFAAARIAAAgQABAIABADQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAQACACAGAAIAAAEg");
	this.shape_68.setTransform(77,540.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AATAuIAAgTQgMANgGADQgFADgHAAQgHAAgGgEQgFgEgCgIQgCgGAAgNIAAgmQAAgHgCgCQgBgDgDgBQgDgBgHgBIAAgDIAgAAIAAA7QAAANAEADQAEAEAHAAQADAAAFgDQAFgCAIgIIAAgxQAAgIgDgCQgDgDgJgBIAAgDIAfAAIAAA1QAAAQABADQAAADACACQABAAAAABQAAAAABAAQAAAAABAAQAAABABAAIAHgCIABADIgbALg");
	this.shape_69.setTransform(96.975,543.55);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgUBGIAAgEQAGAAACgCQADgBABgCQABgEAAgHIAAhRQAAgPgBgEQAAgDgCgBIgEgBIgGABIgCgDIAagMIAEAAIAAB3QAAAHACAEQABACACABQADACAHAAIAAAEg");
	this.shape_70.setTransform(104.875,540.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AAQBHIAAgNQgGAHgHADQgFADgHAAQgPAAgLgMQgLgNAAgTQAAgTAMgPQAMgQAUAAQAKAAAIAIIAAgRIAAgTIgDgFIgEgBIgHACIgBgEIAbgLIAEAAIAABnQAAAQABADQAAABAAABQAAAAABABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAHgBIABADIgbALgAgTgJQgJAJAAAUQAAATAJALQAIAKALAAQAHAAAJgJIAAguQAAgFgEgGQgCgFgGgDQgEgDgEAAQgIAAgHAIg");
	this.shape_71.setTransform(112.9,541.075);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgEA6QgEgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAFgCAGgFQAFgFAFgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQAEAAACgCQADgCACgEIAEAAQgDAKgHAEQgGAFgHAAQgEAAgEgCg");
	this.shape_72.setTransform(149.35,542.025);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgDIAAgJIAAggQAAgPgBgDQgCgFgDgDQgDgCgFAAQgFAAgEADQgGACgHAHIAAAwQAAAIABADQABACAEABQACACAHAAIAAAEIgsAAIAAgEQAFAAAEgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQACgEgBgHIAAhQQAAgQgBgEQAAgDgBgBIgFgBIgGABIgBgDIAagMIAEAAIAABCQALgMAGgDQAGgDAGAAQAIAAAGADQAFAFADAJQACAFAAARIAAAgQgBAIACADQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAQADACAFAAIAAAEg");
	this.shape_73.setTransform(157,540.95);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgaAjQgKgNgBgWQAAgUANgNQANgNAQAAQANAAAIAHQAJAHAAAHQAAAEgCACQgDACgEAAQgFAAgEgDQgBgCgBgGQAAgGgDgDQgEgDgGAAQgJAAgGAHQgIAKAAAQQAAAPAIAMQAIAMAMAAQAKAAAHgGQAGgFAFgMIADACQgEARgLAKQgKAJgNAAQgOAAgMgMg");
	this.shape_74.setTransform(180.35,543.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAQBHIAAgNQgGAHgHADQgFADgIAAQgOAAgLgMQgLgNAAgTQAAgTANgPQALgQAUAAQAKAAAIAIIAAgRIgBgTIgCgFIgEgBIgGACIgCgEIAagLIAFAAIAABnQAAAQABADQAAABAAABQABAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAHgBIABADIgaALgAgTgJQgJAJAAAUQAAATAIALQAJAKAKAAQAJAAAIgJIAAguQAAgFgDgGQgDgFgFgDQgFgDgEAAQgIAAgHAIg");
	this.shape_75.setTransform(200.15,541.075);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgEA6QgEgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAGgCAFgFQAFgFAFgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQAEAAADgCQADgCABgEIAEAAQgDAKgHAEQgGAFgHAAQgEAAgEgCg");
	this.shape_76.setTransform(56.55,542.025);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AggAfQgKgNAAgRQAAgLAGgNQAGgMAKgFQAKgGAKAAQAVAAAMAPQAKANAAARQAAALgFANQgGAMgKAGQgKAGgMAAQgUAAgMgQgAgMglQgFADgEAIQgDAIAAAMQAAASAIAOQAIAPALAAQAKAAAGgIQAGgIAAgTQAAgXgKgOQgHgJgKAAQgFAAgFADg");
	this.shape_77.setTransform(86.975,543.425);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgDA6QgFgDgCgEQgCgFAAgKIAAg7IgOAAIAAgDQAFgCAGgFQAGgFAEgIIAFgNIADAAIAAAdIAVAAIAAAHIgVAAIAAA5QAAAJADADQACADAEAAQADAAADgCQADgCACgEIAEAAQgEAKgGAEQgGAFgGAAQgFAAgDgCg");
	this.shape_78.setTransform(242.15,542.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AAFBGIAAgEIACAAQAGAAADgCQACgCABgDIAAgJIAAggQAAgPgBgDQgCgFgDgDQgEgCgEAAQgFAAgEADQgFACgIAHIAAAwQAAAIABADQABACAEABQACACAHAAIAAAEIgsAAIAAgEQAFAAAEgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgEAAgHIAAhQQAAgQgBgEQAAgDgCgBIgDgBIgHABIgBgDIAagMIAEAAIAABCQAMgMAFgDQAGgDAGAAQAIAAAGADQAFAFADAJQACAFAAARIAAAgQAAAIABADQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAQACACAGAAIAAAEg");
	this.shape_79.setTransform(249.8,540.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAQBHIAAgNQgHAHgGADQgFADgIAAQgOAAgLgMQgLgNAAgTQAAgTANgPQAMgQASAAQALAAAIAIIAAgRIgBgTIgCgFIgEgBIgGACIgCgEIAbgLIAEAAIAABnQAAAQABADQAAABAAABQABAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAHgBIABADIgaALgAgTgJQgJAJAAAUQAAATAIALQAJAKAKAAQAIAAAJgJIAAguQAAgFgDgGQgEgFgFgDQgEgDgEAAQgJAAgGAIg");
	this.shape_80.setTransform(274.05,541.075);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AggAfQgKgNAAgRQAAgLAGgNQAGgMAKgFQAKgGAKAAQAVAAAMAPQAKANAAARQAAALgFANQgGAMgKAGQgKAGgMAAQgUAAgMgQgAgMglQgFADgEAIQgDAIAAAMQAAASAIAOQAIAPALAAQAKAAAGgIQAGgIAAgTQAAgXgKgOQgHgJgKAAQgFAAgFADg");
	this.shape_81.setTransform(86.975,543.425);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AggAfQgKgNAAgRQAAgLAGgNQAGgMAKgFQAKgGAKAAQAVAAAMAPQAKANAAARQAAALgFANQgGAMgKAGQgKAGgMAAQgUAAgMgQgAgMglQgFADgEAIQgDAIAAAMQAAASAIAOQAIAPALAAQAKAAAGgIQAGgIAAgTQAAgXgKgOQgHgJgKAAQgFAAgFADg");
	this.shape_82.setTransform(86.975,543.425);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AggAuIAAgDQAHAAAEgCQACgCABgEIABgJIAAgiQAAgPgBgEQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgHACIAAgEIAbgLIAEAAIAAAUQAKgUAMAAQAFAAAEADQADADAAAFQAAADgCADQgDADgDAAQgEAAgEgDQgEgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQgFAEgDAJIAAAqQAAAIABADQABADADACQADACAGAAIAAADg");
	this.shape_83.setTransform(302.175,543.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgHBCQgDgDAAgEQAAgFADgDQADgEAEABQAEgBADAEQAEADAAAFQAAAEgEADQgDADgEAAQgEAAgDgDgAgBAgIgJhPIAAgIQAAgFADgEQADgEAEAAQAEAAADAEQAEADAAAIIAAAGIgJBPg");
	this.shape_84.setTransform(308.7,541.25);

	this.button_22 = new lib.Arrow();
	this.button_22.name = "button_22";
	this.button_22.setTransform(719.15,271.7,0.1478,0.164);
	new cjs.ButtonHelper(this.button_22, 0, 1, 1);

	this.instance_5 = new lib.doorunlock();
	this.instance_5.setTransform(221,0,1.8311,1.7496);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#75AD5D").s().p("Eg+nAvpMAAAhfRMB9PAAAMAAABfRg");
	this.shape_85.setTransform(400.9,298.925);

	this.instance_6 = new lib.Dooropen();
	this.instance_6.setTransform(-55,0,1.5097,1.6046);
	this.instance_6._off = true;

	this.button_29 = new lib.Link();
	this.button_29.name = "button_29";
	this.button_29.setTransform(115.65,549.75,0.6138,0.5669,0,0,0,137.9,70.7);
	new cjs.ButtonHelper(this.button_29, 0, 1, 1);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AhwB3QgvgLAAgSQAAgSAwgMQghgPAAgbQAAgSAJgJQAJgKAagMQgfgNAAgSQAAgVAngQQAngPA1AAQA1AAAnASIAAgHQAAgaAiAAQAhgBAAAXQAAARgYAAIgEAAIABgHQAAgMgKAAQgLgBAAANQAAAHACACIAJALQAHAIAAAIQAAAVglAPQgkAPg1AAQgbAAgRgFIgTgEQgHgBgHAAQgcAAAAAOQAAAKASAAIAZgBIAygCIA6gBQAzAAAeASQAeASAAAeQAABBiXAAQhJAAgwgMgAhYBRQAAAVBagBQBkABAAgTQAAgRgwAAIiCAAQgMAIAAAHgAgmg+QAAAbAkAAQAjAAAAgbQAAgagigBQglABAAAag");
	this.shape_86.setTransform(735.425,219.65);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AADBWIApgkIAAg3QAAgigmAAQgVAAgOANQgOAOAAAVIAAApIApAkIjMAAIBCgrIAAhNIhCgrICfgEIAAAtQATgcAVgKQATgKAjAAQBeAAAAA9IAABCIBCArg");
	this.shape_87.setTransform(699.875,216.35);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AhxB6IBCgqIAAhPIhCgqICigDIAAB8IBBAqgAglhBQgPgKgBgNQABgNAPgKQAQgKATAAQAUAAAPAKQAQAKAAANQAAANgQAKQgPAKgUAAQgTAAgQgKg");
	this.shape_88.setTransform(669.05,212.7);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AhyBvQgagMAAgSQAAgOATgKQATgLAZAAQAKAAASADQgFANAAAIQAAASASAAQAQAAAHgOIAKgTIh+iGIhOgrIDpAAIgqAlIA4BCIAmhAIgugnICwAAIhAArIhTCSQgRAegZANQgZANgrAAQgoAAgZgMg");
	this.shape_89.setTransform(639.45,220.425);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAZA2QgSAUgWAIQgWAHgoAAQhXAAAAgpQAAgrBRgLIAUgDIBRgLIAAgOQAAgUgmAAQgwAAgBAWQAAAFAGAHQgZAGghAAQglAAAAgWQAAgXApgPQApgOBBAAQBDAAAeANQAdANABAeIAAA+QAAAZANAAQAOAAAAgUIgBgOQAXADAAAXQAAAqhIAAQg6AAgKgjgAgVAMIgMACQghAEAAATQAAASAeAAQAYAAAOgKQARgKgBgPIAAgOg");
	this.shape_90.setTransform(604.85,216.725);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AhyB7IBCgrIAAibIhCgrICigDIAADJIBDArg");
	this.shape_91.setTransform(576.975,212.65);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AjtB1IBVg3IAAh8IhVg2IE0AAQBJAAAvAYQAvAYAAAlQAAAggoAUQgoAThGAAIh3AAIAAAWIBUA3gAgfgDIBYAAQAeAAALgHQALgHAAgTQAAgkgzAAIhZAAg");
	this.shape_92.setTransform(542.75,213.225);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AigBUIBDgrIAAhNIhCgrICfgEIAAAzQAegyA0gBQAiAAAXAOQAWAOAAAVQAAAlg4AAQgOAAgXgDQAJgNAAgKQAAgVgYAAQgVAAgOARQgPARAAAYIAAAbIBOArg");
	this.shape_93.setTransform(492.425,216.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AhxBAQgwgbAAglQAAglAxgaQAwgbBEAAQA+AAAwAdQAwAdAAAkQAAAkgvAZQgwAahDAAQhCAAgvgbgAg3ABQAAA3A3AAQA3AAAAg2QAAg5g3AAQg3AAAAA4g");
	this.shape_94.setTransform(459.775,216.725);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AjkB1IBWg3IAAh8IhWg2IHJAAIAABxIhbhHIigAAIAAAwIBWAAIBEgcIAABwIhEgiIhWAAIAAAmIBWA3g");
	this.shape_95.setTransform(419.025,213.225);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AhyBJQgbgQAAgWIAAhLIhDgrICkgDIAABcQgBAVAJAJQAIAJAWgBQAWAAAOgNQAPgOABgUIAAglIhOgrICvgDIAAB8IBCAqIijAAIAAgjQghAqg+AAQgmABgbgPg");
	this.shape_96.setTransform(365.6,216.9);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AhxBAQgwgbAAglQAAglAxgaQAwgbBEAAQA+AAAwAdQAwAdAAAkQAAAkgvAZQgwAahDAAQhCAAgvgbgAg3ABQAAA3A3AAQA3AAAAg2QAAg5g3AAQg3AAAAA4g");
	this.shape_97.setTransform(329.225,216.725);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AiOB1IBWg3IAAgeIhuhpIhOgrIERAAIg5ArIA9A5IA8g9Ig7gnIDTAAIhNAvIhrBlIAAAeIBWA3g");
	this.shape_98.setTransform(289.825,213.225);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgDB7IApgkIgkgiIg3AfIAtAnIjQAAIBCgsIAAiaIhCgrICjgDIAACfIBHgpIg3gpIDrAAIh0A/IBFA8IBCAsg");
	this.shape_99.setTransform(236.975,212.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AADBWIApgkIAAg3QAAgigmAAQgVAAgOANQgOAOAAAVIAAApIApAkIjMAAIBCgrIAAhNIhCgrICfgEIAAAtQATgcAVgKQATgKAjAAQBeAAAAA9IAABCIBCArg");
	this.shape_100.setTransform(196.725,216.35);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAZA2QgSAUgVAIQgXAHgoAAQhXAAAAgpQAAgrBQgLIAVgDIBSgLIAAgOQAAgUgnAAQgxAAABAWQAAAFAFAHQgZAGghAAQglAAAAgWQAAgXAogPQApgOBBAAQBEAAAeANQAdANAAAeIAAA+QAAAZAOAAQAOAAAAgUIgCgOQAYADAAAXQAAAqhIAAQg6AAgKgjgAgVAMIgMACQghAEAAATQAAASAdAAQAZAAAPgKQAQgKAAgPIAAgOg");
	this.shape_101.setTransform(159.85,216.725);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAIB7IAqgnIAAg0QAAgkgkAAQgzAAAAAzIAAAlIAoAnIjXAAIBNgrIAAibIhCgrICkgDIAAByQAjgoA0AAQAtAAAaAQQAaARAAAbIAABDIBCArg");
	this.shape_102.setTransform(121.975,212.65);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AiRB1IBWg3IAAiIIg3AAIhZBHIAIhxIGHAAIAIBxIhZhHIg3AAIAACIIBWA3g");
	this.shape_103.setTransform(81.675,213.225);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("Eg/tAv0MAAAhfnMB/bAAAMAAABfng");
	this.shape_104.setTransform(407.8,304.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}}]},574).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_20,p:{x:155.475,y:545.475}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_20,p:{x:155.475,y:545.475}},{t:this.shape_21}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_20,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_17,p:{x:123.275}},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_24},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}},{t:this.shape_17,p:{x:197.175}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_24},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}},{t:this.shape_17,p:{x:197.175}},{t:this.shape_25}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_24},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}},{t:this.shape_17,p:{x:197.175}},{t:this.shape_25},{t:this.shape_27},{t:this.shape_26,p:{x:219.45,y:544.075}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_24},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}},{t:this.shape_17,p:{x:197.175}},{t:this.shape_25},{t:this.shape_27},{t:this.shape_26,p:{x:219.45,y:544.075}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11},{t:this.shape_12,p:{x:73.85,y:545.475}},{t:this.shape_13,p:{x:86.65,y:545.475}},{t:this.shape_14},{t:this.shape_15,p:{x:105.375,y:545.475}},{t:this.shape_16},{t:this.shape_24},{t:this.shape_18},{t:this.shape_19,p:{x:145.575,y:543.125}},{t:this.shape_23,p:{x:155.475,y:545.475}},{t:this.shape_21},{t:this.shape_22},{t:this.shape_20,p:{x:184.925,y:545.475}},{t:this.shape_17,p:{x:197.175}},{t:this.shape_25},{t:this.shape_27},{t:this.shape_26,p:{x:219.45,y:544.075}},{t:this.shape_28}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}}]},5).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29}]},25).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_20,p:{x:49.075,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_20,p:{x:49.075,y:555.125}},{t:this.shape_30}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_20,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_20,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_32,p:{x:100.875}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_32,p:{x:100.875}},{t:this.shape_33}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_32,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_32,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_32,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_15,p:{x:139.575,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_36,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_15,p:{x:139.575,y:555.125}},{t:this.shape_32,p:{x:148.075}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_36,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_15,p:{x:139.575,y:555.125}},{t:this.shape_32,p:{x:148.075}},{t:this.shape_37}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_36,p:{x:100.875}},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_32,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_23,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_20,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_40,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_23,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_20,p:{x:192.975,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_40,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_23,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_20,p:{x:192.975,y:555.125}},{t:this.shape_41}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_40,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_23,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_20,p:{x:192.975,y:555.125}},{t:this.shape_41},{t:this.shape_42}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_40,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_23,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_20,p:{x:192.975,y:555.125}},{t:this.shape_41},{t:this.shape_42},{t:this.shape_43}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_44,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_40,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_23,p:{x:192.975,y:555.125}},{t:this.shape_41},{t:this.shape_42},{t:this.shape_43},{t:this.shape_20,p:{x:231.325,y:555.125}}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_29},{t:this.shape_44,p:{x:49.075,y:555.125}},{t:this.shape_30},{t:this.shape_12,p:{x:63.05,y:555.125}},{t:this.shape_13,p:{x:75.85,y:555.125}},{t:this.shape_40,p:{x:84.125,y:555.125}},{t:this.shape_31},{t:this.shape_39},{t:this.shape_33},{t:this.shape_34},{t:this.shape_35},{t:this.shape_38,p:{x:139.575,y:555.125}},{t:this.shape_36,p:{x:148.075}},{t:this.shape_37},{t:this.shape_15,p:{x:176.775,y:555.125}},{t:this.shape_32,p:{x:185.275}},{t:this.shape_23,p:{x:192.975,y:555.125}},{t:this.shape_41},{t:this.shape_42},{t:this.shape_43},{t:this.shape_20,p:{x:231.325,y:555.125}},{t:this.shape_45}]},1).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}}]},4).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.movieClip_15}]},25).to({state:[{t:this.shape_46},{t:this.instance_3}]},25).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47}]},25).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_48,p:{x:46.575}}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_49,p:{x:46.575}},{t:this.shape_48,p:{x:57.325}}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_49,p:{x:46.575}},{t:this.shape_48,p:{x:57.325}},{t:this.shape_50}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_49,p:{x:46.575}},{t:this.shape_48,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_49,p:{x:46.575}},{t:this.shape_48,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51},{t:this.shape_52}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_53,p:{x:46.575}},{t:this.shape_49,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51},{t:this.shape_52},{t:this.shape_48,p:{x:111.875}}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_54},{t:this.shape_53,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51},{t:this.shape_52},{t:this.shape_49,p:{x:111.875}},{t:this.shape_48,p:{x:122.625}}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_54},{t:this.shape_53,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51},{t:this.shape_52},{t:this.shape_49,p:{x:111.875}},{t:this.shape_48,p:{x:122.625}},{t:this.shape_55}]},1).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.shape_47},{t:this.shape_54},{t:this.shape_53,p:{x:57.325}},{t:this.shape_50},{t:this.shape_51},{t:this.shape_52},{t:this.shape_49,p:{x:111.875}},{t:this.shape_48,p:{x:122.625}},{t:this.shape_55},{t:this.shape_56}]},1).to({state:[{t:this.shape_46},{t:this.shape_57},{t:this.instance_3}]},16).to({state:[{t:this.shape_46},{t:this.instance_3},{t:this.button_17}]},25).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.button_18}]},25).to({state:[{t:this.instance_2,p:{scaleX:2.7915,scaleY:2.5098,x:110.3,y:700,regX:402,regY:318}},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]},25).to({state:[{t:this.instance_2,p:{scaleX:2.7915,scaleY:2.5098,x:110.3,y:700,regX:402,regY:318}},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.movieClip_19}]},25).to({state:[{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.button_20}]},25).to({state:[{t:this.instance_2,p:{scaleX:5.237,scaleY:3.5723,x:733.35,y:938.35,regX:401.7,regY:317.8}},{t:this.movieClip_25}]},20).to({state:[{t:this.instance_2,p:{scaleX:5.237,scaleY:3.5723,x:733.35,y:938.35,regX:401.7,regY:317.8}},{t:this.instance_4},{t:this.button_21}]},20).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62}]},11).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_20,p:{x:137.075,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_20,p:{x:137.075,y:543.425}},{t:this.shape_72}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_20,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_23,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_20,p:{x:166.525,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_15,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_23,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_20,p:{x:166.525,y:543.425}},{t:this.shape_74}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_38,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_23,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_20,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_15,p:{x:189.775,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_38,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_23,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_20,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_15,p:{x:189.775,y:543.425}},{t:this.shape_75}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_26,p:{x:56.55,y:542.025}},{t:this.shape_67},{t:this.shape_68},{t:this.shape_38,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_40,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_23,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_15,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_20,p:{x:209.325,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_38,p:{x:86.975,y:543.425}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_40,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_23,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_15,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_20,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_77,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_40,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_23,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_38,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_20,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_15,p:{x:229.225,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_77,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_40,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_23,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_38,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_20,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_15,p:{x:229.225,y:543.425}},{t:this.shape_78}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_77,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_40,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_23,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_38,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_20,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_15,p:{x:229.225,y:543.425}},{t:this.shape_78},{t:this.shape_79}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_77,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_38,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_15,p:{x:229.225,y:543.425}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_77,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_38,p:{x:189.775,y:543.425}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_15,p:{x:229.225,y:543.425}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}},{t:this.shape_80}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_81,p:{x:86.975}},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_77,p:{x:189.775}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_38,p:{x:229.225,y:543.425}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}},{t:this.shape_80},{t:this.shape_15,p:{x:283.675,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_82},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_81,p:{x:189.775}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_77,p:{x:229.225}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}},{t:this.shape_80},{t:this.shape_38,p:{x:283.675,y:543.425}},{t:this.shape_15,p:{x:293.675,y:543.425}}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_82},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_81,p:{x:189.775}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_77,p:{x:229.225}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}},{t:this.shape_80},{t:this.shape_38,p:{x:283.675,y:543.425}},{t:this.shape_15,p:{x:293.675,y:543.425}},{t:this.shape_83}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.shape_62},{t:this.shape_65},{t:this.shape_66},{t:this.shape_76},{t:this.shape_67},{t:this.shape_68},{t:this.shape_82},{t:this.shape_69},{t:this.shape_70},{t:this.shape_71},{t:this.shape_19,p:{x:127.175,y:541.075}},{t:this.shape_44,p:{x:137.075,y:543.425}},{t:this.shape_72},{t:this.shape_73},{t:this.shape_40,p:{x:166.525,y:543.425}},{t:this.shape_74},{t:this.shape_81,p:{x:189.775}},{t:this.shape_75},{t:this.shape_23,p:{x:209.325,y:543.425}},{t:this.shape_26,p:{x:221.6,y:542.025}},{t:this.shape_77,p:{x:229.225}},{t:this.shape_78},{t:this.shape_79},{t:this.shape_20,p:{x:259.325,y:543.425}},{t:this.shape_80},{t:this.shape_38,p:{x:283.675,y:543.425}},{t:this.shape_15,p:{x:293.675,y:543.425}},{t:this.shape_83},{t:this.shape_84}]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.instance_2,p:{scaleX:1,scaleY:1,x:402,y:318,regX:402,regY:318}},{t:this.button_22}]},6).to({state:[{t:this.shape_46},{t:this.instance_3}]},10).to({state:[{t:this.shape_46},{t:this.instance_3}]},10).to({state:[]},1).to({state:[{t:this.shape_85},{t:this.instance_5}]},60).to({state:[{t:this.instance_6}]},9).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.button_29}]},5).to({state:[{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86}]},10).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1049).to({_off:false},0).wait(5).to({scaleX:1.6663,scaleY:1.8663,x:-103,y:-56},0).wait(5).to({scaleX:1.8558,scaleY:2.1933,x:-161,y:-126},0).wait(5).to({scaleX:2.2609,scaleY:2.7631,x:-285,y:-248},0).wait(5).to({scaleX:2.5749,scaleY:3.3803,x:-381,y:-380},0).wait(5).to({scaleX:3.6469,scaleY:4.8393,x:-709,y:-692},0).wait(5).to({scaleX:6.366,scaleY:7.345,x:-1541,y:-1228},0).wait(5).to({scaleX:10.8906,scaleY:10.1852,x:-2925,y:-1835},0).to({_off:true},5).wait(11));

	// Background_2
	this.instance_7 = new lib.Background2_1("synched",0);
	this.instance_7.setTransform(403.8,304.4,1,1,0,0,0,403.8,304.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgpBHIAAiOIATAAIAAB9IBAAAIAAARg");
	this.shape_105.setTransform(17.675,526.1);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQANgOATAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASAKAKQAKAJANAAQAPAAALgKIAHAOQgDAEgKADQgLAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgMAAgIAIg");
	this.shape_106.setTransform(27.6,528.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AgLA7QgJgKAAgOIAAg6IgMAAIAAgPIAMAAIAAgWIASgHIAAAdIAcAAIAAAPIgcAAIAAAzQABANADAGQAEAFAKAAQAIAAAHgEIADARQgMADgOAAQgLAAgIgJg");
	this.shape_107.setTransform(37.15,526.675);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AghAuIAHgSQAPALAJAAQARAAgBgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgCgEABgFQAAgNAJgHQAKgHAOAAQALAAARAHIgFARQgLgJgLAAQgGAAgEADQgFAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgQAAgPgIg");
	this.shape_108.setTransform(48.25,528.025);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgGATIgCglIARAAIgCAlg");
	this.shape_109.setTransform(42.6,520.775);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AgRArIAAh1IARAAIAAByQAAAIAGAFQAFAFAHAAIAAARQgjAAAAggg");
	this.shape_110.setTransform(61.6,525.975);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_111.setTransform(69.575,528.025);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_112.setTransform(69.575,528.025);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AAYBKIggg1IgRARIAAAkIgSAAIAAiTIASAAIAABbIAogwIAVAAIghAnIApBBg");
	this.shape_113.setTransform(91.4,525.875);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgSBKIAAhYIgPAAIAAgQIAPAAQAAgUAKgLQAJgMAQAAQAIAAAJADIgFAOQgGgCgFAAQgIAAgGAGQgEAHAAAKIAAAFIAVAAIAAAQIgVAAIAABYg");
	this.shape_114.setTransform(105.925,525.875);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_115.setTransform(69.575,528.025);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgfA1IAAhnIATAAIAAAQQAKgSAUAAIANABIgHATQgGgFgGAAQgKAAgHAJQgHAJAAANIAAA7g");
	this.shape_116.setTransform(124.6,527.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("AgcAoQgOgPAAgYQAAgYAOgPQAPgPAYAAQAIAAAJADQAKAEAFADIgJANQgEgDgGgCQgIgDgHAAQgOAAgIALQgJALAAARQAAASAJAKQAIAKAPAAQANAAANgKIAHAQQgPAJgWAAQgUAAgOgOg");
	this.shape_117.setTransform(138.75,528.025);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AgRArIAAh1IARAAIAAByQABAIAFAFQAEAFAIAAIAAARQgjAAAAggg");
	this.shape_118.setTransform(146.95,525.975);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AggArQgJgKgBgSIAAhDIATAAIAABBQABAZAUAAQAIAAAIgGQAHgFADgHIAAhIIASAAIAABnIgSAAIAAgOQgDAGgKAFQgJAFgIAAQgRAAgJgKg");
	this.shape_119.setTransform(155,528.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQAOgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQABASAJAKQAKAJANAAQAPAAALgKIAIAOQgFAEgJADQgLAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgMAAgIAIg");
	this.shape_120.setTransform(165.95,528.025);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AghAuIAHgSQAPALAKAAQAQAAAAgPQgBgKgPgIQgNgGgEgCIgIgGIgFgJQgBgEgBgFQAAgNAKgHQAJgHAPAAQALAAARAHIgFARQgLgJgLAAQgGAAgEADQgFAEAAAEQAAAKAMAGIAMAGQAMAFAFAGQAGAHAAALQAAAOgKAIQgKAIgQAAQgQAAgPgIg");
	this.shape_121.setTransform(175.45,528.025);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("AgDBIIAAhYIgOAAIAAgPIAgAAIAABngAAAgzQgEgEAAgEQAAgGADgDQADgDAFAAQAEAAAEAEQADACAAAGQAAAEgDAEQgEADgEAAQgGAAgBgDg");
	this.shape_122.setTransform(188.15,526.05);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AAXA1IAAg8QAAgQgFgHQgFgHgMAAQgFAAgHAEQgHAEgEAGIAABMIgTAAIAAhnIAOAAIAFANQAKgPATAAQAjAAAAAqIAAA/g");
	this.shape_123.setTransform(196.7,527.925);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AgLA7QgJgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIATgHIAAAdIAbAAIAAAPIgbAAIAAAzQgBANAEAGQAFAFAJAAQAHAAAIgEIADARQgMADgNAAQgMAAgIgJg");
	this.shape_124.setTransform(212.35,526.675);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AAXBKIAAhCQAAgLgGgGQgFgHgLAAQgGAAgGAEQgHAEgEAFIAABNIgSAAIAAiTIASAAIAAA3QAEgGAIgEQAJgEAHAAQARAAAKALQAJALAAASIAABCg");
	this.shape_125.setTransform(221.65,525.875);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAOgOATAAQAWAAANAMQAMAMAAAUIgBALIhKAAQgBASALAKQAJAJAMAAQAQAAALgKIAHAOQgEAEgIADQgMAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_126.setTransform(232.6,528.025);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AgcAoQgOgPAAgYQAAgYAPgPQAOgPAYAAQAIAAAKADQAJAEAEADIgJANQgCgDgIgCQgHgDgGAAQgPAAgJALQgJALAAARQAAASAJAKQAKAKAPAAQAMAAANgKIAHAQQgPAJgWAAQgUAAgOgOg");
	this.shape_127.setTransform(249.05,528.025);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AAcAzQgGgDgCgIQgMAOgWAAQgMAAgJgJQgJgJAAgNQAAgQAOgKQAOgLAUAAQAGAAAIADQAAgagWAAQgRAAgKAKIgHgQQAFgEAJgDQAJgDAJAAQAWAAAKAKQAKAKAAAXIAAAkQAAAOAJAFIAAAJQgMAAgFgDgAgQAGQgJAHAAAKQAAARATAAQANAAALgOIAAgZIgNgBQgNAAgIAGg");
	this.shape_128.setTransform(259.275,528.025);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgRBIQgIgDgDgEIgHAKIgJAAIAAiVIASAAIAAAzQADgEAHgDQAHgDAIAAQAUAAANAPQANAPABAWQAAAagOAPQgNAPgWAAQgIAAgGgDgAgSgOQgGADgCACIAAA7QAAACAHAEQAHADAEAAQASAAAIgJQAIgJAAgVQAAgSgJgJQgKgKgPAAQgDAAgHADg");
	this.shape_129.setTransform(270.3,525.975);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AgDBIIAAhYIgOAAIAAgPIAfAAIAABngAgBgzQgDgEAAgEQAAgGADgDQACgDAFAAQAFAAADAEQAEACAAAGQAAAEgEAEQgDADgFAAQgEAAgDgDg");
	this.shape_130.setTransform(278.2,526.05);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQANgOATAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASAKAKQAKAJANAAQAPAAALgKIAIAOQgFAEgJADQgLAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgMAAgIAIg");
	this.shape_131.setTransform(297.7,528.025);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AAXA1IAAg8QAAgQgFgHQgFgHgMAAQgFAAgHAEQgHAEgEAGIAABMIgSAAIAAhnIAMAAIAGANQAJgPAUAAQAiAAAAAqIAAA/g");
	this.shape_132.setTransform(286.75,527.925);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AgMA7QgIgKAAgOIAAg6IgMAAIAAgPIAMAAIAAgWIASgHIAAAdIAcAAIAAAPIgcAAIAAAzQABANADAGQAEAFAKAAQAHAAAIgEIACARQgLADgOAAQgLAAgJgJg");
	this.shape_133.setTransform(307.25,526.675);

	this.button_10 = new lib.magnifyingglass();
	this.button_10.name = "button_10";
	this.button_10.setTransform(397.85,434.1);
	new cjs.ButtonHelper(this.button_10, 0, 1, 1);

	this.movieClip_11 = new lib.Symbol3();
	this.movieClip_11.name = "movieClip_11";
	this.movieClip_11.setTransform(363.6,293.15);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(1,1,1).p("EhApgxgMCBTAAAQDPAACTCSQCSCTAADPMAAABTZQAADPiSCTQiTCSjPAAMiBTAAAQjPAAiTiSQiSiTAAjPMAAAhTZQAAjPCSiTQCTiSDPAAg");
	this.shape_134.setTransform(395.875,300.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#663300").s().p("EhApAxhQjPAAiTiSQiSiTAAjPMAAAhTZQAAjPCSiTQCTiSDPAAMCBTAAAQDPAACTCSQCSCTAADPMAAABTZQAADPiSCTQiTCSjPAAg");
	this.shape_135.setTransform(395.875,300.9);

	this.button_12 = new lib.Arrow();
	this.button_12.name = "button_12";
	this.button_12.setTransform(650.2,132.15,0.3022,0.2658);
	new cjs.ButtonHelper(this.button_12, 0, 1, 1);

	this.button_13 = new lib.Arrow();
	this.button_13.name = "button_13";
	this.button_13.setTransform(643.95,167.8,0.2397,0.2031);
	new cjs.ButtonHelper(this.button_13, 0, 1, 1);

	this.button_14 = new lib.Arrow();
	this.button_14.name = "button_14";
	this.button_14.setTransform(71.3,246.8,0.1459,0.1773,0,0,180);
	new cjs.ButtonHelper(this.button_14, 0, 1, 1);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AAhBJIghhiIggBiIgGAAIgtiQIAUAAIAdBjIAfhjIAGAAIAfBiIAehiIAUAAIgtCQg");
	this.shape_136.setTransform(39.225,510.25);

	this.instance_8 = new lib.Background1();
	this.instance_8.setTransform(-13,0,0.5074,0.709);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAPgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASALAKQAIAJANAAQAQAAALgKIAIAOQgEAEgKADQgKAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_137.setTransform(52.3,512.075);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AgXBJQgLgEgHgFIAKgPQAQALAOAAQAMAAAHgEQAHgFAAgGQAAgNgSAAIgKACIgNABQgXAAAAgRQAAgFAGgEQAFgEAIgCQgWgJAAgaQAAgQALgLQALgLARAAQAPAAAIAGIAKgLIAMALIgLAJQAHAJAAAPQAAAQgKALQgKAJgQACIgOABIgIADQgEABAAADQAAAEAJAAIANgBIANgCQAPAAAJAIQAIAHAAANQAAAOgNAJQgNAJgSAAQgLAAgLgDgAgRgxQgGAHAAAKQAAALAGAHQAFAHAKAAQAJAAAGgHQAFgHAAgLQAAgKgFgHQgHgGgIAAQgJAAgGAGg");
	this.shape_138.setTransform(68.925,513.775);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AgLA7QgJgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIATgHIAAAdIAbAAIAAAPIgbAAIAAAzQgBANAEAGQAFAFAJAAQAHAAAIgEIADARQgMADgOAAQgLAAgIgJg");
	this.shape_139.setTransform(88.7,510.725);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AgMA7QgIgKAAgOIAAg6IgMAAIAAgPIAMAAIAAgWIASgHIAAAdIAcAAIAAAPIgcAAIAAAzQAAANAEAGQAFAFAJAAQAHAAAIgEIACARQgLADgNAAQgMAAgJgJg");
	this.shape_140.setTransform(102.7,510.725);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AAXBKIAAhCQAAgLgFgGQgHgHgKAAQgGAAgGAEQgHAEgEAFIAABNIgTAAIAAiTIATAAIAAA3QAEgGAJgEQAHgEAIAAQARAAAKALQAIALABASIAABCg");
	this.shape_141.setTransform(112,509.925);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAPgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASALAKQAIAJANAAQAQAAALgKIAIAOQgEAEgKADQgKAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_142.setTransform(52.3,512.075);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AAdBIIgohDIgTAbIAAAoIgTAAIAAiOIATAAIAABNIA1hNIAVAAIgqA+IAwBQg");
	this.shape_143.setTransform(140.925,510.15);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQAOgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQABASAJAKQAKAJAMAAQAQAAALgKIAIAOQgFAEgJADQgKAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgLAAgJAIg");
	this.shape_144.setTransform(150.75,512.075);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AgkA4QALAAAJgFQAIgGAAgHQAAgJgDgIIgIgVIgchIIATAAIAeBQIAbhQIATAAIgsB6QgEAJgKAHQgMAHgOAAg");
	this.shape_145.setTransform(161.125,514.125);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AgQAYQAQgOAAgJQAAgEgCgEQgIgEAAgHQAAgGAEgDQAEgDAFAAQAFAAAEAEQAFAFAAAGQAAANgGAKQgFAKgRANg");
	this.shape_146.setTransform(166.975,517.725);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AArBJIhJhoIAABmIgSAAIAAiOIAIAAIBHBiIAAhiIASAAIAACQg");
	this.shape_147.setTransform(183.375,510.25);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AAeA2IgehHIgdBHIgGAAIglhrIAUAAIAWBFIAchFIAEAAIAcBFIAYhFIATAAIglBrg");
	this.shape_148.setTransform(207.95,512.15);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AgRArIAAh1IARAAIAAByQAAAIAGAFQAEAFAIAAIAAARQgjAAAAggg");
	this.shape_149.setTransform(224.7,510.025);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAPgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASALAKQAIAJANAAQAQAAALgKIAIAOQgEAEgKADQgKAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_150.setTransform(52.3,512.075);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AgMA7QgIgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIASgHIAAAdIAcAAIAAAPIgcAAIAAAzQAAANAEAGQAFAFAJAAQAIAAAHgEIACARQgLADgNAAQgMAAgJgJg");
	this.shape_151.setTransform(242.3,510.725);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("AghAuIAGgSQAQALAKAAQAQAAAAgPQAAgKgQgIQgNgGgEgCIgIgGIgFgJQgCgEAAgFQAAgNAKgHQAKgHANAAQAMAAARAHIgFARQgLgJgLAAQgGAAgFADQgEAEAAAEQAAAKAMAGIAMAGQAMAFAFAGQAGAHAAALQAAAOgKAIQgJAIgRAAQgQAAgPgIg");
	this.shape_152.setTransform(253.4,512.075);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("AgFATIgDglIARAAIgDAlg");
	this.shape_153.setTransform(247.75,504.825);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AgXBJQgLgEgHgFIAKgPQAQALAOAAQAMAAAHgEQAHgFAAgGQAAgNgSAAIgKACIgNABQgXAAAAgRQAAgFAGgEQAFgEAIgCQgWgJAAgaQAAgQALgLQALgLARAAQAPAAAIAGIAKgLIAMALIgLAJQAHAJAAAPQAAAQgKALQgKAJgQACIgOABIgIADQgEABAAADQAAAEAJAAIANgBIANgCQAPAAAJAIQAIAHAAANQAAAOgNAJQgNAJgSAAQgLAAgLgDgAgRgxQgGAHAAAKQAAALAGAHQAFAHAKAAQAJAAAGgHQAFgHAAgLQAAgKgFgHQgHgGgIAAQgJAAgGAGg");
	this.shape_154.setTransform(68.925,513.775);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQAOgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQABASAJAKQAKAJAMAAQAQAAALgKIAIAOQgFAEgJADQgLAEgNAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgMAAgIAIg");
	this.shape_155.setTransform(279,512.075);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgMA7QgIgKAAgOIAAg6IgMAAIAAgPIAMAAIAAgWIASgHIAAAdIAcAAIAAAPIgcAAIAAAzQAAANAEAGQAFAFAJAAQAHAAAIgEIACARQgLADgNAAQgMAAgJgJg");
	this.shape_156.setTransform(102.7,510.725);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AggArQgJgKAAgSIAAhDIASAAIAABBQABAZAUAAQAIAAAIgGQAIgFACgHIAAhIIASAAIAABnIgSAAIAAgOQgDAGgJAFQgKAFgIAAQgRAAgJgKg");
	this.shape_157.setTransform(314.65,512.175);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AgJBFQgFgEAAgGQAAgGAFgEQAEgFAFAAQAGAAAFAFQADAEAAAGQAAAGgDAEQgFAFgGAAQgFAAgEgFgAgDAiQgIgwAAgTIAAgoIAWAAIAAAoQgBATgHAwg");
	this.shape_158.setTransform(331.85,510.125);

	this.instance_9 = new lib.Symbol2();
	this.instance_9.setTransform(650.6,384.7,1,1,0,0,0,675.6,484.7);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(1,1,1).p("Eg6bgwoMB03AAAQDPAACSCTQCTCSAADPMAAABRpQAADPiTCSQiSCTjPAAMh03AAAQjPAAiSiTQiTiSAAjPMAAAhRpQAAjPCTiSQCSiTDPAAg");
	this.shape_159.setTransform(401.3,303.325);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("Eg6aAwpQjPAAiTiTQiTiSAAjPMAAAhRpQAAjPCTiSQCTiTDPAAMB02AAAQDOAACTCTQCSCSAADPMAAABRpQAADPiSCSQiTCTjOAAg");
	this.shape_160.setTransform(401.3,303.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}}]},224).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105}]},25).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_111,p:{x:69.575,y:528.025}}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_112,p:{x:69.575,y:528.025}},{t:this.shape_111,p:{x:80.325,y:528.025}}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_112,p:{x:69.575,y:528.025}},{t:this.shape_111,p:{x:80.325,y:528.025}},{t:this.shape_113}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_112,p:{x:69.575,y:528.025}},{t:this.shape_111,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128},{t:this.shape_129}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128},{t:this.shape_129},{t:this.shape_130}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128},{t:this.shape_129},{t:this.shape_130},{t:this.shape_132},{t:this.shape_131}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128},{t:this.shape_129},{t:this.shape_130},{t:this.shape_132},{t:this.shape_131}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.shape_105},{t:this.shape_106},{t:this.shape_107,p:{x:37.15,y:526.675}},{t:this.shape_109},{t:this.shape_108},{t:this.shape_110},{t:this.shape_115,p:{x:69.575,y:528.025}},{t:this.shape_112,p:{x:80.325,y:528.025}},{t:this.shape_113},{t:this.shape_114},{t:this.shape_111,p:{x:114.625,y:528.025}},{t:this.shape_116},{t:this.shape_117},{t:this.shape_118},{t:this.shape_119},{t:this.shape_120},{t:this.shape_121},{t:this.shape_122},{t:this.shape_123},{t:this.shape_124},{t:this.shape_125},{t:this.shape_126},{t:this.shape_127},{t:this.shape_128},{t:this.shape_129},{t:this.shape_130},{t:this.shape_132},{t:this.shape_131},{t:this.shape_133}]},1).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}}]},3).to({state:[{t:this.instance_7,p:{regX:403.7,scaleX:2.2775,scaleY:1.6304,x:314.45,y:103.6}},{t:this.button_10}]},20).to({state:[{t:this.shape_135},{t:this.shape_134},{t:this.movieClip_11}]},25).to({state:[{t:this.shape_135},{t:this.shape_134},{t:this.button_12}]},25).to({state:[{t:this.instance_7,p:{regX:403.7,scaleX:2.2775,scaleY:1.6304,x:314.45,y:103.6}},{t:this.button_13}]},25).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}}]},25).to({state:[{t:this.instance_7,p:{regX:403.8,scaleX:1,scaleY:1,x:403.8,y:304.4}},{t:this.button_14}]},25).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136}]},26).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_137,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_111,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_142,p:{x:52.3}},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_137,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_138,p:{x:68.925}},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_140,p:{x:102.7}},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}},{t:this.shape_155}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_112,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_156},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_111,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}},{t:this.shape_155},{t:this.shape_140,p:{x:288.55}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_115,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_156},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_112,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}},{t:this.shape_155},{t:this.shape_140,p:{x:288.55}},{t:this.shape_111,p:{x:303.825,y:512.075}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_115,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_156},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_112,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}},{t:this.shape_155},{t:this.shape_140,p:{x:288.55}},{t:this.shape_111,p:{x:303.825,y:512.075}},{t:this.shape_157}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}},{t:this.shape_136},{t:this.shape_150},{t:this.shape_154},{t:this.shape_115,p:{x:79.225,y:512.075}},{t:this.shape_139},{t:this.shape_156},{t:this.shape_141},{t:this.shape_142,p:{x:122.95}},{t:this.shape_143},{t:this.shape_144},{t:this.shape_145},{t:this.shape_146},{t:this.shape_147},{t:this.shape_112,p:{x:195.125,y:512.075}},{t:this.shape_148},{t:this.shape_149},{t:this.shape_137,p:{x:232.75}},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_138,p:{x:268.625}},{t:this.shape_155},{t:this.shape_140,p:{x:288.55}},{t:this.shape_111,p:{x:303.825,y:512.075}},{t:this.shape_157},{t:this.shape_107,p:{x:324.25,y:510.725}},{t:this.shape_158}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.5074,scaleY:0.709,x:-13,y:0}}]},1).to({state:[{t:this.instance_8,p:{scaleX:0.8435,scaleY:1.1378,x:-25,y:-100}}]},24).to({state:[{t:this.instance_9}]},25).to({state:[{t:this.shape_160},{t:this.shape_159}]},25).to({state:[]},25).to({state:[]},200).wait(326));

	// Background_1
	this.instance_10 = new lib.Background1();
	this.instance_10.setTransform(-13,0,0.5074,0.709);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AAXBKIAAhCQAAgLgGgGQgGgHgKAAQgGAAgGAEQgHAEgEAFIAABNIgTAAIAAiTIATAAIAAA3QAEgGAJgEQAHgEAIAAQARAAAKALQAIALABASIAABCg");
	this.shape_161.setTransform(62.6,516.125);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AAhBJIghhiIggBiIgGAAIgtiQIAUAAIAdBjIAfhjIAGAAIAfBiIAehiIAUAAIgtCQg");
	this.shape_162.setTransform(48.625,516.45);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAPgOASAAQAWAAANAMQAMAMAAAUIgBALIhKAAQAAASAKAKQAIAJANAAQAQAAALgKIAIAOQgFAEgIADQgLAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_163.setTransform(73.55,518.275);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AgeA1IAAhnIASAAIAAAQQALgSASAAIAPABIgIATQgGgFgGAAQgKAAgGAJQgIAJAAANIAAA7g");
	this.shape_164.setTransform(83.6,518.175);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAOgOATAAQAWAAANAMQAMAMAAAUIgBALIhKAAQgBASALAKQAJAJAMAAQAQAAALgKIAHAOQgEAEgIADQgMAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_165.setTransform(92.2,518.275);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AA0A1IAAhBQgBgZgVAAQgHAAgGAFQgFAEgDAFIAABMIgRAAIAAhJQgBgIgFgEQgGgFgJAAQgGAAgHAFQgFAEgEAFIAABMIgSAAIAAhnIANAAIAFAMQALgOAQAAQAXAAAIAOQADgGAIgEQAJgEAJAAQAQAAAJAJQAJAKAAARIAABFg");
	this.shape_166.setTransform(122.45,518.175);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AAcAzQgGgDgCgIQgMAOgWAAQgMAAgJgJQgJgJAAgNQAAgQAOgKQAOgLAUAAQAGAAAIADQAAgagWAAQgRAAgKAKIgHgQQAFgEAJgDQAJgDAJAAQAWAAAKAKQAKAKAAAXIAAAkQAAAOAJAFIAAAJQgMAAgFgDgAgQAGQgJAHAAAKQAAARATAAQANAAALgOIAAgZIgNgBQgNAAgIAGg");
	this.shape_167.setTransform(108.975,518.275);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AgJBIIAAiOIATAAIAACOg");
	this.shape_168.setTransform(139.575,516.35);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AgkA4QALAAAJgFQAIgGAAgHQAAgJgDgIIgIgVIgchIIATAAIAeBQIAbhQIATAAIgsB6QgEAJgKAHQgMAHgOAAg");
	this.shape_169.setTransform(163.775,520.325);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AAcAzQgGgDgCgIQgMAOgWAAQgMAAgJgJQgJgJAAgNQAAgQAOgKQAOgLAUAAQAGAAAIADQAAgagWAAQgRAAgKAKIgHgQQAFgEAJgDQAJgDAJAAQAWAAAKAKQAKAKAAAXIAAAkQAAAOAJAFIAAAJQgMAAgFgDgAgQAGQgJAHAAAKQAAARATAAQANAAALgOIAAgZIgNgBQgNAAgIAGg");
	this.shape_170.setTransform(108.975,518.275);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AgNBFQgFgEAAgGQAAgGAFgEQAEgFAGAAQAFAAAEAFQAFAEAAAGQAAAGgFAEQgEAFgFAAQgGAAgEgFgAgMAeQgDgJAAgFQAAgHACgHQADgGAJgKQAIgLADgFQADgGAAgFQAAgRgTAAQgKAAgIAHIgHgOQAKgIAUAAQANAAAKAIQAKAJAAAOQAAAHgDAGQgCAHgGAFIgOAPQgHAKAAANIAAAJg");
	this.shape_171.setTransform(170.375,516.325);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AgLA7QgJgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIATgHIAAAdIAbAAIAAAPIgbAAIAAAzQgBANAEAGQAFAFAJAAQAHAAAIgEIADARQgMADgNAAQgMAAgIgJg");
	this.shape_172.setTransform(162.95,516.925);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgMA7QgIgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIATgHIAAAdIAbAAIAAAPIgbAAIAAAzQgBANAEAGQAEAFAKAAQAIAAAHgEIADARQgMADgNAAQgMAAgJgJg");
	this.shape_173.setTransform(82.65,516.925);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AgDBIIAAhYIgOAAIAAgPIAfAAIAABngAAAg0QgEgDAAgFQAAgFADgDQACgDAFAAQAFAAADAEQAEADAAAEQAAAFgEADQgDAEgFAAQgEAAgCgEg");
	this.shape_174.setTransform(95.15,516.3);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("AghAuIAGgSQAQALAKAAQAPAAABgPQAAgKgQgIQgNgGgEgCIgIgGIgFgJQgCgEAAgFQAAgNAKgHQAKgHANAAQAMAAARAHIgFARQgLgJgLAAQgGAAgFADQgEAEAAAEQAAAKAMAGIAMAGQAMAFAFAGQAGAHAAALQAAAOgKAIQgJAIgRAAQgQAAgPgIg");
	this.shape_175.setTransform(102.3,518.275);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AAXBKIAAhCQAAgLgGgGQgFgHgLAAQgGAAgGAEQgHAEgEAFIAABNIgSAAIAAiTIASAAIAAA3QAEgGAIgEQAJgEAHAAQARAAAKALQAJALAAASIAABCg");
	this.shape_176.setTransform(125.8,516.125);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AgDBIIAAhYIgOAAIAAgPIAgAAIAABngAgBg0QgDgDAAgFQAAgFADgDQADgDAFAAQAEAAAEAEQADADAAAEQAAAFgDADQgEAEgEAAQgFAAgDgEg");
	this.shape_177.setTransform(133.9,516.3);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AghAuIAHgSQAPALAJAAQARAAgBgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgBgEgBgFQABgNAJgHQAJgHAPAAQALAAARAHIgFARQgLgJgLAAQgGAAgEADQgFAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgQAAgPgIg");
	this.shape_178.setTransform(141.05,518.275);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("AgtBKIAAiRIATAAIAAAJQALgLAOAAQAWAAAMAOQANAOAAAbQAAAXgNAPQgMAPgXAAQgHAAgHgDQgIgCgCgDIAAAvgAgRg2QgGACgDAEIAAA8QACACAFADQAGACAFAAQAiAAAAgmQAAgUgIgJQgIgJgRAAQgEAAgGADg");
	this.shape_179.setTransform(157.025,520.225);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AgRArIAAh1IARAAIAAByQAAAIAGAFQAFAFAHAAIAAARQgjAAAAggg");
	this.shape_180.setTransform(165.55,516.225);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AgcAoQgOgPAAgYQAAgYAPgPQAOgPAYAAQAIAAAJADQAKAEAFADIgJANQgEgDgGgCQgIgDgHAAQgOAAgJALQgIALgBARQABASAIAKQAKAKAOAAQANAAANgKIAHAQQgPAJgWAAQgUAAgOgOg");
	this.shape_181.setTransform(183.55,518.275);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQAOgOASAAQAWAAANAMQAMAMAAAUIgBALIhLAAQABASAJAKQAKAJAMAAQAQAAALgKIAIAOQgFAEgJADQgKAEgOAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_182.setTransform(193.95,518.275);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("AgpBIIAAiOIATAAIAAB8IBAAAIAAASg");
	this.shape_183.setTransform(37.725,518.15);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAOgOATAAQAWAAANAMQAMAMAAAUIgBALIhKAAQgBASALAKQAJAJAMAAQAQAAALgKIAHAOQgEAEgIADQgMAEgNAAQgTAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgIgHQgHgJgNAAQgLAAgJAIg");
	this.shape_184.setTransform(47.65,520.075);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#000000").s().p("AgLA7QgJgKAAgOIAAg6IgNAAIAAgPIANAAIAAgWIATgHIAAAdIAbAAIAAAPIgbAAIAAAzQgBANAEAGQAFAFAJAAQAHAAAIgEIADARQgMADgOAAQgLAAgIgJg");
	this.shape_185.setTransform(57.2,518.725);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#000000").s().p("AghAuIAGgSQAQALAJAAQAQAAAAgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgBgEAAgFQAAgNAJgHQAJgHAOAAQAMAAARAHIgFARQgLgJgLAAQgGAAgFADQgEAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgRAAgOgIg");
	this.shape_186.setTransform(68.3,520.075);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#000000").s().p("AgFATIgDglIARAAIgDAlg");
	this.shape_187.setTransform(62.65,512.825);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AghAuIAHgSQAPALAJAAQARAAgBgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgCgEABgFQAAgNAJgHQAKgHAOAAQALAAARAHIgFARQgLgJgLAAQgGAAgEADQgFAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgQAAgPgIg");
	this.shape_188.setTransform(82.45,520.075);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAQgPQANgOATAAQAWAAANAMQAMAMAAAUIgBALIhLAAQAAASAKAKQAKAJANAAQAPAAALgKIAHAOQgDAEgKADQgLAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgMAAgIAIg");
	this.shape_189.setTransform(91.95,520.075);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("AgfA1IAAhnIATAAIAAAQQAKgSAUAAIANABIgHATQgGgFgGAAQgKAAgHAJQgHAJAAANIAAA7g");
	this.shape_190.setTransform(112.45,519.975);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#000000").s().p("AgcAoQgOgPAAgYQAAgYAPgPQAOgPAYAAQAIAAAJADQAKAEAFADIgJANQgEgDgGgCQgIgDgGAAQgPAAgJALQgIALgBARQABASAIAKQAKAKAOAAQANAAANgKIAHAQQgPAJgWAAQgUAAgOgOg");
	this.shape_191.setTransform(120.55,520.075);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AAXBKIAAhCQAAgLgGgGQgFgHgLAAQgFAAgIAEQgGAEgEAFIAABNIgSAAIAAiTIASAAIAAA3QAEgGAIgEQAJgEAHAAQARAAAJALQAKALgBASIAABCg");
	this.shape_192.setTransform(130.95,517.925);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#000000").s().p("AgSBKIAAhYIgPAAIAAgQIAPAAQAAgUAKgLQAJgMAQAAQAIAAAJADIgFAOQgGgCgFAAQgIAAgGAGQgEAHAAAKIAAAFIAVAAIAAAQIgVAAIAABYg");
	this.shape_193.setTransform(146.575,517.925);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AgiAnQgMgOAAgZQAAgYANgOQANgPAUAAQAWAAANAOQAMAOAAAZQAAAZgMAPQgNAOgWAAQgVAAgNgPgAgTgcQgIALAAARQAAAnAbAAQANAAAHgKQAIgLAAgSQAAgmgcAAQgMAAgHAKg");
	this.shape_194.setTransform(155.275,520.075);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AgfA1IAAhnIATAAIAAAQQAKgSAUAAIANABIgHATQgGgFgGAAQgKAAgHAJQgHAJAAANIAAA7g");
	this.shape_195.setTransform(112.45,519.975);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AgcAoQgOgPAAgYQAAgYAPgPQAOgPAYAAQAIAAAKADQAJAEAFADIgJANQgEgDgHgCQgHgDgGAAQgPAAgJALQgIALgBARQABASAIAKQAKAKAOAAQANAAANgKIAHAQQgPAJgWAAQgUAAgOgOg");
	this.shape_196.setTransform(179.4,520.075);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AggArQgJgKAAgSIAAhDIATAAIAABBQAAAZAUAAQAJAAAHgGQAHgFADgHIAAhIIASAAIAABnIgSAAIAAgOQgDAGgJAFQgKAFgIAAQgRAAgJgKg");
	this.shape_197.setTransform(195.65,520.175);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AggApQgPgPAAgZQAAgZAPgPQAOgOATAAQAWAAANAMQAMAMAAAUIgBALIhKAAQgBASAKAKQAKAJANAAQAPAAALgKIAHAOQgDAEgJADQgMAEgOAAQgSAAgOgNgAgSgeQgIAIgBALIA5AAQAAgLgHgHQgIgJgNAAQgLAAgJAIg");
	this.shape_198.setTransform(206.6,520.075);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("AghAuIAHgSQAPALAJAAQARAAgBgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgCgEABgFQAAgNAJgHQAKgHAOAAQALAAARAHIgFARQgLgJgLAAQgGAAgEADQgFAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgQAAgPgIg");
	this.shape_199.setTransform(82.45,520.075);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgSBKIAAhYIgPAAIAAgQIAPAAQAAgUAKgLQAJgMAQAAQAIAAAJADIgFAOQgGgCgFAAQgIAAgGAGQgEAHAAAKIAAAFIAVAAIAAAQIgVAAIAABYg");
	this.shape_200.setTransform(146.575,517.925);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("AgDBIIAAhYIgOAAIAAgPIAgAAIAABngAAAg0QgEgDAAgFQAAgFADgDQACgDAGAAQAEAAAEAEQADADAAAEQAAAFgDADQgEAEgEAAQgGAAgBgEg");
	this.shape_201.setTransform(236.2,518.1);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgfA1IAAhnIATAAIAAAQQAKgSATAAIAPABIgIATQgGgFgGAAQgKAAgGAJQgIAJAAANIAAA7g");
	this.shape_202.setTransform(243.9,519.975);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AghAuIAGgSQAQALAJAAQAQAAAAgPQAAgKgPgIQgNgGgEgCIgIgGIgFgJQgCgEABgFQAAgNAJgHQAJgHAPAAQALAAARAHIgFARQgLgJgLAAQgGAAgFADQgEAEAAAEQAAAKALAGIANAGQAMAFAGAGQAFAHAAALQAAAOgKAIQgKAIgQAAQgRAAgOgIg");
	this.shape_203.setTransform(251.1,520.075);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AgKBFQgDgEAAgGQAAgGADgEQAFgFAFAAQAGAAAFAFQADAEAAAGQAAAGgDAEQgFAFgGAAQgFAAgFgFgAgDAiQgIgwAAgTIAAgoIAWAAIAAAoQAAATgIAwg");
	this.shape_204.setTransform(266.85,518.125);

	this.button_9 = new lib.Arrow();
	this.button_9.name = "button_9";
	this.button_9.setTransform(729.05,286.15,0.2286,0.1156,0,0,20.5422,256.4,256.8);
	new cjs.ButtonHelper(this.button_9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10}]},25).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161}]},24).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_167,p:{x:108.975,y:518.275}},{t:this.shape_166}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_167,p:{x:108.975,y:518.275}},{t:this.shape_166}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_167,p:{x:108.975,y:518.275}},{t:this.shape_166},{t:this.shape_168}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_170,p:{x:108.975}},{t:this.shape_166},{t:this.shape_168},{t:this.shape_167,p:{x:153.675,y:518.275}},{t:this.shape_169}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_170,p:{x:108.975}},{t:this.shape_166},{t:this.shape_168},{t:this.shape_167,p:{x:153.675,y:518.275}},{t:this.shape_172,p:{x:162.95,y:516.925}},{t:this.shape_171,p:{x:170.375}}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_163},{t:this.shape_164},{t:this.shape_165},{t:this.shape_170,p:{x:108.975}},{t:this.shape_166},{t:this.shape_168},{t:this.shape_167,p:{x:153.675,y:518.275}},{t:this.shape_172,p:{x:162.95,y:516.925}},{t:this.shape_171,p:{x:170.375}}]},1).to({state:[{t:this.instance_10}]},15).to({state:[{t:this.instance_10},{t:this.shape_162}]},25).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_167,p:{x:73.375,y:518.275}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179},{t:this.shape_180,p:{x:165.55,y:516.225}}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_170,p:{x:73.375}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179},{t:this.shape_180,p:{x:165.55,y:516.225}},{t:this.shape_167,p:{x:173.425,y:518.275}}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_170,p:{x:73.375}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179},{t:this.shape_180,p:{x:165.55,y:516.225}},{t:this.shape_167,p:{x:173.425,y:518.275}},{t:this.shape_181}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_170,p:{x:73.375}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179},{t:this.shape_180,p:{x:165.55,y:516.225}},{t:this.shape_167,p:{x:173.425,y:518.275}},{t:this.shape_181},{t:this.shape_182}]},1).to({state:[{t:this.instance_10},{t:this.shape_162},{t:this.shape_161},{t:this.shape_170,p:{x:73.375}},{t:this.shape_173},{t:this.shape_174},{t:this.shape_175},{t:this.shape_172,p:{x:116.5,y:516.925}},{t:this.shape_176},{t:this.shape_177},{t:this.shape_178},{t:this.shape_179},{t:this.shape_180,p:{x:165.55,y:516.225}},{t:this.shape_167,p:{x:173.425,y:518.275}},{t:this.shape_181},{t:this.shape_182},{t:this.shape_171,p:{x:209.025}}]},1).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10},{t:this.shape_183}]},25).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_190,p:{x:112.45}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_190,p:{x:112.45}},{t:this.shape_191}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_190,p:{x:112.45}},{t:this.shape_191},{t:this.shape_192}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_190,p:{x:112.45}},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_190,p:{x:112.45}},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_188,p:{x:82.45}},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_193,p:{x:146.575}},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}},{t:this.shape_201}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}},{t:this.shape_201},{t:this.shape_202}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}},{t:this.shape_201},{t:this.shape_202},{t:this.shape_203}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}},{t:this.shape_201},{t:this.shape_202},{t:this.shape_203},{t:this.shape_172,p:{x:259.25,y:518.725}}]},1).to({state:[{t:this.instance_10},{t:this.shape_183},{t:this.shape_184},{t:this.shape_185},{t:this.shape_187},{t:this.shape_186},{t:this.shape_199},{t:this.shape_189},{t:this.shape_167,p:{x:102.675,y:520.075}},{t:this.shape_195},{t:this.shape_191},{t:this.shape_192},{t:this.shape_200},{t:this.shape_194},{t:this.shape_190,p:{x:165.25}},{t:this.shape_196},{t:this.shape_180,p:{x:187.6,y:518.025}},{t:this.shape_197},{t:this.shape_198},{t:this.shape_188,p:{x:216.1}},{t:this.shape_193,p:{x:230.275}},{t:this.shape_201},{t:this.shape_202},{t:this.shape_203},{t:this.shape_172,p:{x:259.25,y:518.725}},{t:this.shape_204}]},1).to({state:[{t:this.instance_10}]},2).to({state:[{t:this.instance_10},{t:this.button_9}]},25).to({state:[]},25).to({state:[]},25).wait(851));

	// Shadow
	this.instance_11 = new lib.Shadow("synched",0);
	this.instance_11.setTransform(379.7,245.45,1,1,0,0,0,445.8,387.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(24).to({startPosition:0},0).to({_off:true},1).wait(1075));

	// Intro
	this.instance_12 = new lib.Intro_1("synched",0);
	this.instance_12.setTransform(395.95,296.65,0.9902,0.9913,0,0,0,407.9,306);

	this.button_8 = new lib.Button();
	this.button_8.name = "button_8";
	this.button_8.setTransform(377.85,540.6,1,1,0,0,0,103.3,44);
	new cjs.ButtonHelper(this.button_8, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12}]}).to({state:[{t:this.button_8}]},24).to({state:[]},1).wait(1075));

	// button
	this.button_8_1 = new lib.Button();
	this.button_8_1.name = "button_8_1";
	this.button_8_1.setTransform(377.85,540.6,1,1,0,0,0,103.3,44);
	new cjs.ButtonHelper(this.button_8_1, 0, 1, 1);

	this.instance_13 = new lib.Intro_1("synched",0);
	this.instance_13.setTransform(395.95,296.65,0.9902,0.9913,0,0,0,407.9,306);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_13},{t:this.button_8_1}]},24).to({state:[]},1).wait(1075));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-2525,-1535,6265.1,4059.3);
// library properties:
lib.properties = {
	id: '23DC3F137BBEE74FB99EB980433EE692',
	width: 800,
	height: 600,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Emberlyn_project_atlas_1.png?1718801276921", id:"Emberlyn_project_atlas_1"},
		{src:"sounds/DoorOpeningSoundEffect.mp3?1718801277388", id:"DoorOpeningSoundEffect"},
		{src:"sounds/DoorOpeningSoundEffect_2.mp3?1718801277388", id:"DoorOpeningSoundEffect_2"},
		{src:"sounds/Escaperoommusic.mp3?1718801277388", id:"Escaperoommusic"},
		{src:"sounds/lightflickeringsoundeffect.mp3?1718801277388", id:"lightflickeringsoundeffect"}
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
an.compositions['23DC3F137BBEE74FB99EB980433EE692'] = {
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