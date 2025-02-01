(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Joanna_Project_atlas_1", frames: [[0,0,2048,2048],[0,2050,2048,2048],[0,4100,2048,2048],[2050,0,2048,2048],[4100,0,2048,2048],[2050,2050,2048,2048],[2050,4100,2048,2048],[4100,2050,2048,2048],[4100,4100,2048,2048]]},
		{name:"Joanna_Project_atlas_2", frames: [[5078,0,1024,1024],[3540,0,1536,1536],[2050,0,1488,2266],[6104,0,800,600],[6906,0,800,600],[6104,602,800,600],[6906,602,800,600],[5078,1026,800,600],[5880,1204,800,600],[6682,1204,800,600],[3540,1538,800,600],[4342,1628,800,600],[5144,1806,800,600],[5946,1806,800,600],[6748,1806,800,600],[0,2050,800,600],[0,0,2048,2048]]}
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



(lib._c787157fa13141a78b36053741825e8e = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Gemini_Generated_Imagejfif = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.IMG_1368 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.TitlePIC = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515211546 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515211636 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515211702 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515211734 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515211812 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Untitled108_20240515212114 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240330144249 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240330154716 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240330154910 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240330155224 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240330162354 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518214345 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518214412 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518214443 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518215935 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518215955 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Untitled79_20240518220232 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Untitled86_20240407213352 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Untitled87_20240415224456 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Untitled87_20240415224501 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Untitled87_20240415224504 = function() {
	this.initialize(ss["Joanna_Project_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Untitled87_20240421155107 = function() {
	this.initialize(ss["Joanna_Project_atlas_2"]);
	this.gotoAndStop(16);
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


(lib.Text11 = function(mode,startPosition,loop,reversed) {
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
	this.frame_41 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(41).call(this.frame_41).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgYA7IAAgDIADAAQAIAAADgEQACgDABgLIAAhMQAAgIgCgEIgDgDQgEgCgFgBIgDAAIAAgDIAxAAIAAADIgEAAQgHAAgDAFQgCADgBAKIAABMQAAAKACACIADAEQAEACAEAAIAEAAIAAADg");
	this.shape_3.setTransform(-250.65,-35.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_4.setTransform(-257.35,-39.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAABgBQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAXgLIAFAAIAABqIABAKQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAGAAIAAADg");
	this.shape_5.setTransform(-240.55,-36.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQABgCAAgIIAAgeQAAgOAAgDQgBAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgEgCIgGACIgBgEIAXgKIAEAAIAABAIABAKQAAABABABQAAAAAAABQABAAAAAAQABABAAAAQACABAGAAIAAADgAgFgvQgCgCAAgEQAAgEACgCQADgDADAAQAEAAACADQACACABAEQgBAEgCACQgCADgEAAQgDAAgDgDg");
	this.shape_6.setTransform(-235.6,-36.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_7.setTransform(-220.075,-33.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAAApIgchCIgEgHIgEgEIgHgCIAAgCIAmAAIAAACIgCAAQgDAAgDACQAAABAAAAQAAABgBAAQAAABAAABQAAAAAAABIABAHIATAsIATgtIACgIIgBgCQgBAAAAgBQAAAAgBAAQAAAAAAAAQgBgBAAAAIgGgBIAAgCIAbAAIAAACQgFABgCABQgDADgDAGIgcBEg");
	this.shape_8.setTransform(-228.65,-33.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGABgJQAAgGACgFQAEgFAIgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIABAFQgBAEgCACQgCADgDAAQgEAAgCgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQACAEgBALIAAAbIABAOIABADIADABIADAAIAHgHIAAAFQgLANgIAAQgEAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAGAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_9.setTransform(-211.85,-33.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgSA+IAAgDQAFAAACgBQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAXgLIAEAAIAABqQAAAIACACQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAHAAIAAADg");
	this.shape_10.setTransform(-201.05,-36.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAGgLQAFgLAJgFQAJgGAJAAQASAAAMAOQAJAMAAAQQAAAJgGALQgEALgKAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgCAHAAAKQgBARAIANQAGAMALAAQAIAAAGgHQAFgHABgRQAAgUgKgMQgGgJgJAAQgEAAgFADg");
	this.shape_11.setTransform(-194.15,-33.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAFApIAAgDIABAAQAGAAACgBQACgCABgEIAAgIIAAgfQAAgMgCgEQgDgFgHgBQgJAAgLAMIAAApQAAAJABABIADAEQADABAGAAIAAADIgnAAIAAgDIABAAQAHAAACgCQACgEAAgJIAAgdIgBgRQAAgBAAgBQgBAAAAgBQAAAAAAgBQgBAAAAAAIgEgCIgFACIgCgEIAYgKIAEAAIAAARQAOgQAMgBQAGABAGADQAEADADAIQACAFAAALIAAAhIABAKQAAABABABQAAAAAAABQABAAAAAAQABABAAAAQACABAGAAIAAADg");
	this.shape_12.setTransform(-185.15,-34);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_13.setTransform(-220.075,-33.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgEABQgEACgGAAQgIAAgFgFQgFgGAAgJQgBgGADgFQADgFAKgGQAIgEAUgIIAAgDQAAgMgEgEQgDgFgHAAQgFAAgEADQgDADAAAEIABAFQAAAEgCACQgDADgDAAQgDAAgDgDQgCgCAAgEQAAgHAIgHQAIgGAOAAQAKAAAGADQAGADACAGQABAEAAALIAAAbIABAOIACADIACABIACAAIAHgHIAAAFQgJANgJAAQgEAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAFAAQAHAAAJgJIAAgdIgQAGg");
	this.shape_14.setTransform(-163.85,-33.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_15.setTransform(-156.525,-33.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAWApIgUgyIgXAyIgDAAIgahCQgCgGgDgDQgCgCgGgCIAAgCIAiAAIAAACQgFABgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASgkIgFgNQgCgEgDgDIgIgCIAAgCIAmAAIAAACQgHABgCACQgBAAAAABQgBAAAAABQAAAAAAABQAAABAAAAIABAEIASAuIARgsIACgIQAAAAAAgBQgBAAAAgBQAAAAAAAAQgBgBAAAAIgHgCIAAgCIAaAAIAAACQgIACgEAJIgbBEg");
	this.shape_16.setTransform(-142.175,-33.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_17.setTransform(-220.075,-33.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAACgBQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGACIgBgDIAWgLIAFAAIAABqIAAAKQABABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAGAAIAAADg");
	this.shape_18.setTransform(-125.05,-36.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgSA+IAAgDQAFAAACgBQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAXgLIAEAAIAABqQAAAIACACQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAHAAIAAADg");
	this.shape_19.setTransform(-201.05,-36.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_20.setTransform(-115.4,-30.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_21.setTransform(-115.4,-30.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_22.setTransform(-115.4,-30.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAOAaIgEgaIgCgKIAAgEQAAgGACgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQAEAAACADQADADAAAEIgCAPIgGAag");
	this.shape_23.setTransform(-100.5,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_7,p:{x:-220.075}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-245.05}},{t:this.shape_6,p:{x:-240.1}},{t:this.shape_8,p:{x:-233.15}},{t:this.shape_7,p:{x:-224.575}},{t:this.shape_9,p:{x:-211.85}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_7,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_7,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_7,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_7,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_13,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12},{t:this.shape_7,p:{x:-176.575}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_13,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12},{t:this.shape_7,p:{x:-176.575}},{t:this.shape_14}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_13,p:{x:-220.075}},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12},{t:this.shape_7,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_10,p:{x:-201.05}},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}},{t:this.shape_20,p:{x:-115.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}},{t:this.shape_21,p:{x:-115.4}},{t:this.shape_20,p:{x:-110.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}},{t:this.shape_22},{t:this.shape_21,p:{x:-110.9}},{t:this.shape_20,p:{x:-106.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}},{t:this.shape_22},{t:this.shape_21,p:{x:-110.9}},{t:this.shape_20,p:{x:-106.4}},{t:this.shape_23}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-240.55}},{t:this.shape_6,p:{x:-235.6}},{t:this.shape_8,p:{x:-228.65}},{t:this.shape_17},{t:this.shape_9,p:{x:-207.35}},{t:this.shape_19},{t:this.shape_11},{t:this.shape_12},{t:this.shape_13,p:{x:-176.575}},{t:this.shape_14},{t:this.shape_15},{t:this.shape_16},{t:this.shape_7,p:{x:-131.575}},{t:this.shape_18},{t:this.shape_10,p:{x:-120.05}},{t:this.shape_22},{t:this.shape_21,p:{x:-110.9}},{t:this.shape_20,p:{x:-106.4}},{t:this.shape_23}]},2).wait(2));

	// Layer_1
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_24.setTransform(0.025,0);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_25.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24}]}).wait(42));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text10 = function(mode,startPosition,loop,reversed) {
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
	this.frame_69 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(69).call(this.frame_69).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgYA7IAAgDIADAAQAIAAADgEQACgDABgLIAAhMQAAgIgCgEIgDgDQgEgCgFgBIgDAAIAAgDIAxAAIAAADIgEAAQgHAAgDAFQgCADgBAKIAABMQAAAKACACIADAEQAEACAEAAIAEAAIAAADg");
	this.shape_3.setTransform(-250.65,-35.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_4.setTransform(-257.35,-39.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAOBAIAAgMQgGAGgFADQgFADgGAAQgOAAgJgLQgKgLAAgSQAAgRALgNQALgPARAAQAJAAAHAHIAAgPIAAgRIgCgEIgEgBIgGABIgBgDIAYgKIAEAAIAABcIAAASIADAEQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIAGgBIABADIgYAKgAgRgIQgIAIAAARQAAASAIAKQAHAJAKAAQAHAAAHgIIAAgpQAAgFgDgFQgDgFgEgDQgEgCgDAAQgIAAgGAHg");
	this.shape_5.setTransform(-238.325,-35.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAEApIAAgDIACAAQAFAAADgBQACgCABgEIABgIIAAgfQAAgMgEgEQgDgFgGgBQgKAAgKAMIAAApQAAAJABABIAEAEQACABAGAAIAAADIgoAAIAAgDIACAAQAGAAACgCQACgEAAgJIAAgdIAAgRQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgCIgHACIgBgEIAZgKIADAAIAAARQAOgQAMgBQAGABAFADQAFADADAIQACAFAAALIAAAhIABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQACABAFAAIAAADg");
	this.shape_6.setTransform(-220.65,-34);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgIAAQgGAAgEADg");
	this.shape_7.setTransform(-229.65,-33.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgBAaIgFgaIgCgOQAAgGADgCQABgDAEAAQAEAAACADQADADAAAEIgDAPIgEAag");
	this.shape_8.setTransform(-214.55,-39.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_9.setTransform(-214.775,-35.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AALAnQgCgDgBgHQgLAKgEABQgEACgGAAQgIAAgFgFQgFgGgBgJQABgGACgFQADgFAKgGQAJgEATgIIAAgDQAAgMgDgEQgFgFgFAAQgGAAgDADQgEADAAAEIAAAFQAAAEgCACQgCADgDAAQgDAAgCgDQgCgCAAgEQgBgHAIgHQAIgGAOAAQAJAAAIADQAEADADAGQABAEABALIAAAbIAAAOIABADIADABIADAAIAGgHIAAAFQgJANgKAAQgEAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAEAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_10.setTransform(-190.1,-33.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAEA+IAAgDIACAAQAGAAACgBQACgCABgEIAAgIIAAgcQAAgNgBgEQgBgDgDgCQgDgDgFAAQgEAAgEADQgEACgGAGIAAAqIAAAKIADAEQADABAGAAIAAADIgnAAIAAgDQAEAAAEgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAYgLIAFAAIAAA7QAJgKAFgEQAGgDAFAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_11.setTransform(-198.9,-36.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAAApIgdhCIgDgHIgFgEIgFgCIAAgCIAmAAIAAACIgDAAQgDAAgCACQgBABAAAAQAAABgBAAQAAABAAABQAAAAAAABIACAHIARAsIATgtIACgIIgBgCQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBgBAAAAIgGgBIAAgCIAaAAIAAACQgEABgCABQgDADgCAGIgdBEg");
	this.shape_12.setTransform(-181.9,-33.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_13.setTransform(-177.825,-33.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_14.setTransform(-161.275,-33.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgWAfQgLgLAAgUQAAgSALgMQAMgMAOAAQAMAAAIAHQAHAGAAAHQAAADgBACQgDACgEAAQgFAAgDgDQgBgCAAgFQgBgFgDgDQgDgDgFAAQgIAAgGAHQgGAIgBAPQABANAGALQAIALAKAAQAJAAAHgGQAFgEAEgLIADACQgDAQgJAIQgKAJgLAAQgNAAgKgMg");
	this.shape_15.setTransform(-153.9,-33.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAEA+IAAgDIACAAQAGAAACgBQACgCABgEIABgIIAAgcQgBgNgBgEQgCgDgDgCQgCgDgFAAQgEAAgEADQgEACgHAGIAAAqIABAKIAEAEQACABAHAAIAAADIgpAAIAAgDQAFAAAEgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBAAgBQACgCAAgIIAAhIIgBgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgHACIgBgDIAYgLIAEAAIAAA7QAKgKAFgEQAFgDAGAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_16.setTransform(-145.4,-36.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQASAAALAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHgBAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQABgUgKgMQgGgJgIAAQgGAAgEADg");
	this.shape_17.setTransform(-136.4,-33.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQASAAALAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHgBAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQABgUgKgMQgGgJgIAAQgGAAgEADg");
	this.shape_18.setTransform(-136.4,-33.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgSA+IAAgDQAFAAADgBQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIAAgKIAAhIIAAgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgBgDIAWgLIAFAAIAABqIABAKQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAGAAIAAADg");
	this.shape_19.setTransform(-120.3,-36.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_20.setTransform(-115.65,-30.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_21.setTransform(-115.65,-30.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_22.setTransform(-120.15,-30.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgZA7IAAgDIAEAAQAIAAAEgEQACgDAAgLIAAhMIgBgMIgEgDQgEgCgFgBIgEAAIAAgDIAzAAIAAADIgFAAQgHAAgEAFQgBADAAAKIAABMIABAMIADAEQAEACAEAAIAFAAIAAADg");
	this.shape_23.setTransform(-96.9,-35.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgBAaIgFgaIgCgOQAAgGACgCQADgDADAAQADAAADADQADADAAAEIgCAPIgFAag");
	this.shape_24.setTransform(-96.8,-39.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAdApIAAgDIACAAQAFAAADgBQACgCABgDIAAgJIAAgiQAAgJgCgEQgEgGgHAAQgFAAgEADQgFACgHAGIAAABIAAAEIAAAlQAAAJABABQAAABABAAQAAABAAAAQABABAAAAQABABABAAQACABAGAAIAAADIgnAAIAAgDQAGAAADgBQACgCABgDIABgJIAAgiQAAgJgDgEQgEgGgHAAQgFAAgEADQgIAEgEAEIAAAqIABAKQABABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAGAAIAAADIgnAAIAAgDQAFAAACgBIAEgEIABgKIAAgdQAAgOgBgEIgCgDIgEgCIgFACIgCgEIAZgKIADAAIAAASIALgKIAIgGQAFgCAEAAQAIABAEAEQAGAEACAJQAJgLAGgDQAGgDAHgBQAGABAFADQAFADADAIQACAFAAAKIAAAiIABAKIADAEQADABAFAAIAAADg");
	this.shape_25.setTransform(-83.625,-34);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGABgJQAAgGACgFQAEgFAIgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIABAFQgBAEgCACQgCADgDAAQgEAAgCgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQACAEgBALIAAAbIABAOIABADIADABIADAAIAHgHIAAAFQgLANgIAAQgEAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAGAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_26.setTransform(-67.85,-33.925);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgcApIAAgDQAGAAADgBQADgCAAgDIAAgJIAAgeIAAgRIgCgDIgEgCIgGACIgBgEIAZgKIADAAIAAASQAJgRALgBQAFAAADADQADAEAAADQAAAEgCACQgCADgDgBQgEAAgDgCIgGgEQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABAAAAQgEAEgEAIIAAAlQAAAIABADIAEAEQADABAFAAIAAADg");
	this.shape_27.setTransform(-47.55,-34);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AghA1QgHgEAAgFIABgEIAGgJIAJgJIgGgGQgCgCAAgCQAAgEACgDQADgFAJgGQgHgEgEgHQgEgGAAgHQAAgNAJgIQAJgJAOAAQALAAAIAFIARAAIAEABIABAAIAAAEIAAACIgBABIgEAAIgKAAQAEAHAAAKQAAALgIAIQgJAIgNAAIgNgBQgDADgBABIgCAFIACACIAFACIANABIAWABQAIABAFAFQAFAFgBAIQABAJgKAJQgNANgWAAQgRAAgLgIgAgZAfQgCADAAAEQAAAEAFADQAJAFAPAAQAQAAAIgFQAIgGAAgGQAAgFgFgCQgFgBgOgBQgSgBgKgBQgFAEgCAFgAgOgyQgEAFAAAKQAAAOAGAIQAEAGAIAAQAGAAAEgFQAEgGAAgKQAAgOgGgIQgEgFgHgBQgGAAgFAGg");
	this.shape_28.setTransform(-55.05,-32.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAGgLQAFgLAJgFQAJgGAJAAQASAAAMAOQAJAMAAAQQAAAJgGALQgFALgIAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgCAHAAAKQgBARAIANQAGAMALAAQAIAAAGgHQAFgHABgRQAAgUgKgMQgGgJgJAAQgEAAgFADg");
	this.shape_29.setTransform(-40.15,-33.875);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAWApIgUgyIgXAyIgDAAIgahCQgCgGgDgDQgCgCgGgCIAAgCIAiAAIAAACQgFABgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASgkIgFgNQgCgEgDgDIgIgCIAAgCIAmAAIAAACQgHABgCACQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAIABAEIASAuIARgsIACgIQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAIgHgCIAAgCIAaAAIAAACQgIACgEAJIgbBEg");
	this.shape_30.setTransform(-29.175,-33.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAEApIAAgDIACAAQAFAAADgBQACgCABgEIABgIIAAgfQAAgMgEgEQgDgFgGgBQgKAAgKAMIAAApQAAAJABABIAEAEQACABAGAAIAAADIgoAAIAAgDIACAAQAGAAACgCQACgEAAgJIAAgdIAAgRQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgCIgHACIgBgEIAZgKIADAAIAAARQAOgQAMgBQAGABAFADQAFADADAIQACAFAAALIAAAhIABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQACABAFAAIAAADg");
	this.shape_31.setTransform(-220.65,-34);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGABgJQAAgGACgFQAEgFAIgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIABAFQgBAEgCACQgCADgDAAQgEAAgCgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQACAEgBALIAAAbIABAOIABADIADABIADAAIAHgHIAAAFQgLANgIAAQgEAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAGAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_32.setTransform(-67.85,-33.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGADQgEACgGAAQgHAAgFgDQgFgFgCgFQgCgHAAgLIAAgjQAAgGgBgCQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgBgHgBIAAgCIAdAAIAAA1QAAALAEADQADADAGABQADAAAFgCQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgCIAbAAIAAAvQAAAOABADQAAABABABQAAAAAAABQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_33.setTransform(12.325,-33.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAOBAIAAgMQgGAGgFADQgFADgGAAQgOAAgJgLQgKgLAAgSQAAgRALgNQALgPARAAQAJAAAHAHIAAgPIAAgRIgCgEIgEgBIgGABIgBgDIAYgKIAEAAIAABcIAAASIADAEQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIAGgBIABADIgYAKgAgRgIQgIAIAAARQAAASAIAKQAHAJAKAAQAHAAAHgIIAAgpQAAgFgDgFQgDgFgEgDQgEgCgDAAQgIAAgGAHg");
	this.shape_34.setTransform(-238.325,-35.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgSA+IAAgDQAFAAACgBQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAXgLIAEAAIAABqQAAAIACACQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAHAAIAAADg");
	this.shape_35.setTransform(19.45,-36.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_36.setTransform(-210.275,-35.125);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_37.setTransform(-115.65,-30.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_38.setTransform(-111.15,-30.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_39.setTransform(-115.65,-30.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAOAaIgFgaIgCgKIAAgEQAAgGACgCQADgDAEAAQAEAAADADQACACAAAFIgCAPIgFAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgEAag");
	this.shape_40.setTransform(44,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-242.825}},{t:this.shape_7,p:{x:-234.15}},{t:this.shape_6,p:{x:-225.15}},{t:this.shape_8,p:{x:-219.05}},{t:this.shape_9,p:{x:-214.775}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-203.4}},{t:this.shape_10,p:{x:-194.6}},{t:this.shape_12,p:{x:-186.4}},{t:this.shape_13,p:{x:-177.825}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_17,p:{x:-136.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_20,p:{x:-115.65}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_21,p:{x:-115.65}},{t:this.shape_20,p:{x:-111.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-165.775}},{t:this.shape_15,p:{x:-158.4}},{t:this.shape_16,p:{x:-149.9}},{t:this.shape_18,p:{x:-140.9}},{t:this.shape_17,p:{x:-131.9}},{t:this.shape_19,p:{x:-124.8}},{t:this.shape_22,p:{x:-120.15}},{t:this.shape_21,p:{x:-115.65}},{t:this.shape_20,p:{x:-111.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-165.775}},{t:this.shape_15,p:{x:-158.4}},{t:this.shape_16,p:{x:-149.9}},{t:this.shape_18,p:{x:-140.9}},{t:this.shape_17,p:{x:-131.9}},{t:this.shape_19,p:{x:-124.8}},{t:this.shape_22,p:{x:-120.15}},{t:this.shape_21,p:{x:-115.65}},{t:this.shape_20,p:{x:-111.15}},{t:this.shape_23,p:{x:-101.4}},{t:this.shape_24,p:{x:-96.8}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}},{t:this.shape_28},{t:this.shape_27}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_6,p:{x:-220.65}},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_26,p:{x:-67.85}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-238.325}},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_9,p:{x:-210.275}},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_22,p:{x:-115.65}},{t:this.shape_21,p:{x:-111.15}},{t:this.shape_20,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_37,p:{x:-115.65}},{t:this.shape_22,p:{x:-111.15}},{t:this.shape_21,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}},{t:this.shape_20,p:{x:29.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_37,p:{x:-115.65}},{t:this.shape_22,p:{x:-111.15}},{t:this.shape_21,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}},{t:this.shape_20,p:{x:29.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}},{t:this.shape_22,p:{x:29.1}},{t:this.shape_21,p:{x:33.6}},{t:this.shape_20,p:{x:38.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}},{t:this.shape_22,p:{x:29.1}},{t:this.shape_21,p:{x:33.6}},{t:this.shape_20,p:{x:38.1}},{t:this.shape_40}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_34},{t:this.shape_7,p:{x:-229.65}},{t:this.shape_31},{t:this.shape_8,p:{x:-214.55}},{t:this.shape_36},{t:this.shape_11,p:{x:-198.9}},{t:this.shape_10,p:{x:-190.1}},{t:this.shape_12,p:{x:-181.9}},{t:this.shape_13,p:{x:-173.325}},{t:this.shape_14,p:{x:-161.275}},{t:this.shape_15,p:{x:-153.9}},{t:this.shape_16,p:{x:-145.4}},{t:this.shape_18,p:{x:-136.4}},{t:this.shape_17,p:{x:-127.4}},{t:this.shape_19,p:{x:-120.3}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37,p:{x:-106.65}},{t:this.shape_23,p:{x:-96.9}},{t:this.shape_24,p:{x:-92.3}},{t:this.shape_25},{t:this.shape_32},{t:this.shape_28},{t:this.shape_27},{t:this.shape_29},{t:this.shape_30},{t:this.shape_6,p:{x:-18.15}},{t:this.shape_26,p:{x:-4.85}},{t:this.shape_5,p:{x:3.675}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_9,p:{x:24.475}},{t:this.shape_22,p:{x:29.1}},{t:this.shape_21,p:{x:33.6}},{t:this.shape_20,p:{x:38.1}},{t:this.shape_40}]},1).wait(1));

	// Layer_1
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_41.setTransform(0.025,0);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_42.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41}]}).wait(70));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text9 = function(mode,startPosition,loop,reversed) {
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
	this.frame_15 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_3.setTransform(-257.35,-39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGABgJQAAgGACgFQAEgFAIgGQAKgEATgIIAAgDQAAgMgEgEQgDgFgHAAQgFAAgEADQgDADAAAEIABAFQAAAEgDACQgCADgDAAQgEAAgCgDQgCgCAAgEQABgHAHgHQAIgGAOAAQAKAAAGADQAFADADAGQACAEgBALIAAAbIABAOIABADIADABIACAAIAIgHIAAAFQgLANgIAAQgEAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAGAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_4.setTransform(-233.8,-33.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAbA9IgbhLIgaBLIgCAAIgkhiIgFgNIgFgFQgDgCgFAAIAAgDIAsAAIAAADIgCAAQgFAAgCACQgCADAAADIADAOIAYBCIAUg4IgEgKIgDgIIgEgIIgDgDIgEgCIgGgBIAAgDIAuAAIAAADIgEAAQgEAAgDACQgCADAAADQAAAFAEALIAXBAIAWhBQAFgLAAgEIgBgEQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBAAQgDgCgGAAIAAgDIAkAAIAAADQgEAAgDACQgDACgDAEQgCADgEAMIghBfg");
	this.shape_5.setTransform(-245.1,-35.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQABgCAAgIIAAgeQAAgOgBgDQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgDgCIgGACIgBgEIAXgKIAEAAIAABAIABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQABABAGAAIAAADgAgEgvQgEgCAAgEQAAgEAEgCQACgDACAAQAFAAACADQADACgBAEQABAEgDACQgCADgFAAQgCAAgCgDg");
	this.shape_6.setTransform(-227.55,-36.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_7.setTransform(-222.475,-35.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_8.setTransform(-217.85,-30.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_9.setTransform(-217.85,-30.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_10.setTransform(-217.85,-30.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAOAaIgEgaIgDgKIAAgEQAAgGADgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQADAAADADQADADAAAEIgDAPIgEAag");
	this.shape_11.setTransform(-202.95,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7},{t:this.shape_8,p:{x:-217.85}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7},{t:this.shape_9,p:{x:-217.85}},{t:this.shape_8,p:{x:-213.35}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7},{t:this.shape_10},{t:this.shape_9,p:{x:-213.35}},{t:this.shape_8,p:{x:-208.85}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7},{t:this.shape_10},{t:this.shape_9,p:{x:-213.35}},{t:this.shape_8,p:{x:-208.85}},{t:this.shape_11}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_5},{t:this.shape_4},{t:this.shape_6},{t:this.shape_7},{t:this.shape_10},{t:this.shape_9,p:{x:-213.35}},{t:this.shape_8,p:{x:-208.85}},{t:this.shape_11}]},2).wait(1));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_12.setTransform(0.025,0);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_13.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text8 = function(mode,startPosition,loop,reversed) {
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
	this.frame_15 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAbA9IgbhLIgaBLIgCAAIgkhiIgFgNIgFgFQgDgCgFAAIAAgDIAsAAIAAADIgCAAQgFAAgCACQgCADAAADIADAOIAYBCIAUg4IgEgKIgDgIIgEgIIgDgDIgEgCIgGgBIAAgDIAuAAIAAADIgEAAQgEAAgDACQgCADAAADQAAAFAEALIAXBAIAWhBQAFgLAAgEIgBgEQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBAAQgDgCgGAAIAAgDIAkAAIAAADQgEAAgDACQgDACgDAEQgCADgEAMIghBfg");
	this.shape_3.setTransform(-245.1,-35.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_4.setTransform(-257.35,-39.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAFA+IAAgDIABAAQAGAAACgBQACgCABgEIAAgIIAAgcQAAgNgBgEQgBgDgEgCQgDgDgDAAQgFAAgDADQgFACgHAGIAAAqIABAKIAEAEQACABAHAAIAAADIgpAAIAAgDQAGAAADgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgGACIgBgDIAYgLIAEAAIAAA7QAKgKAFgEQAFgDAGAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_5.setTransform(-232.15,-36.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgEABQgEACgFAAQgJAAgFgFQgGgGABgJQgBgGADgFQAEgFAIgGQAKgEATgIIAAgDQAAgMgEgEQgDgFgHAAQgFAAgEADQgDADAAAEIABAFQAAAEgCACQgDADgDAAQgEAAgCgDQgCgCAAgEQABgHAHgHQAIgGAOAAQAKAAAGADQAFADADAGQABAEAAALIAAAbIABAOIACADIACABIACAAIAIgHIAAAFQgLANgIAAQgFAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAFAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_6.setTransform(-223.35,-33.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_7.setTransform(-217.025,-35.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_8.setTransform(-217.025,-35.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAFA+IAAgDIABAAQAGAAACgBQACgCABgEIAAgIIAAgcQAAgNgBgEQgBgDgEgCQgDgDgDAAQgFAAgDADQgFACgHAGIAAAqIABAKIAEAEQACABAHAAIAAADIgpAAIAAgDQAGAAADgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgGACIgBgDIAYgLIAEAAIAAA7QAKgKAFgEQAFgDAGAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_9.setTransform(-232.15,-36.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_10.setTransform(-192.075,-33.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_11.setTransform(-185.9,-30.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_12.setTransform(-181.4,-30.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_13.setTransform(-185.9,-30.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAOAaIgEgaIgDgKIAAgEQAAgGADgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQADAAADADQADADAAAEIgDAPIgEAag");
	this.shape_14.setTransform(-171,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-232.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-232.15}},{t:this.shape_6}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-232.15}},{t:this.shape_6},{t:this.shape_7,p:{x:-217.025}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_5,p:{x:-232.15}},{t:this.shape_6},{t:this.shape_7,p:{x:-217.025}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}},{t:this.shape_10}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}},{t:this.shape_10},{t:this.shape_11,p:{x:-185.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}},{t:this.shape_10},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:-176.9}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}},{t:this.shape_10},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:-176.9}},{t:this.shape_14}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_4},{t:this.shape_3},{t:this.shape_9},{t:this.shape_6},{t:this.shape_8},{t:this.shape_7,p:{x:-207.525}},{t:this.shape_5,p:{x:-200.65}},{t:this.shape_10},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:-176.9}},{t:this.shape_14}]},2).wait(1));

	// Layer_1
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_15.setTransform(0.025,0);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_16.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15}]}).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text7 = function(mode,startPosition,loop,reversed) {
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
	this.frame_15 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_3.setTransform(-257.35,-39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AALA7IAAgDIAEAAQAHAAADgEQADgDAAgLIAAgkIg3AAIAAAkIABAMQABACADACQAEACAEAAIAEAAIAAADIgzAAIAAgDIAFAAQAHAAADgEQACgDAAgLIAAhMIgBgMIgDgDQgEgCgEgBIgFAAIAAgDIAzAAIAAADIgEAAQgEABgEACQgDABgBADQgBADAAAIIAAAiIA3AAIAAgiQAAgIgCgEQAAgBgDgCQgEgCgEgBIgEAAIAAgDIAzAAIAAADIgFAAQgEABgEACQgCABgBADQgCADAAAIIAABMQAAAKACACIADAEQAEACAEAAIAFAAIAAADg");
	this.shape_4.setTransform(-247.175,-35.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAEA+IAAgDIACAAQAGAAACgBQACgCABgEIABgIIAAgcQAAgNgCgEQgBgDgDgCQgEgDgEAAQgEAAgEADQgEACgGAGIAAAqIAAAKIADAEQADABAGAAIAAADIgnAAIAAgDQAEAAAEgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGACIgCgDIAYgLIAFAAIAAA7QAJgKAFgEQAGgDAFAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_5.setTransform(-227.15,-36.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGADQgEACgGAAQgHAAgFgDQgFgFgCgFQgCgHAAgLIAAgjQAAgGgBgCQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgBgHgBIAAgCIAdAAIAAA1QAAALAEADQADADAGABQADAAAFgCQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgCIAbAAIAAAvQAAAOABADQAAABABABQAAAAAAABQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_6.setTransform(-236.175,-33.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgHA7QgDgDAAgEQAAgEADgDQACgCAEAAQAEAAACACQADADAAAEQAAAEgDADQgDADgDAAQgEAAgCgDgAgDAgQABgLACgIQABgHAHgMQAFgKACgFQABgFAAgGQAAgLgGgHQgGgGgHAAQgIAAgEADQgFAEAAAEQAAADADAFQADAFAAACQAAAEgCACQgDACgCAAQgEAAgDgEQgDgDAAgHQAAgKAIgIQAJgHAOAAQASAAAIAKQAGAIAAAKQAAAGgCAHQgDAGgIAKQgNANgDAGQgDAGAAALg");
	this.shape_7.setTransform(-218.625,-35.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgGA7QgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQACADABADQgBAEgCADQgDADgEAAQgDAAgDgDgAAAAcIgIhGIgBgHQAAgFADgEQADgDADAAQAEAAADADQADAEAAAGIAAAGIgJBGg");
	this.shape_8.setTransform(-211.65,-35.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgHA7QgDgDAAgEQAAgEADgDQACgCAEAAQAEAAACACQADADAAAEQAAAEgDADQgDADgDAAQgEAAgCgDgAgDAgQABgLACgIQABgHAHgMQAFgKACgFQABgFAAgGQAAgLgGgHQgGgGgHAAQgIAAgEADQgFAEAAAEQAAADADAFQADAFAAACQAAAEgCACQgDACgCAAQgEAAgDgEQgDgDAAgHQAAgKAIgIQAJgHAOAAQASAAAIAKQAGAIAAAKQAAAGgCAHQgDAGgIAKQgNANgDAGQgDAGAAALg");
	this.shape_9.setTransform(-218.625,-35.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAOAaIgEgaIgDgKIAAgEQABgGACgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQAEAAACADQADADAAAEIgCAPIgGAag");
	this.shape_10.setTransform(-197,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5},{t:this.shape_7,p:{x:-218.625}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5},{t:this.shape_7,p:{x:-218.625}},{t:this.shape_8}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{x:-204.625}}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{x:-204.625}},{t:this.shape_10}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_6},{t:this.shape_5},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{x:-204.625}},{t:this.shape_10}]},2).wait(2));

	// Layer_1
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_11.setTransform(0.025,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_12.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11}]}).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text5 = function(mode,startPosition,loop,reversed) {
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
	this.frame_25 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(25).call(this.frame_25).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_3.setTransform(-257.35,-39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgHA+IgLgDIgLgDQAAAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAIgBAFIgDAAIAAgoIADAAQACAMAEAHQADAGAJAEQAHAFAJAAQALAAAHgGQAGgGAAgIQAAgEgDgFQgCgEgFgEIgSgLQgPgIgGgFQgHgFgDgGQgDgGgBgIQAAgNAKgJQAKgJAPAAQAIAAAMAFIAGACQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIACgFIADAAIAAApIgDAAQgBgMgFgHQgEgHgHgEQgHgEgIAAQgJAAgGAGQgGAFAAAHQAAAGAEAEQAFAHAUALIAXAMQAGAFADAHQAEAGgBAHQAAAOgKAKQgKAJgRAAIgJAAg");
	this.shape_4.setTransform(-248.55,-35.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAFA+IAAgDIABAAQAGAAACgBQACgCABgEIAAgIIAAgcQABgNgCgEQgCgDgCgCQgEgDgDAAQgFAAgDADQgFACgGAGIAAAqIAAAKIADAEQADABAGAAIAAADIgnAAIAAgDQAFAAADgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAYgLIAFAAIAAA7QAJgKAFgEQAGgDAFAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_5.setTransform(-239.15,-36.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_6.setTransform(-230.575,-33.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAOBAIAAgMQgGAGgFADQgFADgGAAQgOAAgJgLQgKgLAAgSQAAgRALgNQALgPARAAQAJAAAHAHIAAgPIAAgRIgCgEIgEgBIgGABIgBgDIAYgKIAEAAIAABcIAAASQABAAAAABQAAABAAAAQABABAAAAQAAABABAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIAGgBIABADIgYAKgAgRgIQgIAIAAARQAAASAIAKQAHAJAKAAQAHAAAHgIIAAgpQAAgFgDgFQgDgFgEgDQgEgCgDAAQgIAAgGAHg");
	this.shape_7.setTransform(-217.325,-35.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAACgBQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAgBQABgCABgIIAAgeQAAgOgBgDQgBAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBAAIgDgCIgGACIgBgEIAXgKIAEAAIAABAIABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQACABAFAAIAAADgAgEgvQgDgCAAgEQAAgEADgCQACgDADAAQAEAAACADQADACAAAEQAAAEgDACQgCADgEAAQgDAAgCgDg");
	this.shape_8.setTransform(-215.1,-36.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAOBAIAAgMQgGAGgFADQgFADgGAAQgOAAgJgLQgKgLAAgSQAAgRALgNQALgPARAAQAJAAAHAHIAAgPIAAgRIgCgEIgEgBIgGABIgBgDIAYgKIAEAAIAABcIAAASIADAEQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIAGgBIABADIgYAKgAgRgIQgIAIAAARQAAASAIAKQAHAJAKAAQAHAAAHgIIAAgpQAAgFgDgFQgDgFgEgDQgEgCgDAAQgIAAgGAHg");
	this.shape_9.setTransform(-203.325,-35.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgHA7QgDgDAAgEQAAgEADgDQACgCAEAAQAEAAACACQADADAAAEQAAAEgDADQgDADgDAAQgEAAgCgDgAgDAgQABgLACgIQABgHAHgMQAFgKACgFQABgFAAgGQAAgLgGgHQgGgGgHAAQgIAAgEADQgFAEAAAEQAAADADAFQADAFAAACQAAAEgCACQgDACgCAAQgEAAgDgEQgDgDAAgHQAAgKAIgIQAJgHAOAAQASAAAIAKQAGAIAAAKQAAAGgCAHQgDAGgIAKQgNANgDAGQgDAGAAALg");
	this.shape_10.setTransform(-195.125,-35.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAMATQAHgEADgEQAEgFAAgFIgBgDIgCgBIgDAAIgEABQgDAAgCgDQgDgDgBgDQAAgFAEgDQADgDAFAAQAGAAAFAGQAEAFAAAHQAAAIgFAIQgHAHgKAEgAgeATQAJgFAEgEQACgEAAgGIgBgCIgCgBIgDAAIgDABQgFAAgCgDQgDgCABgEQgBgEAEgDQADgEAFAAQAGAAAEAFQAFAFAAAIQAAAIgGAIQgFAIgMADg");
	this.shape_11.setTransform(-187.1,-39.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-221.825}},{t:this.shape_8,p:{x:-215.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9},{t:this.shape_10}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-217.325}},{t:this.shape_8,p:{x:-210.6}},{t:this.shape_9},{t:this.shape_10},{t:this.shape_11}]},2).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_12.setTransform(0.025,0);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_13.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text3 = function(mode,startPosition,loop,reversed) {
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
	this.frame_66 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(66).call(this.frame_66).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_3.setTransform(-257.35,-39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AALA7IAAgDIAEAAQAHAAADgEQADgDAAgLIAAgkIg3AAIAAAkIABAMQABACADACQAEACAEAAIAEAAIAAADIgzAAIAAgDIAFAAQAHAAADgEQACgDAAgLIAAhMIgBgMIgDgDQgEgCgEgBIgFAAIAAgDIAzAAIAAADIgEAAQgEABgEACQgDABgBADQgBADAAAIIAAAiIA3AAIAAgiQAAgIgCgEQAAgBgDgCQgEgCgEgBIgEAAIAAgDIAzAAIAAADIgFAAQgEABgEACQgCABgBADQgCADAAAIIAABMQAAAKACACIADAEQAEACAEAAIAFAAIAAADg");
	this.shape_4.setTransform(-247.175,-35.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGADQgEACgGAAQgHAAgFgDQgFgFgCgFQgCgHAAgLIAAgjQAAgGgBgCQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgBgHgBIAAgCIAdAAIAAA1QAAALAEADQADADAGABQADAAAFgCQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgCIAbAAIAAAvQAAAOABADQAAABABABQAAAAAAABQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_5.setTransform(-236.175,-33.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAEA+IAAgDIACAAQAGAAACgBQACgCABgEIABgIIAAgcQAAgNgCgEQgBgDgDgCQgEgDgEAAQgEAAgEADQgEACgGAGIAAAqIAAAKIADAEQADABAGAAIAAADIgnAAIAAgDQAEAAAEgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGACIgCgDIAYgLIAFAAIAAA7QAJgKAFgEQAGgDAFAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_6.setTransform(-227.15,-36.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_7.setTransform(-220.4,-30.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_8.setTransform(-220.4,-30.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_9.setTransform(-220.4,-30.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgZA7IAAgDIAFAAQAHAAAEgEQABgDAAgLIAAhMIAAgMIgEgDQgEgCgEgBIgFAAIAAgDIAzAAIAAADIgFAAQgHAAgEAFQgBADAAAKIAABMIAAAMIAEAEQAEACAEAAIAFAAIAAADg");
	this.shape_10.setTransform(-201.65,-35.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_11.setTransform(-196.025,-35.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgBAaIgFgaIgCgOQAAgGADgCQABgDAEAAQAEAAACADQADADAAAEIgDAPIgEAag");
	this.shape_12.setTransform(-192.05,-39.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_13.setTransform(-186.775,-33.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AALAnQgCgDgBgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGAAgJQAAgGADgFQADgFAJgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIAAAFQAAAEgCACQgCADgDAAQgDAAgDgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQABAEAAALIAAAbIABAOIABADIADABIADAAIAHgHIAAAFQgKANgKAAQgEAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAFAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_14.setTransform(-174.6,-33.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgSA+IAAgDQAFAAACgBQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABgBIABgKIAAhIIgBgRQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgDIAYgLIADAAIAABqIABAKQABABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAHAAIAAADg");
	this.shape_15.setTransform(-172.8,-36.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgcApIAAgDQAGAAADgBQACgCABgDIABgJIAAgeIgBgRIgCgDIgEgCIgGACIgBgEIAYgKIAEAAIAAASQAJgRALgBQAFAAADADQADAEAAADQAAAEgCACQgDADgDgBQgCAAgFgCIgFgEQgBAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAIABADIAEAEQADABAFAAIAAADg");
	this.shape_16.setTransform(-162.8,-34);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_17.setTransform(-155.825,-33.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AALAnQgCgDgBgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGAAgJQAAgGADgFQADgFAJgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIAAAFQAAAEgCACQgCADgDAAQgDAAgDgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQABAEAAALIAAAbIABAOIABADIADABIADAAIAHgHIAAAFQgKANgKAAQgEAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAFAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_18.setTransform(-179.1,-33.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAOBAIAAgMQgGAGgFADQgFADgGAAQgOAAgJgLQgKgLAAgSQAAgRALgNQALgPARAAQAJAAAHAHIAAgPIAAgRIgCgEIgEgBIgGABIgBgDIAYgKIAEAAIAABcIAAASIADAEQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIAGgBIABADIgYAKgAgRgIQgIAIAAARQAAASAIAKQAHAJAKAAQAHAAAHgIIAAgpQAAgFgDgFQgDgFgEgDQgEgCgDAAQgIAAgGAHg");
	this.shape_19.setTransform(-139.075,-35.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgjA5QgEgDAAgEQAAgEACgCQADgCAEAAIAIACIAFABQACAAADgDQADgDAEgHIAFgOIgdg8IgEgHIgEgEIgGgDIAAgDIAmAAIAAADIgCAAQgEAAgCACQAAABgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAAEACAGIATAoIASgsIACgHIgBgCIgCgCIgFgBIAAgDIAaAAIAAADIgFACIgEAEIgDAHIggBPQgFAMgHAGQgIAGgHAAQgFAAgDgDg");
	this.shape_20.setTransform(-130.4,-31.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_21.setTransform(-196.025,-35.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgSA+IAAgDQAGAAACgBQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAgBQABgCABgIIAAgeQAAgOgBgDQgBAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBAAIgDgCIgGACIgBgEIAXgKIAEAAIAABAIABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQACABAFAAIAAADgAgEgvQgDgCAAgEQAAgEADgCQACgDADAAQAEAAACADQADACAAAEQAAAEgDACQgCADgEAAQgDAAgCgDg");
	this.shape_22.setTransform(-113.85,-36.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAdApIAAgDIACAAQAFAAADgBQACgCABgDIAAgJIAAgiQAAgJgCgEQgEgGgHAAQgFAAgEADQgFACgHAGIAAABIAAAEIAAAlQAAAJABABQAAABABAAQAAABAAAAQABABAAAAQABABABAAQACABAGAAIAAADIgnAAIAAgDQAGAAADgBQACgCABgDIABgJIAAgiQAAgJgDgEQgEgGgHAAQgFAAgEADQgIAEgEAEIAAAqIABAKQAAABABABQAAAAABABQAAAAABAAQAAABABAAQACABAGAAIAAADIgnAAIAAgDQAFAAACgBIAEgEIABgKIAAgdQAAgOgBgEIgCgDIgEgCIgFACIgCgEIAZgKIADAAIAAASIALgKIAIgGQAFgCAEAAQAIABAEAEQAGAEACAJQAJgLAGgDQAGgDAHgBQAGABAFADQAFADADAIQACAFAAAKIAAAiIABAKIADAEQADABAFAAIAAADg");
	this.shape_23.setTransform(-104.375,-34);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_24.setTransform(-155.825,-33.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgiA+IAAgDIAEAAQADAAADgBQADgCABgDIABgMIAAg0IgQAAIAAgGIAQAAIAAgFQAAgNAEgHQAEgJAIgFQAGgGALAAQAJABAIAFQAEAEAAAFQAAADgCADQgCACgCAAIgFgBQgCgCgDgFIgGgHQgDgBgEAAQgDAAgDACQgCACgBAFQgCAFABASIAAAGIATAAIAAAGIgTAAIAAA0QgBALADAEQACADAGAAIAHAAIAAADg");
	this.shape_25.setTransform(-80.65,-36.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgIAAQgGAAgEADg");
	this.shape_26.setTransform(-78.9,-33.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgcApIAAgDQAGAAADgBQADgCAAgDIAAgJIAAgeIAAgRIgCgDIgEgCIgGACIgBgEIAZgKIADAAIAAASQAJgRALgBQAFAAADADQADAEAAADQAAAEgCACQgCADgDgBQgDAAgFgCIgFgEQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQgDAEgEAIIAAAlQAAAIABADIAEAEQADABAFAAIAAADg");
	this.shape_27.setTransform(-66.8,-34);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQASAAALAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHgBAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQABgUgKgMQgGgJgIAAQgGAAgEADg");
	this.shape_28.setTransform(-41.9,-33.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAWApIgUgyIgXAyIgDAAIgahCQgCgGgDgDQgCgCgGgCIAAgCIAiAAIAAACQgFABgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASgkIgFgNQgCgEgDgDIgIgCIAAgCIAmAAIAAACQgHABgCACQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAIABAEIASAuIARgsIACgIQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAIgHgCIAAgCIAaAAIAAACQgIACgEAJIgbBEg");
	this.shape_29.setTransform(-52.925,-33.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgcApIAAgDQAGAAADgBQADgCAAgDIABgJIAAgeIgBgRIgCgDIgEgCIgGACIgBgEIAZgKIADAAIAAASQAJgRALgBQAFAAADADQADAEAAADQAAAEgCACQgCADgDgBQgEAAgEgCIgFgEQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQgDAEgEAIIAAAlQAAAIABADIAEAEQADABAFAAIAAADg");
	this.shape_30.setTransform(-34.3,-34);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAGA+IAAgDIAEAAIABgDQAAgDgDgEIgYggIAUgRIAHgIIABgCIgBgCQgCgCgDAAIAAgDIAjAAIAAADQgIAAgEACQgFACgGAFIgTATIATAaIAMANQAEAEADACIAIAAIAAADgAgsA+IAAgDQAGAAADgBIADgDQACgDAAgHIAAhJQAAgNgBgEQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgEgBIgFACIgCgDIAYgLIAEAAIAABPIAAAbIABAKQAAABABABQAAAAAAABQABAAAAAAQABABAAAAIAJABIAAADgAgQARg");
	this.shape_31.setTransform(-26.775,-36.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_32.setTransform(-220.4,-30.575);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_33.setTransform(-215.9,-30.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_34.setTransform(-220.4,-30.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgHA7QgDgDAAgEQAAgEADgDQACgCAEAAQAEAAACACQADADAAAEQAAAEgDADQgDADgDAAQgEAAgCgDgAgDAgQABgLACgIQABgHAHgMQAFgKACgFQABgFAAgGQAAgLgGgHQgGgGgHAAQgIAAgEADQgFAEAAAEQAAADADAFQADAFAAACQAAAEgCACQgDACgCAAQgEAAgDgEQgDgDAAgHQAAgKAIgIQAJgHAOAAQASAAAIAKQAGAIAAAKQAAAGgCAHQgDAGgIAKQgNANgDAGQgDAGAAALg");
	this.shape_35.setTransform(-4.875,-35.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7,p:{x:-220.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_8,p:{x:-220.4}},{t:this.shape_7,p:{x:-215.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_14,p:{x:-174.6}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-206.15}},{t:this.shape_11,p:{x:-200.525}},{t:this.shape_12,p:{x:-196.55}},{t:this.shape_13,p:{x:-191.275}},{t:this.shape_14,p:{x:-179.1}},{t:this.shape_15,p:{x:-172.8}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_14,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_14,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-206.15}},{t:this.shape_11,p:{x:-200.525}},{t:this.shape_12,p:{x:-196.55}},{t:this.shape_13,p:{x:-191.275}},{t:this.shape_18,p:{x:-179.1}},{t:this.shape_15,p:{x:-172.8}},{t:this.shape_16,p:{x:-167.3}},{t:this.shape_17,p:{x:-160.325}},{t:this.shape_14,p:{x:-152.1}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_11,p:{x:-196.025}},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_17,p:{x:-155.825}},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-85.15}},{t:this.shape_26,p:{x:-78.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}},{t:this.shape_30,p:{x:-34.3}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_9,p:{x:-220.4}},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_7,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}},{t:this.shape_30,p:{x:-34.3}},{t:this.shape_31,p:{x:-26.775}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_32,p:{x:-220.4}},{t:this.shape_9,p:{x:-215.9}},{t:this.shape_8,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-57.425}},{t:this.shape_28,p:{x:-46.4}},{t:this.shape_30,p:{x:-38.8}},{t:this.shape_31,p:{x:-31.275}},{t:this.shape_7,p:{x:-24.65}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}},{t:this.shape_30,p:{x:-34.3}},{t:this.shape_31,p:{x:-26.775}},{t:this.shape_9,p:{x:-20.15}},{t:this.shape_8,p:{x:-15.65}},{t:this.shape_7,p:{x:-11.15}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}},{t:this.shape_30,p:{x:-34.3}},{t:this.shape_31,p:{x:-26.775}},{t:this.shape_9,p:{x:-20.15}},{t:this.shape_8,p:{x:-15.65}},{t:this.shape_7,p:{x:-11.15}},{t:this.shape_35}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32,p:{x:-211.4}},{t:this.shape_10,p:{x:-201.65}},{t:this.shape_21},{t:this.shape_12,p:{x:-192.05}},{t:this.shape_13,p:{x:-186.775}},{t:this.shape_18,p:{x:-174.6}},{t:this.shape_15,p:{x:-168.3}},{t:this.shape_16,p:{x:-162.8}},{t:this.shape_24},{t:this.shape_14,p:{x:-147.6}},{t:this.shape_19},{t:this.shape_20},{t:this.shape_11,p:{x:-118.775}},{t:this.shape_22},{t:this.shape_23},{t:this.shape_17,p:{x:-93.325}},{t:this.shape_25,p:{x:-80.65}},{t:this.shape_26,p:{x:-74.4}},{t:this.shape_27},{t:this.shape_29,p:{x:-52.925}},{t:this.shape_28,p:{x:-41.9}},{t:this.shape_30,p:{x:-34.3}},{t:this.shape_31,p:{x:-26.775}},{t:this.shape_9,p:{x:-20.15}},{t:this.shape_8,p:{x:-15.65}},{t:this.shape_7,p:{x:-11.15}},{t:this.shape_35}]},2).wait(3));

	// Layer_1
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_36.setTransform(0.025,0);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_37.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36}]}).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


(lib.Text2 = function(mode,startPosition,loop,reversed) {
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
	this.frame_15 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAGA3IAAgEIACAAQAHAAADgCQADgDABgEIABgLIAAgrQAAgPgEgGQgEgHgJAAQgNAAgNAPIAAA4QAAALABACQABAEADACQADABAJAAIAAAEIg1AAIAAgEIACAAQAIAAADgEQADgEAAgMIAAgnQAAgTgBgEQgBgFgBgBQgCgCgDAAQgEAAgEACIgCgEIAhgNIAFAAIAAAWQASgWARAAQAIAAAHAEQAGAFAEAKQACAHAAAOIAAAtQAAAKACAEQABADADABQADACAIAAIAAAEg");
	this.shape.setTransform(-238.225,-60.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEIgDgFQgBgCgDAAIgIACIgCgEIAfgNIAGAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDAEQgEADgEAAQgEAAgDgDg");
	this.shape_1.setTransform(-247.5,-63.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAlBQIg1hLIgKABIgDAAIgEgBIAAAvQABAPADADQAEAFAJAAIAGAAIAAAFIhEAAIAAgFIAGAAQAKAAAFgGQACgEAAgNIAAhnQAAgPgDgDQgFgFgJAAIgGAAIAAgFIA6AAQAYAAAMAFQAMADAJAKQAIAKAAAOQAAAOgKALQgJAKgUAEIAhAtQALAQAIAGQAIAFANABIAAAFgAghhEIAABDIAEAAIADAAQAXAAAKgKQALgKAAgPQABgPgKgJQgJgKgPAAIgSACg");
	this.shape_2.setTransform(-258.6,-63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAOAaIgFgaIgBgKIAAgEQAAgGABgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgFAag");
	this.shape_3.setTransform(-257.35,-39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgcA2QgKgHgFgLQgCgIAAgWIAAgtQAAgLgDgEQgEgDgGAAIgEAAIAAgDIAzAAIAAADIgFAAQgHAAgDAEQgCAEAAAKIAAAzIABAQQABAJADAEQAEAGAGADQAGAEAIgBQANABAIgGQAKgFADgIQADgIAAgTIAAgvQABgLgDgDQgDgEgHAAIgFAAIAAgDIArAAIAAADIgFAAQgHAAgEAGQgCACAAAKIAAAwQAAASgDAKQgEAJgKAIQgLAHgRAAQgTAAgKgHg");
	this.shape_4.setTransform(-247.2,-35.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AghA1QgGgEgBgFIABgEIAGgJIAJgJIgGgGQgCgCAAgCQAAgEACgDQADgFAJgGQgHgEgEgHQgEgGAAgHQAAgNAJgIQAJgJAOAAQALAAAIAFIARAAIAEABIABAAIAAAEIAAACIgBABIgEAAIgLAAQAGAHgBAKQAAALgIAIQgJAIgOAAIgMgBQgDADgBABIgCAFIACACIAFACIANABIAWABQAIABAFAFQAEAFAAAIQABAJgKAJQgNANgWAAQgQAAgMgIgAgZAfQgCADAAAEQAAAEAFADQAJAFAPAAQAQAAAIgFQAIgGgBgGQABgFgFgCQgFgBgNgBQgTgBgKgBQgFAEgCAFgAgOgyQgEAFAAAKQAAAOAGAIQAEAGAIAAQAFAAAFgFQAEgGAAgKQAAgOgGgIQgEgFgHgBQgGAAgFAGg");
	this.shape_5.setTransform(-236.05,-32.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_6.setTransform(-220.4,-30.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAEA+IAAgDIACAAQAGAAACgBQACgCABgEIABgIIAAgcQAAgNgCgEQgBgDgDgCQgEgDgEAAQgEAAgEADQgEACgGAGIAAAqIAAAKIADAEQADABAGAAIAAADIgnAAIAAgDQAEAAAEgBQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGACIgCgDIAYgLIAFAAIAAA7QAJgKAFgEQAGgDAFAAQAHAAAFAFQAFADACAJQACAEAAAPIAAAcIABALIADADQACABAGAAIAAADg");
	this.shape_7.setTransform(-227.15,-36.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_8.setTransform(-220.4,-30.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_9.setTransform(-220.4,-30.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAOAaIgFgaIgCgKIAAgEQAAgGACgCQADgDAEAAQAEAAADADQACACAAAFIgBAPIgGAagAgRAaIgFgaIgCgOQAAgGADgCQACgDAEAAQADAAADADQADADAAAEIgDAPIgEAag");
	this.shape_10.setTransform(-205.5,-39.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_7},{t:this.shape_6,p:{x:-220.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_7},{t:this.shape_8,p:{x:-220.4}},{t:this.shape_6,p:{x:-215.9}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_7},{t:this.shape_9},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_6,p:{x:-211.4}}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_3},{t:this.shape_4},{t:this.shape_5},{t:this.shape_7},{t:this.shape_9},{t:this.shape_8,p:{x:-215.9}},{t:this.shape_6,p:{x:-211.4}},{t:this.shape_10}]},2).wait(2));

	// Layer_1
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape_11.setTransform(0.025,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_12.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11}]}).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.4,-80,540.9,160);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgFAmQgCgCAAgEQAAgGADgGIACgJIABgIIgKAJQgHAIgDACQgDACgDAAQgDAAgCgDQgDgCAAgCQAAgDACgDQACgCAEgCIAMgDIAMgEIgNgDQgLgDgDgCQgFgDAAgFQAAgCADgCQACgDACAAQAEABAEACQADACAGAGQAEAGAGAEQAAgHgCgHQgEgKAAgDQAAgFADgCQACgDACAAQAEAAACADQACACAAAFQAAAEgCAIIgEAPQAFgEAFgFQAHgHADgCQADgCADAAQADAAADACQACACAAADQAAAEgDACQgDADgOAEIgMACQAFADAHABQANACADADQAEAEgBAEQAAACgCACQgBADgEAAQgDAAgDgDQgDgBgHgIIgKgJIADANQADALAAAFQAAAEgCACQgCADgEAAQgCAAgDgDg");
	this.shape.setTransform(-5.6,-3.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAAEADQACADAAAEQAAAFgCADQgEADgEAAQgEAAgDgDgAgBAfIgIhOIgBgIQAAgGADgDQADgEAEAAQAFAAADAEQADAEAAAHIgBAGIgJBOg");
	this.shape_1.setTransform(-13.9,0.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAADADQADADAAAEQAAAFgDADQgDADgEAAQgEAAgDgDgAgBAfIgJhOIAAgIQAAgGADgDQADgEAEAAQAFAAACAEQAEAEAAAHIgBAGIgJBOg");
	this.shape_2.setTransform(-20.55,0.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAADADQADADAAAEQAAAFgDADQgDADgEAAQgEAAgDgDgAgBAfIgJhOIAAgIQAAgGADgDQADgEAEAAQAEAAADAEQAEAEAAAHIgBAGIgJBOg");
	this.shape_3.setTransform(-27.2,0.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgzAtQgPgTAAgYQAAgQAIgQQAKgTASgLQAOgIATAAIANABIARAFIAHACIADgBQACgCAAgFIAEAAIADAqIgDAAQgGgQgIgIQgMgLgSAAQgZAAgNAUQgLARAAAXQAAASAIAPQAHAQAMAHQAMAIALAAQAHAAAHgCQAHgCAGgEIAAgmQAAgKgBgDQgCgDgDgBQgDgBgIAAIAAgEIAzAAIAAAEIgCAAQgIAAgDAEQgBADAAALIAAApQgMAGgLACQgLADgNAAQglAAgUgYg");
	this.shape_4.setTransform(-37.575,0.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAyBDIhXhpIAABQQABANACADQAEAEAIAAIAEAAIAAADIguAAIAAgDIAFAAQAJAAADgFQACgEAAgLIAAhbIgJgJIgJgEIgIgBIAAgDIAkAAIBQBiIAAhLQAAgMgDgDQgEgFgHAAIgFAAIAAgDIAuAAIAAADIgEAAQgJAAgEAGQgCADAAALIAABug");
	this.shape_5.setTransform(-52.5,0.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgbBCIAAgDIAEAAQAJAAADgFQADgDAAgMIAAhVQAAgKgCgDIgEgEQgEgDgFAAIgEAAIAAgDIA3AAIAAADIgEAAQgIAAgEAFQgDADAAAMIAABVQAAAKACADQABADADABQAEADAFAAIAEAAIAAADg");
	this.shape_6.setTransform(-62.775,0.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAfBCIgsg+IgIABIgDAAIgDgBIAAAnQAAAMADADQADAFAIAAIAFAAIAAADIg5AAIAAgDIAFAAQAJAAADgGQACgDAAgLIAAhVQAAgMgDgDQgDgFgIAAIgFAAIAAgDIAwAAQAVAAAKADQAKADAHAIQAGAIAAAMQAAAMgHAJQgIAJgRADIAbAmQAKANAGAEQAHAEALACIAAADgAgbg4IAAA3IADAAIACAAQATAAAJgIQAKgIAAgNQAAgMgIgIQgIgIgMAAIgPACg");
	this.shape_7.setTransform(-72.525,0.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgFAmQgCgCAAgEQAAgGADgGIACgJIABgIIgKAJQgHAIgDACQgDACgDAAQgDAAgDgDQgCgCAAgCQAAgDACgDQACgCAEgCIAMgDIAMgEIgNgDQgMgDgCgCQgFgDAAgFQAAgCACgCQADgDACAAQADABAFACQADACAGAGQAEAGAGAEQAAgHgCgHQgEgKAAgDQAAgFADgCQACgDACAAQADAAADADQACACAAAFQAAAEgCAIIgEAPQAFgEAFgFQAGgHAEgCQADgCADAAQAEAAACACQACACAAADQAAAEgDACQgDADgOAEIgMACQAFADAHABQANACADADQADAEAAAEQAAACgBACQgCADgEAAQgDAAgDgDQgEgBgGgIIgKgJIADANQADALAAAFQAAAEgCACQgDADgDAAQgCAAgDgDg");
	this.shape_8.setTransform(-84.45,-3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(-91.4,-13,182.9,26.1), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("EgqAgMQMBUBAAAIAAYhMhUBAAAg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgqAAMRIAA4hMBUBAAAIAAYhg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-270.4,-80,540.9,160), null);


(lib.Titlebg_effect = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.518)").s().p("EgjrAKYIAA0vMBHXAAAIAAUvg");
	this.shape.setTransform(228.425,66.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Titlebg_effect, new cjs.Rectangle(0,0,456.9,132.8), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("Eg+XguuMB8vAAAMAAABddMh8vAAAg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg+XAuvMAAAhddMB8uAAAMAAABddg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(-400.6,-300.6,801.3,601.3), null);


(lib.Start_Background = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg+fgu8MB8/AAAMAAABd5Mh8/AAAg");
	this.shape.setTransform(399.975,300.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg+fAu9MAAAhd5MB8/AAAMAAABd5g");
	this.shape_1.setTransform(399.975,300.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,802,603);


(lib.Redrayflash = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#990033").s().p("AgdHeQhmgHhdgxQhdgxg+hRQhJhfgTh8QgTh7AphxQAqhxBehSQBehTB1gaQBkgVBmAWQBnAWBSA9QBSA9AzBcQAzBcAIBmQAIBlglBjQgkBjhIBJQhHBIhjAmQhUAghXAAIgcAAg");
	this.shape.setTransform(47.8236,47.8351);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Redrayflash, new cjs.Rectangle(0,0,95.7,95.7), null);


(lib.Play_BrightSYM = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330154716();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib.PClick_Effect = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#252525").ss(4,1,1).p("A5TkmMAynAAAIAAJNMgynAAAg");
	this.shape.setTransform(162,29.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.698)").s().p("A5TEnIAApNMAynAAAIAAJNg");
	this.shape_1.setTransform(162,29.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PClick_Effect, new cjs.Rectangle(-2,-2,328,63), null);


(lib.OVER_PLAY = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330154910();
	this.instance.setTransform(0,0,0.3841,0.4067);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,307.3,244);


(lib.LightRay_Stary = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1,3,true).p("EAphBXUMhTBAFWMAnri5Tg");
	this.shape.setTransform(265.65,593);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("EgB1hcpMArVCz8MhTAAFXg");
	this.shape_1.setTransform(265.65,593);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LightRay_Stary, new cjs.Rectangle(-1,-1,533.3,1188), null);


(lib.HIT_START = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330144249();
	this.instance.setTransform(-340,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-340,-300,800,600);


(lib.GLITCHFX_MIRAGE = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330155224();
	this.instance.setTransform(0,0,0.6503,0.6306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.GLITCHFX_MIRAGE, new cjs.Rectangle(0,0,520.2,378.4), null);


(lib.GLITCH_FX = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.TitlePIC();
	this.instance.setTransform(0,0,0.6951,0.6835);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.GLITCH_FX, new cjs.Rectangle(0,0,556.1,410.1), null);


(lib.Down_BUT = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330162354();
	this.instance.setTransform(-75,-101,0.3367,0.3367);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,-101,269.3,202);


(lib.Symbol25 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("Ag7B9IAAgGIgDgEIAJgHIAEgGIACgCIALgCQAFgGADAAIADAAIAJgIIAEAAIAAgCIAEgBIACgHIABAAIAEgHIAGgCIACgFIACgDIAEgNIgDgHIgJgcIgVgOIgJgMIgCgIIgFgKIgDAAIgDgJIAAgDQgBgJgCgCIAGgPIACABIAAgHIAFgDIAAgEQAIgFAEgEIAEAAIAAADIAEgIIAAACQAAgCAJgEQAAgDAEAAIAHgLIAEgBIAEABIABgCIAIAAIAAgCIANgDIAJgFIABgCIAHACIAEAHIAEABIgDAMIgKAGIgpAUIgGALIABAMIAOAVIADALIAIgCIAJAIIAAAJIAEABIAQAdIAFAHIgCAMIABADIgFAGIgHAQQgNALgDAHIgGAAIgBADIgcAWQgLAMgGACIgbAIQgEAEgGAEg");
	this.shape.setTransform(63.925,-0.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Ag8ClIgDgOIgDgHQgCgEgHgsIAEgIIAAgIIAFgCIAHgTIgCgHIAKgCIABgCIgCgGIAHgWIACgUIALgaQgBgFgGgEQgGgFgFgBIgJAFIgCAAQgHAAgDgBIgDgCQgCAAgDACQgCAFgDAAIgBAAIgEAAIgJgBIgEgPQAAgCADgIQADgHAEAAIADAAIAGgCIAJgBIACAAIACAAIAEgBIAEgBIAEABIAIgEIADAAIAGgBQADgBAEgIIAFABQAAgFAFgJQAEAAAAgGIAAgDIgBACIAGgNIgCgJIAKgSQAEgHAFgBQAFgHALgGQAKgHADAAQAIAAACAHIgGANIAAAMQAAAEgIAMIAAAEIgFAMIAAAHIgGAQIAAACQAAAFADAAIAHgCQAHAEAFAAIAKAAQAOgEAHAAIASACIAAABIAIABIAIAJIgHAJIgNACIgNAHIgFABIgHAEIgOgCQgCACgLABIgXABQgJAHgDADIABAMIgDAFIgCAPIgGAIIgBATIgFAEIgBAFIADAMIgEApIAJAkIALgFQACgGAIAAIAFAAQALgDAFgJIALgDIgCgBIAEgEQAEgDABgDIAGgCIACgEQABAAABAAQAAgBABAAQAAgBABAAQAAgBAAgBQAEgHAPgEQAEACAAACQAAAEgFAMQgEALgGAEIgNAJIgDAFQgDAEgDABIgIADIgGACIgNAMIgJABIgJAJIgEAEQgBABgEABIgcAMIgHAAIgFAFg");
	this.shape_1.setTransform(48.075,-3.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgcC1QgDgIgHgIIACgLIgCgJIAAgFIACgOIABgGIAAgBIAAAAIgBgBIADgHQACgHAAgLQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAIADgGIAAgbIADgIIAEgOIADgDIgBgDIABgFQgDgHgFAAIgLAAQAAABAAAAQgBABAAAAQAAABAAABQAAAAAAABIgCAAQgBAGgFABQgBAGgGABIgDAGIgBAAQgCAFgEAAQgFAAgCgGIgDgHIABgCQACgKAMgHIAAgCQAFgEAFgDIgCAAQAKgCACgHQABgIAKAAIACABIAHgDIgEAAIAFgDIABABIAFgFIABABQACgHAKAAQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBIAAgCIABAAIgBgBIAHgFQAEgGAIAAQAFAAAEADQADACAAADQAAADgDAFIAAAAIgDAMIADABIgEAJIgBgCIAAADQAAAJgIAJIACAAIAAAEIgBAAIABAbIgCADIABAEIgEAQIABAAIgBANIgCAGIgEAeIAAAFQAAAEAEAAQAEAAAFgDIAOgKQAHgHACAAIABAAQAFgCACgEQAEgFACAAQADgGADAAIACAAIAIACIACAGQAAAFgEAHIgFALQgCAEgIADIAAABIgDgBIAAAEIgCAAQgBAGgGABIAAABIgFAAIAAABIgDAAIgGAEIgBAAIgEAEIgJABQgBADgDAAIgLAIIAAACIgFgBIABADIgHABIAAACIgDAAIAAADIgDACIgCAAIAAABQgDAIgFAAgAAXh+QgFgDgDgGIgEgNIAFgFIACgGIAHgEIAFgJIAHgEIAAABIAEACIACgBIABgCIAGgBIAHgDIACgBIABAAIAEAFIAAAHIABAHIgCAFIgCAAIgIASIgBgBQAAAAAAABQAAAAAAABQAAABgBAAQAAAAgBABIAAABQgFAIgHADIgCgBIAAACQgJgBgEgCg");
	this.shape_2.setTransform(28.25,-6.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("ABNDvIgJADIgGgFIgBgFIgCgBIgBgCIgCgEIAAgEIgEgFIAAgDIgDgCIgYgcIgNgZIABgDIgGgJIAFgCIgCgFIgCgLIgBgEIgCgJIgEgGIgCgHIgBgNIAAgJIgBAAIACgKIgBgEIgGgBIACgFIACACIgDgNIgEAFIAEgOIgDAAIAAABIgDgBIgKALIgBgBIgHADIAAAFIgFADIAAADIgDAAIgEADQgCABgGAAIACAGIgGADQgCAJgDADIAAAEIgFADIAAAFIgDgBIgHANIgJACIgBAFIgFABIAAABIgGADIAAAAQgDgIgDgCIAAABIgHgHIgCgMIACgFIAAgEIgDgEIABgEIAAgDIACgHIgEgDIAEgDQgDgHAAgHIAAgDIAAgGIgBgFIAEgHIgDgOIADAAIACgHIAAgEIACAAIAAgTIADgCIABgLIAAgDIAHAAIACgMIAHACIAGgOIAAgDIABABQADgEAFgNIADgCIAAgEIAAAEIABgHIAFgBIACgFIAAgDIADAAQACgEALgIIABABIADgEIAEACIACgCIAAgCIACABIADgJIAKADIgBgBIAHAAIgBgBIADgBIAKACIANAHIgFAAIAJADIAAACIAGAGQADAKACAAIADgBIACgGIAEgCIAAgLIABgDIADgBIgBgIIACgCIAFgDIgBgFIABgBIgFgBIAAgrIAEgDIABgGIAAgBIAAgMIgGADIgEgBIgFABIgBAEIgHAEIgCAAIgGgEIgDgJIgCgBIACgDIgCgGIACgDIAEgBIABgEIAEgBIAEgHIADAAIABgCIARgMIAAgCIAIAAIAAgDIACADIADAAIABgEIAHgDIAVgBIAGABIABACIAEABIgCAJIAAAEIgDADIAAAIQgBAGgDAEIACACIgFACIAAAFIgFAFIAAAJIgBgCIgDAGIgBAJIgDAHIABAFIgCAFIgDAGIgFAEIAAAIIACABIgCAOIACADIgGAJIAAAJIgEADIAAALIgGAHIAAAFIADABIgCAHIADADQgEAHgFACIgBAHIADABIgHAEIABAFIgBAGQAMAAACgCIAEACIgTAXIgGAZIgEACIABAHIgCADIABADIgBACIAAAJIABAHIgCAAIgBAFIgEADIgCAAIAAAMIAEABIgEAIIABAAIgBAEIADAFIAAADIAEAEIgBAHIACAEIAAARIgEABIAEAHIAAAGIADAQIAOAdIAAAAIAGAGIAMARQAGAEACADIACAAIAAACIAEACIADAAIAEAEQAJgCADgJQAGAAAGgFIAEAHIgDABIAAADIgEADIABAFIAAAEIADgBIAAAHIgHAEIACACIgDABIgBACIABACIgDAAIABACQgGACgIAEIgKgKgAhBA3IAHgDIACABIALgNIAEgBIAAgBIAGgHIAHgDIAFgGIADgBIALgKIAOgKIACgIIAGgHQACgJADgFIgGgGIgBgRIgBgGIAAgBQgCgEgBgDIgDAAIgBAFIgFgBIAAgFIgCABIgBgDIgGACIgHgCIgBgGIgEgDIgBAFIgPAIIgHAOIgDABIAAAAIgCADIgCAAIgCAFIACACQgCALgCADIAAADQgEAEgCAHIgDAAIAAAGIgCAIIABAFQgEAMgDAFIACADIAAAIIADADIgEAEIABAHIAFAFIAAgCg");
	this.shape_3.setTransform(10.35,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AhQB1IgJgIIABgGIgBgDIABgFIgDgIIABgHIgCgKIACgIIgDgNIgBgBIABgGIAHgDIAAgFIgDgBIABgGIgCgDIABgFIADgCIgBgFIABgJIACgBIAEgJIAHgOIAGgCIABgHIgBgCIABgEIAEgDIACgHIgFAAIAAgDIACgDIAAgDIAAgDIABAAIAAgIIAIgBIACgGIARgSIACAAQADgEAEgDIADABQAEgBAEgHIACAAIAFgCIABAAIADgFIAQgFIAGABIAAAAIAAACIABAAIADADIAMABIAKAAIAGAEIACAAIADALIgEAEIAAAEIAHAIIgBAVIgDAAIgBAEIgBAAIAAAGIAEABIACACIgDAEIAAAEIgFACIgEAEIgMAGIgIAHIgEAKIgTAHIgTAAIABAEIgEAAIgBABIgJACIgCgDIgDABIAAACIgIADIgDAKIAEALIAAAGIADAFQgFANgCABIABAEIgCABIAFACIAAAHIAFADQALgDACgCIAEADIABgBIAOgCIACgDIAEAAIAFAAIAEADIgBgCIAFAAIAFgFIAHAAIgBAAIAGgDIACABIADgDIAFAAIAEgEQAFAAALgGIAAgCIAHgCIAGgKIAHAAQAEAEAFABIAEADIgFAKIABAGIgIAEIgBACIgKABIgGAGIgGABIgDAFIgIgBIgDAGIgHgBIgDAEIgHADIgDgCIgGAFIgHAAIgEACIgDAAIgEADQgFACgFADIgDgCIgHAAIgDACIgCgBIgDABIgBgBIgCAFIgGAAIgGADQgCACgJAAIgBADIgFAAIgFABIgFAFIgGgCIgEAEgAgmgjIACAJIAEACIALADIAHgFIAOgBIAIgMIAKgIIACgRIgDgFIgBgIIgFAAIgEgCIgHADIgGgDIgJAHQAAAFgEAEQgFAFgBAAIgEAAIADAEIgHAOIgDgBg");
	this.shape_4.setTransform(-12.2,0.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AhQBnQgBgGAFgKQAFgKABgEQACgWAJgEIACgHIgBgEIADgDIgGgKIAAgEIgCgTIAEgCQABAAAAAAQABABAAAAQABAAAAABQAAAAABAAIAJgLIgCgIIADgKIgGgEIAAgXIgIAHIgFAAIgHAFIgIgCIgHABQgGAAAAgEQAAgHAGgJQAIgKANgHIAAgBIAGgBQAEgHAEAAIAHgEQADgDALgGIAGADIAFgCIAHgCIAIgEQAFACAAAFQgEAHgBAMIAAADQAAABAAAAQgBABAAABQAAAAAAABQgBAAAAABIABADIABAAIgBAHIgDABIgCAHIgCAAQABAEADABQAFAAAMgOIAAABIAXgRIAFgBIAKgGIAIgCQAIgHARgBQAIAFACAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABIgCAJIgJAGIgGAGIgQAIIgFgDIgFAAIAAABQgQAGgOADQgFAMgQAUQgSAUAAAKIgBAgIgJAPIABAUIgDAIIgDAHIgHALIgDABQgCAAgLAJIgLAAIgFABg");
	this.shape_5.setTransform(-29.4,-0.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AhrCZIgDgFIgSgGIgLgMIgEgMIgFgFIgGgOIAAgMIADgFIgBgFIABgFIAHgNIgEgKIAEgCIAEgLIgCgMIAIgEIAAgIIAEAAIACgKIACAAIABgCIgBgBIABAAIABgEIAAgKIAOgKIgBgCIAKgNIABAAIADgGIAGgDIAAgDIACAAIABgGIAKgMIACgBIACgDIAFgFIACgCIAEgHIAQgPIAHgJIAFgEIAHgEIABgDIALgEIgBgCQAGgEADgBIAAgBIADgGIAIgCQALgLAFgBIAPgFIAEABIAGgBIABAAIAGABIABAGIADgBIABABIAAADIAEAIIABAiIAAAAIAAABIgFAWIgBgCIgCALIABAFIgEAFIgBAAIgBAEIACAHIgCAHIAAADIgFAAIgFAKIAAABIgBAAIgLANIgFADIgCAFIgEgDIACAIIgCADIgFAAIgBgCIgJgEIgEgKIACgGIABgBIANgoIAKgMIADgOIgEgXIgLgEIgKABIgFAEIgBAAIgEAGIgQAKIgHgBIgFAGIABABIAAABIgFACIgBAEIgPAMIgIALIAAABIgFADIAAACIgGACIAAAEIgBAAIgKAPIABACIgMAaIgGABIAAACIADAAIgCAKIgDAGIgDATIgFAEIgDAbIAFAFIgBAPIAEAOQAGAKAAAJIAHgDIAHAIIALAJQANADAHABIAKgFIAEADIATgEIAGACIABgBIAcgJIAEAAIAQgLIAPgEIAKgEIAOgKIADAAIAFgEIAVgUIAGgFIgDgMIgNgGIABgFIAvgVIABgCQAJgCABgCIADAAIAEAJIACAAIgCALIgEAAIgEAJIAAgCIgCACIgCAIIgLAKIgBgCQgHALgCAAIAAADIgKAHIgCADIgGAAIgBADQgEABgEAIIgOAHIgBABIgBgBQgEABgDAFIgCAAIgEAEIgCgBIgBAEIgIABIgFAFIgLAGIAAAAIgDAAQgDAAgEAEIgBAFIgFgBIgDADIAAAAIgJAAQgFAHgGACQgGADgSADIAAADIgJgBIAAAEIgHgBIgBABIAAABIgHAAIgBAFIgMABg");
	this.shape_6.setTransform(-55.85,-6.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol25, new cjs.Rectangle(-74.9,-39.1,149.9,78.30000000000001), null);


(lib.ENDMIRAGET = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.TitlePIC();
	this.instance.setTransform(0,0,0.6951,0.6835);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ENDMIRAGET, new cjs.Rectangle(0,0,556.1,410.1), null);


(lib.ENDMIRAGE = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240330155224();
	this.instance.setTransform(0,0,0.6503,0.6306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ENDMIRAGE, new cjs.Rectangle(0,0,520.2,378.4), null);


(lib.Tween38 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515211702();
	this.instance.setTransform(-350.6,-169.3,0.3366,0.1769,-1.9475);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.6,-192.7,701.3,385.5);


(lib.Tween37 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515211702();
	this.instance.setTransform(-350.6,-169.3,0.3366,0.1769,-1.9475);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.6,-192.7,701.3,385.5);


(lib.Tween35 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515211812();
	this.instance.setTransform(-427.1,-427.1,0.4171,0.4171);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-427.1,-427.1,854.2,854.2);


(lib.Tween33 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515211734();
	this.instance.setTransform(-304,-304,0.2969,0.2969);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-304,-304,608,608);


(lib.Tween32 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515212114();
	this.instance.setTransform(-346.45,-312.3,0.3221,0.3221,-2.9681);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-346.4,-346.4,692.9,692.9);


(lib.Tween31 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled108_20240515212114();
	this.instance.setTransform(-346.45,-312.3,0.3221,0.3221,-2.9681);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-346.4,-346.4,692.9,692.9);


(lib.Symbol21 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AEJVcIAFgRIAHAkQgNgJABgKgAFWTUIACACIABAFgAFxTOIACgGIAAgIIABATgAFlS4IAAgBIAMAXIgBAAQgDAAgIgWgAFxTOgAKRR9IANAWIAEAjgAJxSRQAEgGANAagAJtSMIAEAFIgBAGIAAAIIgDgTgAJxSRgAggQuIgPAVIgZAVgAgwQhIgQAbIgHACQgJAAAggdgAFvPvQAFgDAKgBIgdAVQAEgOAKgDgAj6O/IANgGIgaAYQAGgNAHgFgAOii3IgUgcIAnAtgAPBi8QABAHgXgVIAWAOIgDgFIgDgGIALAOgAMKkQIADACQAAABABAAQAAAAAAABQAAAAAAAAQAAABAAAAIgEgFgAQUmyQAPACAGAGIAJAMgAQQtnIACADIAAADQgIgBAGgFgAp/0gIgLAXIgSAdgAsh01IAKgKIgTAeQAEgNAFgHgAww1uIAEABIgEADQAAAAAAAAQAAgBAAAAQgBgBABgBQAAAAAAgBg");
	this.shape.setTransform(109.2997,147.9625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("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QgUAZgDgBQgBAAAEgOQAJgaggAkIAcggIgjAOIgEAFQADgEgPAFQgTAGAEgNIAPgCQAJgCARgdQAMgIACAOQACAQAMgEIATgbQAYgPABAVQACAbAGABIghAfIgMAcQgEAMATgRQgEgBAKgLIAVgWQAMgHAGAKQAGAKAKgCQgFgDgCACQAZgdA4AYIAoATQATAHAIgGIgZAaQARgHApgWQAkgUAOgEIgdAgQACgKgNAGQgSAJgKADQAJADgBANQgBAMAHACQANgNANgRQABgBATgHQgDAFggAeQgXAVALABQAAAMAfgVQAigZAGADIAJgVIAKAEQAEAFgLAQQgCgGgVAKQgZANgbAaQAIgCACALQACANABABIgeAYQgLAPAKgDQALgEgJAPQALgGARgUQASgVAGgEQgIAKAAAJQAAALAPgKQATgUACgFQAAgDgHABQgRACAagfIgCATQAigagLgFQgMgFAYgUQAVgSABAGQAAACgJARQgIAPACABQADACAcgXQADgGADgUQADgQANgKQgKAPATgLQAcgQAFAAIgUAjQAOgKAFgHIAKgPQgLAVASAQQARAQgNAeQAKABANgOQATgVAKgGQgTAZAMABQAGABANAAQgBADAVgRQAVgSAJgLIgjAIQARgQANgQQAPgTgGAAQgWAXgDgCQgCgBAEgPQAFgOgFgBQgFgBgYAWIAggfIgpAGIgEAEQACgDgQABQgWABADgOQAHgEAKAGQALAAASgcQAOgGAEARQAEAUAOgBIAVgaQAbgLAEAaQAFAhAHACIglAbIgMAdQgDAOAVgOQgFgDALgKIAXgTQAOgFAIAOQAKAOALAAIgMAMIAhgHQAAAHgLAQIgYAiIAKgCQAHgCALgNQAAgCAAgBQAAgBAAAAQAAgBAAAAQgBAAAAAAQAWgPgGAKQgHANAOgGQgUANgSAVQgYAcgKAKQANgCAZgbQAZgdAHgGQgCALgPAdQgMAXADAKQAKgJACgLQADgMAKgLQgBAHADABQAEABAGgFIAIgVQgJAaAFAMQAFAMAVgBIAIgKIAHAJIgmAfQAFgBgDAMQgCAJARgOIABgEIARgGIgoAdQgEAKAmgUQAqgVACAJQgVAXgWABQgXAAghAfQgFAMAAAGQABAHANgJQALgLACgGQABgDgDgDQASgJAIARQAHAPAggZIANgbQAHACgT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ADgDgDgEIgEgDIgCgDQAAgDAKgCIgbADIAAgJIgBgDIAAgCIAAgFQgGABgDABIgFADQgIgCAPgDQANgCAUgCIg6gDQAggLgBgLQAAgEgGgGIgLgIIgRgJQgIgFgDgEQgFgEACgGIAEgGIAHgHQg/AIgIgGIgNAGIgNAAIAHgCIALgDQABgBAAAAQABAAAAAAQgBgBgBAAQgBAAgBAAQgYADgRAGQgIACgBACQgBABAJAAQgJAFgNABIgTADQAAgIAFgHIADgFIAdgVIABgBIAAAAIAAgBIABAAIACgCIAMgKQATgPAcgRQgLAPAAAFIABAEIACACIABACIABAAQAFACALABQAbgIAJAAQAJAAAdgHIgCgBIAFACIAfAVIAMAFIACABIAOgDIgBgFIgHgTQgEgIgFACQAWgHATAIIAIAEIAIAGIANAOIAVAcQALAOAKgBIgjAHIBrALIALADIgrAIQAIgHgOgBQgUgDgKgCQADAEgBAEIgCADIgDADIgGAGQgBADADADQAWgDAQgEIAGAAIAPAFQgHACgQABIgbACIgUADIgEADQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAABABQgFAEAJADIA2AEQAGAAAEACQAFACABACIAUgKIADAEQADACgBADQAAAGgTAEQADgFgXgFIgbgDQgPgBgXACQAFABAAADIgBADIgCADQgHAJABABIgogBQgMACgBACQAAABAFABIAFADQAAACgLACQALACAcgDQAbgDAHABQgMABgHAGQgIAHASACQAcgCAEgCQADgBgGgEQgHgEACgCIAJgDIAWgEIgOALQAbACAIgCQAGgCgDgFIgBgBIgBgCQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAEgDAWAAQAcACgDAEQgDACgRAFQgRAFABACQACADAkADQAGgCAHgEIAJgIQAHgFAFgCQAHgDAKABQgKADACACQACACAKACIAUAFQAMADADADIgmALQAQADAJgBQAFgBANgEQgQAGgEAJQgCADAAAFIABAJQAAALgEAHIgEAFIgGAEQgGAEgLAEQAGAIATAAQAdACAKADQgSABgFADQgEADADAFIAHAIQAFAFAAACQgDACAaAFQAcAFANAAIgcgYQAVADAXgBQAYgBgE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OQATglgKAJQgKAKARglIgCAQQAWgkgGABQgHACAPgbQAPgYAAAEIgHATQgGAQACAAQACgBASgfQACgFADgSQACgNAJgPQgHARAMgSIAVgcIgOAkQAKgNADgIIAHgRQgIAVAKAEQAKAEgJAeQAGgEAJgSIATgiQgNAcAHgFIAMgJQAAADANgXQAOgYAGgNIgWAXQAig/gIAFQgOAdgCAAQgBAAADgNQAGgbgYArIAVgmIgaAZIgDAFQACgEgLAJQgNAMACgMQAFgHAGAAQAHgFAMgfQAJgLABALQACANAJgHIAOgeQARgWACATQABAWAFgCIgYAnIgJAdQgDALAOgVQgEABAXgnQAJgKAFAGQAFAHAHgGIgIAPIAUgVQAAAFgHASIgQAlIAGgGQAFgFAHgQQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAABgBAAQAOgVgDAKQgFANAJgMQgOAUgLAZIgXAuQAIgIARghIAVgrQgCAKgKAeQgJAXACAGQAGgLACgKQADgLAGgNQgBAGACgBQACgBAEgGIAFgSQgFAVACAHQADAHANgKIAFgMIAEADIgZArQADgEgCALQgBAIALgTIABgEIAKgMIgaApQgDAKAZghQAaglABAFQgOAdgNAKQgOAMgWAnQgEANAAAEQABAFAIgNQALgVgDgCQALgQAEAKQAEAIAVgjIAJgbQAEgCgNAhQgIAUAHgLIgoBCQANgSAMgJQANgKAJgLQAOgagIAHQgLANADgFIATgeQgDANgGAPQgGAOgCAQIAPgeQgJAVAMgLQAJgJgYApIAIgUIgTAjIAXgSQgHALgEANQgEAMgLASIAVgdQgOAcgSAYQgTAagJAPQgNAaAHgHQgNATAOgiQARgpgCgBIgTAeIAXgsQgGAIgbAsQAQgigNANQgSASAAgGQALgNAGgSIAJgXIgXAbQgSAVAPggQAEgKAKgOQAHgLABgGQgFADgIAOQgKAOgGAQQgIAGgGgFQgFgHgEgBIARgcQAGgSgNARQgLAOgRAcIAKgUQALgagXAhQgcApgBgIQgPAdgBAIQgBAHALgPIgaAuQAMALAdgjIgVAhQgJAWADgCIAKgPIAJgOQABAAgLAZQAHgIAFgNQAFgOAHgJQgCAGgVAoQgTAkABADQgRAJgTgDQgUgFgLgBQgFAJgBAGQgNAUgFgOIgEgkQgDgYgHAAQgKAAgXApIAOgZQAGgMgCAAIgVAmQAOgmgPABQgIABgCgCQgFgDAEgQQgFALgJANIgMAUQAMgbgJAEQgJAEAEgMIgLAYIgLgFQgEAFgBAIQgJALAZgxIggAxQAKgggGgEQgEgDgQALQgTAMgFABQgLACAEgUQghA2gJADIgEANQgLAQAGgMQAJgRgGAHQgMATgJASQgIASALgPQgGASgPATQgTgTAmhqgAy+19QgBAIAFgGIADgEQgDACgEAAgAt3zPQgGgFACgHIgPAaQgEAEAHgTQAGgRgIALIAQgaQABAAgFAMQgMAfAOgWIACgFQAAgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAIgLAFgBQAFgBAJgNIgJAVIgJATIAWglQAAAHgNAYIgZAvQAPgigEgEgAufzqQABAEATgfIAWgmIgSAjIAGgHIgdAvQACgGgGAGIgBABQgBAAAFgLgAut0AIgHAHQgCABAHgNIAMgPQAHgRgJAIQgIAIAJgWQgIALgGANIgCAFQAAgBAAgBQAAgBAAAAQgBgBAAAAQgBAAAAABQgEABAMgaQADgBAMgLQALgKACAAIAJgbIgCAWQABAIAJgGQgOARgLAZQgPAfgPAYQAVgogKAKgAuQzpIAHgPIgDATgAsQ0VQAFgEgHAPQgGAPgMASQAWgmgCgGgAuozyQAFgMANgWIAEgHIgEAJIgEAPIAXglQALgQgLAaQgaAvgIAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAgBAAAAgAu/0tQALgaAJgQIAEgSQADAEAHACQAFAGgKAXIgbAwIgBgOQAAgHgQAdIAPgfgAuv1DQgFAHgEANIATgeIgKAKgAvF0+QAGgJAKgZQAKgPgSApQgSAnAFgCIgQALQAMgaAJgOgAs21AQADgQgLARIAlg5IgUAqQAGgHAJgSIAJgTIgGARIAAAAIgTAnIAMgcQgRAggDAAIAAgCgAuW1eIAYgSIgfAqgAsd1eIACgLQADAAgFAPIAAgEgAsM1sQAKgUgGAVgAsM1sgAs012IAAACIABAEIgBACIgBAAQgCAAADgIgAsz1wQAXgvAEgCQAEgDAPgbIgDAIQgGAQgFAJQgIAQgDgBQgCgCgKASIgBAMQgFAEgCAAIgBgBgAsk2gQAFAAgOAbIgHAPQAAgIgIAJgAtE18QAMgZgFAFQgGAGABgCQAMgXAHACQgCAAgJAVQgIAQgCAAIAAAAgAsd2EIAEAAIgDADQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAgAsZ2EIAMgUQAQgfgDAMIgTAngAsZ2EgAsm3JIgFAJQAHgLAGgDQgZAwgGACQgKAEgGAHQAWggARgYgAsd3PIAAAAIAKgCIgMAOIgBAAQgCAAAFgMgAvu5PIABABIgCABgAv15hQADgDAOgZQAKgRgFAQIgIAJQgEAEgFALQgDAFgBAAIgBAAgAvv6CQANghgBgCIAPgUIAAgEIAJgLQAEgFgDAHQgBgEgXArIACAGQgQAcgBAAIACgFg");
	this.shape_1.setTransform(123.4848,149.3972);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12,-24.7,271,348.2);


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
	this.instance = new lib.IMG_1368();
	this.instance.setTransform(-209.35,-318.8,0.2814,0.2814);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(-209.3,-318.8,418.70000000000005,637.7), null);


(lib.WALK = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAIBTIAAgEIAGgBQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgCgFgGIgfgrIAagXIAKgLIABgCQAAgBAAAAQAAgBgBgBQAAAAAAAAQgBgBAAAAQgCgCgEAAIAAgEIAuAAIAAAEQgJAAgHADQgGACgIAHIgaAZIAaAiIAQATQAFAFAEACQADABAIAAIAAAEgAg7BTIAAgEQAIAAAFgCQACgBABgDQACgEAAgJIAAhhQAAgTgBgEIgCgGQgCgBgDAAIgIACIgCgEIAggNIAGAAIAABpIAAAkQAAALABADQABADADACIAMABIAAAEgAgVAXg");
	this.shape.setTransform(77.225,15.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQABgDAAgKIAAhhQAAgSgBgEQAAgEgCgCQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAgBAAIgHACIgDgEIAggNIAFAAIAACNQAAAKACADQABAEADABQADACAIAAIAAAEg");
	this.shape_1.setTransform(67.85,15.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAPA0QgEgEAAgJQgPANgFACQgGACgHAAQgLAAgHgHQgIgIAAgMQAAgIAEgGQAFgIAMgHQALgGAbgKIAAgEQAAgQgFgGQgFgGgJAAQgHAAgFAEQgEAEAAAFIAAAHQAAAFgCADQgDADgFAAQgEAAgDgDQgDgDAAgFQAAgKALgJQAKgIATAAQANAAAJAFQAHADADAIQACAFAAAQIAAAjIABATIACAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIADgBIAKgJIAAAHQgNARgMAAQgGAAgDgEgAgLAAQgJAFgEAGQgEAGAAAGQAAAJAFAFQAFAGAHAAQAJAAANgMIAAgoQgRAHgFACg");
	this.shape_2.setTransform(59.475,17.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAlBRIgkhkIgjBkIgEAAIgwiDIgGgRQgDgEgEgDQgEgCgHAAIAAgEIA7AAIAAAEIgDAAQgGAAgDADQgDADAAAEQAAAEAFAPIAfBYIAahLIgEgNIgEgLIgFgKIgEgEIgGgDIgHgBIAAgEIA9AAIAAAEIgEAAQgHAAgDADQgDADAAAFQAAAGAFAOIAfBWIAehXQAFgOAAgGQAAgDgCgCQgBgCgDgBQgEgCgIAAIAAgEIAwAAIAAAEQgGAAgEACQgEADgEAGIgHATIgsB/g");
	this.shape_3.setTransform(44.375,15.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AAIBTIAAgEIAGgBQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgCgFgGIgfgrIAagXIAKgLIABgCQAAgBAAAAQAAgBgBgBQAAAAAAAAQgBgBAAAAQgCgCgEAAIAAgEIAuAAIAAAEQgJAAgHADQgGACgIAHIgaAZIAaAiIAQATQAFAFAEACQADABAIAAIAAAEgAg7BTIAAgEQAIAAAFgCQACgBABgDQACgEAAgJIAAhhQAAgTgBgEIgCgGQgCgBgDAAIgIACIgCgEIAggNIAGAAIAABpIAAAkQAAALABADQABADADACIAMABIAAAEgAgVAXg");
	this.shape_4.setTransform(77.225,15.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQABgDAAgKIAAhhQAAgSgBgEQAAgEgCgCQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAgBAAIgHACIgDgEIAggNIAFAAIAACNQAAAKACADQABAEADABQADACAIAAIAAAEg");
	this.shape_5.setTransform(67.85,15.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AAPA0QgEgEAAgJQgPANgFACQgGACgHAAQgLAAgHgHQgIgIAAgMQAAgIAEgGQAFgIAMgHQALgGAbgKIAAgEQAAgQgFgGQgFgGgJAAQgHAAgFAEQgEAEAAAFIAAAHQAAAFgCADQgDADgFAAQgEAAgDgDQgDgDAAgFQAAgKALgJQAKgIATAAQANAAAJAFQAHADADAIQACAFAAAQIAAAjIABATIACAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIADgBIAKgJIAAAHQgNARgMAAQgGAAgDgEgAgLAAQgJAFgEAGQgEAGAAAGQAAAJAFAFQAFAGAHAAQAJAAANgMIAAgoQgRAHgFACg");
	this.shape_6.setTransform(59.475,17.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AAlBRIgkhkIgjBkIgEAAIgwiDIgGgRQgDgEgEgDQgEgCgHAAIAAgEIA7AAIAAAEIgDAAQgGAAgDADQgDADAAAEQAAAEAFAPIAfBYIAahLIgEgNIgEgLIgFgKIgEgEIgGgDIgHgBIAAgEIA9AAIAAAEIgEAAQgHAAgDADQgDADAAAFQAAAGAFAOIAfBWIAehXQAFgOAAgGQAAgDgCgCQgBgCgDgBQgEgCgIAAIAAgEIAwAAIAAAEQgGAAgEACQgEADgEAGIgHATIgsB/g");
	this.shape_7.setTransform(44.375,15.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AAHBPIAAgDQAEAAACgCQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBAAAAQAAgDgFgHIgVggIgHAHIAAATQAAANACADQADADAHACIAAADIg5AAIAAgDQAHgCADgDQACgDAAgNIAAhuQAAgMgCgDQgDgDgHgBIAAgFIAtAAIAABoIAYgZQAIgGACgEQACgDAAgEQAAgCgDgCQgCgDgIgBIAAgEIAxAAIAAAEQgHAAgFAEQgFADgPAPIgMAKIAZAmIATAaQAEAEAGABIAAADg");
	this.shape_8.setTransform(81.525,15.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgcBPIAAgDQAHgBADgEQACgDAAgLIAAhwQABgMgDgEQgDgDgHAAIAAgFIAtAAIAACIQgBAMADACQADAEAHABIAAADg");
	this.shape_9.setTransform(71.15,15.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AALA1QgFgFgBgIQgTARgQAAQgKAAgFgGQgHgGAAgJQAAgNALgKQALgKAjgQIAAgLQAAgMgBgDQgBgDgDgDQgEgCgFAAQgHAAgGADQgDACAAADQABADADADQAEAFAAAFQAAAGgEAEQgEAEgHAAQgIAAgEgFQgFgEgBgGQAAgJAHgHQAHgIAMgEQAMgEAMAAQAPAAAKAHQAIAGADAIQACAFAAARIAAAqIAAAKIACACIADABQADAAADgEIAEADQgHAIgGAEQgGAEgIAAQgJAAgGgEgAgPAMQgFAGABAHQAAAFADAEQADAEAGAAQAFAAAHgHIAAgkQgNAIgHAJg");
	this.shape_10.setTransform(62.05,17.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AArBRIgnhlIgrBlIgEAAIg0iAQgIgUgDgEQgEgEgHgBIAAgEIBFAAIAAAEQgIAAgDADQgDACAAADQAAAFAGAOIAfBMIAZg7IgGgRQgGgOgDgEQgDgFgEgCQgEgCgGAAIAAgEIBLAAIAAAEIgMABQAAAAgBABQAAAAgBABQAAAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAABAAABQgBAAAAABIAFAQIAdBKIAahDIAGgOIABgHQgBgFgDgDQgDgDgKAAIAAgEIAqAAIAAAEQgEABgDACQgDACgDAEIgIASIgxCCg");
	this.shape_11.setTransform(45,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Symbol24 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled79_20240518215935();
	this.instance.setTransform(0,0,0.1541,0.1541);

	this.instance_1 = new lib.Untitled79_20240518220232();
	this.instance_1.setTransform(-5,-7,0.1666,0.1666);

	this.instance_2 = new lib.Untitled79_20240518215955();
	this.instance_2.setTransform(-11,-13,0.1813,0.1873);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,-13,145.1,112.4);


(lib.Next11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Next10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape.setTransform(76.475,16.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_1.setTransform(67,18.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(55.775,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_3.setTransform(41.35,15.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(76.475,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AAHA2IAAgEQAEAAAEgDQACgBAAgDQAAgDgIgLIgPgXIgRAXQgHALgBACQAAADADACQADACAFABIAAAEIgjAAIAAgEIAIgDQAEgEAKgOIAXgdIgVgdQgIgNgFgDQgEgDgIAAIAAgFIAyAAIAAAFQgEAAgCABQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQAAADAEAFIAEAGIAGAMIAJgMQAJgLAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgFAAIAAgFIAkAAIAAAFQgFAAgEADQgGAEgKANIgOAUIAaAlQAKAOAEADQAEADAHABIAAAEg");
	this.shape_5.setTransform(67,18.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_6.setTransform(55.775,18.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AA8BRIhoh/IAABhQAAAOADAEQAFAFAJAAIAFAAIAAAEIg3AAIAAgEIAGAAQAKAAAEgGQACgEABgNIAAhuIgLgKQgDgDgIgCIgKgBIAAgFIArAAIBhB3IAAhbQAAgPgDgDQgFgFgKAAIgFAAIAAgFIA4AAIAAAFIgGAAQgKAAgFAGQgCAEAAANIAACFg");
	this.shape_7.setTransform(41.35,15.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AgLBGQgHgGgCgHQgBgEAAgSIAAg6IgPAAIAAgEQAPgLALgLQAKgMAHgNIADAAIAAAnIAaAAIAAAMIgaAAIAABCQAAAKABADIAEAEIADACQAJAAAGgLIADACQgJAWgVABQgJAAgIgGg");
	this.shape_8.setTransform(77.1,16);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AgFA3IAAgEIAIgCQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgDgEgHIgIgSIgIAMIgHAJIgBAEQAAADACACIADADQABABAGAAIAAAEIgrAAIAAgEQAIAAAGgFQAHgEANgTIAJgNIgTgiQgJgRgFgEQgFgEgFAAIAAgFIA7AAIAAAFIgDAAIgFACIgBACIABAEIADAGIAIAQIAEgGQAKgNAAgFQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQgDgCgFAAIAAgFIAnAAIAAAFQgHAAgGAEQgHAEgHAMIgMASIATAjQAKATAGAFQADACAFABIAAAEg");
	this.shape_9.setTransform(67.075,17.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AgjAnQgKgPAAgWQAAgbAPgQQAPgQATAAQAQAAANAOQAMANABAbIg7AAQABAVAKAMQAHAKAMAAQAHAAAFgEQAGgEAHgKIAEADQgJASgLAIQgLAHgOAAQgXAAgNgTgAgHgsQgHALAAASIAAAEIAfAAQAAgTgCgHQgCgHgFgDQgCgCgEAAQgFAAgEAFg");
	this.shape_10.setTransform(55.875,17.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AA6BRIhriDIAABkQAAAOAGAFQAGAEAJAAIADAAIAAAFIg4AAIAAgFQANAAAFgFQAGgFAAgNIAAhvIgEgEQgFgHgEgCQgEgCgHAAIAAgEIA4AAIBNBhIAAhDQAAgOgDgFQgGgHgOAAIAAgEIA1AAIAAAEQgKABgDADQgEACgCAEQgCAFABALIAACDg");
	this.shape_11.setTransform(41.55,15.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAKBPIAAgEQAHAAADgCQADgCAAgDIgBgGIgIgIIg2g2IAAA0QAAALACAFIAFAEQAFADAGAAIAFAAIAAAEIhEAAIAAgEIAGAAQAKAAAEgFQADgEAAgOIAAhnQAAgLgCgEQgBgDgDgDQgGgCgFAAIgGAAIAAgFIBEAAIAAAFIgFAAQgGAAgFACQgEACgBAFQgCADAAALIAAAyIARgQQAhgfAIgLQADgFAAgDQAAgDgDgCQgCgCgGAAIgEAAIAAgFIA7AAIAAAFQgFAAgFABQgEABgGAFQgGADgJAIIgYAYIgXAYIA6A6QAOAOAKAGQAKAEALABIAAAEg");
	this.shape.setTransform(82.325,15.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag2A2QgRgWAAgeQAAgWALgUQALgUATgLQASgLAVAAQASAAAQAJIAHACQADAAADgCQADgDABgGIAEAAIAEA2IgEAAQgHgYgNgLQgOgKgTAAQgPgBgMAJQgNAHgHASQgIASAAAYQAAAXAHAPQAHAQAOAIQAOAJARAAQAPAAAMgGQAMgHAOgUIAEACQgMAWgQAJQgQAKgWAAQgnAAgVgdg");
	this.shape_1.setTransform(65.375,15.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAWBRIAAgEQAJgBAEgCQADgDAAgEQAAgFgFgLIgJgXIg9AAIgLAZQgEAJAAAFQAAAEAEACQADADAMABIAAAEIgyAAIAAgEQAKgCADgDQAFgFAIgSIA4iBIADAAIA3CDQAHAQAFAFQAGAEAJABIAAAEgAghATIA1AAIgag/g");
	this.shape_2.setTransform(48.625,15.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhHBPIAAgEIAHAAQAKAAAEgGQADgEAAgNIAAhnQAAgOgEgEQgFgFgIAAIgHAAIAAgFIBFAAQATAAALAEQARAEAKAKQAJALAAAOQAAAMgHAJQgIAKgOAFQARACAIAHQAMAMAAAPQgBAMgHALQgIALgMAEQgOAGgbgBgAgZADIAABBQAOADAMAAQAVAAALgJQALgKAAgOQAAgJgFgJQgFgJgLgEQgLgFgRAAIgMAAIgIABgAgZhEIAAA9IAKABIAMAAQAQAAAJgDQAJgEAEgHQAFgIgBgJQABgOgMgKQgLgJgVgBQgMABgJACg");
	this.shape_3.setTransform(31.55,15.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660000").s().p("AAKBPIAAgEQAHAAADgCQADgCAAgDIgBgGIgIgIIg2g2IAAA0QAAALACAFIAFAEQAFADAGAAIAFAAIAAAEIhEAAIAAgEIAGAAQAKAAAEgFQADgEAAgOIAAhnQAAgLgCgEQgBgDgDgDQgGgCgFAAIgGAAIAAgFIBEAAIAAAFIgFAAQgGAAgFACQgEACgBAFQgCADAAALIAAAyIARgQQAhgfAIgLQADgFAAgDQAAgDgDgCQgCgCgGAAIgEAAIAAgFIA7AAIAAAFQgFAAgFABQgEABgGAFQgGADgJAIIgYAYIgXAYIA6A6QAOAOAKAGQAKAEALABIAAAEg");
	this.shape_4.setTransform(82.325,15.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("Ag2A2QgRgWAAgeQAAgWALgUQALgUATgLQASgLAVAAQASAAAQAJIAHACQADAAADgCQADgDABgGIAEAAIAEA2IgEAAQgHgYgNgLQgOgKgTAAQgPgBgMAJQgNAHgHASQgIASAAAYQAAAXAHAPQAHAQAOAIQAOAJARAAQAPAAAMgGQAMgHAOgUIAEACQgMAWgQAJQgQAKgWAAQgnAAgVgdg");
	this.shape_5.setTransform(65.375,15.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AAWBRIAAgEQAJgBAEgCQADgDAAgEQAAgFgFgLIgJgXIg9AAIgLAZQgEAJAAAFQAAAEAEACQADADAMABIAAAEIgyAAIAAgEQAKgCADgDQAFgFAIgSIA4iBIADAAIA3CDQAHAQAFAFQAGAEAJABIAAAEgAghATIA1AAIgag/g");
	this.shape_6.setTransform(48.625,15.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660000").s().p("AhHBPIAAgEIAHAAQAKAAAEgGQADgEAAgNIAAhnQAAgOgEgEQgFgFgIAAIgHAAIAAgFIBFAAQATAAALAEQARAEAKAKQAJALAAAOQAAAMgHAJQgIAKgOAFQARACAIAHQAMAMAAAPQgBAMgHALQgIALgMAEQgOAGgbgBgAgZADIAABBQAOADAMAAQAVAAALgJQALgKAAgOQAAgJgFgJQgFgJgLgEQgLgFgRAAIgMAAIgIABgAgZhEIAAA9IAKABIAMAAQAQAAAJgDQAJgEAEgHQAFgIgBgJQABgOgMgKQgLgJgVgBQgMABgJACg");
	this.shape_7.setTransform(31.55,15.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660000").s().p("AAJBPIAAgEQAIgBADgCQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQABgGgLgNIgjguIgHAFIAAArQABANABADQACADAEACQADACAJAAIAAAEIhQAAIAAgEIAFAAQAHAAAEgDQADgBACgEQABgCABgNIAAhnQgBgNgBgCQgCgEgDgCQgEgCgHAAIgFAAIAAgFIBPAAIAAAFQgIAAgEACQgDACgCAEQgBACgBANIAAAxIA7gvQAMgLAAgFQAAgFgGgDIgMgBIAAgFIA+AAIAAAFQgIAAgFADQgFACgRAOIguAlIA3BGQAMAOAJAFQAGAEAHAAIAAAEg");
	this.shape_8.setTransform(82.45,15.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660000").s().p("AghBJQgUgLgKgTQgLgSAAgWQAAgWAMgUQAMgUAUgMQAUgLAWAAQAQAAATAHQALAFADgBQAEABACgDQADgDABgGIAEAAIAAA3IgEAAQgFgVgOgMQgOgMgSAAQgPAAgMAJQgMAIgGAPQgHARAAAWQAAAUAFARQAGASALAJQALAJASAAQAPAAANgHQAMgGAOgQIAAANQgOAPgOAGQgPAGgTAAQgYAAgUgKg");
	this.shape_9.setTransform(63.825,15.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660000").s().p("AAIBRIAAgFIADAAQAJAAAEgCQACgCAAgEIAAgDIgEgJIgIgUIg4AAIgGAPQgDAIAAAFQAAAHAFADQADABAMABIAAAFIg0AAIAAgFQAIAAAGgHQAFgFAIgSIA4h+IACAAIA6CBQAIASAFAGQAEADAHAAIAAAFgAglAbIAvAAIgXg2g");
	this.shape_10.setTransform(46.625,15.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660000").s().p("AhIBPIAAgEQALAAAEgCQAEgCABgDQACgDAAgNIAAhnQAAgNgCgCQgBgEgEgCQgEgCgLAAIAAgFIBLAAQAbABAMAFQALAEAHAKQAGAKAAALQAAALgIAJQgJAJgUAFQAWAFAJAHQANAKAAARQAAATgOALQgSAOghAAgAgNA0IAAAGQAAAGADAEQADADAHAAQAIAAAIgEQAIgFAEgIQAEgIAAgJQAAgLgFgJQgFgJgJgDQgJgEgRAAgAgNgHQAPAAAIgDQAIgEAFgHQAEgHAAgKQAAgLgEgHQgFgHgHgDQgIgEgQAAg");
	this.shape_11.setTransform(29.825,15.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(2));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#330000").ss(3,1,1).p("Ao+iuIR9AAIAAFdIx9AAg");
	this.shape_12.setTransform(57.5,17.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("Ao+CvIAAldIR9AAIAAFdg");
	this.shape_13.setTransform(57.5,17.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,118,38);


(lib.Tween12 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.447)").s().p("EhAZAwAMAAAhf/MCAzAAAMAAABf/g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-412.2,-307.2,824.4,614.4);


(lib.Tween11 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("EhAZAwAMAAAhf/MCAzAAAMAAABf/g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-412.2,-307.2,824.4,614.4);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled86_20240407213352();
	this.instance.setTransform(-400,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-400,-300,800,600);


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled86_20240407213352();
	this.instance.setTransform(-400,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-400,-300,800,600);


(lib.Symbol23 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("Eg/PgsiMB+fAAAMAAABZFMh+fAAAg");
	this.shape.setTransform(0.0208,0.0183,1.0925,1.1342);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg/PAsjMAAAhZFMB+fAAAMAAABZFg");
	this.shape_1.setTransform(0.0208,0.0183,1.0925,1.1342);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol23, new cjs.Rectangle(-443.2,-324.3,886.5,648.7), null);


(lib.Symbol19 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled86_20240407213352();
	this.instance.setTransform(-400,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol19, new cjs.Rectangle(-400,-300,800,600), null);


(lib.Symbol14 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#330000").ss(1,1,1).p("EhBsgvLMCDZAAAMAAABeXMiDZAAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EhBsAvMMAAAheXMCDZAAAMAAABeXg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(-421.5,-303,843,606), null);


(lib.Symbol13 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Untitled87_20240415224456();
	this.instance.setTransform(0,0,0.4109,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,841.5,614.4);


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
	this.instance = new lib.Untitled87_20240415224501();
	this.instance.setTransform(0,0,0.3984,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,816,614.5);


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
	this.instance = new lib.Gemini_Generated_Imagejfif();
	this.instance.setTransform(-410.65,-306.15,0.5347,0.3986);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-410.6,-306.1,821.3,612.3), null);


(lib.Text6 = function(mode,startPosition,loop,reversed) {
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
	this.frame_84 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(84).call(this.frame_84).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAMASQgEgFgBgIQAAgIAHgIQAFgHALgDIAAADQgJAFgDAEQgCAEAAAFIAAADIACACIAEgBIADgBQAEAAADADQACACAAAEQAAAEgDAEQgEADgEAAQgGAAgFgFgAgdASQgFgGAAgHQABgIAFgHQAGgIALgEIAAAEQgIAEgDAEQgEAFAAAFQAAAAABAAQAAABAAABQAAAAAAABQAAAAAAAAIADABIACAAIAEgBQADAAADADQADACAAAEQAAAFgDADQgEADgEAAQgGAAgFgFg");
	this.shape.setTransform(11.95,38.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgmA3IAAgEQAJAAADgDQAEgBABgFIAAgLIAAgoIAAgXQgBgDgDgCQgCgCgCAAQgEAAgFACIgBgEIAggNIAGAAIAAAYQAMgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgGgEgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBABQgFAFgEALIAAAyQgBAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_1.setTransform(120.4,17.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_2.setTransform(111.025,18.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAGBTIAAgEIACAAQAHAAADgCQADgDACgEIAAgLIAAgmQAAgSgBgEQgDgGgDgCQgEgDgGAAQgGAAgFADQgGADgJAIIAAA5QAAALACADQABACADACQADACAJAAIAAAEIg2AAIAAgEQAIAAADgCQADgBABgEQACgDAAgKIAAhgIgBgXQgBgEgCgCQgCgBgDAAIgIACIgBgEIAfgNIAGAAIAABOQANgOAHgEQAIgEAHAAQAJAAAHAFQAGAFAEALQACAGAAAUIAAAmQgBAKACAEQACADACABQADACAIAAIAAAEg");
	this.shape_3.setTransform(99.6,15.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_4.setTransform(90.425,16.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgnAlQgMgQAAgUQAAgOAIgOQAHgPAMgHQAMgHAMAAQAZAAAOATQANAQAAAUQAAANgHAPQgHAPgMAIQgMAHgOAAQgYAAgPgUgAgPgtQgGAEgEAJQgEAJAAAPQAAAWAKASQAJAQAOAAQALABAIgKQAHgKAAgWQAAgbgMgRQgIgMgMABQgHAAgGADg");
	this.shape_5.setTransform(80.925,18.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQADgBAAgFIABgLIAAgoIgBgXQAAgDgCgCQgCgCgEAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgFgEgDAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBABQgFAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_6.setTransform(71.1,17.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgRBRQgKgDgKgHIAAhuIgBgXQgBgEgCgCQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgDAAgFACIgCgEIAggNIAGAAIAABNQAPgVARAAQAQAAANAOQAMAOAAAYQAAAdgTARQgQAPgUAAQgIAAgKgEgAgGgIQgEACgHAGIAABAQAFAHAHACQAFADAHAAQALAAAJgMQAJgLAAgXQAAgUgJgKQgJgMgMABQgGAAgGADg");
	this.shape_7.setTransform(60.5,15.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgDgCgDAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgEAAQgEAAgFgEQgFgEgDAAQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAABQgGAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_8.setTransform(45.1,17.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAXA4IAAgYQgOAPgIAEQgGAFgIAAQgJgBgHgFQgGgFgDgIQgCgJAAgPIAAguQAAgIgCgDQgCgDgDgCQgDgBgJAAIAAgEIAmAAIAABHQAAAPAFAEQAGAFAHAAQAEAAAGgDQAHgEAJgIIAAg8QAAgJgEgEQgDgDgLAAIAAgEIAlAAIAABAQAAASABAEQABAFACABQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAAEgCIACAEIggAOg");
	this.shape_9.setTransform(34.925,18.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgnAlQgMgQAAgUQAAgOAIgOQAHgPAMgHQAMgHAMAAQAZAAAOATQANAQAAAUQAAANgHAPQgHAPgMAIQgMAHgOAAQgYAAgPgUgAgPgtQgGAEgEAJQgEAJAAAPQAAAWAKASQAJAQAOAAQALABAIgKQAHgKAAgWQAAgbgMgRQgIgMgMABQgHAAgGADg");
	this.shape_10.setTransform(22.925,18.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghBPIAAgEIAFAAQALAAAEgGQACgEAAgNIAAglIgrhCIgLgPQgCgDgJgEIgHgBIAAgFIBEAAIAAAFIgEAAQgFAAgEACQgFADAAAFQAAAFAHALIAgAxIAfgvQAIgMgBgFQABgDgCgDIgFgEQgDgBgHAAIAAgFIA4AAIAAAFIgDAAQgDAAgGACQgGAEgFAEQgFAFgGAMIgnA7IAAAoQAAAPAEADQAEAFAJAAIAFAAIAAAEg");
	this.shape_11.setTransform(10.6,15.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgZA8IAAgEIAEAAQAIAAAEgEQACgDAAgKIAAgdIgigwIgHgMIgJgEIgFgBIAAgEIAzAAIAAAEIgDAAQgEAAgDACQgDABgBAFQABACAFAJIAXAlIAYgkQAGgIAAgEQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAgBIgEgCIgHgBIAAgEIAqAAIAAAEIgCAAIgHACQgEABgEAFIgJAMIgcAsIAAAeQAAALABADQAEADAHAAIAEAAIAAAEg");
	this.shape_12.setTransform(22.35,42.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGACQgEADgGAAQgHAAgFgDQgFgEgCgGQgCgHAAgLIAAgjQAAgFgBgDQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgCgHAAIAAgDIAdAAIAAA1QAAAMAEADQADADAGAAQADAAAFgBQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgDIAbAAIAAAxQAAANABADQAAABABABQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_13.setTransform(31.375,44.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgpA9IAAgEIACAAQAFABADgCIADgDQABgDAAgIIAAhMQAAgHgBgCQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBIgFACIgBgDIAZgKIADAAIAAATQAGgLAHgEQAFgFAHAAQAMAAAIAKQAKALAAATQAAAUgMAOQgKALgPAAQgFAAgFgCQgDgBgFgEIAAAYQAAAIABADIAEADIAIABIAAAEgAgCgtQgEACgHAIIAAAeIABAMQABAFAFAEQAFADAGAAQAJAAAFgGQAHgJAAgQQAAgSgIgKQgFgHgIAAQgEAAgDACg");
	this.shape_14.setTransform(40.075,46.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgGA7QgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQACADABADQgBAEgCADQgDADgEAAQgDAAgDgDgAAAAcIgIhGIgBgHQAAgFADgEQADgDADAAQAEAAADADQADAEAAAGIAAAGIgIBGg");
	this.shape_15.setTransform(47.9,42.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag2BRIAEgMIABgUIAAhKQAAgZAPgPQAPgPAXAAQAaAAANATQAMAOAAATQAAAVgOARQgRAXgaAAQgJAAgIgDQgFgCgGgFIAAAOQAAAcgDAQgAgbg7QgDAGAAAWIAAATQAAAPADAHQACAGAJAFQAHAEAJAAQAPAAAJgMQAKgLAAgTQAAgPgFgMQgHgNgJgGQgLgGgJAAQgNAAgHAKg");
	this.shape_16.setTransform(148.95,23.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AggAwQgMgLAAgLQAAgJAHgHQAGgIARgFQgOgFgFgGQgEgGAAgIQAAgLAJgHQAMgKATAAQAMAAAKADQAKADADAEQAEAEAAAEQAAAEgDADQgEADgEAAQgGAAgEgIQgFgJgCgCQgFgCgHgBQgJAAgGAHQgHAFAAAMQAAAJAGAGQAFAFAJABIAFgBIAJAAQAGAAABABQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgCABgGAAIgEAAIgKgBQgIAAgHAGQgGAGAAALQAAANAHAGQAGAHAJAAQAJAAAFgFQADgDADgJIAEgIQAEgDAEAAQAFAAADADQAEAEAAAEQAAAIgKAIQgNAJgVAAQgVAAgMgJg");
	this.shape_17.setTransform(137.025,20.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAoBRIgDgOIgBgSIAAhUQAAgRgDgFQgFgJgLAAQgHAAgHAEQgGAFgLALIAABLIgTAAIAAhNQAAgKgBgEQgBgEgDgCQgCgBgDAAQgEAAgDADQgDADgCALIgEAAQABgPAHgHQAGgGAKAAQAKAAAFAFQAGAGAAAPQAOgRAJgFQAIgEAJAAQALAAAHAFQAHAGACAIQADAJAAAVIAABGIABAZIADARg");
	this.shape_18.setTransform(123.825,23.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgBAwQgHgJAAgWQAAgRAFglIgLAAQgKAAgFADQgGAEgFAKIgEAAQAIgXAHgFQAHgHAMAAIA3AAIAAASIglAAQgEAlAAAPQAAALAFAGQAEAEAGAAQAFABAEgEQADgDACgIIAEAAQgCATgGAIQgHAGgJAAQgJAAgFgHg");
	this.shape_19.setTransform(111.725,20.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgnApQgQgPAAgXQAAgOAJgOQAHgPAOgIQAOgIANAAQANAAANAHQANAIAIANQAGAOAAANQABAOgIAOQgHAOgOAIQgNAIgPAAQgXAAgPgQgAgYglQgJALAAAVQAAAXAKAPQAKAQARAAQAMAAAIgKQAKgMgBgVQAAgcgNgPQgLgLgLAAQgMAAgKALg");
	this.shape_20.setTransform(100.15,20.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag2BRIAEgMIABgUIAAhKQAAgZAPgPQAPgPAXAAQAaAAANATQALAOAAATQAAAVgMARQgSAXgaAAQgJAAgIgDQgEgCgHgFIAAAOQAAAcgEAQgAgbg7QgDAGAAAWIAAATQAAAPADAHQADAGAHAFQAIAEAJAAQAOAAAKgMQALgLgBgTQABgPgHgMQgGgNgJgGQgKgGgKAAQgNAAgHAKg");
	this.shape_21.setTransform(87.1,23.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ag0BtIADgUIACgYIAAh3QAAgVAEgKQAFgKAKgHQALgGAPAAQAUAAAMALQANALAAAQQAAAKgFAJQgFAIgLAHQAgAPAAAfQAAAOgHAMQgGAMgMAHQgLAGgNAAQgGAAgIgDQgIgDgLgHIAAAUQAAATgEAWgAgXhZQgFAHAAARIAABoQAMAIAIADQAHADAEAAQANAAAHgKQAJgKgBgVQABgMgEgKQgEgKgKgMQgIACgFAAQgHAAgCgCQgEgCAAgCQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQACgCAFAAQAEAAAMADQAJgQgBgPQAAgOgHgJQgHgIgKAAQgOAAgHAMg");
	this.shape_22.setTransform(74,20.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag2BRIAEgMIABgUIAAhKQAAgZAPgPQAPgPAXAAQAaAAANATQALAOAAATQAAAVgMARQgSAXgaAAQgJAAgIgDQgEgCgHgFIAAAOQAAAcgDAQgAgbg7QgDAGAAAWIAAATQAAAPADAHQADAGAHAFQAIAEAJAAQAOAAAKgMQALgLgBgTQAAgPgFgMQgHgNgJgGQgKgGgKAAQgNAAgHAKg");
	this.shape_23.setTransform(54.8,23.225);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgZAzQgLgFgGgNQgEgIAAgPIABgTQAAgKgGgLIgGgKIAAgEQAAgFADgDQAEgEAFAAQAIAAAGAIQAGAHAAARIgBAQIAAAQQAAANAEAKQAEAIAIAGQAHAEAIAAQAIAAAJgFQAJgFAFgNQAGgNAAgQQAAgVgIgMQgJgMgOgEIAAgEQAOAAANAKQAUAPAAAcQAAAbgQAQQgQARgaAAQgOAAgLgGg");
	this.shape_24.setTransform(40.925,20.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgnApQgQgPAAgXQAAgOAIgOQAIgPAOgIQAOgIANAAQANAAANAHQANAIAIANQAGAOAAANQABAOgIAOQgHAOgOAIQgNAIgPAAQgXAAgPgQgAgYglQgJALAAAVQAAAXAKAPQAKAQARAAQALAAAJgKQAKgMgBgVQABgcgOgPQgLgLgLAAQgMAAgKALg");
	this.shape_25.setTransform(27.7,20.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AghBRIAAgFIAEAAQAKAAAEgEQAFgFAAgJIAAguQgXgBgMgGQgNgFgIgJQgGgGgBgIIgDgLIgBgbQAAgIgDgCQgCgEgIAAIAAgEQAOAAAIAFQAIAFADAIQAEAHABAUQAAANAEAHQAFAJAJAEQAKAEAOAAIAAg6QAAgJgFgFQgEgEgKAAIgEAAIAAgEIBEAAIAAAEIgFAAQgKAAgEAEQgEAFgBAJIAAA6QAPABAJgFQAKgEADgJQAFgHABgQQAAgQADgGQAEgJAHgGQAJgFAOAAIAAAEQgJABgCAEQgCADgBAOQABAZgFAKQgGANgOAIQgPAIgbABIAAAuQABAJAEAFQAEAEAKAAIAFAAIAAAFg");
	this.shape_26.setTransform(11.55,18.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AguAoQgNgQAAgWQAAgPAHgOQAJgRAPgKQANgHASAAIALABIAQAFIAGABIADgBIABgGIADAAIAEAlIgEAAQgEgOgIgHQgKgKgRAAQgVAAgNASQgKAPAAAVQABAQAGAOQAHAOALAHQAKAGAKAAQAHAAAGgBQAGgCAGgDIAAgjQAAgJgBgCQgCgDgDgBQgCgBgIAAIAAgDIAuAAIAAADIgCAAQgGAAgDAEQgCADAAAJIAAAlQgKAFgKADQgKACgMAAQgiAAgRgWg");
	this.shape_27.setTransform(62.1,42.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgLBPQgDgEAAgFQAAgGADgDQAEgEAFAAQAFAAAEAEQAEADAAAGQAAAFgEAEQgEAEgFAAQgFAAgEgEgAgEAqQAAgPADgJQACgKAJgQQAHgNACgHQACgHAAgIQAAgPgHgIQgJgJgKAAQgLAAgFAFQgGAEAAAGQAAAEAEAHQADAGAAADQAAAFgCACQgDADgEAAQgFAAgEgFQgEgEAAgJQAAgNALgLQALgKAUAAQAXAAALAOQAJALAAAMQAAAJgEAJQgDAJgMAMQgQASgEAIQgEAIAAAOg");
	this.shape_28.setTransform(28.7,15.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgKBPQgFgEAAgFQAAgGAFgDQADgEAGAAQAEAAAEAEQAEADgBAGQABAFgEAEQgEAEgEAAQgGAAgDgEgAgFAqQABgPADgJQACgKAJgQQAHgNACgHQACgHAAgIQAAgPgHgIQgIgJgLAAQgKAAgGAFQgGAEAAAGQAAAEADAHQAEAGAAADQAAAFgDACQgDADgDAAQgFAAgEgFQgEgEAAgJQAAgNALgLQAMgKATAAQAXAAAMAOQAIALAAAMQAAAJgEAJQgDAJgLAMQgRASgEAIQgEAIAAAOg");
	this.shape_29.setTransform(18.05,15.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgLBPQgDgEgBgFQABgGADgDQAEgEAFAAQAFAAAEAEQADADABAGQgBAFgDAEQgEAEgFAAQgFAAgEgEgAgFAqQABgPADgJQACgKAJgQQAHgNACgHQACgHAAgIQAAgPgIgIQgIgJgKAAQgLAAgFAFQgGAEAAAGQAAAEADAHQAEAGAAADQAAAFgDACQgDADgDAAQgFAAgEgFQgEgEAAgJQAAgNALgLQAMgKATAAQAXAAAMAOQAIALAAAMQAAAJgEAJQgEAJgLAMQgRASgDAIQgEAIAAAOg");
	this.shape_30.setTransform(7.4,15.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_31.setTransform(67.975,44.625);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AguAoQgNgQAAgWQAAgPAHgOQAJgRAPgKQANgHASAAIALABIAQAFIAGABIADgBIABgGIADAAIAEAlIgEAAQgEgOgHgHQgLgKgRAAQgVAAgNASQgKAPAAAVQABAQAGAOQAHAOALAHQAKAGAKAAQAHAAAGgBQAGgCAGgDIAAgjQAAgJgBgCQgCgDgDgBQgCgBgIAAIAAgDIAuAAIAAADIgCAAQgGAAgDAEQgCADAAAJIAAAlQgKAFgKADQgKACgMAAQgiAAgRgWg");
	this.shape_32.setTransform(57.6,42.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_33.setTransform(79.025,43.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGACQgEADgGAAQgHAAgFgDQgFgEgCgGQgCgHAAgLIAAgjQAAgFgBgDQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgCgHAAIAAgDIAdAAIAAA1QAAAMAEADQADADAGAAQADAAAFgBQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgDIAbAAIAAAxQAAANABADQAAABABABQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_34.setTransform(90.375,44.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgpA9IAAgEIACAAQAFABADgCIADgDQABgDAAgIIAAhMQAAgHgBgCQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBIgFACIgBgDIAZgKIADAAIAAATQAGgLAHgEQAFgFAHAAQAMAAAIAKQAKALAAATQAAAUgMAOQgKALgPAAQgFAAgFgCQgDgBgFgEIAAAYQAAAIABADIAEADIAIABIAAAEgAgCgtQgEACgHAIIAAAeIABAMQABAFAFAEQAFADAGAAQAJAAAFgGQAHgJAAgQQAAgSgIgKQgFgHgIAAQgEAAgDACg");
	this.shape_35.setTransform(40.075,46.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAEAqIAAgEIACAAQAGAAACgCQACgBABgEIABgHIAAggQAAgMgDgFQgEgEgGAAQgKgBgKAMIAAAqQAAAIABACIAEADQACACAGgBIAAAEIgoAAIAAgEIACAAQAGAAACgCQACgEABgIIAAgeIgBgRQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgBIgHABIgBgEIAZgKIADAAIAAARQAOgRAMAAQAGAAAFAEQAFADADAIQACAFAAALIAAAiIABAKQAAAAABABQAAAAAAABQABAAAAAAQABABAAAAQADACAFgBIAAAEg");
	this.shape_36.setTransform(112.9,44.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHgBAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQABgUgKgMQgGgJgIAAQgGAAgEADg");
	this.shape_37.setTransform(117.4,44.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAWApIgUgyIgXAyIgDAAIgahCQgCgGgDgDQgCgCgGgCIAAgDIAiAAIAAADQgFABgBACQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASgkIgFgNQgCgFgDgCIgIgCIAAgDIAmAAIAAADQgHABgCACQgBAAAAABQgBAAAAABQAAAAAAABQAAABAAAAIABAEIASAuIARgsIACgIQAAAAAAgBQgBAAAAgBQAAAAAAAAQgBgBAAAAIgHgCIAAgDIAaAAIAAADQgIACgEAJIgbBEg");
	this.shape_38.setTransform(132.875,44.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAGgLQAFgLAJgFQAJgGAJAAQASAAAMAOQAJAMAAAQQAAAJgGALQgFALgIAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgCAHAAAKQgBARAIANQAGAMALAAQAIAAAGgHQAFgHABgRQAAgUgKgMQgGgJgJAAQgEAAgFADg");
	this.shape_39.setTransform(143.9,44.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIAAgIIAAgfIAAgRIgCgDIgEgBIgGABIgBgEIAYgKIAEAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgCACgEAAQgCAAgEgDIgGgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgFAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_40.setTransform(156,44.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_41.setTransform(72.475,44.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgSA/IAAgEQAFABADgCQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAIAAgKIAAhJIAAgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgBgCIAWgKIAFAAIAABqIABAKQAAAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAGgBIAAAEg");
	this.shape_42.setTransform(174,42.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_43.setTransform(180.025,44.625);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_44.setTransform(72.475,44.625);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgkA5QgDgDAAgEQAAgEACgCQADgCAEAAIAIACIAEABQADAAAEgDQACgDADgHIAGgOIgcg8IgFgHIgEgEIgGgDIAAgDIAlAAIAAADIgCAAQgDAAgCACQgBABAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAAEADAGIATAoIASgsIABgHIgBgCIgCgCIgFgBIAAgDIAaAAIAAADIgFACIgEAEIgDAHIggBPQgEAMgIAGQgIAGgHAAQgFAAgEgDg");
	this.shape_45.setTransform(200.4,46.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgFALgKAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgCAHAAAKQAAARAGANQAIAMAKAAQAJAAAFgHQAGgHAAgRQAAgUgKgMQgGgJgIAAQgFAAgFADg");
	this.shape_46.setTransform(209.4,44.625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGACQgEADgGAAQgHAAgFgDQgFgEgCgGQgCgHAAgLIAAgjQAAgFgBgDQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgCgHAAIAAgDIAdAAIAAA1QAAAMAEADQADADAGAAQADAAAFgBQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgDIAbAAIAAAxQAAANABADQAAABABABQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_47.setTransform(31.375,44.75);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgIATQAIgGACgEQADgEAAgEIgBgDIgCgCIgCABIgDABQgEAAgDgDQgCgDAAgDQAAgFACgCQAEgEAFAAQAFAAAFAFQAEAFABAIQgBAJgHAJQgGAFgIAEg");
	this.shape_48.setTransform(225.95,38.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgSA/IAAgEQAGABABgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAIABgKIAAhJIgBgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAXgKIAFAAIAABqIABAKQAAAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_49.setTransform(231.5,42.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgSA/IAAgEQAFABACgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAIABgKIAAhJIAAgQQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGABIgCgCIAYgKIADAAIAABqIABAKQABAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_50.setTransform(232,42.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgNA9QgHgCgIgFIAAhTIAAgRQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgEgBIgGABIgBgDIAYgKIAEAAIAAA7QAMgRAMAAQANAAAJALQAJAKAAASQAAAVgOANQgMAMgPAAQgHAAgHgDgAgEgGQgEACgFAEIAAAwQAEAFAFACQAEACAFAAQAIAAAHgIQAHgJAAgRQAAgQgHgHQgHgIgJAAQgEAAgEACg");
	this.shape_51.setTransform(247.575,42.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_52.setTransform(72.475,44.625);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgSA/IAAgEQAGABABgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAIABgKIAAhJIgBgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAXgKIAFAAIAABqIABAKQAAAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAGgBIAAAEg");
	this.shape_53.setTransform(267.5,42.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AALAnQgCgDgBgHQgLAKgEABQgEACgGAAQgIAAgFgFQgFgGgBgJQABgGACgFQADgFAKgGQAIgEAUgIIAAgDQAAgMgDgEQgFgFgGAAQgFAAgEADQgDADAAAEIAAAFQAAAEgBACQgDADgDAAQgDAAgCgDQgDgCAAgEQAAgHAIgHQAIgGAOAAQAJAAAIADQAFADACAGQACAEAAALIAAAbIAAAOIACADIACABIACAAIAHgHIAAAFQgKANgJAAQgDAAgDgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAEAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_54.setTransform(269.7,44.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_55.setTransform(79.025,43.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgXAfQgKgLAAgTQAAgUALgLQAKgMAPAAQAOAAAIAJQAJAJAAAPIg3AAQAAARAJAKQAJAKALAAQAIAAAGgEQAFgEAEgLIADACQgCAMgJAKQgJAKgNAAQgNAAgLgMgAgOgeQgGAGgBAKIAlAAQgBgIgBgDQgCgFgFgDQgEgCgEAAQgHAAgGAFg");
	this.shape_56.setTransform(72.475,44.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgiA/IAAgEIADAAQAEAAADgCQADgBABgDIABgMIAAg0IgPAAIAAgGIAPAAIAAgGQAAgMAEgHQAEgJAIgFQAHgGAJABQAKAAAHAFQAGAFAAAEQAAADgCADQgDACgDAAIgDgBQgDgCgDgFIgGgGQgDgCgDAAQgEAAgDACQgCADgBAEQgCAEAAATIAAAGIAVAAIAAAGIgVAAIAAA0QAAAMADADQACADAGAAIAHAAIAAAEg");
	this.shape_57.setTransform(299.65,42.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAGgLQAFgLAJgFQAJgGAJAAQASAAAMAOQAJAMAAAQQAAAJgGALQgFALgIAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgCAHAAAKQgBARAIANQAGAMALAAQAIAAAGgHQAFgHABgRQAAgUgKgMQgGgJgJAAQgEAAgFADg");
	this.shape_58.setTransform(148.4,44.625);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIABgIIAAgfIgBgRIgCgDIgEgBIgGABIgBgEIAYgKIAEAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgCACgEAAQgCAAgEgDIgGgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgFAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_59.setTransform(309,44.5);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_60.setTransform(180.025,44.625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgWAfQgLgLAAgUQAAgSAMgMQALgMAPAAQAMAAAHAHQAIAGAAAHQAAADgCACQgDACgDAAQgGAAgDgDQgBgCAAgFQgBgFgDgDQgDgDgGAAQgHAAgFAHQgIAIAAAPQAAANAIALQAGALALAAQAJAAAHgGQAFgEAFgLIACACQgDAQgJAIQgKAJgMAAQgNAAgJgMg");
	this.shape_61.setTransform(331.9,44.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AAEA/IAAgEIACAAQAGAAACgCQACgBABgEIABgHIAAgdQAAgNgCgEQgCgEgDgBQgCgCgFAAQgEAAgEACQgEACgGAGIAAArIAAAKIADADQADACAGgBIAAAEIgoAAIAAgEQAFAAAEgCQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBAAAAIABgKIAAhJIAAgQQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgHABIgBgCIAYgKIAFAAIAAA6QAJgLAFgCQAFgEAGAAQAHAAAFAFQAFADACAIQACAFAAAPIAAAdIABAKIADADQACACAGgBIAAAEg");
	this.shape_62.setTransform(340.4,42.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AAFA/IAAgEIABAAQAGAAACgCQACgBABgEIAAgHIAAgdQAAgNgBgEQgBgEgDgBQgEgCgDAAQgFAAgDACQgFACgGAGIAAArIAAAKIADADQADACAGgBIAAAEIgnAAIAAgEQAFAAADgCQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBABAAIABgKIAAhJIgBgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAYgKIAFAAIAAA6QAJgLAFgCQAGgEAFAAQAHAAAFAFQAFADACAIQACAFAAAPIAAAdIABAKIADADQACACAGgBIAAAEg");
	this.shape_63.setTransform(346.4,42.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgXAfQgKgLAAgUQAAgSALgMQALgMAPAAQANAAAHAHQAIAGgBAHQAAADgCACQgCACgDAAQgGAAgCgDQgCgCAAgFQAAgFgEgDQgDgDgGAAQgHAAgFAHQgIAIABAPQgBANAIALQAGALAMAAQAIAAAHgGQAFgEAEgLIADACQgDAQgKAIQgJAJgMAAQgMAAgLgMg");
	this.shape_64.setTransform(337.9,44.625);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIABgIIAAgfIgBgRIgCgDIgEgBIgGABIgBgEIAZgKIADAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgDACgCAAQgDAAgFgDIgFgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_65.setTransform(319.5,44.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHAAAKQAAARAGANQAIAMAKAAQAJAAAFgHQAGgHAAgRQAAgUgKgMQgGgJgIAAQgFAAgFADg");
	this.shape_66.setTransform(311.9,44.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgiA/IAAgEIADAAQAEAAADgCQADgBABgDIABgMIAAg0IgPAAIAAgGIAPAAIAAgGQAAgMAEgHQAEgJAIgFQAGgGAKABQAKAAAHAFQAFAFABAEQgBADgCADQgCACgCAAIgFgBQgCgCgDgFIgGgGQgDgCgEAAQgEAAgCACQgCADgBAEQgBAEAAATIAAAGIATAAIAAAGIgTAAIAAA0QAAAMACADQACADAGAAIAHAAIAAAEg");
	this.shape_67.setTransform(305.65,42.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AALAnQgDgDAAgHQgLAKgEABQgEACgFAAQgJAAgFgFQgGgGABgJQgBgGADgFQAEgFAIgGQAKgEATgIIAAgDQAAgMgEgEQgDgFgHAAQgFAAgEADQgDADAAAEIABAFQAAAEgCACQgDADgDAAQgEAAgCgDQgCgCAAgEQABgHAHgHQAIgGAOAAQAKAAAGADQAFADADAGQABAEAAALIAAAbIABAOIACADIACABIACAAIAIgHIAAAFQgLANgIAAQgFAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAFAAQAGAAAKgJIAAgdIgQAGg");
	this.shape_68.setTransform(280.2,44.575);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgSA/IAAgEQAFABACgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAQACgDAAgHIAAhJIgBgQQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGABIgCgCIAYgKIADAAIAABqIABAKQABAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_69.setTransform(273.5,42.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgSA/IAAgEQAGABACgCQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAIABgKIAAhJIAAgQQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgBgCIAWgKIAFAAIAABqIABAKQAAAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAGgBIAAAEg");
	this.shape_70.setTransform(242.5,42.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgSA/IAAgEQAFABACgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAQACgDAAgHIAAhJIgBgQQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGABIgCgCIAYgKIADAAIAABqIABAKQABAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_71.setTransform(237.5,42.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgIATQAIgGACgEQADgEAAgEIgBgDIgCgCIgCABIgEABQgDAAgDgDQgCgDgBgDQABgFACgCQAEgEAFAAQAFAAAFAFQAEAFAAAIQABAJgJAJQgFAFgIAEg");
	this.shape_72.setTransform(231.95,38.725);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgFALgKAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgIAAQgGAAgEADg");
	this.shape_73.setTransform(215.4,44.625);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgjA5QgEgDAAgEQAAgEADgCQACgCAEAAIAIACIAFABQACAAADgDQAEgDACgHIAGgOIgcg8IgFgHIgDgEIgHgDIAAgDIAlAAIAAADIgBAAQgEAAgCACQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQAAAEACAGIAUAoIASgsIABgHIgBgCIgCgCIgFgBIAAgDIAaAAIAAADIgFACIgEAEIgDAHIggBPQgFAMgHAGQgIAGgHAAQgFAAgDgDg");
	this.shape_74.setTransform(206.4,46.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgSA/IAAgEQAFABACgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAIABgKIAAhJIgBgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAYgKIADAAIAABqIABAKQABAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_75.setTransform(180,42.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIABgIIAAgfIgBgRIgCgDIgEgBIgGABIgBgEIAZgKIADAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgDACgCAAQgDAAgFgDIgFgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_76.setTransform(162,44.5);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHAAAKQAAARAGANQAIAMAKAAQAJAAAFgHQAGgHAAgRQAAgUgKgMQgGgJgIAAQgFAAgFADg");
	this.shape_77.setTransform(154.4,44.625);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AAWApIgUgyIgXAyIgDAAIgahCQgCgGgDgDQgCgCgGgCIAAgDIAiAAIAAADQgFABgBACQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASgkIgFgNQgCgFgDgCIgIgCIAAgDIAmAAIAAADQgHABgCACQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAAAIABAEIASAuIARgsIACgIQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAIgHgCIAAgDIAaAAIAAADQgIACgEAJIgbBEg");
	this.shape_78.setTransform(138.875,44.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAGgLQAFgLAJgFQAJgGAJAAQASAAAMAOQAJAMAAAQQAAAJgGALQgFALgIAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgDAHQgDAHAAAKQAAARAIANQAHAMAKAAQAJAAAFgHQAFgHAAgRQAAgUgJgMQgGgJgJAAQgFAAgEADg");
	this.shape_79.setTransform(127.9,44.625);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAEAqIAAgEIACAAQAFAAADgCQACgBABgEIABgHIAAggQgBgMgDgFQgDgEgGAAQgKgBgKAMIAAAqQAAAIABACIADADQACACAHgBIAAAEIgnAAIAAgEIABAAQAGAAADgCQABgEAAgIIAAgeIAAgRQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgBIgGABIgCgEIAYgKIAEAAIAAARQAOgRAMAAQAHAAAEAEQAFADADAIQACAFAAALIAAAiIABAKQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQACACAFgBIAAAEg");
	this.shape_80.setTransform(118.9,44.5);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AguAoQgOgQAAgWQAAgPAIgOQAJgRAQgKQANgHAQAAIANABIAOAFIAHABIADgBIABgGIADAAIADAlIgDAAQgEgOgHgHQgLgKgRAAQgWAAgLASQgKAPAAAVQgBAQAHAOQAHAOAKAHQALAGALAAQAGAAAGgBQAGgCAGgDIAAgjQAAgJgCgCQgBgDgCgBQgEgBgGAAIAAgDIAuAAIAAADIgDAAQgGAAgDAEQgCADAAAJIAAAlQgKAFgKADQgKACgMAAQghAAgSgWg");
	this.shape_81.setTransform(68.1,42.675);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgGA7QgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDADgEAAQgDAAgDgDgAgBAcIgIhGIAAgHQAAgFADgEQADgDADAAQAEAAADADQADAEAAAGIgBAGIgHBGg");
	this.shape_82.setTransform(53.9,42.675);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AARApIAAgRQgKAMgGACQgEADgGAAQgHAAgFgDQgFgEgCgGQgCgHAAgLIAAgjQAAgFgBgDQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgCgHAAIAAgDIAdAAIAAA1QAAAMAEADQADADAGAAQADAAAFgBQAEgDAHgHIAAgsQAAgHgDgCQgCgDgIgBIAAgDIAbAAIAAAxQAAANABADQAAABABABQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgBIABACIgYAKg");
	this.shape_83.setTransform(37.375,44.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgYA8IAAgEIADAAQAJAAACgEQACgDABgKIAAgdIghgwIgIgMIgJgEIgFgBIAAgEIAzAAIAAAEIgCAAQgEAAgEACQgEABABAFQgBACAGAJIAXAlIAYgkQAGgIgBgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAgBIgDgCIgHgBIAAgEIApAAIAAAEIgDAAIgGACQgFABgDAFIgJAMIgdAsIAAAeQABALACADQADADAIAAIADAAIAAAEg");
	this.shape_84.setTransform(28.35,42.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AAMASQgFgFABgIQAAgIAFgIQAHgHAKgDIAAADQgJAFgDAEQgCAEAAAFIABADIABACIADgBIAFgBQADAAACADQAEACAAAEQgBAEgDAEQgDADgGAAQgFAAgFgFgAgdASQgEgGgBgHQAAgIAHgHQAFgIALgEIAAAEQgHAEgEAEQgDAFAAAFQAAAAAAAAQAAABAAABQAAAAAAABQAAAAAAAAIACABIAEAAIADgBQAEAAADADQACACAAAEQAAAFgDADQgDADgFAAQgGAAgFgFg");
	this.shape_85.setTransform(17.95,38.725);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgGA7QgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDgAgBAcIgHhGIgBgHQAAgFADgEQADgDADAAQAEAAADADQADAEAAAGIAAAGIgIBGg");
	this.shape_86.setTransform(10.9,42.675);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgSA/IAAgEQAFABACgCQABAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAIABgKIAAhJIgBgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAYgKIADAAIAABqQAAAHACADQAAAAAAABQAAAAABABQAAAAABAAQAAABABAAQACACAHgBIAAAEg");
	this.shape_87.setTransform(365.5,42.4);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAALAOQAJAMAAAQQAAAJgGALQgEALgJAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQAAARAIANQAHAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgJAAQgFAAgEADg");
	this.shape_88.setTransform(358.4,44.625);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAALAOQAJAMAAAQQAAAJgGALQgEALgJAGQgKAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQAAARAIANQAHAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgJAAQgFAAgEADg");
	this.shape_89.setTransform(349.4,44.625);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgGA7QgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDADgEAAQgDAAgDgDgAgBAcIgIhGIAAgHQAAgFADgEQADgDADAAQAEAAADADQADAEAAAGIgBAGIgIBGg");
	this.shape_90.setTransform(378.25,42.675);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AAFA/IAAgEIABAAQAGAAACgCQACgBABgEIAAgHIAAgdQAAgNgBgEQgBgEgDgBQgEgCgDAAQgFAAgDACQgFACgGAGIAAArIAAAKIADADQADACAGgBIAAAEIgnAAIAAgEQAFAAADgCQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBABAAIAAgKIAAhJIAAgQQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIgFABIgCgCIAYgKIAFAAIAAA6QAJgLAFgCQAGgEAFAAQAHAAAFAFQAFADACAIQACAFAAAPIAAAdIABAKIADADQACACAGgBIAAAEg");
	this.shape_91.setTransform(347.75,42.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIABgIIAAgfIgBgRIgCgDIgEgBIgGABIgBgEIAZgKIADAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgDACgCAAQgEAAgEgDIgFgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_92.setTransform(320.85,44.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgiA/IAAgEIADAAQAEAAADgCQADgBABgDIABgMIAAg0IgPAAIAAgGIAPAAIAAgGQAAgMAEgHQAEgJAIgFQAGgGAKABQAKAAAHAFQAFAFABAEQgBADgCADQgCACgCAAIgFgBQgCgCgDgFIgGgGQgDgCgEAAQgEAAgCACQgCADgBAEQgBAEgBATIAAAGIAUAAIAAAGIgUAAIAAA0QABAMACADQACADAGAAIAHAAIAAAEg");
	this.shape_93.setTransform(307,42.4);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgIATQAIgGADgEQACgEAAgEIgBgDIgCgCIgCABIgEABQgDAAgDgDQgCgDgBgDQABgFACgCQAEgEAFAAQAFAAAFAFQAEAFAAAIQABAJgJAJQgFAFgIAEg");
	this.shape_94.setTransform(233.3,38.725);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgEAHAAAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQAAgUgJgMQgGgJgIAAQgGAAgEADg");
	this.shape_95.setTransform(216.75,44.625);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgcAqIAAgEQAGAAADgCQACgBABgDIABgIIAAgfIgBgRIgCgDIgEgBIgGABIgBgEIAZgKIADAAIAAASQAKgSAKAAQAFAAADAEQADACAAAEQAAAEgCACQgDACgDAAQgCAAgFgDIgFgCQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAIABADIAEAEQADACAFgBIAAAEg");
	this.shape_96.setTransform(163.35,44.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AAEAqIAAgEIACAAQAFAAADgCQACgBABgEIABgHIAAggQgBgMgDgFQgDgEgGAAQgJgBgLAMIAAAqQAAAIABACIADADQACACAHgBIAAAEIgnAAIAAgEIABAAQAGAAACgCQACgEAAgIIAAgeIAAgRQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgDgBIgGABIgCgEIAYgKIAEAAIAAARQAOgRAMAAQAHAAAEAEQAFADADAIQACAFAAALIAAAiIABAKQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQACACAFgBIAAAEg");
	this.shape_97.setTransform(120.25,44.5);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AguAoQgOgQAAgWQAAgPAIgOQAJgRAPgKQAOgHAQAAIANABIAOAFIAHABIADgBIABgGIADAAIADAlIgDAAQgEgOgHgHQgLgKgRAAQgWAAgLASQgKAPAAAVQgBAQAHAOQAHAOAKAHQALAGALAAQAGAAAGgBQAGgCAGgDIAAgjQAAgJgCgCQgBgDgCgBQgEgBgGAAIAAgDIAuAAIAAADIgDAAQgGAAgDAEQgCADAAAJIAAAlQgKAFgKADQgKACgMAAQghAAgSgWg");
	this.shape_98.setTransform(69.45,42.675);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AAMASQgFgFABgIQAAgIAFgIQAHgHAKgDIAAADQgJAFgDAEQgCAEAAAFIABADIABACIADgBIAFgBQADAAACADQAEACAAAEQgBAEgDAEQgDADgGAAQgFAAgFgFgAgdASQgEgGgBgHQAAgIAHgHQAFgIALgEIAAAEQgHAEgEAEQgDAFgBAFQAAAAABAAQAAABAAABQAAAAAAABQAAAAAAAAIACABIAEAAIADgBQAEAAADADQACACAAAEQAAAFgDADQgDADgFAAQgGAAgFgFg");
	this.shape_99.setTransform(19.3,38.725);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AAOAaIgEgaIgCgKIAAgEQAAgGACgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQAEAAACADQADADAAAEIgCAPIgGAag");
	this.shape_100.setTransform(11.55,39.025);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AAOAaIgEgaIgDgKIAAgEQAAgGADgCQACgDAEAAQAEAAACADQADACAAAFIgCAPIgEAagAgRAaIgFgaIgCgOQAAgGACgCQADgDAEAAQADAAADADQADADAAAEIgDAPIgEAag");
	this.shape_101.setTransform(377.55,39.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}}]},2).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}}]},2).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}},{t:this.shape_15}]},2).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}},{t:this.shape_15},{t:this.shape_32},{t:this.shape_31,p:{x:67.975}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}}]},2).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_14,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}}]},2).to({state:[{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:108.4}},{t:this.shape_37,p:{x:117.4}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:143.9}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_31,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_41,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_31,p:{x:162.975}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_41,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_31,p:{x:167.475}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_41,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_31,p:{x:167.475}},{t:this.shape_42}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_41,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_31,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_13,p:{x:31.375}},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:195.9}},{t:this.shape_46,p:{x:204.9}},{t:this.shape_13,p:{x:213.875}},{t:this.shape_48,p:{x:221.45}},{t:this.shape_49,p:{x:227}},{t:this.shape_50,p:{x:232}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_44,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_41,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_31,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_52,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_44,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_41,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_31,p:{x:256.475}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_52,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_44,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_41,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_31,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_52,p:{x:72.475}},{t:this.shape_33,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_44,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_41,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_31,p:{x:256.475}},{t:this.shape_53,p:{x:263}},{t:this.shape_54,p:{x:269.7}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_52,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_44,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_41,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_31,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_39,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_43,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:295.15}},{t:this.shape_39,p:{x:301.4}},{t:this.shape_59,p:{x:309}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_60,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}},{t:this.shape_59,p:{x:313.5}},{t:this.shape_43,p:{x:324.525}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_60,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}},{t:this.shape_59,p:{x:313.5}},{t:this.shape_43,p:{x:324.525}},{t:this.shape_61}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_60,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}},{t:this.shape_59,p:{x:313.5}},{t:this.shape_43,p:{x:324.525}},{t:this.shape_61},{t:this.shape_62}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_86,p:{x:10.9}},{t:this.shape_85},{t:this.shape_84,p:{x:28.35}},{t:this.shape_83,p:{x:37.375}},{t:this.shape_35,p:{x:46.075}},{t:this.shape_82,p:{x:53.9}},{t:this.shape_81},{t:this.shape_56,p:{x:78.475}},{t:this.shape_55,p:{x:85.025}},{t:this.shape_13,p:{x:96.375}},{t:this.shape_14,p:{x:105.075}},{t:this.shape_80},{t:this.shape_79,p:{x:127.9}},{t:this.shape_78,p:{x:138.875}},{t:this.shape_77,p:{x:154.4}},{t:this.shape_76},{t:this.shape_52,p:{x:173.475}},{t:this.shape_75,p:{x:180}},{t:this.shape_60,p:{x:186.025}},{t:this.shape_44,p:{x:193.475}},{t:this.shape_74,p:{x:206.4}},{t:this.shape_73},{t:this.shape_34,p:{x:224.375}},{t:this.shape_72},{t:this.shape_71,p:{x:237.5}},{t:this.shape_70,p:{x:242.5}},{t:this.shape_51,p:{x:253.575}},{t:this.shape_41,p:{x:262.475}},{t:this.shape_69,p:{x:273.5}},{t:this.shape_68,p:{x:280.2}},{t:this.shape_33,p:{x:286.525}},{t:this.shape_31,p:{x:292.975}},{t:this.shape_67},{t:this.shape_66,p:{x:311.9}},{t:this.shape_65},{t:this.shape_43,p:{x:330.525}},{t:this.shape_64,p:{x:337.9}},{t:this.shape_63},{t:this.shape_39,p:{x:355.4}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_86,p:{x:10.9}},{t:this.shape_85},{t:this.shape_84,p:{x:28.35}},{t:this.shape_83,p:{x:37.375}},{t:this.shape_35,p:{x:46.075}},{t:this.shape_82,p:{x:53.9}},{t:this.shape_81},{t:this.shape_56,p:{x:78.475}},{t:this.shape_55,p:{x:85.025}},{t:this.shape_13,p:{x:96.375}},{t:this.shape_14,p:{x:105.075}},{t:this.shape_80},{t:this.shape_79,p:{x:127.9}},{t:this.shape_78,p:{x:138.875}},{t:this.shape_77,p:{x:154.4}},{t:this.shape_76},{t:this.shape_52,p:{x:173.475}},{t:this.shape_75,p:{x:180}},{t:this.shape_60,p:{x:186.025}},{t:this.shape_44,p:{x:193.475}},{t:this.shape_74,p:{x:206.4}},{t:this.shape_73},{t:this.shape_34,p:{x:224.375}},{t:this.shape_72},{t:this.shape_71,p:{x:237.5}},{t:this.shape_70,p:{x:242.5}},{t:this.shape_51,p:{x:253.575}},{t:this.shape_41,p:{x:262.475}},{t:this.shape_69,p:{x:273.5}},{t:this.shape_68,p:{x:280.2}},{t:this.shape_33,p:{x:286.525}},{t:this.shape_31,p:{x:292.975}},{t:this.shape_67},{t:this.shape_66,p:{x:311.9}},{t:this.shape_65},{t:this.shape_43,p:{x:330.525}},{t:this.shape_64,p:{x:337.9}},{t:this.shape_63},{t:this.shape_58,p:{x:355.4}},{t:this.shape_39,p:{x:364.4}}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_60,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}},{t:this.shape_59,p:{x:313.5}},{t:this.shape_43,p:{x:324.525}},{t:this.shape_61},{t:this.shape_62},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_100},{t:this.shape_99},{t:this.shape_84,p:{x:29.7}},{t:this.shape_83,p:{x:38.725}},{t:this.shape_35,p:{x:47.425}},{t:this.shape_82,p:{x:55.25}},{t:this.shape_98},{t:this.shape_56,p:{x:79.825}},{t:this.shape_55,p:{x:86.375}},{t:this.shape_13,p:{x:97.725}},{t:this.shape_14,p:{x:106.425}},{t:this.shape_97},{t:this.shape_79,p:{x:129.25}},{t:this.shape_78,p:{x:140.225}},{t:this.shape_77,p:{x:155.75}},{t:this.shape_96},{t:this.shape_52,p:{x:174.825}},{t:this.shape_75,p:{x:181.35}},{t:this.shape_60,p:{x:187.375}},{t:this.shape_44,p:{x:194.825}},{t:this.shape_74,p:{x:207.75}},{t:this.shape_95},{t:this.shape_34,p:{x:225.725}},{t:this.shape_94},{t:this.shape_71,p:{x:238.85}},{t:this.shape_70,p:{x:243.85}},{t:this.shape_51,p:{x:254.925}},{t:this.shape_41,p:{x:263.825}},{t:this.shape_69,p:{x:274.85}},{t:this.shape_68,p:{x:281.55}},{t:this.shape_33,p:{x:287.875}},{t:this.shape_31,p:{x:294.325}},{t:this.shape_93},{t:this.shape_66,p:{x:313.25}},{t:this.shape_92},{t:this.shape_43,p:{x:331.875}},{t:this.shape_64,p:{x:339.25}},{t:this.shape_91},{t:this.shape_58,p:{x:356.75}},{t:this.shape_39,p:{x:365.75}},{t:this.shape_50,p:{x:372.85}},{t:this.shape_90}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12},{t:this.shape_47},{t:this.shape_35,p:{x:40.075}},{t:this.shape_15},{t:this.shape_27},{t:this.shape_56,p:{x:72.475}},{t:this.shape_55,p:{x:79.025}},{t:this.shape_34,p:{x:90.375}},{t:this.shape_14,p:{x:99.075}},{t:this.shape_36,p:{x:112.9}},{t:this.shape_37,p:{x:121.9}},{t:this.shape_38},{t:this.shape_58,p:{x:148.4}},{t:this.shape_40},{t:this.shape_52,p:{x:167.475}},{t:this.shape_42},{t:this.shape_60,p:{x:180.025}},{t:this.shape_44,p:{x:187.475}},{t:this.shape_45,p:{x:200.4}},{t:this.shape_46,p:{x:209.4}},{t:this.shape_13,p:{x:218.375}},{t:this.shape_48,p:{x:225.95}},{t:this.shape_49,p:{x:231.5}},{t:this.shape_50,p:{x:236.5}},{t:this.shape_51,p:{x:247.575}},{t:this.shape_41,p:{x:256.475}},{t:this.shape_53,p:{x:267.5}},{t:this.shape_54,p:{x:274.2}},{t:this.shape_33,p:{x:280.525}},{t:this.shape_31,p:{x:286.975}},{t:this.shape_57,p:{x:299.65}},{t:this.shape_39,p:{x:305.9}},{t:this.shape_59,p:{x:313.5}},{t:this.shape_43,p:{x:324.525}},{t:this.shape_61},{t:this.shape_62},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86,p:{x:370.9}},{t:this.shape_101}]},2).wait(1));

	// Layer_1
	this.movieClip_6 = new lib.Symbol4();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(268.9,78.5);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_6).wait(85));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,540.9,160);


(lib.Text1 = function(mode,startPosition,loop,reversed) {
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
	this.frame_18 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(18).call(this.frame_18).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgFAmQgCgCAAgEQAAgGADgGIACgJIABgIIgKAJQgHAIgDACQgDACgDAAQgDAAgCgDQgDgCAAgCQAAgDACgDQACgCAEgCIAMgDIAMgEIgNgDQgLgDgDgCQgFgDAAgFQAAgCADgCQACgDACAAQAEABAEACQADACAGAGQAEAGAGAEQAAgHgCgHQgEgKAAgDQAAgFADgCQACgDACAAQAEAAACADQACACAAAFQAAAEgCAIIgEAPQAFgEAFgFQAHgHADgCQADgCADAAQADAAADACQACACAAADQAAAEgDADQgDACgOAEIgMACQAFADAHABQANACADADQAEAEgBAEQAAACgCACQgBADgEAAQgDAAgDgDQgDgBgHgIIgKgJIADANQADALAAAFQAAAEgCACQgCADgEAAQgCAAgDgDg");
	this.shape.setTransform(7,9.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAfBCIgsg+IgIABIgDAAIgDgBIAAAnQAAAMADADQADAFAIAAIAFAAIAAADIg5AAIAAgDIAFAAQAJAAADgGQACgDAAgLIAAhVQAAgMgDgDQgDgFgIAAIgFAAIAAgDIAwAAQAVAAAKADQAKADAHAIQAGAIAAAMQAAAMgHAJQgIAJgRADIAbAmQAKANAGAEQAHAEALACIAAADgAgbg4IAAA3IADAAIACAAQATAAAJgIQAKgIAAgNQAAgMgIgIQgIgIgMAAIgPACg");
	this.shape_1.setTransform(18.925,13.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAyBDIhXhpIAABQQABANACADQAEAEAIAAIAEAAIAAADIguAAIAAgDIAFAAQAJAAADgFQACgEAAgLIAAhbIgJgJIgJgEIgIgBIAAgDIAkAAIBQBiIAAhLQAAgMgDgDQgEgFgHAAIgFAAIAAgDIAuAAIAAADIgEAAQgJAAgEAGQgCADAAALIAABug");
	this.shape_2.setTransform(38.95,13.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgbBCIAAgDIAEAAQAJAAADgFQADgDAAgMIAAhVQAAgKgCgDIgEgEQgEgDgFAAIgEAAIAAgDIA3AAIAAADIgEAAQgIAAgEAFQgDADAAAMIAABVQAAAKACADQABADADABQAEADAFAAIAEAAIAAADg");
	this.shape_3.setTransform(28.675,13.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgzAtQgPgTAAgYQAAgQAIgQQAKgTASgLQAOgIATAAIANABIARAFIAHACIADgBQACgCAAgFIAEAAIADAqIgDAAQgGgQgIgIQgMgLgSAAQgZAAgNAUQgLARAAAXQAAASAIAPQAHAQAMAHQAMAIALAAQAHAAAHgCQAHgCAGgEIAAgmQAAgKgBgDQgCgDgDgBQgDgBgIAAIAAgEIAzAAIAAAEIgCAAQgIAAgDAEQgBADAAALIAAApQgMAGgLACQgLADgNAAQglAAgUgYg");
	this.shape_4.setTransform(53.875,13.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAADADQADADABAEQgBAFgDADQgDADgEAAQgEAAgDgDgAgBAfIgJhOIAAgIQAAgGADgDQAEgEADAAQAEAAADAEQAEAEAAAHIAAAGIgJBOg");
	this.shape_5.setTransform(64.25,13.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAADADQADADAAAEQAAAFgDADQgDADgEAAQgEAAgDgDgAgBAfIgJhOIAAgIQAAgGADgDQADgEAEAAQAEAAADAEQAEAEAAAHIgBAGIgJBOg");
	this.shape_6.setTransform(70.9,13.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgHBCQgDgDAAgFQAAgEADgDQADgDAEAAQAEAAADADQADADAAAEQAAAFgDADQgDADgEAAQgEAAgDgDgAgBAfIgJhOIAAgIQAAgGADgDQADgEAEAAQAFAAACAEQAEAEAAAHIgBAGIgJBOg");
	this.shape_7.setTransform(77.55,13.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgFAmQgCgCAAgEQAAgGADgGIACgJIABgIIgKAJQgHAIgDACQgDACgDAAQgDAAgCgDQgDgCAAgCQAAgDACgDQACgCAEgCIAMgDIAMgEIgMgDQgMgDgDgCQgFgDAAgFQAAgCADgCQACgDACAAQADABAEACQAEACAFAGQAFAGAGAEQAAgHgCgHQgEgKAAgDQAAgFADgCQACgDACAAQADAAADADQACACAAAFQAAAEgCAIIgEAPQAGgEAEgFQAHgHADgCQADgCAEAAQACAAADACQACACAAADQAAAEgEADQgCACgOAEIgMACQAFADAHABQAMACAEADQAEAEgBAEQAAACgCACQgBADgDAAQgDAAgEgDQgDgBgHgIIgKgJIADANQADALAAAFQAAAEgCACQgCADgEAAQgCAAgDgDg");
	this.shape_8.setTransform(85.85,9.95);

	this.movieClip_11 = new lib.Symbol7();
	this.movieClip_11.name = "movieClip_11";
	this.movieClip_11.setTransform(91.45,13.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7}]},1).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_4},{t:this.shape_5},{t:this.shape_6},{t:this.shape_7},{t:this.shape_8}]},1).to({state:[{t:this.movieClip_11}]},1).wait(5));

	// Layer_1
	this.movieClip_6 = new lib.Symbol4();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(268.9,78.5);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_6).wait(19));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,540.9,160);


(lib.Symbol16 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_6 = new lib.Symbol4();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(268.9,78.5);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,540.9,160);


(lib.TITLEPICSYM = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.GLITCH_FX();
	this.instance.setTransform(278.1,205.1,1,1,0,0,0,278.1,205.1);

	this.instance_1 = new lib.Untitled79_20240330155224();
	this.instance_1.setTransform(6,0,0.6808,0.6808);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance}]},2).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,556.1,410.1);


(lib.Symbol22 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Symbol21("synched",0);
	this.instance.setTransform(0.05,-0.05,1,1,0,0,0,110.9,152.8);
	var instanceFilter_1 = new cjs.ColorFilter(0.45,0.45,0.45,1,56.1,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-14,-27,275,352);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol22, new cjs.Rectangle(-122.9,-177.5,271.1,348.2), null);


(lib.PlayButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.Play_BrightSYM("synched",0);
	this.instance.setTransform(200,33,0.3333,0.3333,0,0,0,400.1,299.9);
	var instanceFilter_1 = new cjs.ColorFilter(0.48,0.48,0.48,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-2,-2,804,604);

	this.instance_1 = new lib.OVER_PLAY("synched",0);
	this.instance_1.setTransform(201.8,34.05,0.886,0.886,0,0,0,153.8,122);
	var instance_1Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-2,-2,311,248);

	this.instance_2 = new lib.Down_BUT("synched",0);
	this.instance_2.setTransform(165.95,33.4,1,1,0,0,0,59.6,0);
	var instance_2Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_2.filters = [instance_2Filter_3];
	this.instance_2.cache(-77,-103,273,206);

	this.instance_3 = new lib.HIT_START("synched",0);
	this.instance_3.setTransform(178.25,31,0.36,0.36,0,0,0,60,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(3));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(1).to(new cjs.ColorFilter(0.79,0.79,0.79,1,0,0,0,0), 0).wait(2));
	this.timeline.addTween(cjs.Tween.get(instance_2Filter_3).wait(2).to(new cjs.ColorFilter(0.48,0.48,0.48,1,0,0,0,0), 0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#252525").ss(4,1,1).p("A5TkmMAynAAAIAAJNMgynAAAg");
	this.shape.setTransform(162,29.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.537)").s().p("A5TEnIAApNMAynAAAIAAJNg");
	this.shape_1.setTransform(162,29.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#252525").ss(4,1,1).p("A5xkrMAzjAAAIAAJXMgzjAAAg");
	this.shape_2.setTransform(162,30);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.698)").s().p("A5xEsIAApXMAzjAAAIAAJXg");
	this.shape_3.setTransform(162,30);

	this.instance_4 = new lib.PClick_Effect();
	this.instance_4.setTransform(162,29.4,1,1,0,0,0,162,29.4);
	this.instance_4.filters = [new cjs.BlurFilter(55, 55, 3)];
	this.instance_4.cache(-4,-4,332,67);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_1, startFrame:1, endFrame:1, x:-2, y:-2, w:311, h:248});
	this.filterCacheList.push({instance: this.instance_1, startFrame:0, endFrame:0, x:-2, y:-2, w:311, h:248});
	this.filterCacheList.push({instance: this.instance_2, startFrame:2, endFrame:2, x:-77, y:-103, w:273, h:206});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77,-77,482,219.2);


(lib.Symbol20 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween9("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol20, new cjs.Rectangle(-400,-300,800,600), null);


(lib.Symbol18 = function(mode,startPosition,loop,reversed) {
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
	this.movieClip_7 = new lib.Symbol5("synched",0);
	this.movieClip_7.name = "movieClip_7";

	this.timeline.addTween(cjs.Tween.get(this.movieClip_7).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol18, new cjs.Rectangle(-400.6,-300.6,801.3,601.3), null);


(lib.Symbol17 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween10("synched",0);
	this.instance.setTransform(0,0,1.7651,1.7651);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol17, new cjs.Rectangle(-706,-529.5,1412.1,1059.1), null);


(lib.Text4 = function(mode,startPosition,loop,reversed) {
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
	this.frame_66 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(66).call(this.frame_66).wait(1));

	// Layer_2
	this.text = new cjs.Text("", "12px 'YuGothic-Regular'");
	this.text.lineHeight = 17;
	this.text.parent = this;
	this.text.setTransform(973.95,78.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#662022").s().p("AAGAVIAAgRIAKgYIAHAAIgJAYIAKAAIAAARgAgXAVIAAgRIAKgYIAHAAIgIAYIAJAAIAAARg");
	this.shape.setTransform(11.675,38.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#662022").s().p("AghBPIAAgEIAFAAQALAAAEgGQACgEAAgNIAAglIgrhCIgLgPQgCgDgJgEIgHgBIAAgFIBEAAIAAAFIgEAAQgFAAgEACQgFADAAAFQAAAFAHALIAgAxIAfgvQAIgMgBgFQABgDgCgDIgFgEQgDgBgHAAIAAgFIA4AAIAAAFIgDAAQgDAAgGACQgGAEgFAEQgFAFgGAMIgnA7IAAAoQAAAPAEADQAEAFAJAAIAFAAIAAAEg");
	this.shape_1.setTransform(10.6,15.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#662022").s().p("AgkAwQgOgSAAgeQABggARgTQAPgQAUAAQATAAANALQAKAJAEAPIgLADQgIgcgbAAQgSAAgLARQgLAPAAAZQAAAdANAQQALANAQAAQAUAAAIgQQAIgMAAgTIglAAIAAgKIAwAAIAABBIgIAAIgCgWQgFAMgLAHQgJAFgMAAQgYAAgPgUg");
	this.shape_2.setTransform(21.8,43.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#662022").s().p("AgnAlQgMgQAAgUQAAgOAIgOQAHgPAMgHQAMgHAMAAQAZAAAOATQANAQAAAUQAAANgHAPQgHAPgMAIQgMAHgOAAQgYAAgPgUgAgPgtQgGAEgEAJQgEAJAAAPQAAAWAKASQAJAQAOAAQALABAIgKQAHgKAAgWQAAgbgMgRQgIgMgMABQgHAAgGADg");
	this.shape_3.setTransform(22.925,18.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_4.setTransform(33.575,45.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#662022").s().p("AgGAtQgDgCABgFQgBgGADgIIADgLIACgJQgHAFgFAGQgIAJgFACQgDACgEABQgDgBgDgDQgDgCAAgDQAAgDACgDQADgDAEgDIAPgDQAHgCAHgDQgGgCgJgCQgOgDgDgDQgGgEAAgFQAAgDACgCQAEgDADAAQAEAAAEACQAFADAGAHQAGAIAHAEQgBgJgDgIQgDgLAAgEQAAgGACgEQAEgDADAAQADAAADADQACAEABAFQAAAGgDAJQgEAJgBAJQAHgEAFgGIAMgMQAEgCAEAAQAEAAACADQADADAAADQAAAEgEADQgDAEgQAEIgPADQAGADAJACQAOADAEADQAFAEAAAFQAAADgDADQgDADgDAAQgDAAgEgDQgFgCgIgJQgEgGgIgFQABAHACAHQAFAOAAAGQgBAEgCADQgDAEgDAAQgDgBgEgDg");
	this.shape_5.setTransform(34.95,11.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_6.setTransform(33.575,45.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#662022").s().p("AAXA4IAAgYQgOAPgIAEQgGAFgIAAQgJgBgHgFQgGgFgDgIQgCgJAAgPIAAguQAAgIgCgDQgCgDgDgCQgDgBgJAAIAAgEIAmAAIAABHQAAAPAFAEQAGAFAHAAQAEAAAGgDQAHgEAJgIIAAg8QAAgJgEgEQgDgDgLAAIAAgEIAlAAIAABAQAAASABAEQABAFACABQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAAEgCIACAEIggAOg");
	this.shape_7.setTransform(34.925,18.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#662022").s().p("AgbA2QgJgNAAgVQAAgWALgNQAKgKAPAAQAQAAAKAPIAAg5IALAAIAACFIgLAAIAAgOQgKAQgQAAQgRAAgKgOgAgSgFQgHAJAAARQAAATAJAKQAHAIAKAAQAPAAAKgRIAAgoQgKgRgQAAQgLAAgHALg");
	this.shape_8.setTransform(53.675,43.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#662022").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgDgCgDAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgEAAQgEAAgFgEQgFgEgDAAQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAABQgGAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_9.setTransform(45.1,17.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#662022").s().p("AAxAuIAAg9QAAgUgRAAQgHAAgIAGQgHAFgFAHIAAA/IgKAAIAAg9QAAgUgQAAQgHAAgIAFQgGAFgGAIIAAA/IgLAAIAAhZIALAAIAAAQQAOgSAQAAQAKAAAHAGQAFAFABAHQANgSARAAQAMAAAHAHQAGAIAAAKIAABCg");
	this.shape_10.setTransform(72.075,45.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#662022").s().p("AhHBPIAAgEIAHAAQAJAAAFgGQADgEAAgNIAAhnQAAgOgEgEQgFgFgIAAIgHAAIAAgFIBFAAQATAAALAEQARAEAKAKQAJALAAAOQAAAMgHAJQgIAKgNAFQAQACAIAHQAMAMAAAPQgBAMgHALQgHALgNAEQgOAGgbgBgAgZADIAABBQAOADAMAAQAVAAALgJQAMgKAAgOQgBgJgFgJQgFgJgLgEQgLgFgRAAIgMAAIgIABgAgZhEIAAA9IAKABIAMAAQAQAAAJgDQAJgEAEgHQAFgIgBgJQAAgOgLgKQgLgJgVgBQgMABgJACg");
	this.shape_11.setTransform(62.5,15.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_12.setTransform(33.575,45.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#662022").s().p("AgmA3IAAgEQAJAAADgDQADgBABgFIABgLIAAgoIgBgXQgBgDgCgCQgBgCgDAAQgEAAgFACIgBgEIAggNIAGAAIAAAYQAMgYAOAAQAHAAAEAEQAEAEAAAFQAAAEgDADQgDAEgFAAQgDAAgGgEQgEgEgDAAQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAABQgGAFgEALIAAAyQAAAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_13.setTransform(75.1,17.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#662022").s().p("AgTAuIAAhZIAKAAIAAAXQAFgNAJgGQAHgGAIAAIgBALQgJAAgIAIQgHAHgEAOIAAAzg");
	this.shape_14.setTransform(93.75,45.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#662022").s().p("AgmA3IAAgEQAJAAADgDQAEgBABgFIAAgLIAAgoIAAgXQgBgDgDgCQgCgCgCAAQgEAAgFACIgBgEIAggNIAFAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgGgEgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBABQgFAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_15.setTransform(69.1,17.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#662022").s().p("AhHBPIAAgEIAHAAQAKAAAEgGQACgEABgNIAAhnQgBgOgDgEQgEgFgJAAIgHAAIAAgFIBFAAQATAAALAEQARAEAKAKQAJALAAAOQAAAMgHAJQgHAKgPAFQARACAIAHQALAMAAAPQAAAMgHALQgIALgNAEQgMAGgbgBgAgZADIAABBQAOADAMAAQAVAAALgJQALgKAAgOQABgJgGgJQgFgJgLgEQgMgFgPAAIgNAAIgIABgAgZhEIAAA9IAKABIAMAAQAQAAAJgDQAIgEAFgHQAFgIAAgJQAAgOgMgKQgLgJgVgBQgLABgKACg");
	this.shape_16.setTransform(56.5,15.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#662022").s().p("AgnAlQgMgQAAgUQAAgOAIgOQAHgPAMgHQAMgHAMAAQAZAAAOATQANAQAAAUQAAANgHAPQgHAPgMAIQgMAHgOAAQgYAAgPgUgAgPgtQgGAEgEAJQgEAJAAAPQAAAWAKASQAJAQAOAAQALABAIgKQAHgKAAgWQAAgbgMgRQgIgMgMABQgHAAgGADg");
	this.shape_17.setTransform(22.925,18.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#662022").s().p("AAXAuIAAg9QAAgUgRAAQgOAAgOASIAAA/IgLAAIAAhZIALAAIAAAQQAPgSAQAAQAMAAAIAHQAFAIAAAKIAABCg");
	this.shape_18.setTransform(101.7,45.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#662022").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_19.setTransform(94.425,16.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#662022").s().p("AgFA/IAAhZIAKAAIAABZgAgHguIAAgQIAPAAIAAAQg");
	this.shape_20.setTransform(109.275,43.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#662022").s().p("AAFBTIAAgEIADAAQAHAAAEgCQADgDAAgEIABgLIAAgmQAAgSgBgEQgCgGgFgCQgEgDgFAAQgGAAgFADQgHADgIAIIAAA5QAAALABADQACACADACQADACAIAAIAAAEIg1AAIAAgEQAHAAAFgCQACgBABgEQACgDgBgKIAAhgIAAgXQgBgEgCgCQgCgBgDAAIgIACIgCgEIAhgNIAFAAIAABOQANgOAHgEQAHgEAIAAQAJAAAHAFQAGAFADALQACAGAAAUIAAAmQAAAKACAEQABADADABQADACAHAAIAAAEg");
	this.shape_21.setTransform(103.6,15.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#662022").s().p("AAXAuIAAg9QAAgUgQAAQgQAAgOASIAAA/IgKAAIAAhZIAKAAIAAAQQAPgSARAAQAMAAAHAHQAGAIABAKIAABCg");
	this.shape_22.setTransform(116.85,45.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#662022").s().p("AgfAqQgNgPAAgaQAAgaAOgQQAOgPAUAAQASAAAMAMQALALAAAVIhJAAQAAAWAMAOQAMANAOAAQALABAIgGQAIgGAFgOIADADQgCAQgMANQgMANgRAAQgTAAgOgPgAgTgoQgHAIgCANIAxAAQgBgKgBgFQgDgGgGgEQgGgEgFAAQgKAAgIAIg");
	this.shape_23.setTransform(109.025,18.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#662022").s().p("AAGBTIAAgEIACAAQAIAAACgCQADgDABgEIABgLIAAgmQAAgSgCgEQgCgGgDgCQgEgDgGAAQgGAAgFADQgHADgIAIIAAA5QAAALACADQABACADACQADACAJAAIAAAEIg2AAIAAgEQAIAAAEgCQACgBABgEQABgDAAgKIAAhgIAAgXQgBgEgCgCQgCgBgDAAIgIACIgCgEIAggNIAGAAIAABOQANgOAHgEQAHgEAIAAQAJAAAGAFQAHAFADALQADAGAAAUIAAAmQAAAKABAEQABADADABQADACAHAAIAAAEg");
	this.shape_24.setTransform(97.6,15.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#662022").s().p("AgfA8QgJgGAAgJQAAgHAFgFQAFgFAJgDQgOgDgBgKQAAgJANgHQgLgIAAgPQAAgOAKgJQAKgHANAAQAJAAAHAEQAFgHAGgDQAHgDAIAAIgBALQgHAAgFACQgEABgDAEQAKAHAAAOQAAAOgLAJQgJAGgMAAQgJAAgHgCQgIAEgBAFQAAAFAFACQADACALABIARACQATACAGAGQAGAEAAAJQAAAMgMAHQgMAGgRAAQgVAAgKgHgAgeArQAAAJAKAEQAHADANAAQAPAAAJgFQAGgEABgHQgBgGgFgDQgFgDgMgBIgUgDQgSAFAAALgAgSgqQgGAFAAAKQABALAGAGQAHAFAJAAQAJAAAGgHQAGgGAAgJQAAgLgHgGQgGgFgIAAQgLAAgGAHg");
	this.shape_25.setTransform(127.05,46.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#662022").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgCgCgEAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgFAAQgEAAgFgEQgEgEgDAAQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAABQgGAFgFALIAAAyQABAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_26.setTransform(124.4,17.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#662022").s().p("AgHAVIAIgXIgJAAIAAgSIARAAIAAASIgJAXg");
	this.shape_27.setTransform(134.175,50.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#662022").s().p("AADBYQgQgRgJgXQgJgXAAgZQAAgkASgdQAQgeAdgNIAAAFQgOAIgJANQgJAPgEAUQgFAWAAAXQAAAYAEAUQADARADAJQAFAKAHAJQAHAKAMAHIAAAFQgRgJgMgMg");
	this.shape_28.setTransform(138.475,17.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#662022").s().p("AAgBCIgeg/IgGAAIgdAAIAAA/IgLAAIAAiDIArAAQArAAAAAiQAAANgIAJQgIAIgNACIAgBBgAghgGIAeAAQAgAAAAgZQAAgMgIgHQgIgEgPAAIgfAAg");
	this.shape_29.setTransform(148.225,43.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#662022").s().p("AgIBPQgEgEAAgFQAAgFAEgEQAEgEAEAAQAFAAAEAEQAEAEAAAFQAAAFgEAEQgEAEgFAAQgEAAgEgEgAgBAlIgKhdIgBgJQAAgIAEgFQAEgEAEAAQAGAAAEAEQADAFAAAJIAAAIIgLBdg");
	this.shape_30.setTransform(146.225,15.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#662022").s().p("AgFA/IAAhZIAKAAIAABZgAgHguIAAgQIAPAAIAAAQg");
	this.shape_31.setTransform(109.275,43.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#662022").s().p("AgfBoQAOgHAJgOQAJgOAEgVQAFgWAAgXQAAgXgEgVQgDgRgDgJQgFgKgHgJQgHgJgMgIIAAgFQARAJAMAMQAQAQAJAYQAJAXAAAYQAAAkgRAeQgRAegdANg");
	this.shape_32.setTransform(154.025,17.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#662022").s().p("AAXAuIAAg9QAAgUgQAAQgQAAgOASIAAA/IgLAAIAAhZIALAAIAAAQQAPgSARAAQAMAAAIAHQAFAIABAKIAABCg");
	this.shape_33.setTransform(163.65,45.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#662022").s().p("AgKBPQgFgEAAgFQAAgGAFgDQADgEAGAAQAEAAAEAEQAEADgBAGQABAFgEAEQgEAEgEAAQgGAAgDgEgAgFAqQABgPADgJQACgKAJgQQAHgNACgHQACgHAAgIQAAgPgHgIQgIgJgLAAQgKAAgGAFQgGAEAAAGQAAAEADAHQAEAGAAADQAAAFgDACQgDADgDAAQgFAAgEgFQgEgEAAgJQAAgNALgLQAMgKATAAQAXAAAMAOQAIALAAAMQAAAJgEAJQgDAJgLAMQgRASgEAIQgEAIAAAOg");
	this.shape_34.setTransform(147.65,15.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#662022").s().p("AgIBCIAAgSIARAAIAAASgAgEAdIgDheIAPAAIgEBeg");
	this.shape_35.setTransform(171.85,43.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#662022").s().p("AAzBCIAAhSIAAgnIgCAAIgMAmIgeBTIgOAAIgdhTIgNgmIgCAAIAAAIIAAAfIAABSIgKAAIAAiDIAUAAIAcBSIANAmIABAAIANgmIAchSIAUAAIAACDg");
	this.shape_36.setTransform(188.275,43.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_37.setTransform(33.575,45.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#662022").s().p("AAxAuIAAg9QAAgUgRAAQgHAAgIAGQgHAFgFAHIAAA/IgKAAIAAg9QAAgUgQAAQgHAAgIAFQgGAFgGAIIAAA/IgLAAIAAhZIALAAIAAAQQAOgSAQAAQAKAAAHAGQAFAFABAHQANgSARAAQAMAAAHAHQAGAIAAAKIAABCg");
	this.shape_38.setTransform(72.075,45.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#662022").s().p("AgJAnIAAg7IgQAAIAAgJIAQAAIAAgeIAKgCIAAAgIAXAAIAAAJIgXAAIAAA6QAAAPANABQAGgBAGgBIgBAKIgNAAQgVAAAAgXg");
	this.shape_39.setTransform(225.425,43.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_40.setTransform(33.575,45.45);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#662022").s().p("AgFBDIAAiFIALAAIAACFg");
	this.shape_41.setTransform(246.1,43.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#662022").s().p("AgbA2QgJgNAAgVQAAgWALgNQAKgKAPAAQAQAAAKAPIAAg5IALAAIAACFIgLAAIAAgOQgKAQgQAAQgRAAgKgOgAgSgFQgHAJAAARQAAATAJAKQAHAIAKAAQAPAAAKgRIAAgoQgKgRgQAAQgLAAgHALg");
	this.shape_42.setTransform(53.675,43.375);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#662022").s().p("AAxAuIAAg9QAAgUgRAAQgHAAgIAGQgHAFgFAHIAAA/IgKAAIAAg9QAAgUgQAAQgHAAgIAFQgGAFgGAIIAAA/IgLAAIAAhZIALAAIAAAQQAOgSAQAAQAKAAAHAGQAFAFABAHQANgSARAAQAMAAAHAHQAGAIAAAKIAABCg");
	this.shape_43.setTransform(72.075,45.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#662022").s().p("AgbAhQgKgMAAgVQAAgWAMgNQALgLAOAAQASAAALAOQAJAMAAATIAAACIhAAAQAAATAJAKQAIAJALAAQATAAAGgUIALAEQgKAYgbAAQgRAAgLgOgAgSgcQgHAIgBAOIA1AAQgBgQgIgIQgHgHgKAAQgLAAgIAJg");
	this.shape_44.setTransform(284.525,45.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#662022").s().p("AgJAnIAAg7IgQAAIAAgJIAQAAIAAgeIAKgCIAAAgIAXAAIAAAJIgXAAIAAA6QAAAPANABQAGgBAGgBIgBAKIgNAAQgVAAAAgXg");
	this.shape_45.setTransform(230.575,43.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_46.setTransform(33.575,45.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#662022").s().p("AAWAtIgPg3IgGgZIgBAAIgGAZIgPA3IgOAAIgbhZIAMAAIAPA3IAGAaIACAAIAGgaIAPg3IANAAIAPA3IAGAaIACAAIAGgaIAQg3IALAAIgbBZg");
	this.shape_47.setTransform(323.275,45.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#662022").s().p("AgdAnQgHgHAAgLQAAgXAfgFQALgDASgBIAAgEQAAgNgGgFQgFgEgLgBQgSABgFARIgLgDQAIgXAbAAQAgAAAAAeIAAAeQAAASACANIgLAAIgCgQQgMASgTAAQgPAAgHgIgAgDAAQgVAEAAARQAAAIAFAFQAFAEAJABQARAAAMgUIAAgVQgOAAgNACg");
	this.shape_48.setTransform(335.075,45.45);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#662022").s().p("AAXBDIgdgxIgSATIAAAeIgLAAIAAiFIALAAIAABbIArgvIAOAAIggAhIAjA4g");
	this.shape_49.setTransform(345.675,43.275);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#662022").s().p("AgbAhQgKgMAAgVQAAgWAMgNQALgLAOAAQASAAALAOQAJAMAAATIAAACIhAAAQAAATAJAKQAIAJALAAQATAAAGgUIALAEQgKAYgbAAQgRAAgLgOgAgSgcQgHAIgBAOIA1AAQgBgQgIgIQgHgHgKAAQgLAAgIAJg");
	this.shape_50.setTransform(284.525,45.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#662022").s().p("AgkA9IgBgKIAJABQAJAAAFgFQAFgFAEgKIACgFIghhXIAMAAIAUA6IAEARIABAAIADgKIADgIIATg5IAMAAIgiBdQgFARgJAGQgGAFgMAAIgIAAg");
	this.shape_51.setTransform(369.45,47.075);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#662022").s().p("AgcAhQgJgNAAgUQAAgWAMgNQAKgLAPAAQASAAALAOQAJANAAATQAAAWgMAOQgKALgQAAQgRAAgLgOgAgTgaQgHAKAAAQQAAATAJALQAHAIAKAAQANAAAIgLQAGgLAAgQQAAgSgIgLQgHgIgMAAQgMAAgHALg");
	this.shape_52.setTransform(33.575,45.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#662022").s().p("AgbAnQgGgGgBgMIAAhCIAMAAIAAA/QAAATARAAQAHAAAJgHQAHgFAGgIIAAg+IALAAIAABZIgLAAIAAgRQgGAKgKAEQgIAFgIAAQgMAAgHgHg");
	this.shape_53.setTransform(389.2,45.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#662022").s().p("AgkA+IAAh5IALAAIAAAOQALgQAQAAQAQAAALAOQAIAMAAAUQAAAXgMANQgKALgOAAQgQAAgKgQIAAAugAgZgiIAAAnQALARAOAAQAMAAAHgLQAHgKAAgPQgBgTgHgLQgHgIgLAAQgPAAgKASg");
	this.shape_54.setTransform(415.55,46.975);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#662022").s().p("AgbAnQgHgGAAgMIAAhCIAMAAIAAA/QAAATARAAQAHAAAJgHQAIgFAFgIIAAg+IAKAAIAABZIgKAAIAAgRQgHAKgJAEQgIAFgIAAQgMAAgHgHg");
	this.shape_55.setTransform(404.8,45.55);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#662022").s().p("AgIBCIAAgSIARAAIAAASgAgDAdIgEheIAPAAIgDBeg");
	this.shape_56.setTransform(423.5,43.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#662022").s().p("AANAWIgEgrIAPAAIgEArgAgUAWIgDgrIAOAAIgEArg");
	this.shape_57.setTransform(430.175,39.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text,p:{font:"12px 'YuGothic-Regular'",lineHeight:17.45}}]}).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape},{t:this.shape_2},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape_5},{t:this.shape},{t:this.shape_2},{t:this.shape_4,p:{x:33.575}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape_7},{t:this.shape},{t:this.shape_2},{t:this.shape_6,p:{x:33.575}},{t:this.shape_4,p:{x:43.675}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape_7},{t:this.shape_9},{t:this.shape},{t:this.shape_2},{t:this.shape_6,p:{x:33.575}},{t:this.shape_4,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape},{t:this.shape_2},{t:this.shape_6,p:{x:33.575}},{t:this.shape_4,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_3,p:{x:22.925}},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:66.925}},{t:this.shape_4,p:{x:79.675}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_16},{t:this.shape_15},{t:this.shape_3,p:{x:78.925}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_20,p:{x:109.275}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_16},{t:this.shape_15},{t:this.shape_3,p:{x:78.925}},{t:this.shape_19,p:{x:88.425}},{t:this.shape_24},{t:this.shape_23,p:{x:109.025}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_20,p:{x:109.275}},{t:this.shape_22},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_20,p:{x:109.275}},{t:this.shape_22},{t:this.shape_25},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_20,p:{x:109.275}},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_30},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_20,p:{x:109.275}},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_30},{t:this.shape_32,p:{x:154.025}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.text,p:{font:"38px 'TimesNewRomanPSMT'",lineHeight:44.05}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_12,p:{x:33.575}},{t:this.shape_6,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_4,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_37,p:{x:33.575}},{t:this.shape_12,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_10,p:{x:72.075}},{t:this.shape_6,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_4,p:{x:201.575}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_37,p:{x:33.575}},{t:this.shape_12,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_38,p:{x:72.075}},{t:this.shape_6,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_4,p:{x:201.575}},{t:this.shape_10,p:{x:214.425}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_37,p:{x:33.575}},{t:this.shape_12,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_38,p:{x:72.075}},{t:this.shape_6,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:183.125}},{t:this.shape_4,p:{x:196.425}},{t:this.shape_10,p:{x:209.275}},{t:this.shape_39,p:{x:225.425}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_40,p:{x:33.575}},{t:this.shape_37,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_38,p:{x:72.075}},{t:this.shape_12,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_6,p:{x:201.575}},{t:this.shape_10,p:{x:214.425}},{t:this.shape_39,p:{x:230.575}},{t:this.shape_4,p:{x:238.675}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_40,p:{x:33.575}},{t:this.shape_37,p:{x:43.675}},{t:this.shape_8,p:{x:53.675}},{t:this.shape_38,p:{x:72.075}},{t:this.shape_12,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_6,p:{x:201.575}},{t:this.shape_10,p:{x:214.425}},{t:this.shape_39,p:{x:230.575}},{t:this.shape_4,p:{x:238.675}},{t:this.shape_41},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_40,p:{x:33.575}},{t:this.shape_37,p:{x:43.675}},{t:this.shape_42},{t:this.shape_38,p:{x:72.075}},{t:this.shape_12,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_6,p:{x:201.575}},{t:this.shape_10,p:{x:214.425}},{t:this.shape_39,p:{x:230.575}},{t:this.shape_4,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_40,p:{x:33.575}},{t:this.shape_37,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_12,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_6,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_39,p:{x:230.575}},{t:this.shape_4,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_40,p:{x:33.575}},{t:this.shape_37,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_12,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_6,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_4,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_44,p:{x:284.525}},{t:this.shape_39,p:{x:297.975}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_46,p:{x:33.575}},{t:this.shape_40,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_37,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_12,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_6,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_44,p:{x:284.525}},{t:this.shape_39,p:{x:297.975}},{t:this.shape_4,p:{x:306.075}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_46,p:{x:33.575}},{t:this.shape_40,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_37,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_12,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_6,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_44,p:{x:284.525}},{t:this.shape_39,p:{x:297.975}},{t:this.shape_4,p:{x:306.075}},{t:this.shape_47},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_46,p:{x:33.575}},{t:this.shape_40,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_37,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_12,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_6,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_44,p:{x:284.525}},{t:this.shape_39,p:{x:297.975}},{t:this.shape_4,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_46,p:{x:33.575}},{t:this.shape_40,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_37,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_12,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_6,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_4,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_46,p:{x:33.575}},{t:this.shape_40,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_37,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_12,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_6,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_4,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.shape_53},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.shape_53},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},1).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.shape_53},{t:this.shape_55},{t:this.shape_54},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.shape_53},{t:this.shape_55},{t:this.shape_54},{t:this.shape_56}]},2).to({state:[{t:this.shape_1},{t:this.shape_17},{t:this.shape_7},{t:this.shape_9},{t:this.shape_11},{t:this.shape_13},{t:this.shape_3,p:{x:84.925}},{t:this.shape_19,p:{x:94.425}},{t:this.shape_21},{t:this.shape_23,p:{x:115.025}},{t:this.shape_26},{t:this.shape_28},{t:this.shape_34},{t:this.shape_32,p:{x:156.675}},{t:this.shape},{t:this.shape_2},{t:this.shape_52},{t:this.shape_46,p:{x:43.675}},{t:this.shape_42},{t:this.shape_43},{t:this.shape_40,p:{x:84.825}},{t:this.shape_14},{t:this.shape_18},{t:this.shape_31},{t:this.shape_22},{t:this.shape_25},{t:this.shape_27},{t:this.shape_29},{t:this.shape_20,p:{x:156.075}},{t:this.shape_33},{t:this.shape_35},{t:this.shape_36,p:{x:188.275}},{t:this.shape_37,p:{x:201.575}},{t:this.shape_38,p:{x:214.425}},{t:this.shape_45},{t:this.shape_12,p:{x:238.675}},{t:this.shape_41},{t:this.shape_8,p:{x:253.375}},{t:this.shape_10,p:{x:271.775}},{t:this.shape_50},{t:this.shape_39,p:{x:297.975}},{t:this.shape_6,p:{x:306.075}},{t:this.shape_47},{t:this.shape_48},{t:this.shape_49},{t:this.shape_44,p:{x:354.875}},{t:this.shape_51},{t:this.shape_4,p:{x:378.925}},{t:this.shape_53},{t:this.shape_55},{t:this.shape_54},{t:this.shape_56},{t:this.shape_57},{t:this.text,p:{font:"38px 'YuGothic-Regular'",lineHeight:50.9}}]},2).wait(1));

	// Layer_1
	this.instance = new lib.Symbol16("synched",0);
	this.instance.setTransform(268.9,78.5,1,1,0,0,0,268.9,78.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,983.7,160);


// stage content:
(lib.Joanna_Project = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,19,50,51,52,64,67,72,86,90,97,150,190,199,202,206,229,287,301,312,359,374,379,409,425,452,465,495,496,505,542,584,590,675,735,743,748,753,757,774,781,789,790,799,802,805,812,829,939,999];
	this.streamSoundSymbolsList[757] = [{id:"CreepyoldMusicboxWhenMemoriesBreak",startFrame:757,endFrame:1000,loop:1,offset:0}];
	this.streamSoundSymbolsList[799] = [{id:"StabbingSoundEffectHDNoCopyrightmp3copy",startFrame:799,endFrame:1000,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Click to Start The Game
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_8.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_2.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_2()
		{
			this.gotoAndPlay(52);
		}
	}
	this.frame_19 = function() {
		/* Click to Start The Game
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_3.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_3()
		{
			this.gotoAndPlay(52)
		}
	}
	this.frame_50 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_51 = function() {
		/* Fade In The Textbox
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_7_FadeInCbk = fl_FadeSymbolIn_4.bind(this);
		this.addEventListener('tick', movieClip_7_FadeInCbk);
		this.movieClip_7.alpha = 0;
		
		function fl_FadeSymbolIn_4()
		{
			this.movieClip_7.alpha += 0.09;
			if(this.movieClip_7.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_7_FadeInCbk);
			}
		}
	}
	this.frame_52 = function() {
		/* Fade In Movie Clip
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_5_FadeInCbk = fl_FadeSymbolIn_5.bind(this);
		this.addEventListener('tick', movieClip_5_FadeInCbk);
		this.movieClip_5.alpha = 0;
		
		function fl_FadeSymbolIn_5()
		{
			this.movieClip_5.alpha += 0.08;
			if(this.movieClip_5.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_5_FadeInCbk);
			}
		}
		playSound("AlarmClockringingSoundEffectcopyrightfree");
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_28.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_23.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_23()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_64 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_9.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(74);
		}
	}
	this.frame_67 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_9.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(74);
		}
	}
	this.frame_72 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Stop Movie Clip 5
		Stops the specified movie clip on stage.
		
		Instructions:
		1. Use this code for movie clips that are currently playing.
		*/
		
		this.movieClip_5.stop();
	}
	this.frame_86 = function() {
		/* Click to Go to Frame and Play Next Textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_12.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(101)
		}
	}
	this.frame_90 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_12.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(101)
		}
	}
	this.frame_97 = function() {
		/* Click to Go to Textbpx
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_12.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(101)
		}
		
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_150 = function() {
		/* Fade In the door view of the living room.
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_20_FadeInCbk = fl_FadeSymbolIn_19.bind(this);
		this.addEventListener('tick', movieClip_20_FadeInCbk);
		this.movieClip_20.alpha = 0;
		
		function fl_FadeSymbolIn_19()
		{
			this.movieClip_20.alpha += 0.08;
			if(this.movieClip_20.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_20_FadeInCbk);
			}
		}
	}
	this.frame_190 = function() {
		/* Click to Go to Next Textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_19.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_12.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_12()
		{
			this.gotoAndPlay(203);
		}
	}
	this.frame_199 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_202 = function() {
		/* Fade Out Movie Clip
		Fades out the symbol instance by decreasing its alpha property within an Tick event until it is invisible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades out, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade out.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_14_FadeOutCbk = fl_FadeSymbolOut_4.bind(this);
		this.addEventListener('tick', movieClip_14_FadeOutCbk);
		this.movieClip_14.alpha = 1;
		
		function fl_FadeSymbolOut_4()
		{
			this.movieClip_14.alpha -= 0.02;
			if(this.movieClip_14.alpha <= 0)
			{
				this.removeEventListener('tick', movieClip_14_FadeOutCbk);
			}
		}
	}
	this.frame_206 = function() {
		/* The brother enters
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_15_FadeInCbk = fl_FadeSymbolIn_7.bind(this);
		this.addEventListener('tick', movieClip_15_FadeInCbk);
		this.movieClip_15.alpha = 0;
		
		function fl_FadeSymbolIn_7()
		{
			this.movieClip_15.alpha += 0.08;
			if(this.movieClip_15.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_15_FadeInCbk);
			}
		}
	}
	this.frame_229 = function() {
		/* The brother textbox appears
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_16_FadeInCbk = fl_FadeSymbolIn_8.bind(this);
		this.addEventListener('tick', movieClip_16_FadeInCbk);
		this.movieClip_16.alpha = 0;
		
		function fl_FadeSymbolIn_8()
		{
			this.movieClip_16.alpha += 0.08;
			if(this.movieClip_16.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_16_FadeInCbk);
			}
		}
	}
	this.frame_287 = function() {
		/* Click to Next Textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_21.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_13.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_13()
		{
			this.gotoAndPlay(313);
		}
	}
	this.frame_301 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_312 = function() {
		/* Fade In Textbox
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_26_FadeInCbk = fl_FadeSymbolIn_10.bind(this);
		this.addEventListener('tick', movieClip_26_FadeInCbk);
		this.movieClip_26.alpha = 0;
		
		function fl_FadeSymbolIn_10()
		{
			this.movieClip_26.alpha += 0.01;
			if(this.movieClip_26.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_26_FadeInCbk);
			}
		}
	}
	this.frame_359 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_24.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_18.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_18()
		{
			this.gotoAndPlay(380);
		}
	}
	this.frame_374 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_379 = function() {
		/* Fade In Textbox
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_25_FadeInCbk = fl_FadeSymbolIn_9.bind(this);
		this.addEventListener('tick', movieClip_25_FadeInCbk);
		this.movieClip_25.alpha = 0;
		
		function fl_FadeSymbolIn_9()
		{
			this.movieClip_25.alpha += 0.01;
			if(this.movieClip_25.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_25_FadeInCbk);
			}
		}
	}
	this.frame_409 = function() {
		/* Click to next scerne to exit the room
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_27.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_19.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_19()
		{
			this.gotoAndPlay(430);
		}
	}
	this.frame_425 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_452 = function() {
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
		
		this.button_22.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_20.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_20()
		{
			this.gotoAndPlay(460);
		}
	}
	this.frame_465 = function() {
		playSound("SoundEffectsFootsteps");
	}
	this.frame_495 = function() {
		/* Exit animation
		Fades out the symbol instance by decreasing its alpha property within an Tick event until it is invisible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades out, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade out.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_17_FadeOutCbk = fl_FadeSymbolOut_7.bind(this);
		this.addEventListener('tick', movieClip_17_FadeOutCbk);
		this.movieClip_17.alpha = 1;
		
		function fl_FadeSymbolOut_7()
		{
			this.movieClip_17.alpha -= 0.08;
			if(this.movieClip_17.alpha <= 0)
			{
				this.removeEventListener('tick', movieClip_17_FadeOutCbk);
			}
		}
	}
	this.frame_496 = function() {
		/* Fade In Living room scene
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_29_FadeInCbk = fl_FadeSymbolIn_11.bind(this);
		this.addEventListener('tick', movieClip_29_FadeInCbk);
		this.movieClip_29.alpha = 0;
		
		function fl_FadeSymbolIn_11()
		{
			this.movieClip_29.alpha += 0.08;
			if(this.movieClip_29.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_29_FadeInCbk);
			}
		}
	}
	this.frame_505 = function() {
		playSound("ThunderstormSoundEffectsRoyaltyFreeSoundsNoCopyright");
	}
	this.frame_542 = function() {
		playSound("HorrorDramaticHitthenViolinStingerScreechSoundEffect");
	}
	this.frame_584 = function() {
		/* Click to play next textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_30.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_24.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_24()
		{
			this.gotoAndPlay(595);
		}
	}
	this.frame_590 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_675 = function() {
		playSound("FLICKERSOUNDEFFECT");
	}
	this.frame_735 = function() {
		/* Click to play next textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_31.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_25.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_25()
		{
			this.gotoAndPlay(745);
		}
	}
	this.frame_743 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_748 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_32.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_26.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_26()
		{
			this.gotoAndPlay(755);
		}
	}
	this.frame_753 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_757 = function() {
		var soundInstance = playSound("CreepyoldMusicboxWhenMemoriesBreak",0);
		this.InsertIntoSoundStreamData(soundInstance,757,1000,1);
		/* Fade In The Character Scene
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_33_FadeInCbk = fl_FadeSymbolIn_12.bind(this);
		this.addEventListener('tick', movieClip_33_FadeInCbk);
		this.movieClip_33.alpha = 0;
		
		function fl_FadeSymbolIn_12()
		{
			this.movieClip_33.alpha += 0.08;
			if(this.movieClip_33.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_33_FadeInCbk);
			}
		}
	}
	this.frame_774 = function() {
		/* Fade In Movie Clip
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_38_FadeInCbk = fl_FadeSymbolIn_15.bind(this);
		this.addEventListener('tick', movieClip_38_FadeInCbk);
		this.movieClip_38.alpha = 0;
		
		function fl_FadeSymbolIn_15()
		{
			this.movieClip_38.alpha += 0.08;
			if(this.movieClip_38.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_38_FadeInCbk);
			}
		}
	}
	this.frame_781 = function() {
		/* Click to play next textbox
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_39.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_29.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_29()
		{
			this.gotoAndPlay(791);
		}
	}
	this.frame_789 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_790 = function() {
		/* Fade In Textbox
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_40_FadeInCbk = fl_FadeSymbolIn_16.bind(this);
		this.addEventListener('tick', movieClip_40_FadeInCbk);
		this.movieClip_40.alpha = 0;
		
		function fl_FadeSymbolIn_16()
		{
			this.movieClip_40.alpha += 0.08;
			if(this.movieClip_40.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_40_FadeInCbk);
			}
		}
	}
	this.frame_799 = function() {
		var soundInstance = playSound("StabbingSoundEffectHDNoCopyrightmp3copy",0);
		this.InsertIntoSoundStreamData(soundInstance,799,1000,1);
	}
	this.frame_802 = function() {
		/* Click to play death scene
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_41.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_30.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_30()
		{
			this.gotoAndPlay(814);
		}
	}
	this.frame_805 = function() {
		/* Blood splatter effect
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_42_FadeInCbk = fl_FadeSymbolIn_17.bind(this);
		this.addEventListener('tick', movieClip_42_FadeInCbk);
		this.movieClip_42.alpha = 0;
		
		function fl_FadeSymbolIn_17()
		{
			this.movieClip_42.alpha += 0.80;
			if(this.movieClip_42.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_42_FadeInCbk);
			}
		}
	}
	this.frame_812 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_829 = function() {
		/* Fade In ENDING
		Fades in the symbol instance by increasing its alpha property within an Tick event until it is fully visible.
		
		Instructions:
		1. To change the speed at which the symbol instance fades in, change the 0.01 value below (the number must be greater than 0 and less than or equal to 1). Higher values cause faster fade in.
		2. Because the animation uses an Tick event, it progresses only when the playhead moves to a new frame. The speed of the animation is also affected by the document frame rate.
		*/
		
		var movieClip_43_FadeInCbk = fl_FadeSymbolIn_18.bind(this);
		this.addEventListener('tick', movieClip_43_FadeInCbk);
		this.movieClip_43.alpha = 0;
		
		function fl_FadeSymbolIn_18()
		{
			this.movieClip_43.alpha += 0.08;
			if(this.movieClip_43.alpha >= 1)
			{
				this.removeEventListener('tick', movieClip_43_FadeInCbk);
			}
		}
	}
	this.frame_939 = function() {
		/* Click to Go to Restart
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_44.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_33.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_33()
		{
			this.gotoAndPlay(1);
		}
		
		
		/* Credit
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.movieClip_45.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			window.open("https://www.instagram.com/asme.thyst?igsh=MndlbzNqOXQ5MXlx", "_blank");
		}
	}
	this.frame_999 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(31).call(this.frame_50).wait(1).call(this.frame_51).wait(1).call(this.frame_52).wait(12).call(this.frame_64).wait(3).call(this.frame_67).wait(5).call(this.frame_72).wait(14).call(this.frame_86).wait(4).call(this.frame_90).wait(7).call(this.frame_97).wait(53).call(this.frame_150).wait(40).call(this.frame_190).wait(9).call(this.frame_199).wait(3).call(this.frame_202).wait(4).call(this.frame_206).wait(23).call(this.frame_229).wait(58).call(this.frame_287).wait(14).call(this.frame_301).wait(11).call(this.frame_312).wait(47).call(this.frame_359).wait(15).call(this.frame_374).wait(5).call(this.frame_379).wait(30).call(this.frame_409).wait(16).call(this.frame_425).wait(27).call(this.frame_452).wait(13).call(this.frame_465).wait(30).call(this.frame_495).wait(1).call(this.frame_496).wait(9).call(this.frame_505).wait(37).call(this.frame_542).wait(42).call(this.frame_584).wait(6).call(this.frame_590).wait(85).call(this.frame_675).wait(60).call(this.frame_735).wait(8).call(this.frame_743).wait(5).call(this.frame_748).wait(5).call(this.frame_753).wait(4).call(this.frame_757).wait(17).call(this.frame_774).wait(7).call(this.frame_781).wait(8).call(this.frame_789).wait(1).call(this.frame_790).wait(9).call(this.frame_799).wait(3).call(this.frame_802).wait(3).call(this.frame_805).wait(7).call(this.frame_812).wait(17).call(this.frame_829).wait(110).call(this.frame_939).wait(60).call(this.frame_999).wait(1));

	// Layer_60
	this.movieClip_45 = new lib.Symbol25();
	this.movieClip_45.name = "movieClip_45";
	this.movieClip_45.setTransform(437.95,458.75);
	this.movieClip_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_45).wait(939).to({_off:false},0).wait(61));

	// Layer_59
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.988)").s().p("AZYHhQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg7AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIg8AAQgQAAgOgCQgPACgPAAIgtAAQhjAAhHhGQhGhHAAhjIAAgRQAAgPABgOQgBgPAAgPIAAg8QAAgQABgOQgBgPAAgQIAAg6QAAgQABgPQgBgOAAgPIAAg9QAAgPABgOQgBgPAAgPIAAgtQAAhkBGhGQBHhHBjAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA7AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQAQAAAOACQAPgCAPAAIA8AAQBkAABGBHQAjAiARApQAoA6AABMIAAA8QAAAPgBAPQABAOAAAPIAAA9QAAAPgBANQABAPAAAQIAAA7QAAAQgBAPQABAOAAAQIAAA8QAABjhGBGQgfAgglARQg9AshOAAgAXCACIAHgBIAAgBIgWAAIgJAAIAYACgAVKACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgATSACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgARaACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAPiACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgANqACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgALyACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAJ6ACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgAICACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgAGKACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAESACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgACaACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgAAiACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAhVACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgAjNACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgAlFACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAm9ACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgAo1ACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgAqtACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAslACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgAudACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgAwVACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACgAyNACQAOgCAQAAIAKAAIgZgBQgOABgQAAIgJAAIAYACgA0FACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgKAAIAZACgA19ACQAOgCAQAAIAJAAIgYgBQgOABgQAAIgJAAIAYACg");
	this.shape.setTransform(429.9525,491.7408,1,1,-1.4777);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AWQAAIAKAAIAWAAIAAABIgHABIgZgCgAUYAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgASgAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAQoAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAOwAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAM4AAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgALAAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAJIAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAHQAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAFYAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgADgAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgABoAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAgPAAIAKAAQAOAAAPgBIAYABIgKAAQgPAAgPACIgXgCgAiHAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAj/AAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAl3AAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAnvAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgApnAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgArfAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAtXAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAvPAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAxHAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgAy/AAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgA03AAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCgA2vAAIAKAAQAPAAAPgBIAYABIgKAAQgPAAgPACIgYgCg");
	this.shape_1.setTransform(432.4891,491.6754,1,1,-1.4777);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},939).wait(61));

	// Layer_58
	this.button_44 = new lib.Symbol24();
	this.button_44.name = "button_44";
	this.button_44.setTransform(430.6,397.2,1,1,0,0,0,61.6,46.2);
	this.button_44._off = true;
	var button_44Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.button_44.filters = [button_44Filter_1];
	this.button_44.cache(-13,-15,149,116);
	new cjs.ButtonHelper(this.button_44, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.button_44).wait(939).to({_off:false},0).wait(61));
	this.timeline.addTween(cjs.Tween.get(button_44Filter_1).wait(939).to(new cjs.ColorFilter(0,0,0,1,255,255,255,0), 0).wait(61));

	// Layer_56
	this.instance = new lib.Untitled79_20240518214443();
	this.instance.setTransform(248,190,0.487,0.487);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(939).to({_off:false},0).wait(61));

	// Layer_55
	this.instance_1 = new lib.Untitled79_20240518214412();
	this.instance_1.setTransform(259,186,0.4212,0.4212);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(899).to({_off:false},0).to({_off:true},40).wait(61));

	// Layer_54
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AAAAoIgEgBIgCgDIgEgLIgHgGIgHgIQgPgGAAgFQAAgHAEgGIACAAIAAgDIABABQACgKAIAAIACABIADgDIAFgJIAFgCIAHAAIAAgBIAaARIAFAJIAIAGIABAHIgLANIgEAGIgHAIIgJACIgJALg");
	this.shape_2.setTransform(520.025,312.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("ABNDvIgJADIgGgGIgBgDIgCgCIgBgCIgCgEIAAgEIgEgFIAAgDIgDgCIgYgdIgNgZIABgCIgGgJIAFgCIgCgFIgCgLIgDgNIgFgGIgBgHIgBgMIAAgKIgBAAIACgJIgBgFIgGgBIACgFIACACIgDgNIgEAFIAEgOIgDAAIAAABIgDgBIgKALIgBgBIgHADIAAAEIgFAFIAAACIgDAAIgEACQgCACgGAAIACAGIgGADQgCAJgDAEIAAACIgFAEIAAAFIgDgBIgHAMIgIAEIgCADIgFABIAAACIgGADIAAAAQgDgHgDgDIAAACIgHgIIgCgMIACgFIAAgDIgDgGIABgDIAAgDIACgGIgEgFIAEgCQgEgHABgHIAAgDIABgGIgCgFIAEgHIgCgOIACAAIACgHIAAgEIACAAIAAgTIADgCIABgKIAAgFIAIAAIABgLIAIACIAFgNIAAgFIABACQADgEAEgNIAEgDIAAgDIABADIAAgGIAEgBIADgFIAAgDIADAAQACgDAKgKIACACIADgEIAEACIACgCIAAgCIACABIADgJIAKADIgBgBIAHAAIgBgBIADgBIAKACIANAHIgFAAIAJADIAAABIAGAHQADAJABABIAEgBIACgHIAEgBIAAgLIABgDIADgBIgBgIIACgDIAFgCIgCgFIACgBIgFgCIAAgqIADgDIACgGIAAgCIAAgLIgGACIgEgBIgFACIgBAFIgHADIgCAAIgGgEIgDgIIgCgCIACgDIgCgGIACgEIAEAAIABgDIAFgBIADgIIADAAIABgCIARgNIAAgBIAHAAIAAgCIADACIADAAIABgDIAHgEIAVgBIAGAAIABADIADACIgBAJIAAADIgDADIAAAHQgBAHgEAEIADACIgFACIAAAFIgFAFIAAAJIgCgBIgCAFIgBAJIgDAHIABAFIgCAFIgDAGIgFAEIAAAIIACABIgCAOIACACIgGAKIAAAIIgEAFIAAAKIgGAIIAAADIACACIgBAHIADADQgDAHgGACIgCAGIAEACIgHAFIABAEIgBAGQAMgBACAAIAEABIgTAXIgGAYIgEADIABAHIgCADIABADIgBACIAAAJIABAHIgCAAIgCAFIgDADIgBAAIAAALIADACIgEAIIABAAIAAAEIACAEIAAAFIAEADIgCAHIADAEIAAAQIgEABIAEAIIAAAHIADAPIAOAdIAAAAIAGAGIAMARQAGAEABADIADAAIAAACIAEACIACAAIAFAEQAJgDADgHQAGgBAGgFIAEAHIgDABIAAADIgEADIABAFIAAAEIADAAIAAAGIgHAEIACACIgDAAIgBADIABACIgEAAIACACQgGABgIAFIgKgKgAhBA3IAHgDIACABIALgOIAEgBIAAAAIAGgHIAHgDIAFgGIADgBIAZgUIACgIIAGgHQACgJADgEIgGgHIgBgRIgBgGIAAgCQgCgDgBgDIgDAAIgBAFIgFgBIAAgFIgCABIgBgDIgGACIgHgCIgBgGIgEgEIgBAHIgPAHIgHANIgDACIAAAAIgCAEIgCgBIgCAFIACACQgCAMgCACIAAADQgEADgCAIIgDAAIAAAFIgCAJIACAFQgFANgDAEIACADIAAAIIADACIgEAGIABAGIAFAFIAAgCg");
	this.shape_3.setTransform(504.8,305.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AhQB1IgJgIIABgGIgBgDIABgFIgDgIIABgHIgCgKIACgIIgDgNIgBgBIABgGIAHgDIAAgFIgDgBIABgGIgCgDIABgFIADgCIgBgFIABgJIACgBIAEgJIAHgOIAGgCIABgHIgBgCIABgEIAEgDIACgHIgFAAIAAgDIACgDIAAgDIAAgDIABAAIAAgIIAIgBIACgGIARgSIACAAQADgEAFgDIACABQAEgBAEgHIACAAIAFgCIABAAIADgFIAQgFIAGABIABAAIgBACIABAAIADADIAWABIAGAEIACAAIADALIgEAEIAAAEIAHAIIgBAVIgDAAIgBAEIgBAAIAAAGIAEABIACACIgDAEIAAAEIgFACIgEAEIgMAGIgIAHIgEAKIgTAHIgTAAIABAEIgEAAIgBABIgKACIgBgDIgDABIAAACIgIADIgDAKIAEALIAAAGIACAFQgEANgCABIABAEIgCABIAFACIAAAHIAFADQAKgDADgCIAEADIABgBIAOgCIABgDIAKAAIAEADIgBgCIAFAAIAFgFIAHAAIgBAAIAGgDIACABIADgDIAEAAIAFgEQAFAAALgGIAAgCIAGgCIAHgKIAIAAQAEAEAEABIAEADIgFAKIABAGIgIAEIAAACIgLABIgGAGIgHABIgCAFIgIgBIgDAGIgHgBIgCAEIgIADIgDgCIgGAFIgHAAIgEACIgDAAIgEADQgEACgGADIgEgCIgGAAIgDACIgCgBIgDABIgBgBIgDAFIgFAAIgGADQgCACgJAAIgBADIgFAAIgFABIgFAFIgGgCIgEAEgAgmgjIACAJIAEACIALADIAHgFIAOgBIAIgMIALgIIABgRIgDgFIgBgIIgFAAIgEgCIgHADIgGgDIgJAHQAAAFgEAEQgEAFgCAAIgEAAIADAEIgHAOIgDgBg");
	this.shape_4.setTransform(482.25,305.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgcC1QgDgIgGgIIACgLIgCgJIAAgFIABgOIABgGIAAgBIAAAAIAAgBIACgHQACgHAAgLQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBgBAAIADgGIAAgbIADgIIAEgOIAEgDIgCgDIACgFQgFgHgEAAIgKAAQgBABAAAAQgBABAAAAQAAABAAABQgBAAAAABIgBAAQgBAGgFABQgBAGgFABIgFAGIgBAAQgBAFgEAAQgEAAgDgGIgDgHIABgCQACgKAMgHIAAgCQAFgEAFgDIgCAAQAJgCACgHQACgIAKAAIACABIAHgDIgEAAIAFgDIABABIAEgFIACABQADgHAJAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAgBIAAgCIACAAIgBgBIAHgFQAEgGAIAAQAFAAAEADQADACABADQgBADgDAFIgBAAIgCAMIACABIgDAJIAAgCIAAADQAAAJgJAJIACAAIAAAEIgBAAIABAbIgCADIABAEIgDAQIABAAIgCANIgDAGIgCAeIgBAFQAAAEADAAQAEAAAGgDIAOgKQAGgHADAAIABAAQAEgCAEgEQADgFACAAQADgGADAAIABAAIAJACIACAGQAAAFgEAHIgGALQgCAEgHADIAAABIgDgBIAAAEIgCAAQgBAGgGABIAAABIgGAAIAAABIgCAAIgGAEIgCAAIgDAEIgJABQgBADgEAAIgLAIIAAACIgEgBIABADIgHABIAAACIgDAAIAAADIgEACIgBAAIAAABQgDAIgFAAgAAXh+QgGgDgCgGIgFgNIAGgFIACgGIAIgEIADgJIAIgEIAAABIAEACIACgBIABgCIAGgBIAGgDIADgBIACAAIADAFIAAAHIABAHIgCAFIgBAAIgJASIAAgBQAAAAgBABQAAABAAAAQAAABgBAAQAAAAgBABIAAABQgFAIgIADIgBgBIAAACQgJgBgEgCg");
	this.shape_5.setTransform(464,298.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AijDOQgGgHAAgBIAEgGIgDgRIADgKIAIgDIAfgSIAAACIADAAIABgGIADgCIABgFIABABIALgfIABgOIAEgNIAAgqIACgDIADgoIAMg5IgGgIIAFgLIgBgNIgKgBIAAACIgHAAIAAADIgEAAIgDAEIgJAAIgGgIIACgDQAHgEACgCIABACIAAgDIAAgBIAEgDIAAAAIAIgGQABAAADgGIAOgGIgBgLIgGgEIgDgKIgIgEIgJACIgEgGIADgFIASgEIgEgOIgDAAIABgEIAagPIAIAAIABACIAgABIAAAEIABgBIAIABIANAHIADAAIABAEIAGAAIABABIArAKIABADIAMAEIABACIAKACQADAFAGADIACAAIAAACIACgBIABADIACAAIAGAGIAIgBIAAADIAEAAIAAAEIAEABIADAGIAHABIAAACIgDABIACAJIAOAFIADAEIAEAAIACAGIAGADIADAJIAOAOIAJAiIgDAFIAAAIIgFAIIgEAaIgJALIAAAEIgIAPIgDACIgBACQgKAIgFAGIAAgBIgVAUIgHADIgHAHIgJAFIgCAAIgNAIIAAABIgOAJIgIABIgBACQgFACgEAEIgCgCIgLAFIAAABIgDAAIgBADQgGAAgCACIgBAAIgXAOIgDgBIguAVIgCACIgJADIgFAAIgHAGIgMAEIgQALIgMALIAAAEIgIADIgEAGIgRADgAg4ACIgJAcIgHAtIgDAGIgJAfIgBABIgLAVIABAFIAggIIAcgMIAFADIADgFIAJAAIgCgCIAEgFIALgDIACAAIAIgGIAEAAIgBgBIAZgNIAEgBIADgDIABAAIAEgBIAEgFIACABIASgKIAAgCIABAAIAAgBIANgHIAegaIAHgIIASgcIADgDIgBgMIgJgdIgFgHIAAgGIgIgHIgDgIIgRgOIgFgFIgGgCIgDgGIgNgEIgIgHIgOgJIgKgCIgFgFIgDACIgmgOIgNgGIgFAAIAAABIgGAEIgCALIADACIgFANIgGAyIgEAPIgGAOIgCACIADAJIgCAAg");
	this.shape_6.setTransform(438.525,300.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AhTB1IgEgCIgBgGQgEgCgCgFIgFgCIgCgFIgDgkIADgOIACAAIAAgJIAFgEIgBgFIADgHIAFAAIABgDIgBgGIADgBIABgHIAAgBIgCgDIACgGIAAgHIACgQIACAAIAAgHIAEgFIgDgFIADgFIgBgDIAFgIIgHgHIgFAAIAAAFIgGABIgDAFIgHAAIgDgEIgZAIIgGgKIAIgJQAHgCABgGIAHgBIAAgCIAHAAIAIgBIAGgJIAIACIAKgCQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBABAAIAHAAIgBgBIACgBIAFAAIABgDQAFgBAGgGIADAAIADgFIAEgBIADABIAFgCIACACIABgDIACAAIAHAIIgIASIgIAFIgCAFIACABIAAAFIABABIgCACIAAAGIgDAHIgEACIgEARIgGAEIgBAIIABAAIgFAHIAAAEIgCADIADANIgDAJIACAMIACAJIAAAJIACAKIgCAFIAAAMQAHgDACgDIAEABIAAgDIAMgLIAEgCIAAgDIAIgHIADgHIAIgHIABACIAAgEIAEgEIAAADIABgEIADAAIAAgDIACgBIAEAAIAAgDIAAgFIAQgMQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAAAgBIADgFQAEgDAEgBIABgDIADgBIACAAIAAgFIABAEIAAgFQACgDADgBIABgDIAKgMIAEAAIAFgEIADgIQAMgMABgEIAGgBIAGgKIgBAFIAIgGIAFADIAHgFIAIAAIAEAEIACAIIgFADQgBACgDAHIABAFIgDAHIAAADIgDADIAAAHIgDABIAAALIgBAGIABAEIgFAFIACAFIgCAEIACAKIgCAFIAAAnIACAJIAFADIAIgBIAEAEIgBAFIgFACIgDAGIgDAAIgDAGIgEAAIgCAFIgJADIgDAGIgNADIgFAEIgLADIgFgEIgEgMIAEgGIgCgFIADgDIAEgBIAGggIAAgEIgDgGIAEgBIgBgEIABgGIgEgBIgDgEIAFgDIAAgFIACgFQgGgEgDgBIgBgLIgEAAIgDgBIgEAHIgYAYIgDADIgBADIgSAVIgDAEIgoAvIgHAEQgCAAgCAGIgLAEIAAACIgDgBIAAAHIgHADIgIAAIgIAGg");
	this.shape_7.setTransform(392.95,304.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhBBuQgIgGgDgEQgDgEAAgEQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAIACgTIgJgQIgCgEQAAgCADgEIAAgBIAEgDIgEgLIABgdIADgCQgCgEAAgGQAAgEADgDIAEAAIgEgDIAIgRIAGgJIACgGIAHgJIACgGQAAgDACgCIAFgIIALgGIABgDQALgJALgCIAOgDIAKgGIAIAAIAPgEIAMAAIAHAEQADALAGAAQACAAAAgEQAHgFAGAAQAEAAACACQADADAAACIACAaIgCAFIgCALIgCAJIgCAEIgSAUIACANIgFAIIgCAGIgOAQIgHASQgHAHgLAEIgDANIgNAIIgLAOIgVAPIgGACIgXATgAgWg7QgJAFgGAMQgHAMAAAIQAAAEACAEIABAAIADASIgGAJIAEAGIgCAIIACAFIACAGQgBACAEAGIAAAFQAAAMAGAAQAFAAAIgHQACgGAGAAIACgHQAEAAAAgEIAAgBIACgCIABAAQADgJAIgLIABABIAAgCIAHgIIAIgcIACgDIADgBIAAgJIADgIIgOgLIALgEIgCgNIACgEIgCABIgLgCIAAACIgGAAQgCAAgDADIgHgCg");
	this.shape_8.setTransform(369.375,305.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AhKD8IADgEIADgMIATgLIAQgLIAGgHIADgBIAAgBIAEgBIAOgJIAFgFIAAgDIAMgKIADgIIAKgLIAAgDQAFgDAHgJIgDgIIAKgLIADgIIAAgFIADgFIAIgHQgCgEgEgDIAFgKIgDgHIADgIQADgHADgCIABgLIAAgEIAFgHIgFgDIAHgKIgBgJIACgEIADgPIgDgQIAEAAIAAgLIADgBIgDgRIgDgDIADgHIgEgLIAEgHIAAgFIAAgBIgBgEIAAgEIABgCIgBgEIgEgfIgEAAIgBgaIgCgGIAAgGIgEAAIgeAhIgJAFIgVAWIgBADIgaAXIgFAEIgPAOIgjAZIgUAGIgJAGIgFgEQgBgCgCgIQAGgIADgLQAEgMACgBIAAgLIgDgDQAGgJAAgDIAAgHIgBgIIAGgJIAFgbIAAgJIAFgGIgCgFIAFgLIgDgJIACgDIgCgIIgHAAIgDADIgHACIgEAHIgEABIgGAIIgMAEIgKgQIACgJQAEgDAEgFIAJgDIAEgHIA9gcIAFAAIAOgIIAHADIAEADIAFAFIgEADIgDAMIgIAMIADADIgGAGIAAAEIgEAEIAAAHIgGAJIgGAaIgEAEIAAALIgEACIgHAaIgCADIgCAWIADACIgBAJIAEADIAFgDIAPgOIACgEIAJgFIASgSIAGgEIAGgHQAGgBAFgEIADgMIAFAAIADgDIAGgEIABgEIAKgLIAGgEIAAAAIADgDQACAAAFgJIAFACIAFgFIABgJIAGgHIACAFIAAgOIADgJIABADIAFgJIAFgKIAAgBIAQgKIAQgHIAMgCIAJAKIgGAGIAEASIAJAGIgJAFIACADIgIAHIgDADIgCAHIABASIgEAPIgCANIAFAJIgBAfIgOAeIACAGIAEAAIgHAGQAHALAAAFIgCAMIgFAFIAAAGQgGAJgEAYIAEAGIgEAEIABAMIgDAEIABAHIgBACIAAALIgIAPIABAAIgBALIgGAGIgQA3IgDABIAAAGIgHALIgFAGIgEAKIgUAVIgIADIgDAIIgHAFIgJADIgPAOIgHABIAAADIgFADIgPANIgXALg");
	this.shape_9.setTransform(342.8,309.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},870).to({state:[]},16).wait(114));

	// Layer_57
	this.instance_2 = new lib.Untitled79_20240518214345();
	this.instance_2.setTransform(259,40,0.4733,0.4733);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(939).to({_off:false},0).wait(61));

	// Layer_53
	this.instance_3 = new lib.ENDMIRAGET();
	this.instance_3.setTransform(478.6,181.65,1,1,0,0,0,278.1,205.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(865).to({_off:false},0).to({_off:true},74).wait(61));

	// Layer_52
	this.instance_4 = new lib.ENDMIRAGE();
	this.instance_4.setTransform(473.05,323.25,1,1,0,0,0,260.1,189.2);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(857).to({_off:false},0).to({y:183.75,alpha:1},7).to({_off:true},1).wait(135));

	// Layer_50
	this.movieClip_43 = new lib.Symbol23();
	this.movieClip_43.name = "movieClip_43";
	this.movieClip_43.setTransform(406.65,284.3);
	this.movieClip_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_43).wait(857).to({_off:false},0).wait(143));

	// Layer_28
	this.instance_5 = new lib.Untitled87_20240421155107();
	this.instance_5.setTransform(-649,-138);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(541).to({_off:false},0).to({_off:true},4).wait(455));

	// Layer_27
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("EhAZAwAMAAAhf/MCAzAAAMAAABf/g");
	this.shape_10.setTransform(401.2,307.2);

	this.instance_6 = new lib.Tween11("synched",0);
	this.instance_6.setTransform(401.2,307.2);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween12("synched",0);
	this.instance_7.setTransform(401.2,307.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},540).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},3).to({state:[]},212).to({state:[]},12).wait(231));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(542).to({_off:false},0).to({_off:true},3).wait(455));

	// Layer_31
	this.instance_8 = new lib.Untitled87_20240415224504();
	this.instance_8.setTransform(-490,-412,0.6514,0.6514);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(531).to({_off:false},0).to({_off:true},2).wait(4).to({_off:false},0).to({_off:true},2).wait(461));

	// Layer_32
	this.instance_9 = new lib.Symbol13("synched",0);
	this.instance_9.setTransform(392.65,307.2,1,1,0,0,0,420.7,307.2);

	this.instance_10 = new lib.Symbol10("synched",0);
	this.instance_10.setTransform(398.75,308.95,1.005,0.9558,0,0,0,407.6,307.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#330000").ss(1,1,1).p("AMTykMAACAlJI4phUIAC+/");
	this.shape_11.setTransform(657.2,242.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11,p:{y:242.05}},{t:this.instance_10},{t:this.instance_9}]},531).to({state:[{t:this.shape_11,p:{y:592.65}}]},100).to({state:[]},1).wait(368));

	// Layer_30_copy
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ACHEPQhHgWi1grQiignhaggQhSgdgwggQgUgPAAgNQAAgOAXgOQDsiVENhMQA3gQCcglQCFgfBMgaIAkgLQAVgGARgBQAGgBAFADQAGACgBAFQAAAHgKADQhhAlivAoQjIAthKAYQhpAih2A4QhbArh6BDQgNAHgBAJQAAAJAPAIQB8BAEAA8QEKA+B0A2QAMAFAHAKQAIAKgHAIQhZgmhWgbg");
	this.shape_12.setTransform(631.1019,254.5708);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhdHBIgTgHQgggOhKgYQhFgWgkgSQgRgHAAgLQAAgIAOgKQAWgRAmgtIEslZQC1jPBliYQAKgOAJADQAHACgBAKQgBAJgFAHQhsCfjKDmQkHEsg9BMQAnAVBIAXQBVAaAcAMQANAGAAAJQgCAHgKACIgGABQgGAAgHgCg");
	this.shape_13.setTransform(636.8563,264.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AjKFeQgDgLAVgHIA+gRQASgFAHgGQAIgGANgUQAPgZAbgiQApg3BZhqQASgVgEgOQgBgIgMgLIhGhCQgdgdgPgQQgXgbgLgZIgOghIgIgUQgEgMgCgJQgEgZAMgPQAIgKAZgKQBIgbAngMQA+gTA0gGQAJgBAEAEQAEADgBAFQgBAFgDAEQgGAEgMACQhoARhkApQgVAIgGALQgJAPALAaQAVA4AwA3QAiAlBBA1QAPAMADAJQAEANgIARQgJAVgSAYQgJANgYAcQgeAigqAzQgrA3gSAkQgKASgEAEQgKALgaAGIhGAQIgKACQgKAAgDgIg");
	this.shape_14.setTransform(702.6781,185.7042);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AACCXQgFAAgEgEQgFgFgFgOQgUhKgLgkQgTg/gggiQgNgOAEgJQACgEAKgEQA+gXAggIQA0gNAsAGQAPACABAIQABAHgIAEQgHADgKgBQhUgDhHAlQA4B0AZB7QgEADgFAAIgBAAg");
	this.shape_15.setTransform(635.08,204.9441);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AEqGjQgGgBgJgIQgggcgqguIhHhOQhZhehPgcQgVgHgCgLQgBgHAJgNQAJgLB6iMQBQhaAjhIQgXgPgkgPIg/gXQgdgLgygYQg4gagYgKIgSgHIAqgEIAtATICLA4IBHAaQAVAHAFAKQAFALgJAUQghBHhQBaQhxCAgRAWQAhAJAjAZQAaARAiAhQAvArA3A6IBhBqQAEAFAAADQABAFgEACQgDADgEAAIgBAAgAinlyIgGgCIAGACgAk0mhIAGgBIAqABIgoADg");
	this.shape_16.setTransform(641.4278,177.2536);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},510).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[]},2).to({state:[]},2).wait(460));

	// Layer_30
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("ACHEPQhHgWi1grQiignhaggQhSgdgwggQgUgPAAgNQAAgOAXgOQDsiVENhMQA3gQCcglQCFgfBMgaIAkgLQAVgGARgBQAGgBAFADQAGACgBAFQAAAHgKADQhhAlivAoQjIAthKAYQhpAih2A4QhbArh6BDQgNAHgBAJQAAAJAPAIQB8BAEAA8QEKA+B0A2QAMAFAHAKQAIAKgHAIQhZgmhWgbg");
	this.shape_17.setTransform(196.1019,254.5708);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhdHBIgTgHQgggOhKgYQhFgWgkgSQgRgHAAgLQAAgIAOgKQAWgRAmgtIEslZQC1jPBliYQAKgOAJADQAHACgBAKQgBAJgFAHQhsCfjKDmQkHEsg9BMQAnAVBIAXQBVAaAcAMQANAGAAAJQgCAHgKACIgGABQgGAAgHgCg");
	this.shape_18.setTransform(201.8563,264.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AjKFeQgDgLAVgHIA+gRQASgFAHgGQAIgGANgUQAPgZAbgiQApg3BZhqQASgVgEgOQgBgIgMgLIhGhCQgdgdgPgQQgXgbgLgZIgOghIgIgUQgEgMgCgJQgEgZAMgPQAIgKAZgKQBIgbAngMQA+gTA0gGQAJgBAEAEQAEADgBAFQgBAFgDAEQgGAEgMACQhoARhkApQgVAIgGALQgJAPALAaQAVA4AwA3QAiAlBBA1QAPAMADAJQAEANgIARQgJAVgSAYQgJANgYAcQgeAigqAzQgrA3gSAkQgKASgEAEQgKALgaAGIhGAQIgKACQgKAAgDgIg");
	this.shape_19.setTransform(267.6781,185.7042);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AACCXQgFAAgEgEQgFgFgFgOQgUhKgLgkQgTg/gggiQgNgOAEgJQACgEAKgEQA+gXAggIQA0gNAsAGQAPACABAIQABAHgIAEQgHADgKgBQhUgDhHAlQA4B0AZB7QgEADgFAAIgBAAg");
	this.shape_20.setTransform(200.08,204.9441);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AEzGuQgGAAgJgIQgggcgqgvIhHhOQhZhdhPgdQgVgGgCgLQgBgIAJgNQAJgLB6iLQBQhbAjhHQgXgQgkgOIg/gXQgdgLgzgYQg3gagYgKQgkgPg5gSIiMgvQgOgGABgHQABgJAPAAQAXAAAbAIQATAGAeAMIDIBUICLA4IBHAZQAVAHAFALQAFALgJAUQghBGhQBbQhyB/gQAXQAhAJAjAYQAaASAiAgQAvAsA3A6IBhBqQAEAEAAAEQABAEgEADQgDACgEAAIgBAAg");
	this.shape_21.setTransform(205.5493,176.1286);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},510).to({state:[]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},2).to({state:[]},4).to({state:[]},2).wait(460));

	// Layer_26
	this.instance_11 = new lib.Symbol13("synched",0);
	this.instance_11.setTransform(392.65,307.2,1,1,0,0,0,420.7,307.2);

	this.instance_12 = new lib.Symbol10("synched",0);
	this.instance_12.setTransform(398.75,308.95,1.005,0.9558,0,0,0,407.6,307.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#330000").ss(1,1,1).p("AMTykMAACAlJI4phUIAC+/");
	this.shape_22.setTransform(657.2,242.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22},{t:this.instance_12},{t:this.instance_11}]},505).to({state:[{t:this.shape_22},{t:this.instance_12},{t:this.instance_11}]},35).to({state:[]},158).to({state:[{t:this.shape_22},{t:this.instance_12},{t:this.instance_11}]},16).to({state:[]},7).to({state:[{t:this.shape_22},{t:this.instance_12},{t:this.instance_11}]},2).to({state:[]},2).to({state:[]},44).wait(231));

	// Layer_44
	this.movieClip_40 = new lib.Text11();
	this.movieClip_40.name = "movieClip_40";
	this.movieClip_40.setTransform(385.25,521);
	this.movieClip_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_40).wait(790).to({_off:false},0).to({_off:true},23).wait(187));

	// Layer_48
	this.movieClip_38 = new lib.Text10();
	this.movieClip_38.name = "movieClip_38";
	this.movieClip_38.setTransform(385.25,521);
	this.movieClip_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_38).wait(774).to({_off:false},0).to({_off:true},16).wait(210));

	// Layer_35
	this.instance_13 = new lib.Text9();
	this.instance_13.setTransform(385.25,521);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(744).to({_off:false},0).to({_off:true},10).wait(246));

	// Layer_37
	this.instance_14 = new lib.Text8();
	this.instance_14.setTransform(385.25,521.5);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(734).to({_off:false},0).to({_off:true},10).wait(256));

	// Layer_33
	this.instance_15 = new lib.Text7();
	this.instance_15.setTransform(385.25,524);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(579).to({_off:false},0).to({_off:true},12).wait(409));

	// Layer_22
	this.movieClip_25 = new lib.Text6();
	this.movieClip_25.name = "movieClip_25";
	this.movieClip_25.setTransform(381,521.5,1,1,0,0,0,268.9,78.5);
	this.movieClip_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_25).wait(379).to({_off:false},0).to({_off:true},47).wait(574));

	// Layer_17
	this.movieClip_26 = new lib.Text5();
	this.movieClip_26.name = "movieClip_26";
	this.movieClip_26.setTransform(381,521.5);
	this.movieClip_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_26).wait(312).to({_off:false},0).to({_off:true},63).wait(625));

	// Layer_16
	this.movieClip_16 = new lib.Text4();
	this.movieClip_16.name = "movieClip_16";
	this.movieClip_16.setTransform(381,521.5,1,1,0,0,0,268.9,78.5);
	this.movieClip_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_16).wait(229).to({_off:false},0).to({_off:true},81).wait(690));

	// Layer_10
	this.movieClip_10 = new lib.Text2();
	this.movieClip_10.name = "movieClip_10";
	this.movieClip_10.setTransform(682.8,600,1,1,0,0,0,268.9,78.5);
	this.movieClip_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_10).wait(73).to({_off:false},0).to({_off:true},26).wait(901));

	// Layer_12
	this.movieClip_14 = new lib.Text3();
	this.movieClip_14.name = "movieClip_14";
	this.movieClip_14.setTransform(413.9,521.5);
	this.movieClip_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_14).wait(100).to({_off:false},0).to({_off:true},100).wait(800));

	// Layer_3
	this.movieClip_5 = new lib.Text1();
	this.movieClip_5.name = "movieClip_5";
	this.movieClip_5.setTransform(413.9,521.5,1,1,0,0,0,268.9,78.5);
	this.movieClip_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_5).wait(52).to({_off:false},0).to({_off:true},21).wait(927));

	// Layer_15
	this.movieClip_15 = new lib.Symbol11();
	this.movieClip_15.name = "movieClip_15";
	this.movieClip_15.setTransform(509.35,484.8);
	this.movieClip_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_15).wait(206).to({_off:false},0).to({_off:true},238).wait(556));

	// Layer_46
	this.movieClip_42 = new lib.Symbol22();
	this.movieClip_42.name = "movieClip_42";
	this.movieClip_42.setTransform(687.45,447.15);
	this.movieClip_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_42).wait(805).to({_off:false},0).to({_off:true},53).wait(142));
	this.movieClip_42.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_47
	this.instance_16 = new lib.Untitled108_20240515211812();
	this.instance_16.setTransform(105,-73,0.4171,0.4171);
	this.instance_16._off = true;

	this.instance_17 = new lib.Tween35("synched",0);
	this.instance_17.setTransform(532.1,329.1);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(792).to({_off:false},0).wait(3).to({y:-81},0).wait(1).to({y:-84},0).wait(1).to({y:-88},0).wait(1).to({y:-99},0).wait(4).to({y:-98},0).to({_off:true},3).wait(195));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(805).to({_off:false},0).to({regX:0.1,scaleX:0.9,scaleY:0.76,x:545.75,y:307.35},6).wait(13).to({startPosition:0},0).wait(10).to({y:307.95},0).wait(1).to({regY:0.1,scaleY:0.7129,y:301.2},0).wait(1).to({y:302.2},0).to({_off:true},4).wait(160));

	// Layer_43
	this.instance_18 = new lib.Untitled108_20240515211734();
	this.instance_18.setTransform(264,195,0.2969,0.073);
	this.instance_18._off = true;

	this.instance_19 = new lib.Tween33("synched",0);
	this.instance_19.setTransform(568,295);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(791).to({_off:false},0).wait(2).to({scaleY:0.0846,y:183},0).wait(2).to({scaleY:0.1069,y:160},0).wait(1).to({scaleY:0.1363,y:130},0).wait(2).to({scaleY:0.163,y:103},0).wait(1).to({scaleY:0.1969,y:68},0).wait(3).to({scaleY:0.2969,y:-9},0).to({_off:true},3).wait(195));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(805).to({_off:false},0).to({regX:0.1,regY:0.1,scaleX:0.8933,scaleY:0.8933,x:580.4,y:293.05},6).wait(13).to({startPosition:0},0).wait(9).to({regY:0.2,scaleY:0.8406,y:289.1},0).wait(1).to({regY:0.3,scaleY:0.8013,y:289.2},0).wait(2).to({regY:0.5,scaleY:0.762,y:286.35},0).wait(1).to({regY:0.4,scaleY:0.706,y:285.25},0).wait(1).to({scaleY:0.7256,y:287.25},0).wait(1).to({scaleY:0.7454,y:290.25},0).wait(1).to({scaleY:0.7158},0).wait(1).to({regY:0.5,scaleY:0.6928,y:290.3},0).wait(2).to({regY:0.6,scaleY:0.6665,y:290.35},0).wait(1).to({regY:0.7,scaleY:0.637,y:290.4},0).wait(1).to({scaleY:0.5845},0).wait(3).to({scaleY:0.5648},0).wait(1).to({regY:0.8,scaleY:0.5418,y:290.45},0).wait(2).to({scaleY:0.5123,y:290.4},0).wait(1).to({scaleY:0.4926},0).wait(2).to({regY:1,scaleY:0.4598,y:290.45},0).wait(1).to({regY:1.4,scaleY:0.4041,y:285.55},0).to({_off:true},1).wait(144));

	// Layer_42
	this.instance_20 = new lib.Tween37("synched",0);
	this.instance_20.setTransform(558.25,316.3);
	this.instance_20._off = true;

	this.instance_21 = new lib.Tween38("synched",0);
	this.instance_21.setTransform(571.05,240.45);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(790).to({_off:false},0).to({_off:true,x:571.05,y:240.45},12).wait(198));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(790).to({_off:false},12).wait(11).to({startPosition:0},0).to({rotation:-5.7079},4).wait(23).to({startPosition:0},0).to({y:256.9},6).wait(1).to({startPosition:0},0).to({rotation:7.5353,y:318.1},10).to({_off:true},1).wait(142));

	// Down
	this.instance_22 = new lib.Untitled108_20240515211636();
	this.instance_22.setTransform(238,-41,0.3191,0.3191);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(790).to({_off:false},0).wait(34).to({_off:true},34).wait(142));

	// Lid
	this.instance_23 = new lib.Tween31("synched",0);
	this.instance_23.setTransform(558.75,396.85);
	this.instance_23._off = true;

	this.instance_24 = new lib.Tween32("synched",0);
	this.instance_24.setTransform(558.75,326.5);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(790).to({_off:false},0).to({_off:true,y:326.5},12).wait(198));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(790).to({_off:false},12).wait(11).to({startPosition:0},0).to({y:331.9},4).wait(7).to({startPosition:0},0).to({y:396.7},33).to({_off:true},1).wait(142));

	// Layer_40
	this.instance_25 = new lib.Untitled108_20240515211546();
	this.instance_25.setTransform(264,0,0.2967,0.2967);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(790).to({_off:false},0).wait(12).to({_off:true},56).wait(142));

	// Layer_24
	this.button_28 = new lib.Back();
	this.button_28.name = "button_28";
	this.button_28.setTransform(1.35,564.5);
	this.button_28._off = true;
	new cjs.ButtonHelper(this.button_28, 0, 1, 2, false, new lib.Back(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_28).wait(52).to({_off:false},0).to({_off:true},797).wait(151));

	// Layer_45
	this.button_41 = new lib.Next11();
	this.button_41.name = "button_41";
	this.button_41.setTransform(537.5,443.45);
	this.button_41._off = true;
	new cjs.ButtonHelper(this.button_41, 0, 1, 2, false, new lib.Next11(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_41).wait(802).to({_off:false},0).to({x:633.5},3).to({_off:true},8).wait(187));

	// Layer_41
	this.button_39 = new lib.Next10();
	this.button_39.name = "button_39";
	this.button_39.setTransform(539.2,442.5);
	this.button_39._off = true;
	new cjs.ButtonHelper(this.button_39, 0, 1, 2, false, new lib.Next10(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_39).wait(781).to({_off:false},0).to({x:632.2},3).to({_off:true},6).wait(210));

	// Layer_38
	this.button_32 = new lib.Next9();
	this.button_32.name = "button_32";
	this.button_32.setTransform(539.2,442.5);
	this.button_32._off = true;
	new cjs.ButtonHelper(this.button_32, 0, 1, 2, false, new lib.Next9(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_32).wait(748).to({_off:false},0).to({x:629.2},2).to({_off:true},4).wait(246));

	// Layer_13
	this.button_31 = new lib.Next8();
	this.button_31.name = "button_31";
	this.button_31.setTransform(540.2,443);
	this.button_31._off = true;
	new cjs.ButtonHelper(this.button_31, 0, 1, 2, false, new lib.Next8(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_31).wait(735).to({_off:false},0).to({x:636.2},2).to({_off:true},7).wait(256));

	// Layer_34
	this.button_30 = new lib.Next7();
	this.button_30.name = "button_30";
	this.button_30.setTransform(530.5,447.45);
	this.button_30._off = true;
	new cjs.ButtonHelper(this.button_30, 0, 1, 2, false, new lib.Next7(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_30).wait(584).to({_off:false},0).to({x:640.5},3).to({_off:true},4).wait(409));

	// Layer_23
	this.button_27 = new lib.Next6();
	this.button_27.name = "button_27";
	this.button_27.setTransform(112.1,443);
	this.button_27._off = true;
	new cjs.ButtonHelper(this.button_27, 0, 1, 2, false, new lib.Next6(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_27).wait(409).to({_off:false},0).to({x:15.1},5).to({_off:true},12).wait(574));

	// Layer_21
	this.button_24 = new lib.Next5();
	this.button_24.name = "button_24";
	this.button_24.setTransform(534.95,443);
	this.button_24._off = true;
	new cjs.ButtonHelper(this.button_24, 0, 1, 2, false, new lib.Next5(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_24).wait(359).to({_off:false},0).to({x:630.95},6).to({_off:true},10).wait(625));

	// Layer_20
	this.button_22 = new lib.WALK();
	this.button_22.name = "button_22";
	this.button_22.setTransform(422.2,483.95,2.6348,2.6348,0,0,0,57.6,17.5);
	this.button_22._off = true;
	new cjs.ButtonHelper(this.button_22, 0, 1, 2, false, new lib.WALK(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_22).wait(452).to({_off:false},0).to({_off:true},6).wait(542));

	// Layer_19
	this.button_21 = new lib.Next4();
	this.button_21.name = "button_21";
	this.button_21.setTransform(169.85,460.5,1,1,0,0,0,57.5,17.5);
	this.button_21._off = true;
	new cjs.ButtonHelper(this.button_21, 0, 1, 2, false, new lib.Next4(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_21).wait(287).to({_off:false},0).to({x:69.85},5).to({_off:true},18).wait(690));

	// Layer_18
	this.button_19 = new lib.Next3();
	this.button_19.name = "button_19";
	this.button_19.setTransform(567.85,443);
	this.button_19._off = true;
	new cjs.ButtonHelper(this.button_19, 0, 1, 2, false, new lib.Next3(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_19).wait(190).to({_off:false},0).to({x:663.05},4).to({_off:true},6).wait(800));

	// Layer_6
	this.button_12 = new lib.Next2();
	this.button_12.name = "button_12";
	this.button_12.setTransform(567.85,443);
	this.button_12._off = true;
	new cjs.ButtonHelper(this.button_12, 0, 1, 2, false, new lib.Next2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_12).wait(86).to({_off:false},0).to({x:667.85},4).to({_off:true},8).wait(902));

	// Layer_11
	this.button_9 = new lib.Next1();
	this.button_9.name = "button_9";
	this.button_9.setTransform(625.35,460.5,1,1,0,0,0,57.5,17.5);
	this.button_9._off = true;
	new cjs.ButtonHelper(this.button_9, 0, 1, 2, false, new lib.Next1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_9).wait(64).to({_off:false},0).to({x:721.35},3).to({_off:true},6).wait(927));

	// Play_button
	this.button_8 = new lib.PlayButton();
	this.button_8.name = "button_8";
	this.button_8.setTransform(415.7,340.3,1,1,0,0,0,162,29.4);
	this.button_8.alpha = 0;
	new cjs.ButtonHelper(this.button_8, 0, 1, 2, false, new lib.PlayButton(), 3);

	this.button_2 = new lib.PlayButton();
	this.button_2.name = "button_2";
	this.button_2.setTransform(415.7,340.3,1,1,0,0,0,162,29.4);
	new cjs.ButtonHelper(this.button_2, 0, 1, 2, false, new lib.PlayButton(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.button_8}]}).to({state:[{t:this.button_2}]},19).to({state:[]},32).wait(949));
	this.timeline.addTween(cjs.Tween.get(this.button_8).to({_off:true,alpha:1},19).wait(981));
	this.button_8.addEventListener("tick", AdobeAn.handleFilterCache);
	this.button_2.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_7
	this.instance_26 = new lib.TITLEPICSYM();
	this.instance_26.setTransform(459.1,205.1,1,1,0,0,0,278.1,205.1);
	var instance_26Filter_2 = new cjs.ColorFilter(0.53,0.53,0.53,1,0,0,0,0);
	this.instance_26.filters = [instance_26Filter_2];
	this.instance_26.cache(-2,-2,560,414);

	this.instance_27 = new lib.GLITCHFX_MIRAGE();
	this.instance_27.setTransform(461.1,207.2,1,1,0,0,0,260.1,189.2);

	this.movieClip_3 = new lib.TITLEPICSYM();
	this.movieClip_3.name = "movieClip_3";
	this.movieClip_3.setTransform(459.1,205.1,1,1,0,0,0,278.1,205.1);
	var movieClip_3Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.movieClip_3.filters = [movieClip_3Filter_3];
	this.movieClip_3.cache(-2,-2,560,414);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26}]}).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},9).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},15).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.movieClip_3}]},4).to({state:[]},1).wait(949));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(28).to({_off:true},15).wait(3).to({_off:false},0).to({_off:true},4).wait(950));
	this.timeline.addTween(cjs.Tween.get(instance_26Filter_2).to(new cjs.ColorFilter(0.82,0.82,0.82,1,0,0,0,0), 5).wait(9).to(new cjs.ColorFilter(0.52,0.52,0.52,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.65,0.65,0.65,1,0,0,0,0), 2).wait(7).to(new cjs.ColorFilter(0.56,0.56,0.56,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(0.92,0.92,0.92,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(0.53,0.53,0.53,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(0.77,0.77,0.77,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(0.94921875,0.94921875,0.94921875,1,2,2,2,0), 0).to(new cjs.ColorFilter(0.99,0.99,0.99,1,2.55,2.55,2.55,0), 4).wait(950));
	this.timeline.addTween(cjs.Tween.get(movieClip_3Filter_3).wait(46).to(new cjs.ColorFilter(0.99,0.99,0.99,1,2.55,2.55,2.55,0), 4).wait(949));

	// Layer_4
	this.instance_28 = new lib.Redrayflash();
	this.instance_28.setTransform(388.95,192.9,4.0878,0.4731,0,0,0,47.9,48);
	this.instance_28.shadow = new cjs.Shadow("rgba(255,0,0,1)",0,0,107);
	this.instance_28.compositeOperation = "multiply";
	this.instance_28.filters = [new cjs.BlurFilter(93, 93, 1)];
	this.instance_28.cache(-2,-2,100,100);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({_off:true},51).wait(949));

	// Layer_5
	this.instance_29 = new lib.Titlebg_effect();
	this.instance_29.setTransform(388.75,192.9,1,1,0,0,0,228.4,66.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgPAQIAAgfIAfAAIAAAfg");
	this.shape_23.setTransform(837.675,312.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.instance_29}]}).to({state:[]},51).wait(949));

	// Layer_39
	this.movieClip_33 = new lib.Symbol14();
	this.movieClip_33.name = "movieClip_33";
	this.movieClip_33.setTransform(409.5,302);
	this.movieClip_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_33).wait(757).to({_off:false},0).wait(243));

	// Layer_36
	this.instance_30 = new lib._c787157fa13141a78b36053741825e8e();
	this.instance_30.setTransform(1,0,0.7871,0.7871);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(729).to({_off:false},0).to({_off:true},28).wait(243));

	// Layer_14
	this.movieClip_20 = new lib.Symbol19();
	this.movieClip_20.name = "movieClip_20";
	this.movieClip_20.setTransform(400,358);

	this.movieClip_23 = new lib.Symbol20();
	this.movieClip_23.name = "movieClip_23";
	this.movieClip_23.setTransform(400,416);
	this.movieClip_23._off = true;

	this.instance_31 = new lib.Tween10("synched",0);
	this.instance_31.setTransform(400,353,1.0675,1.0675);
	this.instance_31._off = true;

	this.instance_32 = new lib.Tween9("synched",0);
	this.instance_32.setTransform(400,416,1.2575,1.2575);
	this.instance_32._off = true;

	this.movieClip_17 = new lib.Symbol17();
	this.movieClip_17.name = "movieClip_17";
	this.movieClip_17.setTransform(400,419);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.movieClip_20}]},150).to({state:[{t:this.movieClip_20}]},315).to({state:[{t:this.movieClip_23}]},3).to({state:[{t:this.instance_31}]},4).to({state:[{t:this.instance_32}]},3).to({state:[{t:this.instance_31}]},5).to({state:[{t:this.instance_31}]},4).to({state:[{t:this.instance_31}]},6).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.movieClip_17}]},1).to({state:[]},4).wait(504));
	this.timeline.addTween(cjs.Tween.get(this.movieClip_23).wait(468).to({_off:false},0).to({_off:true,scaleX:1.0675,scaleY:1.0675,y:353,mode:"synched",startPosition:0},4).wait(528));
	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(468).to({_off:false},4).to({_off:true,scaleX:1.2575,scaleY:1.2575,y:416},3).to({_off:false,scaleX:1.415,scaleY:1.415,y:394},5).to({scaleX:1.6301,scaleY:1.6301,y:251.05},4).to({scaleX:1.7651,scaleY:1.7651,y:419},6).to({startPosition:0},1).to({_off:true,scaleX:1,scaleY:1,mode:"independent"},1).wait(508));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(472).to({_off:false},3).to({_off:true,scaleX:1.415,scaleY:1.415,y:394},5).wait(520));

	// Layer_9
	this.movieClip_29 = new lib.Symbol2();
	this.movieClip_29.name = "movieClip_29";
	this.movieClip_29.setTransform(399.65,306.15);
	this.movieClip_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_29).wait(496).to({_off:false},0).to({_off:true},202).wait(16).to({_off:false},0).to({_off:true},7).wait(279));

	// Layer_8
	this.movieClip_18 = new lib.Symbol18();
	this.movieClip_18.name = "movieClip_18";
	this.movieClip_18.setTransform(400.5,300.35);
	this.movieClip_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_18).wait(51).to({_off:false},0).to({_off:true},445).wait(504));

	// Layer_2
	this.instance_33 = new lib.LightRay_Stary();
	this.instance_33.setTransform(402.25,52.2,0.0151,1,0,0,0,265.6,593);
	this.instance_33.alpha = 0;
	this.instance_33.filters = [new cjs.BlurFilter(86, 86, 1)];
	this.instance_33.cache(-3,-3,537,1192);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).to({scaleX:1,x:402.2,alpha:1},17).to({_off:true},34).wait(949));

	// Layer_1
	this.instance_34 = new lib.Start_Background("synched",0);
	this.instance_34.setTransform(400.95,301.45,1,1,0,0,0,399.9,300.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AxXEMIAAoXMAivAAAIAAIXg");
	this.shape_24.setTransform(389.65,362.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.instance_34}]}).to({state:[]},51).wait(949));

	// stageBackground
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("EhADgwbMCAHAAAMAAABg3MiAHAAAg");
	this.shape_25.setTransform(400,300);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("EhADAwcMAAAhg3MCAHAAAMAAABg3g");
	this.shape_26.setTransform(400,300);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25}]}).wait(1000));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.button_44, startFrame:939, endFrame:939, x:-13, y:-15, w:149, h:116});
	this.filterCacheList.push({instance: this.button_44, startFrame:0, endFrame:0, x:-13, y:-15, w:149, h:116});
	this.filterCacheList.push({instance: this.button_44, startFrame:939, endFrame:1000, x:-13, y:-15, w:149, h:116});
	this.filterCacheList.push({instance: this.instance_26, startFrame:1, endFrame:5, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:0, endFrame:0, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:6, endFrame:14, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:15, endFrame:16, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:17, endFrame:23, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:24, endFrame:24, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:25, endFrame:27, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:28, endFrame:28, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:29, endFrame:43, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:46, endFrame:46, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:47, endFrame:50, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.instance_26, startFrame:51, endFrame:1000, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.movieClip_3, startFrame:47, endFrame:50, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.movieClip_3, startFrame:51, endFrame:51, x:-2, y:-2, w:560, h:414});
	this.filterCacheList.push({instance: this.movieClip_3, startFrame:51, endFrame:1000, x:-2, y:-2, w:560, h:414});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-249,-327.3,1648,2237.3);
// library properties:
lib.properties = {
	id: 'A59B50AF799839428B2F1449A67667CA',
	width: 800,
	height: 600,
	fps: 25,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/Joanna_Project_atlas_1.png?1716430534212", id:"Joanna_Project_atlas_1"},
		{src:"images/Joanna_Project_atlas_2.png?1716430534212", id:"Joanna_Project_atlas_2"},
		{src:"sounds/AlarmClockringingSoundEffectcopyrightfree.mp3?1716430534540", id:"AlarmClockringingSoundEffectcopyrightfree"},
		{src:"sounds/CreepyoldMusicboxWhenMemoriesBreak.mp3?1716430534540", id:"CreepyoldMusicboxWhenMemoriesBreak"},
		{src:"sounds/FLICKERSOUNDEFFECT.mp3?1716430534540", id:"FLICKERSOUNDEFFECT"},
		{src:"sounds/HorrorDramaticHitthenViolinStingerScreechSoundEffect.mp3?1716430534540", id:"HorrorDramaticHitthenViolinStingerScreechSoundEffect"},
		{src:"sounds/SoundEffectsFootsteps.mp3?1716430534540", id:"SoundEffectsFootsteps"},
		{src:"sounds/StabbingSoundEffectHDNoCopyrightmp3copy.mp3?1716430534540", id:"StabbingSoundEffectHDNoCopyrightmp3copy"},
		{src:"sounds/ThunderstormSoundEffectsRoyaltyFreeSoundsNoCopyright.mp3?1716430534540", id:"ThunderstormSoundEffectsRoyaltyFreeSoundsNoCopyright"}
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
an.compositions['A59B50AF799839428B2F1449A67667CA'] = {
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