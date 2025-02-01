(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Joshua_project_atlas_1", frames: [[1282,0,324,450],[1282,904,304,450],[0,0,1280,1707],[0,1709,1280,853],[832,2564,348,450],[1282,452,324,450],[1182,2564,332,450],[0,2564,461,450],[463,2564,367,450]]}
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



(lib.HojoUjiyasuSamurai_5 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.ImagawaYoshimotoSamurai_4 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.KiyomizuDera = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.MountFuji = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.OdaNobunagaSamurai_1 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.TakedaShingenSamurai_6 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.TokugawaIeyasuSamurai_3 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.ToyotomiHideyoshiSamurai_2 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.UesugiKenshinSamurai_7 = function() {
	this.initialize(ss["Joshua_project_atlas_1"]);
	this.gotoAndStop(8);
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


(lib.an_Video = function(options) {
	this.initialize();
	this._element = new $.an.Video(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,400,300);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.UesugiKenshin = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.UesugiKenshinSamurai_7();
	this.instance.setTransform(0,0,0.4414,0.4533);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,162,204);


(lib.Uesugi_Kenshin_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#660099").s().p("AACAcIAAgCQADAAABgCQABgCAAgGIAAgXIAAgJIgCgCIgCgBQgEAAgFAHIAAAcIABAIQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAIAAACIgcAAIAAgCQAEAAACgCQABgBAAgHIAAgeQAAgGgBgBQgCgCgEAAIAAgDIAXAAIAAAIQAEgFADgCQAEgCAFAAQAFAAADADQADADACAEQABADAAAKIAAAUQAAAHABABQAAABABAAQAAAAABABQAAAAABAAQABAAABAAIAAACg");
	this.shape.setTransform(100.35,28.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660099").s().p("AgOApIAAgCQAEAAACgCQABgCAAgGIAAgfQAAgFgCgCQgBgCgEAAIAAgCIAWAAIAAAqQAAAGACACQABABAEABIAAACgAgFgYQgDgDAAgDQAAgEADgDQACgDADAAQAEAAACADQADADAAAEQAAADgDADQgCADgEAAQgDAAgCgDg");
	this.shape_1.setTransform(95.375,26.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660099").s().p("AACAoIAAgCQADgBABgCQABgBAAgGIAAgZIAAgHIgCgDIgDgBIgEACIgEAGIAAAcQAAAGABABQABACADABIAAACIgcAAIAAgCQAEgBABgCQABgBAAgGIAAg3QAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAgIAHgHQAEgCAEAAQAFAAAEADQADADABAEQACAEAAAIIAAAWQAAAGABACQABABAEABIAAACg");
	this.shape_2.setTransform(90.375,26.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660099").s().p("AgIAbIgDgBQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAABIgCAAIgBgTIACAAQADAHAFAEQAEAEADAAQABAAAAgBQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgCgCIgHgGIgLgIQgEgGAAgGQAAgGAFgFQAEgFAIAAQAEAAAEACIADABIABAAIACgDIACAAIABATIgCAAQgEgIgEgEQgDgDgDAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAgBABQAAAAAAABQAAAAAAABIACADQABADAIAFQAIAGADADQADAEAAAFQAAAEgDAFQgBAEgFADQgEACgFAAQgDAAgGgCg");
	this.shape_3.setTransform(84.7,28.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660099").s().p("AACAcIAAgCQADAAACgCQABgCAAgGIAAgXIgBgJIgCgCIgDgBQgDAAgFAHIAAAcIABAIQAAABABAAQAAAAABABQAAAAABAAQABAAABAAIAAACIgcAAIAAgCQADAAABgCQABgBAAgHIAAgeQAAgGgBgBQgBgCgDAAIAAgDIAWAAIAAAIQAEgFADgCQAEgCAFAAQAEAAAEADQAEADABAEQABADAAAKIAAAUQAAAHABABQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAIAAACg");
	this.shape_4.setTransform(79.05,28.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660099").s().p("AgRAUQgFgIAAgLQAAgMAHgJQAIgIAJAAQAIAAAHAHQAGAGAAAOIgdAAQAAAKAGAHQACAEAHAAQADAAADgBIAGgIIACABQgFAJgFAFQgGADgGAAQgLAAgHgJgAgDgVQgDAFAAAJIAAACIAPAAIgBgMQgCgEgCgCIgDgBQgCAAgCADg");
	this.shape_5.setTransform(73.1,28.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660099").s().p("AAFAoIAAgCIAFgCIABgCQAAgCgFgHIgRgXIgEACIAAAWIABAIIADADIAHABIAAACIgpAAIAAgCIADAAQADAAACgCQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQABgCAAgGIAAgzQAAgGgBgCIgCgCQgCgCgDAAIgDAAIAAgCIAnAAIAAACQgEAAgBACIgDACIgBAIIAAAZIAdgYQAGgFAAgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAgBgBIgGgBIAAgCIAfAAIAAACIgHACIgKAIIgYATIAcAiQAGAHAFADQADACADAAIAAACg");
	this.shape_6.setTransform(65.85,26.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660099").s().p("AgOApIAAgCQAEAAACgCQABgCAAgGIAAgfQAAgFgCgCQgBgCgEAAIAAgCIAWAAIAAAqQAAAGACACQABABAEABIAAACgAgFgYQgDgDAAgDQAAgEADgDQACgDADAAQAEAAACADQADADAAAEQAAADgDADQgCADgEAAQgDAAgCgDg");
	this.shape_7.setTransform(56.375,26.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660099").s().p("AgOAoQgGgCgDgCQgDgDAAgDQAAAAAAgBQABgBAAAAQAAgBAAAAQABgBAAAAQACgDAGgBQgIgEAAgGQAAgFADgDQADgEAHgCQgIgDgDgFQgEgEAAgGQAAgIAHgGQAGgGALAAQAEAAAGACIASAAIAAAHIgKAAQADACABADQABADAAADQAAAGgDAFQgDAEgGACQgFADgEAAIgHgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAAAABQgBAAAAABQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQABABAEAAIAJAAQAMAAAFADQAHADAAAIQAAAFgDAEQgEAEgEACQgIADgJAAQgHAAgGgBgAgNAYQgDACAAADQAAADAEADQADACAJAAQAIAAAEgCQAFgCAAgEIgBgDIgFgCIgQgBIgIABgAgHghQgCADAAALQAAAJACADQACADAEAAQACAAACgDQADgDAAgJQAAgLgDgEQgCgDgCAAQgEAAgCAEg");
	this.shape_8.setTransform(51.775,29.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660099").s().p("AgRAaQgDgDgBgEQgCgEAAgJIAAgVQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAkIAAAIIACADIADAAIADgBQACgBADgFIAAgcQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAqQAAAGABACQABABAEABIAAACIgXAAIAAgIQgEAFgDACQgDACgFAAQgFAAgEgCg");
	this.shape_9.setTransform(45.325,28.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660099").s().p("AgIAbIgDgBQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAABIgCAAIgBgTIACAAQADAHAFAEQAEAEADAAQABAAAAgBQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgCgCIgHgGIgLgIQgEgGAAgGQAAgGAEgFQAFgFAIAAQAEAAAEACIADABIABAAIACgDIACAAIABATIgCAAQgEgIgEgEQgDgDgDAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAgBABQAAAAAAABQAAAAAAABIABADQACADAIAFQAIAGADADQADAEAAAFQAAAEgDAFQgBAEgFADQgEACgFAAQgDAAgGgCg");
	this.shape_10.setTransform(39.7,28.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660099").s().p("AgRAUQgFgIAAgLQAAgMAIgJQAHgIAJAAQAIAAAGAHQAHAGAAAOIgdAAQAAAKAFAHQAEAEAGAAQADAAADgBIAGgIIACABQgFAJgFAFQgGADgGAAQgLAAgHgJgAgDgVQgEAFABAJIAAACIAPAAIgCgMQgBgEgCgCIgDgBQgCAAgCADg");
	this.shape_11.setTransform(34.75,28.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#660099").s().p("AgQAmQgHgEgDgGQgEgGAAgJIAAgmIAAgJIgDgDQgCgBgFAAIAAgCIAoAAIAAACIgBAAQgFAAgBABQgBABAAAAQgBAAAAAAQAAABAAAAQgBABAAAAQgBACAAAHIAAAmQAAAKACAEQACADADACQAEADAFAAQAGAAAFgDQAEgDADgFQACgFAAgNIAAgfIgBgIIgDgDQgDgCgFAAIAAgCIAcAAIAAACIgCAAQgDAAgCACQgDABgBADIAAAHIAAAdQAAAOgCAGQgCAGgHAFQgHAGgMAAQgKAAgGgDg");
	this.shape_12.setTransform(27.725,27.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CCCCCC").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_13.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.ToyotomiHideyoshi = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ToyotomiHideyoshiSamurai_2();
	this.instance.setTransform(0,0,0.3514,0.4533);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,162,204);


(lib.Toyotomi_Hideyoshi_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AgPAsIAAgCQAEAAACgDQABgBAAgGIAAgiQAAgHgBgBQgCgCgEAAIAAgDIAYAAIAAAvQAAAGACABQABADAEAAIAAACgAgGgbQgDgCAAgFQAAgEADgCQADgDADAAQAEAAADADQADACAAAEQAAAFgDACQgDADgEAAQgDAAgDgDg");
	this.shape.setTransform(88.55,35.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AACArIAAgCQADAAACgDQABgCAAgGIAAgaIAAgIIgDgEIgDgBQgCABgBABIgGAGIAAAfQAAAGABACQACACADABIAAACIgeAAIAAgCQAEAAACgDQAAgBAAgHIAAg7QAAgHgBgBQgBgCgEAAIAAgDIAYAAIAAAiQAFgFADgCQAEgCAFAAQAFAAAEADQAEADACAEIABAOIAAAXQAAAHABABQABADAEAAIAAACg");
	this.shape_1.setTransform(83.1,35.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKAcIgCAAQAAAAgBAAQAAAAgBABQAAAAgBABQAAAAAAABIgDAAIgBgVIADAAQADAIAEAFQAGADADAAQADAAACgBQABgBAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBQAAgDgCgCIgIgHQgKgGgCgDQgEgGgBgFQAAgIAGgFQAEgGAJABQAEAAAEACIADAAIACAAIACgCIACAAIABAUIgCAAQgEgKgEgCQgEgEgDAAQgBAAAAAAQgBAAAAABQgBAAAAAAQgBABAAAAQgBAAAAABQgBAAAAABQAAAAAAABQAAAAAAABIABADQACADAIAGQAJAHADADQAEAEAAAFQgBAFgCAGQgCAEgFACQgEAEgGAAQgDAAgIgEg");
	this.shape_2.setTransform(76.95,36.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgTAWQgIgKAAgMQAAgLAIgKQAHgJAMAAQAHAAAIADQAGAEAEAHQADAIAAAIQAAAMgHAJQgHALgOAAQgNAAgGgKgAgFgYQgCADgBAHIAAATIAAAMQABAFACADQADACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABgBQACgCABgEQABgGAAgRIgBgPQgBgEgCgCIgFgBQgCAAgDACg");
	this.shape_3.setTransform(71.15,36.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgZApQgDgDAAgEQAAgEADgDQACgCADAAQADAAACACQACACAAAEIAAADIACABIAEgCQACgCAEgKIABgFIgTgrIgGgMIgGgDIAAgDIAfAAIAAADIgEABIgBADIAEAJIAJAXIAGgSQAFgJAAgEQAAAAgBgBQAAgBAAAAQAAAAAAgBQgBAAAAgBQgCgBgEAAIAAgDIAUAAIAAADQgDAAgBACQgDACgEALIgRArQgFARgDADQgFAGgGAAQgGAAgDgDg");
	this.shape_4.setTransform(64.65,37.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgSAVQgGgIAAgMQAAgOAIgJQAIgJAKABQAJgBAHAIQAGAHABAPIggAAQABAKAGAHQADAFAGABQAEgBADgCQADgCAEgFIACACQgFAJgGAEQgGAFgHAAQgMAAgHgLgAgDgYQgEAHAAAJIAAACIAQAAIgBgNQgBgEgCgDIgEgBQgCAAgCADg");
	this.shape_5.setTransform(58.625,36.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AAHAiQgEAGgDACQgDACgFAAQgLAAgHgKQgFgJAAgLQAAgKADgHQADgHAGgEQAGgEAGAAQAFAAACABQADACAEAFIAAgTQAAgHgBgBIgCgCIgFgBIAAgDIAaAAIAABDIAAAJIACACIAFACIAAACIgZAFgAgHgKQgDABgBAGQgCAEAAAJQAAAMACAFQACAFADADIAEABQAEAAAFgJIAAgeQgFgJgFAAQgBAAAAAAQgBAAgBAAQAAABAAAAQgBAAAAABg");
	this.shape_6.setTransform(52.125,35.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AgPAsIAAgCQAEAAACgDQABgBABgGIAAgiQgBgHgBgBQgCgCgEAAIAAgDIAYAAIAAAvQAAAGACABQABADAEAAIAAACgAgGgbQgDgCABgFQgBgEADgCQADgDADAAQAFAAACADQADACAAAEQAAAFgDACQgDADgEAAQgDAAgDgDg");
	this.shape_7.setTransform(46.65,35.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AADArIAAgCIADAAIAGgBIADgEIAAgIIAAgbIgdAAIAAAbQAAAHABABIACAEIAGABIADAAIAAACIgtAAIAAgCIADAAIAGgBQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAAAgBIABgIIAAg4QAAgGgBgCIgCgCIgGgBIgDAAIAAgDIAtAAIAAADIgDAAIgGABIgDACIAAAIIAAAZIAdAAIAAgZIAAgIIgDgCIgGgBIgDAAIAAgDIAtAAIAAADIgDAAIgGABIgCACQgBACAAAGIAAA4QAAAHABABIACAEIAGABIADAAIAAACg");
	this.shape_8.setTransform(39.775,35.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgPAsIAAgDQAEAAACgCQACgBAAgHIAAghQAAgGgCgCQgBgBgFgBIAAgDIAYAAIAAAuQAAAHACABQABACAEAAIAAADgAgGgaQgDgDAAgEQAAgEADgDQADgDADAAQAEAAADADQADADAAAEQAAAEgDADQgDACgEAAQgDAAgDgCg");
	this.shape_9.setTransform(86.85,18.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF00").s().p("AAUAeIAAgCQADAAABgCIABgIIAAgZIAAgKIgCgDIgDgCQgDAAgDADIgGAFIAAAgQAAAGACACQABACAEAAIAAACIgdAAIAAgCIADgBIACgCIABgHIAAgZIgBgKIgCgDIgDgCQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABgBAAIgGAGIAAAgQAAAGACACQABACADAAIAAACIgeAAIAAgCQAEAAABgCQABgCAAgGIAAghQAAgHgBgCQgBgBgEAAIAAgDIAYAAIAAAIQAFgFAEgCQAEgCAFgBQAGAAADADQADACACAGQAGgGAEgCQAFgDAFAAQAGAAAEADQADADACAFQABADAAAKIAAAYQAAAGACACQABABAEABIAAACg");
	this.shape_10.setTransform(79.65,20.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF00").s().p("AgUAWQgHgKAAgMQAAgLAHgKQAIgKAMAAQAHABAIAEQAGAEADAGQAEAIAAAIQAAAMgGAJQgJALgNgBQgMABgIgKgAgEgYQgCADgCAHIAAATIAAANQACAEACADQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABAAQACgDABgEQABgFAAgSIgBgPQgBgEgCgCIgFgBQgCAAgCACg");
	this.shape_11.setTransform(70.9,20.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF00").s().p("AgFAlQgEgDgBgDQgBgCAAgKIAAgfIgIAAIAAgCQAIgGAGgGIAJgOIACAAIAAAVIAOAAIAAAHIgOAAIAAAkIAAAGIACADIACABQAEgBAEgGIACABQgFANgMAAQgFAAgDgEg");
	this.shape_12.setTransform(65.525,19.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF00").s().p("AgUAWQgHgKAAgMQAAgLAHgKQAIgKAMAAQAIABAGAEQAHAEADAGQAEAIAAAIQAAAMgHAJQgHALgOgBQgMABgIgKgAgFgYQgBADgBAHIgBATIABANQABAEABADQADACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQADgDABgEQABgFAAgSIgBgPQgBgEgDgCIgEgBQgCAAgDACg");
	this.shape_13.setTransform(60.05,20.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF00").s().p("AgYApQgEgDAAgEQAAgEADgDQABgCAEAAQADAAACACQACACAAAEIABADIABABIAEgCQACgCADgKIACgFIgTgrIgGgMIgGgDIAAgDIAfAAIAAADIgEABIAAADIACAJIAKAXIAGgSQAEgJABgEQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBgBgEAAIAAgDIAUAAIAAADQgDAAgDACQgCACgDALIgRArQgGARgDADQgEAGgHAAQgFAAgDgDg");
	this.shape_14.setTransform(53.55,21.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF00").s().p("AgTAWQgIgKAAgMQAAgLAIgKQAHgKAMAAQAHABAIAEQAGAEAEAGQADAIAAAIQAAAMgGAJQgJALgNgBQgMABgHgKgAgEgYQgCADgCAHIAAATIAAANQACAEACADQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABAAQACgDABgEQABgFAAgSIgBgPQgBgEgCgCIgFgBQgCAAgCACg");
	this.shape_15.setTransform(47.05,20.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF00").s().p("AgVArIAAgDIACAAIAGgBQABAAAAAAQABAAAAgBQAAAAAAgBQABAAAAgBQABgBAAgHIAAhBIgHAAQgIAAgEADQgGAGgBAJIgDAAIAAgXIBNAAIAAAXIgDAAQgCgIgCgEQgDgDgEgCIgIgBIgHAAIAABBQAAAHABABIADADIAGABIADAAIAAADg");
	this.shape_16.setTransform(40.675,18.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF9900").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_17.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.TokugawaIeyasu = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.TokugawaIeyasuSamurai_3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,332,450);


(lib.Tokugawa_Ieyasu_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#999999").s().p("AgSAbQgEgDgBgEIgBgOIAAgXQAAgGgCgCQgBgCgEAAIAAgDIAYAAIAAAoQAAAGABACIACADIACABIAEgBQACgCAEgFIAAgfQAAgGgCgCQgBgCgDAAIAAgDIAXAAIAAAuQAAAHACABQABACAEAAIAAADIgYAAIAAgIQgEAFgEACQgEADgFAAQgFAAgEgEg");
	this.shape.setTransform(77.4,36.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgJAcIgDAAQAAAAgBAAQAAAAgBABQAAAAgBABQAAAAAAABIgCAAIgBgVIACAAQACAIAGAEQAFAFADAAQADAAACgCQABgBAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBQAAgDgCgCIgIgHQgJgGgDgDQgFgFAAgHQABgGAFgGQAEgGAJAAQAEAAAFADIACABIACgBIACgDIADAAIABAVIgDAAQgDgKgFgDQgEgDgDAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBABgBAAQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAABIABADQACADAIAGQAJAGAEAEQACAFAAAEQAAAFgCAFQgCAFgFACQgEADgGAAQgDAAgHgDg");
	this.shape_1.setTransform(71.3,36.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AAGAcQgDgCAAgFQgKAKgJAAQgFAAgDgEQgEgDAAgFQAAgHAGgFQAGgGATgIIAAgFIgBgJIgCgDQAAAAgBgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQgEAAgDADQAAAAgBAAQAAAAgBABQAAAAAAAAQAAABAAAAIACADQACADAAADQAAADgCACQgDADgDAAQgEAAgCgDQgDgDgBgDQAAgEAEgEQAEgFAGgCQAGgCAHAAQAIAAAFADQAFAEACAEQABADAAAJIAAAWIAAAGIABABIABABIADgCIADABIgHAGQgEADgEAAQgFAAgDgDgAgIAGQgCAEgBAEQABACACACQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQADAAAEgEIAAgSQgHADgEAFg");
	this.shape_2.setTransform(65.7,36.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("AgZApQgDgDAAgEQAAgEACgDQACgCAEAAQADAAACACQACACAAAEIABADIABABIADgCQADgCAEgKIABgFIgTgrIgHgMIgEgDIAAgDIAeAAIAAADIgDABIgCADIAEAJIAJAXIAHgSQADgJAAgEQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBgBgFAAIAAgDIAVAAIAAADQgEAAgCACQgBACgFALIgRArQgFARgDADQgEAGgHAAQgGAAgDgDg");
	this.shape_3.setTransform(59,37.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgSAVQgGgIAAgMQAAgOAIgJQAIgJAKAAQAJAAAHAIQAGAHABAPIggAAQABAKAGAIQADAEAGAAQAEAAADgBQADgDAEgFIACABQgFAKgGAEQgGAFgHgBQgMAAgHgKgAgDgYQgEAHAAAJIAAACIAQAAIgBgNQgBgFgCgBIgEgBQgCAAgCACg");
	this.shape_4.setTransform(52.975,36.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("AgWArIAAgDIAEAAIAFgBIADgCIABgJIAAg3IgBgIIgDgEIgFgBIgEAAIAAgCIAsAAIAAACIgCAAIgHABIgCAEIAAAIIAAA3IAAAJIADACIAGABIACAAIAAADg");
	this.shape_5.setTransform(47.45,34.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("AAGAcQgDgCgBgFQgJAKgJAAQgFAAgEgEQgCgDAAgFQgBgGAGgGQAGgFASgJIAAgFIAAgJIgCgDQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBgBAAQgEAAgCACQgBABAAAAQAAAAAAABQgBAAAAAAQAAABAAAAIACADQACADABADQgBADgCACQgCACgEAAQgEAAgDgCQgCgDAAgDQAAgEADgEQAEgEAGgDQAGgCAHAAQAIAAAFAEQAFADABAEQABADAAAJIAAAXIAAAEIABACIACABIAEgDIABACIgGAGQgDADgFAAQgFAAgDgDgAgIAHQgCADAAAEQAAACACACQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAACgDIAAgTQgGADgEAGg");
	this.shape_6.setTransform(88.6,19.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AAQAfIgQgrIgPArIgDAAIgQgrQgDgJgDgDQgBgCgEgBIAAgDIAeAAIAAADIgEABIgBACIACAGIAJAWIAIgWIgBgBQgBgFgCgBQAAgBgBAAQAAAAgBAAQAAgBgBAAQgBAAAAAAIAAgDIAdAAIAAADQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAABAAAAIgBACIABAGIAJAWIAHgUIACgGQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgFgBIAAgDIASAAIAAADQgBAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBABQgCABgCAIIgRAvg");
	this.shape_7.setTransform(80.425,19.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#999999").s().p("AAGAcQgCgCgBgFQgKAKgJAAQgFAAgEgEQgDgDAAgFQABgGAFgGQAGgFATgJIAAgFIgBgJIgCgDQAAAAgBgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQgEAAgDACQgBABAAAAQAAAAgBABQAAAAAAAAQAAABAAAAIACADQADADgBADQABADgDACQgDACgDAAQgEAAgCgCQgEgDAAgDQABgEADgEQAEgEAHgDQAGgCAGAAQAIAAAFAEQAFADABAEQACADAAAJIAAAXIAAAEIABACIABABIADgDIACACIgGAGQgDADgFAAQgFAAgDgDgAgIAHQgCADgBAEQABACACACQAAABABAAQAAAAABABQAAAAABAAQABAAABAAQACAAAEgDIAAgTQgHADgEAGg");
	this.shape_8.setTransform(72.7,19.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999999").s().p("AgQArQgGgBgDgEQgDgCAAgDQAAgDACgDIAIgDQgIgFAAgHQAAgEAEgEQADgEAHgCQgIgEgEgEQgEgGAAgGQAAgJAHgGQAHgGAMgBQAEABAHACIAUAAIAAAHIgMAAIAFAGIABAHQAAAGgDAFQgEAEgGADQgGACgEABIgHAAQgDgBgCABQgBABAAAAQAAABgBAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAAAABQABAAAAABQAAAAABAAQABACAEAAIAKgBQAOAAAFADQAHAFAAAIQAAAGgDAEQgEAFgFACQgIADgKgBQgIAAgHgBgAgOAbQgDABAAAEQAAADAEACQADADAKAAQAIAAAGgCQAFgDAAgEIgBgDQgCgCgEAAIgRAAIgJABgAgHgkQgDAEAAAMQAAAJADADQACAEADAAQADAAADgEQACgDAAgKQAAgMgDgDQgCgDgCAAQgEAAgCADg");
	this.shape_9.setTransform(66.125,21.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AgSAbQgEgDgCgEIgBgOIAAgXQAAgGgBgCQgBgCgEAAIAAgDIAYAAIAAAoQAAAGABACIACADIADABIADgBQACgCAEgFIAAgfQAAgGgBgCQgBgCgFAAIAAgDIAYAAIAAAuQABAHABABQABACAEAAIAAADIgYAAIAAgIQgFAFgDACQgEADgFAAQgFAAgEgEg");
	this.shape_10.setTransform(59.1,19.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999999").s().p("AAEArIAAgDIADAAIABgBIgDgGIgLgSIgDAFIAAAKQgBAHACACQABABAEAAIAAADIgfAAIAAgDQAEAAACgBQABgCAAgHIAAg7QAAgHgBgCQgCgBgEgBIAAgCIAZAAIAAA3IAMgNIAGgFIAAgDIgBgEIgFgBIAAgCIAaAAIAAACQgDAAgEACIgLAJIgGAGIAOAUIAKAPQACABAEAAIAAADg");
	this.shape_11.setTransform(52.15,18.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AgUAWQgHgKAAgMQAAgMAHgJQAIgKAMAAQAIAAAGAFQAHADADAIQAEAHAAAIQAAANgGAIQgJAKgNAAQgMAAgIgJgAgEgXQgCACgBAHIgBATIABANQABAEACACQACADACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABgBQACgCABgDQABgHAAgRIgBgPQgBgEgCgCIgFgBQgCAAgCADg");
	this.shape_12.setTransform(45,19.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgVArIAAgDIACAAIAGgBQABAAAAAAQABAAAAgBQAAAAAAgBQABAAAAAAIABgIIAAhCIgHAAQgIAAgEAEQgGAEgBAKIgDAAIAAgXIBNAAIAAAXIgDAAQgCgIgCgEQgDgDgEgCIgIgBIgHAAIAABCQAAAGABACIADACIAGABIADAAIAAADg");
	this.shape_13.setTransform(38.625,18.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_14.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.Title = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FF0000").s().p("AgjAnQgGgIAAgKQAAgQAKgPQAJgQAQgKQAPgKAQAAQAIAAAFAFQAEAEAAAFQAAAIgEAGQgGAJgJAGQgIAFgLADQgGACgMAAIgBALQAAAHAEAFQAFAEAGAAQAHAAAHgDQAGgEAJgIIADADQgLANgLAGQgKAGgMgBQgQABgHgIgAAEggQgKALgHAYIANgDIAJgHQAEgFADgHQAEgIAAgGQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAAAAAgBQgBAAgBAAQAAAAgBAAQgEAAgGAHg");
	this.shape.setTransform(327.275,58.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgvA7QgJgGAAgHQAAgGAFgFQAGgFASgEQgHgEgCgCQgCgEAAgEQAAgHAEgFQAGgEAMgFQgKgDgDgGQgFgGAAgIQAAgJAGgHQAFgIAJgFQAKgFAMAAQAJAAAGACIAIAEIAaAAIgEALIgNAAQADAGABAFQAAAJgGAHQgFAIgIAEQgKAFgMAAIgFgBIgIgBQgHADgBACIgBACIABADQADACAFACQASAEAHACQAIAEAFAGQAEAFAAAIQAAANgLAJQgLAJgXAAQgYAAgKgIgAgjAkQgEAEABAFQAAAGAGAFQAHAFAPAAQALAAAGgEQAFgFAAgFQAAgGgFgDQgFgDgNgEIgMgDQgIADgEAFgAACg6QgEAFgEALQgEALAAAKQAAAFADADQADADAEAAQADAAADgDQAFgFAFgMQADgMAAgJQABgFgDgCQgDgDgEAAQgEAAgEADg");
	this.shape_1.setTransform(317.3,60.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AADAsQgDgDAAgFIADgNIACgIQgKATgKAIQgGAFgHgBQgJAAgEgGQgEgIAAgJQAAgOAJgRQAHgSAOgLQAMgJAIAAQAGAAADADQAEAEABAIIADgMIAYgBIgTBAIgCAHIAAADIABACIABABQACAAAEgDIAHgJIAEACQgHAMgIAGQgJAGgJgBQgFAAgDgCgAABglQgGAHgHASQgIASABANQAAAFABACQAAABABABQAAAAABAAQABABAAAAQABAAAAAAQAEAAAFgFQAFgIAFgKQAJgSAAgOQAAgHgCgEQgBgDgDABQgEAAgDACg");
	this.shape_2.setTransform(307.65,58.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("Ag7BDIABgEQAHAAAEgEQAEgEADgMIAYhSQADgJAAgEIgBgCIgCgCIgHAAIABgEIAfgGIAGAAIgEAQQAKgJAGgDQAHgEAGAAQAKAAAFAHQAFAHAAALQAAAcgUAUQgRATgUAAIgGAAIgHgDIgFARQgCAKAAAFQAAADACACQACACAIABIgBAEgAASgyQgEADgGAHIgPA2IAFAGQACACADAAIAGgCIAHgHQAFgFAEgIQAEgHACgLQADgKAAgJQAAgIgDgDQgDgEgDAAQgEAAgDACg");
	this.shape_3.setTransform(296.175,60.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgtA8IAehnIACgKQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAQgDgCgFAAIABgEIAfgGIAGAAIgQA7QAHgIAFgDQAFgDAHAAQALAAAGAJQAGAIAAAKQAAAbgUAUQgRASgUAAQgQAAgSgJgAgBgCQgDADgEAOIgNAtQAEADAEAAQAFAAAEgCQAEgDAGgIQAHgJADgNQAFgLAAgNQAAgGgEgDQgDgEgDAAQgHAAgFAHg");
	this.shape_4.setTransform(287.45,56.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgjAnQgGgIAAgKQAAgQAKgPQAJgQAQgKQAPgKAQAAQAIAAAFAFQAEAEAAAFQAAAIgEAGQgGAJgJAGQgIAFgLADQgGACgMAAIgBALQAAAHAEAFQAFAEAGAAQAHAAAHgDQAGgEAJgIIADADQgLANgLAGQgKAGgMgBQgQABgHgIgAAEggQgKALgHAYIANgDIAJgHQAEgFADgHQAEgIAAgGQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgEAAgGAHg");
	this.shape_5.setTransform(278.375,58.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AgVBEIAGhZIhBBZIgGAAIAJhxIABgIQAAgFgDgCQgCgDgGAAIABgEIA2AAIgBAEIgDAAQgFAAgDADQgEAEAAAJIgFBDIAng2IACgNIAAgGQAAgFgDgCQgCgDgGAAIABgEIA1AAIgCAEQgGAAgEADQgEAEAAAJIgFBDIAmg0IANgTIABgGQAAAAAAgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQgCgBgGgBIABgEIAjAAIgBAEQgFABgDACQgFAEgGAJIhUBzg");
	this.shape_6.setTransform(268.7,56.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AAJArQgDgDAAgFQAAgEACgIIANgpIABgGIgBgCIgCgBQgDAAgGAFQgMANgNAZIgIAdIgZAAIATg+IACgNIgBgDQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAIgHAAIABgEIAhgGIAFAAIgLAqQALgSAGgHQAJgKAHgDQAGgEAFAAQAFAAAEAEQAEAEAAAGQAAAFgDAIIgMApIgBAHIAAACIABAAIACAAIAIgIIACgEIAEACQgOAYgQAAQgGAAgEgDg");
	this.shape_7.setTransform(246.85,58.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AgkAnQgIgIAAgMQABgNAFgLQAFgMAIgJQAJgIALgGQAKgFALgBQAIABAHADQAGAEAEAGQADAHABAHQAAAQgJAPQgJAQgPAIQgNAJgPAAQgNABgHgIgAADgmQgFAHgJAWQgJAWABASQAAAFACADQADADAEAAQADgBADgCQAEgDAGgMQAGgNAFgNQADgPAAgMQABgGgDgDQgDgCgDAAQgFAAgEACg");
	this.shape_8.setTransform(236.65,58.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AgXBCQgEgEAAgFIACgJIANgvIACgKQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAIgEABIABgFIAggFIAGAAIgTBEIgBAIIAAACIABABIAEgCQAEgDAGgJIADABQgOAagQAAQgGAAgEgDgAADgsQgDgDAAgHQAAgGADgEQAEgEAGAAQAGAAAEAEQAFAEAAAGQAAAHgFADQgEAFgGAAQgGAAgEgFg");
	this.shape_9.setTransform(229.325,56.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgZA3QgDgDAAgFQAAgGACgIIAQg0IgOAAIACgIQANgFAIgFQAIgHAMgOIAFAAIgIAbIANAAIgDAMIgNAAIgPA3IgCAIIABACIACABIACgBQAFgEAGgIIADACQgGAMgJAGQgHAEgHAAQgHAAgEgDg");
	this.shape_10.setTransform(223.925,57.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AADAsQgDgDAAgFIADgNIADgIQgLATgKAIQgHAFgGgBQgJAAgEgGQgEgIAAgJQAAgOAJgRQAHgSAOgLQALgJAKAAQAFAAAEADQADAEABAIIAEgMIAXgBIgTBAIgCAHIAAADIABACIABABQACAAAEgDIAHgJIAEACQgIAMgIAGQgHAGgKgBQgFAAgDgCgAABglQgFAHgIASQgHASAAANQgBAFACACQAAABABABQABAAAAAAQABABAAAAQABAAAAAAQAFAAAEgFQAFgIAGgKQAIgSABgOQAAgHgDgEQgBgDgDABQgDAAgEACg");
	this.shape_11.setTransform(215.6,58.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("AAgArQgDgEAAgEQAAgEACgJIALglIACgKIgBgBIgBgBIgCABIgGAFIgLAPQgHAJgDAGQgDAGgDAKIgFAUIgYAAIASg/IACgHIgBgBIgBgBQgEAAgIAJQgMAPgKAUIgIAcIgZAAIATg+QACgJABgEIgBgDIgDgCIgGAAIABgEIAhgGIAFAAIgMAqQAMgTAHgHQAIgKAFgDQAFgDAGAAQAGAAADAEQACAEABAEQgBAFgCAJIgFAQIATgaQAIgKAHgDQAEgDAFAAQAGAAADAEQAEADgBAGQAAAGgCAKIgLAjIgDALIAAABIACABIACgBIAIgIIACgEIADADQgHAMgHAGQgIAGgHAAQgGAAgEgDg");
	this.shape_12.setTransform(202.4,58.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AgXBCQgEgEAAgFIACgJIANgvIACgKQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAIgEABIABgFIAggFIAGAAIgTBEIgBAIIAAACIABABIAEgCQAEgDAGgJIADABQgOAagQAAQgGAAgEgDgAADgsQgDgDAAgHQAAgGADgEQAEgEAGAAQAGAAAEAEQAFAEAAAGQAAAHgFADQgEAFgGAAQgGAAgEgFg");
	this.shape_13.setTransform(192.675,56.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AAJArQgDgDAAgFQAAgEADgIIALgpIACgGIgBgCIgCgBQgEAAgFAFQgMANgNAZIgIAdIgZAAIATg+IACgNIgBgDQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAIgGAAIABgEIAhgGIAFAAIgLAqQALgSAGgHQAJgKAHgDQAGgEAGAAQAEAAAEAEQAEAEAAAGQAAAFgDAIIgMApIgCAHIABACIACAAIACAAIAHgIIACgEIAEACQgOAYgQAAQgGAAgEgDg");
	this.shape_14.setTransform(183.55,58.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("AAHBEIABgEIAKgBQADgCACgEQACgEABgLIABgRIgoAAIgIAKIgKALIgEAHIgBAEQAAADADACQACACAGAAIAAAEIgoAAIABgEQAGgBAEgDQAFgDAKgNIBdhvIAFAAIgFBsIAAAKQAAAHADADQACADAHAAIgBAEgAgGARIAhAAIACgqg");
	this.shape_15.setTransform(170.475,56.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("AgwA/QgFgEAAgFQABgGADgDQADgEAFAAQAGAAAFAGQADAEACAAIAFgBQADgBAFgGIABgTIgBgXIgBgkQgCgLgDgEQgDgDgEAAIgEAAIAAgEIAdgJQAEAFABAEQADAHABAMIADAyQAKgNANgWQAFgHAAgGQAAgEgFgDIgGgGIgBgFQAAgFAEgDQADgEAFAAQAGAAAEAEQADAEAAAGQAAAHgDAIQgEAJgNAVQgRAagQATQgLANgHAFQgGAGgHADQgEACgEAAQgGAAgDgEg");
	this.shape_16.setTransform(155.4,60.775);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF0000").s().p("AgmAtIARg/IABgKIAAgEIgDgCIgHgBIABgDIAdgGIAGAAIgPA2QASgoAJgJQAFgFAHAAQAEAAACADQADADAAAFQAAAKgFAGQgDAEgEAAQgDAAgCgDIgEgFIgBAAIgCAAQgCABgEAFQgDAFgFAKIgHARQgDAIgFAUg");
	this.shape_17.setTransform(148.3,58.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF0000").s().p("AglAnQgGgIAAgMQgBgNAGgLQAFgMAJgJQAIgIALgGQAJgFAMgBQAIABAHADQAGAEAEAGQADAHAAAHQAAAQgJAPQgIAQgOAIQgOAJgPAAQgNABgIgIgAAEgmQgGAHgJAWQgJAWAAASQAAAFAEADQACADAEAAQAEgBACgCQAEgDAGgMQAGgNAEgNQAFgPAAgMQgBgGgCgDQgCgCgEAAQgFAAgDACg");
	this.shape_18.setTransform(139.05,58.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF0000").s().p("AgZA3QgDgDAAgFQAAgGACgIIAQg0IgOAAIACgIQANgFAIgFQAIgHAMgOIAFAAIgIAbIANAAIgDAMIgNAAIgPA3IgCAIIABACIACABIACgBQAFgEAGgIIADACQgGAMgJAGQgHAEgHAAQgHAAgEgDg");
	this.shape_19.setTransform(131.875,57.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF0000").s().p("AgSAsIgIgBIgEAAIgDADIgDAAIAEggIAEAAQADAMADAFQADAFAFADQAFADAEAAQAFAAADgDQAEgEAAgEQAAgFgCgEIgKgOQgLgLgEgHQgDgFAAgGQAAgKAIgHQAIgIANAAQAGAAAIACIAHABQAEAAADgDIADAAIgEAeIgEAAQgBgLgGgHQgGgHgIABQgEAAgDACQgCADAAAEIABAFIAFAHQAPARAEAGQADAGAAAHQAAAHgEAIQgEAGgIAFQgHADgIAAQgFAAgJgCg");
	this.shape_20.setTransform(124.475,58.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF0000").s().p("AgXBCQgEgEAAgFIACgJIANgvIACgKQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAIgEABIABgFIAggFIAGAAIgTBEIgBAIIAAACIABABIAEgCQAEgDAGgJIADABQgOAagQAAQgGAAgEgDgAADgsQgDgDAAgHQAAgGADgEQAEgEAGAAQAGAAAEAEQAFAEAAAGQAAAHgFADQgEAFgGAAQgGAAgEgFg");
	this.shape_21.setTransform(118.375,56.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF0000").s().p("AgLBCIABgDQAJAAAEgEQAEgEAEgMIALgoIgvAAIgLAoQgCAIAAAEQAAADADACQACACAJABIgBADIhAAAIABgDQAKAAAFgEQADgEAFgMIAYhUIACgMQAAgEgDgCQgCgCgKgBIABgDIBAAAIgBADQgKAAgDAEQgEAEgEANIgMAlIAwAAIALglQACgIAAgEQAAgEgDgCQgDgCgKgBIACgDIBCAAIgBADQgLAAgFAFQgEAEgEAMIgZBUIgCALQAAAEACACQAEACAJABIgBADg");
	this.shape_22.setTransform(107.95,56.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF0000").s().p("AgXBCQgEgEAAgFIACgJIANgvIACgKQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAIgEABIABgFIAggFIAGAAIgTBEIgBAIIAAACIABABIAEgCQAEgDAGgJIADABQgOAagQAAQgGAAgEgDgAADgsQgDgDAAgHQAAgGADgEQAEgEAGAAQAGAAAEAEQAFAEAAAGQAAAHgFADQgEAFgGAAQgGAAgEgFg");
	this.shape_23.setTransform(92.275,56.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF0000").s().p("AADAsQgDgDAAgFIADgNIADgIQgLATgKAIQgGAFgHgBQgJAAgEgGQgEgIAAgJQAAgOAJgRQAHgSAOgLQAMgJAJAAQAFAAAEADQACAEACAIIADgMIAYgBIgTBAIgCAHIAAADIABACIABABQACAAAEgDIAHgJIAEACQgHAMgJAGQgHAGgKgBQgFAAgDgCgAABglQgFAHgIASQgIASABANQAAAFABACQAAABABABQAAAAABAAQABABAAAAQABAAAAAAQAEAAAFgFQAFgIAGgKQAIgSABgOQAAgHgDgEQgBgDgDABQgDAAgEACg");
	this.shape_24.setTransform(84.1,58.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF0000").s().p("AgmAtIARg/IABgKIgBgEIgCgCIgHgBIABgDIAdgGIAFAAIgOA2QASgoAJgJQAFgFAHAAQAEAAACADQADADAAAFQAAAKgFAGQgDAEgEAAQgDAAgCgDIgEgFIgBAAIgCAAQgCABgEAFQgDAFgFAKIgHARQgDAIgFAUg");
	this.shape_25.setTransform(75.5,58.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF0000").s().p("AAFArQgDgCAAgGQAAgEACgJIAFgQIgRAZQgJAJgGADQgGADgGAAQgFAAgEgDQgDgEAAgGQAAgEACgJIALgmIADgNIgBgDIgDgCIgGAAIABgEIAhgGIAGAAIgTBCIgBAGIAAABIACABQAFAAAHgHQAKgMAMgVIAJgeIAYgBIgSBAIgDAJIABACIABABIADgBQAEgDAFgJIAEACQgOAYgQAAQgGAAgEgDg");
	this.shape_26.setTransform(65.725,58.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FF0000").s().p("AAgArQgEgEAAgEQAAgEADgJIALglIACgKIgBgBIgBgBIgCABIgGAFIgLAPQgIAJgCAGQgDAGgDAKIgGAUIgXAAIASg/IACgHIgBgBIgBgBQgEAAgIAJQgMAPgKAUIgIAcIgZAAIATg+QADgJAAgEIgBgDIgDgCIgGAAIABgEIAhgGIAGAAIgNAqQAMgTAHgHQAIgKAFgDQAFgDAFAAQAHAAADAEQACAEABAEQgBAFgCAJIgFAQIATgaQAJgKAGgDQAEgDAFAAQAGAAADAEQADADAAAGQAAAGgCAKIgLAjIgDALIAAABIACABIACgBIAIgIIACgEIADADQgGAMgIAGQgJAGgGAAQgGAAgEgDg");
	this.shape_27.setTransform(52,58.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FF0000").s().p("AADAsQgDgDAAgFIADgNIADgIQgLATgKAIQgHAFgGgBQgJAAgEgGQgEgIAAgJQAAgOAJgRQAHgSAOgLQALgJAKAAQAFAAAEADQADAEABAIIAEgMIAXgBIgTBAIgCAHIAAADIABACIABABQACAAAEgDIAHgJIAEACQgIAMgIAGQgHAGgKgBQgFAAgDgCgAABglQgFAHgIASQgHASAAANQgBAFACACQAAABABABQABAAAAAAQABABAAAAQABAAAAAAQAFAAAEgFQAFgIAGgKQAIgSABgOQAAgHgDgEQgBgDgDABQgDAAgEACg");
	this.shape_28.setTransform(39.65,58.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FF0000").s().p("AgaBDIgRgDIgGABIgHAEIgDAAIALgyIAEAAQACANADAJQAEAKAIAFQAIAFAJAAQAKAAAGgGQAGgHABgIQAAgIgFgGQgDgHgMgNQgNgMgFgKQgDgHgBgJQAAgPAMgKQALgLATAAQAIAAANAEIAMACIAFgBIAGgFIADAAIgKAtIgDAAQgCgLgDgGQgDgJgHgFQgHgFgIAAQgHAAgGAGQgFAFAAAIQAAAHADAHQAEAHAPAOQAMAKADAIQAFAIAAAKQgBAKgFAJQgGAJgLAFQgKAFgNAAQgIAAgNgCg");
	this.shape_29.setTransform(29.15,56.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("A7sIwIAAxfMA3ZAAAIAARfg");
	this.shape_30.setTransform(177.325,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,354.7,112);


(lib.TakedaShingen = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.TakedaShingenSamurai_6();
	this.instance.setTransform(0,0,0.5,0.4533);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,162,204);


(lib.Takeda_Shingen_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFCC00").s().p("AACAcIAAgCQADAAABgCQABgCAAgGIAAgXIAAgJIgCgCIgCgBQgEAAgFAHIAAAcIABAIQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAIAAACIgcAAIAAgCQAEAAACgCQAAgBABgHIAAgeQgBgGAAgBQgCgCgEAAIAAgDIAXAAIAAAIQAEgFADgCQAEgCAFAAQAFAAADADQADADACAEQABADAAAKIAAAUQAAAHABABQAAABABAAQAAAAABABQAAAAABAAQABAAABAAIAAACg");
	this.shape.setTransform(99.1,26.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC00").s().p("AgRAUQgFgIAAgLQAAgMAIgJQAHgIAJAAQAIAAAGAHQAHAGAAAOIgdAAQAAAKAFAHQAEAEAFAAQAEAAADgBIAGgIIACABQgFAJgFAFQgGADgGAAQgMAAgGgJgAgDgVQgEAFABAJIAAACIAOAAIgBgMQgBgEgCgCIgDgBQgCAAgCADg");
	this.shape_1.setTransform(93.15,26.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC00").s().p("AgOAoQgGgCgDgCQgDgDAAgDQAAAAAAgBQABgBAAAAQAAgBAAAAQABgBAAAAQACgDAGgBQgIgEAAgGQAAgFADgDQADgEAHgCQgIgDgDgFQgEgEAAgGQAAgIAHgGQAGgGALAAQAEAAAGACIASAAIAAAHIgKAAQADACABADQABADAAADQAAAGgDAFQgDAEgGACQgFADgEAAIgHgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAAAABQgBABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQABABAEAAIAJAAQAMAAAFADQAHADAAAIQAAAFgDAEQgEAEgEACQgIADgJAAQgHAAgGgBgAgNAYQgDACAAADQAAADAEADQADACAJAAQAIAAAEgCQAFgCAAgEIgBgDIgFgCIgQgBIgIABgAgHghQgCADAAALQAAAJACADQACADAEAAQACAAACgDQADgDAAgJQAAgLgDgEQgCgDgCAAQgEAAgCAEg");
	this.shape_2.setTransform(87.525,27.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC00").s().p("AACAcIAAgCQADAAABgCQABgCAAgGIAAgXIAAgJIgCgCIgCgBQgEAAgFAHIAAAcIABAIQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAIAAACIgcAAIAAgCQAEAAACgCQAAgBABgHIAAgeQgBgGAAgBQgCgCgEAAIAAgDIAXAAIAAAIQAEgFADgCQAEgCAFAAQAFAAADADQADADACAEQABADAAAKIAAAUQAAAHABABQAAABABAAQAAAAABABQAAAAABAAQABAAABAAIAAACg");
	this.shape_3.setTransform(81.1,26.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC00").s().p("AgOApIAAgCQAEAAACgCQABgCAAgGIAAgfQAAgFgCgCQgBgCgEAAIAAgCIAWAAIAAAqQAAAGACACQABABAEABIAAACgAgFgYQgDgDAAgDQAAgEADgDQACgDADAAQAEAAACADQADADAAAEQAAADgDADQgCADgEAAQgDAAgCgDg");
	this.shape_4.setTransform(76.125,25.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC00").s().p("AACAoIAAgCQADgBABgCQABgBAAgGIAAgZIAAgHIgCgDIgDgBIgEACIgEAGIAAAcQAAAGABABQABACADABIAAACIgcAAIAAgCQAEgBABgCQABgBAAgGIAAg3QAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAgIAHgHQAEgCAEAAQAFAAAEADQADADABAEQACAEAAAIIAAAWQAAAGABACQABABAEABIAAACg");
	this.shape_5.setTransform(71.125,25.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC00").s().p("AgGApIgIgDIgFgBIgDABIgDAEIgCAAIAAgeIACAAQADAMAHAHQAIAHAHAAQAGAAAEgEQAFgEAAgEQgBgDgBgDIgFgFIgJgGQgLgFgFgEQgFgDgCgEQgCgFgBgGQABgJAGgHQAHgHALAAIAHABIAGADIAGACIACgBQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIADAAIAAAbIgDAAQgBgKgGgGQgIgGgGAAQgGAAgDADQgEADAAAEIABAFIAFAGIANAGQAOAHAEAFQAFAGAAAIQAAAKgIAHQgIAIgMAAIgGgBg");
	this.shape_6.setTransform(64.5,25.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC00").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_7.setTransform(55.275,26.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFCC00").s().p("AAHAgIgHAHQgDACgEAAQgLgBgGgIQgFgJAAgKQAAgJADgGQADgHAGgEQAFgDAGgBQAEABACABQADACAEADIAAgQIgBgIIgCgCIgEgBIAAgCIAXAAIAAA+IAAAHIACADIAFABIAAACIgXAFgAgHgKQgCADgBAEIgBANQAAALABAEQACAFACADIAEABQAEAAAFgJIAAgbQgFgJgFABIgEAAg");
	this.shape_8.setTransform(48.875,25.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC00").s().p("AgRAUQgFgIAAgLQAAgMAIgJQAHgIAJAAQAIAAAGAHQAHAGAAAOIgdAAQAAAKAFAHQAEAEAGAAQADAAADgBIAGgIIACABQgFAJgFAFQgGADgGAAQgLAAgHgJgAgDgVQgEAFABAJIAAACIAPAAIgCgMQgBgEgCgCIgDgBQgCAAgCADg");
	this.shape_9.setTransform(42.85,26.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCC00").s().p("AAEAoIAAgCIADgBIAAgCIgCgFIgKgPIgEADIAAAKQAAAGABACQABABAFABIAAACIgdAAIAAgCQAEgBABgCQABgBAAgGIAAg3QAAgGgBgCQgBgBgEgBIAAgCIAWAAIAAA0IAMgNIAFgEIABgEQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAIgFgCIAAgCIAZAAIAAACQgEAAgCACIgLAJIgFAFIAMATIAKAMQACACADABIAAACg");
	this.shape_10.setTransform(37.05,25.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFCC00").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_11.setTransform(30.625,26.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFCC00").s().p("AgUAoIAAgCIADAAQAEAAACgCIACgCIAAgIIAAg8IgFAAQgJAAgDADQgFAFgBAJIgDAAIAAgWIBGAAIAAAWIgCAAQgBgIgCgDQgDgDgEgCIgHgBIgHAAIAAA8IABAIIADACQACACADAAIADAAIAAACg");
	this.shape_12.setTransform(24.55,25.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_13.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.ReplayButton2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#CCCCCC").s().p("AgaAsQgEgDAAgFQAAgEADgCQACgDAEAAQADAAACACQACADAAAEIABAEIABAAQABAAAAAAQABAAAAgBQABAAAAAAQAAgBABAAQADgDADgKIACgFIgUgvQgFgKgCgDQgCgCgEgCIAAgCIAhAAIAAACIgDACQgBAAAAABQAAAAAAAAQgBAAAAABQAAAAAAABQAAACAEAIIAKAZIAHgTQAEgLAAgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgCgCgEgBIAAgCIAVAAIAAACQgDABgCACQgCACgFAMIgSAvQgGASgDAEQgFAFgHAAQgGAAgDgDg");
	this.shape.setTransform(80.475,30.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AAHAfQgEgCAAgGQgKALgKAAQgGgBgDgDQgDgEAAgFQgBgIAHgFQAGgGAUgJIAAgGQAAgIgBgBQAAgBAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgFAAgDACQgBAAAAABQAAAAgBAAQAAAAAAABQAAAAAAABIACADQADADgBADQAAADgCACQgCADgFAAQgDAAgEgDQgDgCAAgDQAAgGAFgEQADgEAIgDQAGgDAHAAQAJABAGAEQAEADACAFQABADAAAKIAAAYIABAGIAAABIACABQABAAAAgBQAAAAABAAQAAAAABgBQAAAAABgBIACACQgDAFgFACQgDACgFABQgFgBgDgCgAgJAHQgCAEAAAEQAAADACACQABABAAAAQABAAAAAAQABABABAAQAAAAABAAQAEAAADgEIAAgUQgHADgFAGg");
	this.shape_1.setTransform(73.7,28.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgQAuIAAgCQAEAAACgDQABgBAAgHIAAhBQAAgHgBgCQgCgCgEAAIAAgCIAZAAIAABOQAAAHACACQACACAEAAIAAACg");
	this.shape_2.setTransform(68.125,27.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AgiAwIAAgDQAFAAACgCQABgCAAgGIAAhCQAAgIgBgBQgCgCgFgBIAAgCIAbAAIAAAIQAEgFADgCQAEgDAGAAQAHAAAGAEQAGAFADAIQADAIAAAJQAAAJgEAIQgDAHgGAFQgGAEgHAAQgFAAgEgDQgDgBgEgEIAAAXIABAHQAAAAABABQAAAAAAABQAAAAABAAQAAAAAAAAIAGABIAAADgAgHgcIAAAhQAGAIAGAAQADAAADgEQADgFAAgQQAAgQgDgHQgDgDgEAAQgGgBgFALg");
	this.shape_3.setTransform(62.025,29.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("AgUAXQgGgJAAgNQAAgPAJgJQAIgKALAAQAKAAAHAIQAHAIABAQIgiAAQAAAMAGAHQAEAGAHgBQAEAAADgCIAHgIIADABQgGALgGAFQgGAEgIAAQgOAAgHgLgAgEgZQgEAGAAALIAAACIASAAIgBgPQgCgEgCgCQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQgDAAgCAEg");
	this.shape_4.setTransform(55.325,28.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AAVAuIgdgqIgGAAIAAAaQAAAIABABIADAEQACABAGAAIAAACIgvAAIAAgCIAJgBIADgEQABgBAAgIIAAg7QAAgIgBgCIgDgDIgJgBIAAgCIArAAQAQAAAIACQAIACAFAGQAEAHAAAIQABAKgIAHQgFADgIACIAWAgIAGAHQADADAEAAIAAACgAgOAAIADAAQAKAAAEgCQAEgBAEgFQACgEAAgIQAAgKgFgFQgFgFgKAAIgHAAg");
	this.shape_5.setTransform(47.25,27.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_6.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.Refresh_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FF0000").s().p("AgfAyQgDgEAAgFQAAgEACgDQADgDAEAAQAEAAACACQADADAAAFIABAEIABABQABAAAAAAQABgBAAAAQABAAAAgBQABAAAAgBQAEgDADgMIADgGIgXg1QgGgMgDgDQgCgDgEgBIAAgDIAmAAIAAADQgCAAgCACQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABQAAADAEAJIAMAcIAIgWQAEgMAAgEQABgDgCgCQgCgCgFAAIAAgDIAZAAIAAADQgEAAgDADQgCACgFAOIgVA1QgHAVgDAEQgGAHgIAAQgHAAgEgEg");
	this.shape.setTransform(82,30.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AAIAjQgEgDgBgGQgMAMgLAAQgGAAgEgEQgEgEAAgGQAAgIAHgIQAHgGAXgKIAAgIIAAgKIgDgDQgCgCgDAAQgGAAgDACQAAAAgBABQAAAAAAABQgBAAAAABQAAAAAAAAIACAFQADADAAADQAAADgDADQgCADgFAAQgFAAgDgDQgEgDAAgEQAAgGAFgFQAEgFAIgDQAIgCAIAAQAKAAAGAEQAGAFACAFQABADAAAMIAAAbIABAHIABABIACABQACAAACgDIACACQgEAGgEACQgEADgFAAQgHAAgDgDgAgKAIQgDAEAAAFQAAADADADQACACADAAQAEAAAEgFIAAgXQgIAFgFAGg");
	this.shape_1.setTransform(74.225,28.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgTA1IAAgDQAFAAACgCQACgCAAgIIAAhLQAAgIgCgCQgCgCgFAAIAAgDIAeAAIAABaQAAAIACACQABACAGAAIAAADg");
	this.shape_2.setTransform(67.875,27.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AgmA3IAAgDQAEAAADgDQACgCAAgHIAAhNQAAgHgCgCQgDgCgEgBIAAgCIAeAAIAAAJQAEgFAEgDQAFgEAGAAQAIABAHAEQAGAFAEAKQAEAIAAALQAAAKgEAJQgEAJgGAFQgHAEgJAAQgGAAgEgCQgDgCgFgFIAAAbIABAIIADADQABABAFAAIAAADgAgIghIAAAmQAHAJAHAAQAEAAADgDQAEgIgBgQQAAgUgEgHQgDgEgFAAQgGAAgGALg");
	this.shape_3.setTransform(60.9,30.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgXAaQgHgKAAgPQAAgRAKgLQAKgLAMAAQAMABAIAIQAIAKABARIgoAAQABAOAHAIQAFAHAHAAQAFAAAEgDQADgDAFgGIADACQgGALgIAFQgHAGgJgBQgPAAgJgMgAgEgdQgFAIAAAMIAAACIAUAAQAAgMgBgFQgBgFgDgCQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBAAgBgBQgDAAgCAEg");
	this.shape_4.setTransform(53.225,29);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AAXA1IghgwIgHAAIAAAdQAAAJACACQABADACABIAKABIAAADIg2AAIAAgDIAKgBQACgCACgCQABgCAAgJIAAhDQAAgJgBgCQgBgBAAAAQAAgBgBAAQAAgBgBAAQAAAAgBgBQgDgBgHAAIAAgDIAxAAQASAAAKADQAIACAGAIQAFAGABALQAAALgJAIQgGADgJADIAZAkIAIAJQADACAEAAIAAADgAgRAAIAFAAQALAAAEgCQAFgCAEgFQADgFAAgIQAAgNgGgFQgGgGgLAAIgJAAg");
	this.shape_5.setTransform(44,27.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_6.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.OdaNobunaga_Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Oda Nobunaga_Button
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAABAAQAAABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape.setTransform(99.975,27.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgOAoQgGgCgDgCQgDgDAAgDQAAAAAAgBQABgBAAAAQAAgBAAAAQABgBAAAAQACgDAGgBQgIgEAAgGQAAgFADgDQADgEAHgCQgIgDgDgFQgEgEAAgGQAAgIAHgGQAGgGALAAQAEAAAGACIASAAIAAAHIgKAAQADACABADQABADAAADQAAAGgDAFQgDAEgGACQgFADgEAAIgHgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQABABAEAAIAJAAQAMAAAFADQAHADAAAIQAAAFgDAEQgEAEgEACQgIADgJAAQgHAAgGgBgAgNAYQgDACAAADQAAADAEADQADACAJAAQAIAAAEgCQAFgCAAgEIgBgDIgFgCIgQgBIgIABgAgHghQgCADAAALQAAAJACADQACADAEAAQACAAACgDQADgDAAgJQAAgLgDgEQgCgDgCAAQgEAAgCAEg");
	this.shape_1.setTransform(93.925,28.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_2.setTransform(87.975,27.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AACAcIAAgCQADAAACgCQABgCAAgGIAAgXIgBgJIgCgCIgDgBQgEAAgEAHIAAAcIABAIQAAABABAAQAAAAABAAQAAABABAAQABAAABAAIAAACIgcAAIAAgCQADAAABgCQABgBAAgHIAAgeQAAgGgBgBQgBgCgDAAIAAgDIAWAAIAAAIQAEgFADgCQAEgCAEAAQAFAAAEADQAEADABAEQABADAAAKIAAAUQAAAHABABQAAABABAAQAAAAABAAQAAABABAAQABAAAAAAIAAACg");
	this.shape_3.setTransform(81.5,27.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgRAaQgDgDgBgEQgCgEAAgJIAAgVQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAkIAAAIIACADIADAAIADgBQACgBADgFIAAgcQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAqQAAAGABACQABABAEABIAAACIgXAAIAAgIQgEAFgDACQgDACgFAAQgFAAgEgCg");
	this.shape_4.setTransform(74.825,27.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgEAnQgEgBgDgEIgJAGIgCAAIAAhEIgBgGIgBgDIgFgBIAAgCIAYAAIAAAeQAFgGAJAAQAFAAAFADQAFADADAGQACAFABAJQgBAIgDAHQgDAIgHAEQgFADgIAAQgDAAgEgBgAgFgEIAAAYIAAAJQAAADACACQACACADABQADAAACgCQADgCABgFIABgSQAAgMgDgEQgCgEgEAAQgEAAgEAGg");
	this.shape_5.setTransform(68.05,26.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AgSAVQgGgJAAgMQAAgLAGgIQAHgJALAAQAHAAAGAEQAGADADAIQADAGABAHQAAAMgGAHQgHAKgNAAQgLAAgHgIgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCACgEQABgGAAgPIgBgOQgCgEgCgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_6.setTransform(61.85,27.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AAdApIg1hCIAAAyQAAAHADACQADADAEAAIACAAIAAACIgcAAIAAgCQAHAAACgDQADgDAAgGIAAg3IgCgCIgEgEIgGgCIAAgCIAcAAIAmAxIAAgiQAAgHgCgCQgDgEgGAAIAAgCIAaAAIAAACIgHACIgCAEIgBAHIAABCg");
	this.shape_7.setTransform(54.475,26.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_8.setTransform(44.375,27.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AAHAgIgHAHQgDABgEAAQgLABgGgKQgFgIAAgKQAAgKADgFQADgHAGgEQAFgDAGAAQAEAAACABQADABAEAEIAAgQIgBgHIgCgDIgEgBIAAgDIAXAAIAAA/IAAAHIACADIAFABIAAACIgXAEgAgHgKQgCACgBAFIgBANQAAALABAEQACAGACABIAEABQAEABAFgJIAAgcQgFgHgFgBIgEABg");
	this.shape_9.setTransform(37.975,26.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AggAbQgJgMAAgPQAAgRAMgMQAMgMARABQATgBALAMQAMAMAAARQAAAOgJAMQgLAPgWAAQgUAAgMgOgAgPgZQgFAJAAAQQAAAUAHAKQAFAHAIAAQAGAAAEgDQAFgEADgIQADgIAAgOQAAgOgDgIQgDgIgEgDQgFgEgGAAQgKAAgFAMg");
	this.shape_10.setTransform(29.875,26.0712);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#990000").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_11.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.OdaNobunaga = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.OdaNobunagaSamurai_1();
	this.instance.setTransform(0,0,0.4655,0.4533);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,162,204);


(lib.ImagawaYoshimoto = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ImagawaYoshimotoSamurai_4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,304,450);


(lib.Imagawa_Yoshimoto_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AgSAVQgHgJABgMQgBgLAHgIQAHgJALAAQAHAAAGAEQAHADACAIQADAGAAAHQABAMgGAHQgHAKgNAAQgMAAgGgIgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABAAQABgCABgEQABgGAAgPIgBgOQAAgEgDgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape.setTransform(110.7,27.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgFAjQgEgDgBgDIAAgLIAAgdIgIAAIAAgCQAIgFAGgGQAEgFAEgIIABAAIAAAUIAOAAIAAAGIgOAAIAAAhIABAGQAAAAAAABQAAAAAAAAQABABAAAAQAAAAAAAAIADABQADAAADgGIADACQgGALgKAAQgEAAgEgDg");
	this.shape_1.setTransform(105.75,26.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgSAVQgHgJABgMQgBgLAHgIQAHgJALAAQAHAAAGAEQAHADADAIQACAGAAAHQABAMgGAHQgHAKgNAAQgMAAgGgIgAgEgVQgCABgBAIIgBARIACALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABAAQABgCABgEQABgGAAgPIgBgOQAAgEgDgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_2.setTransform(100.7,27.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AASAcIAAgCQADAAACgCIABgIIAAgWIgBgKIgCgDIgDAAIgFABIgFAGIAAAcQAAAGABACQABACAEAAIAAACIgbAAIAAgCIAEgBIABgCIABgHIAAgWIgBgKIgCgDIgDgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAABQgDABgDAFIAAAcQAAAGABACQABACAEAAIAAACIgcAAIAAgCQADAAACgCQABgBAAgHIAAgeQAAgGgBgBQgCgCgDAAIAAgDIAWAAIAAAIQAFgFADgCQAEgCAFAAQAFAAADACQADADACAFQAFgFAEgDQAEgCAFAAQAGAAADACQAEADABAEQABAEAAAJIAAAVQAAAHABABQABACAEAAIAAACg");
	this.shape_3.setTransform(92.775,27.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgOApIAAgCQAEAAACgCQABgCAAgGIAAgfQAAgFgCgCQgBgCgEAAIAAgCIAWAAIAAAqQAAAGACACQABABAEABIAAACgAgFgYQgDgDAAgDQAAgEADgDQACgDADAAQAEAAACADQADADAAAEQAAADgDADQgCADgEAAQgDAAgCgDg");
	this.shape_4.setTransform(86.075,25.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AACAoIAAgCQADgBABgCQABgBAAgGIAAgZIAAgHIgCgDIgDgBIgEACIgEAGIAAAcQAAAGABABQABACADABIAAACIgcAAIAAgCQAEgBABgCQABgBAAgGIAAg3QAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAgIAHgHQAEgCAEAAQAFAAAEADQADADABAEQACAEAAAIIAAAWQAAAGABACQABABAEABIAAACg");
	this.shape_5.setTransform(81.075,26.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AgJAaIgCAAQgBAAAAAAQAAAAgBABQAAAAAAABQgBAAAAABIgCAAIgBgUIACAAQACAIAFAEQAFADADAAQABAAAAAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgBgCIgHgGIgMgJQgEgFAAgFQAAgGAFgGQAEgFAIAAQADAAAFACIACABIACgBIACgCIACAAIABATIgCAAQgEgJgEgCQgDgDgDAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIACADQABACAIAGQAIAGADADQADAEAAAFQAAAFgDAEQgCAEgEADQgEACgFAAQgDAAgHgDg");
	this.shape_6.setTransform(75.4,27.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AgSAVQgGgJAAgMQAAgLAGgIQAHgJALAAQAHAAAGAEQAGADADAIQAEAGAAAHQAAAMgGAHQgIAKgMAAQgLAAgHgIgAgEgVQgCABgBAIIAAARIAAALQABAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCACgEQABgGAAgPIgBgOQgBgEgDgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_7.setTransform(70.05,27.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AgVAoIAAgCIAEAAQADAAACgCIADgCIAAgIIAAgQIgSghQgGgKgCgCQgCgBgEgBIAAgCIAmAAIAAACIgCAAIgFABQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAABQAAACAFAIIANAZIAOgWQAGgJAAgDQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAgBgBAAQgCgBgFgBIAAgCIAYAAIAAACQgEABgCACQgDACgGALIgRAcIAAATIAAAIIADACQACACADAAIAEAAIAAACg");
	this.shape_8.setTransform(64.075,26.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_9.setTransform(54.375,27.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF00").s().p("AAPAcIgPgnIgOAnIgDAAIgOgmIgGgMQgBgCgDgBIAAgCIAbAAIAAACIgDABIgCACIACAGIAIAUIAIgUIAAgCIgEgFIgEgCIAAgCIAbAAIAAACIgEABIgBACIACAGIAIAUIAHgSIABgGIgBgEQAAAAAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIAAgCIAQAAIAAACQAAAAgBAAQgBAAAAABQgBAAAAAAQgBABAAAAIgEAJIgQAqg");
	this.shape_10.setTransform(46.975,27.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF00").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_11.setTransform(39.825,27.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF00").s().p("AgOAoQgGgCgDgCQgDgDAAgDQAAAAAAgBQABgBAAAAQAAgBAAAAQABgBAAAAQACgDAGgBQgIgEAAgGQAAgFADgDQADgEAHgCQgIgDgDgFQgEgEAAgGQAAgIAHgGQAGgGALAAQAEAAAGACIASAAIAAAHIgKAAQADACABADQABADAAADQAAAGgDAFQgDAEgGACQgFADgEAAIgHgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQABABAEAAIAJAAQAMAAAFADQAHADAAAIQAAAFgDAEQgEAEgEACQgIADgJAAQgHAAgGgBgAgNAYQgDACAAADQAAADAEADQADACAJAAQAIAAAEgCQAFgCAAgEIgBgDIgFgCIgQgBIgIABgAgHghQgCADAAALQAAAJACADQACADAEAAQACAAACgDQADgDAAgJQAAgLgDgEQgCgDgCAAQgEAAgCAEg");
	this.shape_12.setTransform(33.775,28.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF00").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_13.setTransform(27.825,27.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF00").s().p("AASAcIAAgCQADAAACgCIABgIIAAgWIgBgKIgCgDIgDAAIgFABIgFAGIAAAcQAAAGABACQABACAEAAIAAACIgbAAIAAgCIAEgBIABgCIABgHIAAgWIgBgKIgCgDIgDgBQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAABQgDABgDAFIAAAcQAAAGABACQABACAEAAIAAACIgcAAIAAgCQADAAACgCQABgBAAgHIAAgeQAAgGgBgBQgCgCgDAAIAAgDIAWAAIAAAIQAFgFADgCQAEgCAFAAQAFAAADACQADADACAFQAFgFAEgDQAEgCAFAAQAGAAADACQAEADABAEQABAEAAAJIAAAVQAAAHABABQABACAEAAIAAACg");
	this.shape_14.setTransform(19.725,27.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF00").s().p("AgUAoIAAgCIADAAQADAAACgCIADgCIAAgIIAAgzIAAgIIgDgCQgCgCgDAAIgDAAIAAgCIApAAIAAACIgDAAQgDAAgDACIgCADQgBABAAAGIAAAzQAAAGABACIADACQACACADAAIADAAIAAACg");
	this.shape_15.setTransform(12.325,26.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_16.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.HojoUjiyasu = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.HojoUjiyasuSamurai_5();
	this.instance.setTransform(0,0,0.5,0.4533);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,162,204);


(lib.Hojo_Ujiyasu_Button = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FF9933").s().p("AgRAaQgDgDgBgEQgCgEAAgJIAAgVQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAkIAAAIIACADIADAAIADgBQACgBADgFIAAgcQAAgGgBgCQgBgBgEgBIAAgCIAXAAIAAAqQAAAGABACQABABAEABIAAACIgXAAIAAgIQgEAFgDACQgDACgFAAQgFAAgEgCg");
	this.shape.setTransform(92.475,26.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9933").s().p("AgJAaIgCAAQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAABIgCAAIgBgUIACAAQACAIAGAEQAEADADABQABAAAAgBQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgDgCgCIgHgGIgLgIQgEgFAAgGQAAgHAFgFQAEgFAIAAQADAAAFACIADABIABgBIACgCIACAAIABATIgCAAQgDgJgFgCQgDgDgDgBQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIACADQABACAIAGQAIAGADADQADAEAAAFQAAAFgDAEQgCAEgEADQgEACgFAAQgDAAgHgDg");
	this.shape_1.setTransform(86.85,26.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9933").s().p("AAGAaQgDgCAAgEQgJAJgIAAQgFAAgDgEQgDgDAAgEQAAgHAFgFQAFgFASgHIAAgFQAAgHgBgBIgCgDIgEgBQgEAAgCABIgCADIACADQACADAAACQAAADgCACQgCACgEAAQgDAAgDgCQgCgDAAgDQAAgEADgEQADgEAGgCQAGgCAGAAQAIAAAEAEQAFADABAEIABALIAAAUIAAAFIABACIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBABAAIABABQgDAFgDACQgDACgEAAQgFAAgCgDgAgHAGQgCADAAADQAAADACACQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAQADAAADgEIAAgRQgHADgDAFg");
	this.shape_2.setTransform(81.675,26.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9933").s().p("AgWAmQgDgDgBgEQABgDACgDQACgCACAAQADAAADACQABACAAAEIAAACIACABIADgCQACgCADgJIACgFIgSgnQgDgJgCgCQgCgCgDgBIAAgDIAcAAIAAADIgDABIgBADIADAIIAIAVIAHgQQADgJAAgDQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAQgBgCgDAAIAAgDIASAAIAAADQgBAAAAAAQgBAAgBABQAAAAgBAAQAAAAgBABIgFAMIgQAnQgFAQgCAEQgFAEgGAAQgEAAgDgCg");
	this.shape_3.setTransform(75.5,27.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF9933").s().p("AgOApIAAgCQAEAAACgCQABgCAAgGIAAgfQAAgFgCgCQgBgCgEAAIAAgCIAWAAIAAAqQAAAGACACQABABAEABIAAACgAgFgYQgDgDAAgDQAAgEADgDQACgDADAAQAEAAACADQADADAAAEQAAADgDADQgCADgEAAQgDAAgCgDg");
	this.shape_4.setTransform(70.875,24.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9933").s().p("AgMAzQgEgDAAgEQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAgBQAAAAABAAQAAAAABgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABIAAABIAAACIABADIACABIACgBIABgEIgBgEIAAgIIAAgOIAAghIAAgDQAAgEgBgBIgFgCIAAgCIAWAAIAAA4IgBALQgCAGgEADQgEAEgHAAQgHAAgDgDgAABglQgBgDAAgEQAAgDABgDQADgDAEAAQADAAADADQADADAAADQAAAEgDADQgDACgDAAQgEAAgDgCg");
	this.shape_5.setTransform(66.475,26.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF9933").s().p("AgQAmQgHgEgDgGQgEgGAAgJIAAgmIAAgJIgDgDQgCgBgFAAIAAgCIAoAAIAAACIgBAAQgFAAgBABQgBAAAAABQgBAAAAAAQAAABAAAAQgBABAAAAQgBACAAAHIAAAmQAAAKACAEQACADADACQAEADAFAAQAGAAAFgDQAEgDADgFQACgFAAgNIAAgfIgBgIIgDgDQgDgCgFAAIAAgCIAcAAIAAACIgCAAQgDAAgCACQgDABgBADIAAAHIAAAdQAAAOgCAGQgCAGgHAFQgHAGgMAAQgKAAgGgDg");
	this.shape_6.setTransform(60.875,25.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF9933").s().p("AgSAUQgGgIAAgMQAAgLAGgIQAHgJALAAQAHAAAGAEQAGADADAIQADAGAAAHQABAMgGAHQgHAKgNAAQgMAAgGgJgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCABgEQACgGAAgPIgCgOQgBgEgCgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_7.setTransform(50.5,26.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9933").s().p("AgMAzQgEgDAAgEQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAgBQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABIAAABIAAACIABADIACABIACgBIABgEIgBgEIAAgIIAAgOIAAghIAAgDQAAgEgBgBIgFgCIAAgCIAWAAIAAA4IgBALQgCAGgEADQgEAEgHAAQgHAAgDgDgAABglQgBgDAAgEQAAgDABgDQADgDAEAAQADAAADADQADADAAADQAAAEgDADQgDACgDAAQgEAAgDgCg");
	this.shape_8.setTransform(44.825,26.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF9933").s().p("AgSAUQgHgIABgMQgBgLAHgIQAHgJALAAQAHAAAGAEQAHADADAIQACAGAAAHQABAMgGAHQgHAKgNAAQgMAAgGgJgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAABAAQABgCABgEQABgGAAgPIgBgOQAAgEgDgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_9.setTransform(40.5,26.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF9933").s().p("AADAoIAAgCIADAAQADAAACgCQABAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABgCAAgGIAAgYIgbAAIAAAYIABAIIACACQACACAEAAIACAAIAAACIgpAAIAAgCIACAAQAEAAACgCIACgCIABgIIAAgzIgBgIIgCgCQgCgCgEAAIgCAAIAAgCIApAAIAAACIgCAAQgEAAgCACIgCADIgBAHIAAAWIAbAAIAAgWQAAgGgBgCIgCgCQgCgCgDAAIgDAAIAAgCIApAAIAAACIgCAAQgEAAgCACIgCADIgBAHIAAAzIABAIIADACQACACADAAIACAAIAAACg");
	this.shape_10.setTransform(32.825,25.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000066").s().p("ApwEOIAAobIThAAIAAIbg");
	this.shape_11.setTransform(62.5,26.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,125,54);


(lib.ExploreMoreButton = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#0000FF").s().p("AgRAUQgFgIAAgLQAAgMAIgJQAHgIAJAAQAIAAAGAHQAHAHAAANIgdAAQAAAKAFAHQAEAEAGAAQADAAADgCIAGgHIACACQgFAIgFAEQgGAEgGAAQgLAAgHgJgAgDgVQgEAFABAJIAAACIAPAAIgCgNQgBgDgCgCIgDgBQgCAAgCADg");
	this.shape.setTransform(81.55,44.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0000FF").s().p("AgXAcIAAgCQAEAAACgCQAAgBAAgIIAAgdIAAgGIgBgCIgFgBIAAgDIAXAAIAAANQAEgJAFgCQADgDAEAAQADAAACACQACACABAEQgBADgCADQAAAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgCIgCgCIgBgBIgEACQgCACgBADQgBAGAAAGIAAAMIAAAEIAAAEIABACIAFABIAAACg");
	this.shape_1.setTransform(76.45,44.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000FF").s().p("AgSAUQgHgIABgMQgBgLAHgIQAHgJALAAQAHAAAGAEQAHADADAIQACAGAAAHQABAMgGAHQgHAKgNAAQgMAAgGgJgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCABgEQABgGAAgPIgBgOQAAgEgDgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_2.setTransform(70.65,44.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0000FF").s().p("AANAoIAAgCIACAAQAEAAACgCQABAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABgCAAgGIAAg6IgdBIIgCAAIgfhHIAAA3IABAHQAAADADACQACACAGAAIAAACIgbAAIAAgCIAAAAIAFgBIAEgDIACgEIAAgGIAAgxIgBgIIgCgCQgCgCgEAAIgCAAIAAgCIAgAAIAVA0IAWg0IAgAAIAAACIgCAAQgEAAgCACIgCACIgBAIIAAAzIABAIIACACQACACAEAAIACAAIAAACg");
	this.shape_3.setTransform(61.975,43.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0000FF").s().p("AgRAUQgFgIAAgLQAAgMAHgJQAIgIAJAAQAIAAAHAHQAFAHABANIgdAAQAAAKAGAHQACAEAHAAQADAAADgCIAGgHIACACQgEAIgGAEQgGAEgGAAQgLAAgHgJgAgDgVQgDAFAAAJIAAACIAPAAIgBgNQgCgDgCgCIgDgBQgCAAgCADg");
	this.shape_4.setTransform(50.7,44.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0000FF").s().p("AgWAcIAAgCQADAAABgCQABgBAAgIIAAgdIAAgGIgCgCIgDgBIAAgDIAWAAIAAANQAEgJAEgCQAEgDAEAAQADAAADACQACACAAAEQAAADgCADQgBAAgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgDAAgDgCIgCgCIgCgBIgCACQgDACgCADQAAAGAAAGIAAAMIAAAEIAAAEIABACIAFABIAAACg");
	this.shape_5.setTransform(45.6,44.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0000FF").s().p("AgSAUQgGgIAAgMQAAgLAGgIQAHgJALAAQAHAAAGAEQAGADADAIQADAGABAHQAAAMgGAHQgHAKgNAAQgLAAgHgJgAgEgVQgCABgBAIIAAARIABALQAAAFACACQACACACAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQACgCACgEQABgGAAgPIgBgOQgCgEgCgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgCAAgCADg");
	this.shape_6.setTransform(39.8,44.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0000FF").s().p("AgOAoIAAgCQAEAAACgCQABgCAAgGIAAg3QAAgGgCgCQgBgBgEgBIAAgCIAWAAIAABDQAAAGACACQABABAEABIAAACg");
	this.shape_7.setTransform(35.175,43.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0000FF").s().p("AgcApIAAgCQADAAABgCQACgBAAgGIAAg5QAAgGgCgBQgBgCgDAAIAAgDIAWAAIAAAIQADgEADgCQAEgDAFAAQAGAAAFAEQAEADADAIQADAGgBAIQABAIgDAGQgDAHgFADQgFAEgGAAQgEAAgEgCQgCgCgEgDIAAAVIABAFIACADIAEAAIAAACgAgGgYIAAAcQAFAHAFAAQADAAADgDQACgFAAgNQABgOgEgGQgDgDgDAAQgFAAgEAJg");
	this.shape_8.setTransform(30,45.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0000FF").s().p("AgCAbIAAgCIAEAAIABgCIgCgGIgFgJIgDAHIgEAEIAAADIAAACIACABIAEAAIAAACIgWAAIAAgCQAEAAADgCQAEgCAGgKIAFgGIgJgQIgHgLQgDgCgDAAIAAgDIAeAAIAAADIgCAAIgCABIgBACIABABIABADIAEAIIACgDQAFgGAAgDIgBgCIgEgBIAAgDIATAAIAAADQgDAAgDACQgEACgDAGIgGAJIAJARQAFAKADACQABAAAAABQABAAAAAAQABAAAAAAQABAAABAAIAAACg");
	this.shape_9.setTransform(23.85,44.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0000FF").s().p("AgjAoIAAgCIADAAQADAAACgCIADgCIAAgIIAAgzIAAgHIgDgDQgCgCgDAAIgDAAIAAgCIBCAAIAAAYIgDAAQgCgJgDgEQgCgDgHgCIgLgBIgIAAIAAAgIACAAQAGAAADgFQAEgEABgKIADAAIAAApIgDAAQgBgHgCgEQgCgEgDgCQgDgBgFAAIAAAWQAAAHABABIACACIAEABIAEAAQAMAAAGgFQAHgFADgLIACAAIgEAag");
	this.shape_10.setTransform(16.65,43.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AnpHMIAAuXIPTAAIAAOXg");
	this.shape_11.setTransform(49,46);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,98,92);


(lib.Background2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.KiyomizuDera();
	this.instance.setTransform(0,0,0.625,0.3515);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


(lib.Background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Mount_Fuji_jpg
	this.instance = new lib.MountFuji();
	this.instance.setTransform(0,0,0.625,0.7034);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Background, new cjs.Rectangle(0,0,800,600), null);


(lib.MountFujiBackground = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background();
	this.instance.setTransform(400,300,1,1,0,0,0,400,300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,800,600);


// stage content:
(lib.Joshua_project = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,39,49,64,65,89];
	// timeline functions:
	this.frame_0 = function() {
		playSound("Samuraiwav");
	}
	this.frame_39 = function() {
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
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndStopAtFrame.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame()
		{
			this.gotoAndStop(5);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_9.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_9()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Click to Go to Web Page of Oda Nobunaga
		
		*/
		
		this.Oda_Nobunaga_Button.addEventListener("click", fl_ClickToGoToWebPage_10);
		
		function fl_ClickToGoToWebPage_10() {
			window.open("https://en.wikipedia.org/wiki/Oda_Nobunaga", "_blank");
		}
		
		/* Click to Go to Web Page of Toyotomi Hideyoshi
		
		*/
		
		this.Toyotomi_Hideyoshi_Button.addEventListener("click", fl_ClickToGoToWebPage_11);
		
		function fl_ClickToGoToWebPage_11() {
			window.open("https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi", "_blank");
		}
		
		/* Click to Go to Web Page of Tokugawa Ieyasu
		
		*/
		
		this.Tokugawa_Ieyasu_Button.addEventListener("click", fl_ClickToGoToWebPage_12);
		
		function fl_ClickToGoToWebPage_12() {
			window.open("https://en.wikipedia.org/wiki/Tokugawa_Ieyasu", "_blank");
		}
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_10.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_10()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Refresh_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_11.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_11()
		{
			this.gotoAndPlay(5);
		}
		
		
		/* Double Click Event
		Write your custom code in the function.
		*/
		
		this.Explore_Button.addEventListener("dblclick",function(){
			alert("clicked");
		});
		
		/* Double Click Event
		Write your custom code in the function.
		*/
		
		this.Explore_Button.addEventListener("dblclick",function(){
			alert("clicked");
		});
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.Explore_Button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_12.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_12()
		{
			this.gotoAndPlay(50);
		}
		
		
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop(40);
	}
	this.frame_49 = function() {
		this.Replay_Button_2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_14.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_14()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_64 = function() {
		/* Click to Go to Web Page of Imagawa Yoshimoto
		
		*/
		
		this.Imagawa_Yoshimoto_Button.addEventListener("click", fl_ClickToGoToWebPage_13);
		
		function fl_ClickToGoToWebPage_13() {
			window.open("https://en.wikipedia.org/wiki/Imagawa_Yoshimoto");
		}
	}
	this.frame_65 = function() {
		/* Click to Go to Web Page of Hojo Ujiyasu
		
		*/
		
		this.Hojo_Ujiyasu_Button.addEventListener("click", fl_ClickToGoToWebPage_14);
		
		function fl_ClickToGoToWebPage_14() {
			window.open("https://en.wikipedia.org/wiki/H%C5%8Dj%C5%8D_Ujiyasu");
		}
		
		/* Click to Go to WebPages of Takeda Shingen and Uesugi Kenshin
		
		*/
		
		this.Takeda_Shingen_Button.addEventListener("click", fl_ClickToGoToWebPage_15);
		
		function fl_ClickToGoToWebPage_15() {
			window.open("https://en.wikipedia.org/wiki/Takeda_Shingen");
		}
		
		
		this.Uesugi_Kenshin_Button.addEventListener("click", fl_ClickToGoToWebPage_16);
		
		function fl_ClickToGoToWebPage_16() {
			window.open("https://en.wikipedia.org/wiki/Uesugi_Kenshin");
		}
		
		/* Click to Go to Frame and Play back to Page 1
		
		*/
		
		this.Replay_Button_2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_16.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_16()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_89 = function() {
		/* This Frame is the end of the animation
		
		*/
		
		this.stop(90);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(39).call(this.frame_39).wait(10).call(this.frame_49).wait(15).call(this.frame_64).wait(1).call(this.frame_65).wait(24).call(this.frame_89).wait(1));

	// Replay_Button_2
	this.Replay_Button_2 = new lib.ReplayButton2();
	this.Replay_Button_2.name = "Replay_Button_2";
	this.Replay_Button_2.setTransform(-82.45,567.85,1,1,0,0,0,62.5,26.9);
	this.Replay_Button_2._off = true;
	new cjs.ButtonHelper(this.Replay_Button_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Replay_Button_2).wait(49).to({_off:false},0).to({x:62.5,y:572.95},16).wait(25));

	// Uesugi_Kenshin_Button
	this.instance = new lib.Uesugi_Kenshin_Button();
	this.instance.setTransform(150.5,679.95);
	this.instance._off = true;
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.Uesugi_Kenshin_Button = new lib.Uesugi_Kenshin_Button();
	this.Uesugi_Kenshin_Button.name = "Uesugi_Kenshin_Button";
	this.Uesugi_Kenshin_Button.setTransform(189.5,538.05);
	new cjs.ButtonHelper(this.Uesugi_Kenshin_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},49).to({state:[{t:this.Uesugi_Kenshin_Button}]},16).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(49).to({_off:false},0).to({_off:true,x:189.5,y:538.05},16).wait(25));

	// Samurai_7
	this.instance_1 = new lib.UesugiKenshin("synched",0);
	this.instance_1.setTransform(213,854.9,1,1,0,0,0,81,102);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(49).to({_off:false},0).to({x:253,y:421},16).wait(25));

	// Takeda_Shingen_Button
	this.instance_2 = new lib.Takeda_Shingen_Button();
	this.instance_2.setTransform(324.5,821);
	this.instance_2._off = true;
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.Takeda_Shingen_Button = new lib.Takeda_Shingen_Button();
	this.Takeda_Shingen_Button.name = "Takeda_Shingen_Button";
	this.Takeda_Shingen_Button.setTransform(492.5,538.05);
	new cjs.ButtonHelper(this.Takeda_Shingen_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},49).to({state:[{t:this.Takeda_Shingen_Button}]},16).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({_off:true,x:492.5,y:538.05},16).wait(25));

	// Samurai_6
	this.instance_3 = new lib.TakedaShingen("synched",0);
	this.instance_3.setTransform(391,702,1,1,0,0,0,81,102);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(49).to({_off:false},0).to({x:557,y:421},16).wait(25));

	// Hojo_Ujiyasu_Button
	this.instance_4 = new lib.Hojo_Ujiyasu_Button();
	this.instance_4.setTransform(0,640.1);
	this.instance_4._off = true;
	new cjs.ButtonHelper(this.instance_4, 0, 1, 1);

	this.Hojo_Ujiyasu_Button = new lib.Hojo_Ujiyasu_Button();
	this.Hojo_Ujiyasu_Button.name = "Hojo_Ujiyasu_Button";
	this.Hojo_Ujiyasu_Button.setTransform(656.95,216);
	new cjs.ButtonHelper(this.Hojo_Ujiyasu_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},49).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.Hojo_Ujiyasu_Button}]},10).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(49).to({_off:false},0).to({x:521,y:454.1},3).to({x:537,y:0},2).to({x:816.95,y:255},1).to({_off:true,x:656.95,y:216},10).wait(25));

	// Samurai_5
	this.instance_5 = new lib.HojoUjiyasu("synched",0);
	this.instance_5.setTransform(-100.95,702,1,1,0,0,0,81,102);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(49).to({_off:false},0).to({x:927.95,y:102},5).to({x:559},9).to({x:719},2).wait(25));

	// Imagawa_Yoshimoto_Button
	this.instance_6 = new lib.Imagawa_Yoshimoto_Button();
	this.instance_6.setTransform(675,613.05);
	this.instance_6._off = true;
	new cjs.ButtonHelper(this.instance_6, 0, 1, 1);

	this.Imagawa_Yoshimoto_Button = new lib.Imagawa_Yoshimoto_Button();
	this.Imagawa_Yoshimoto_Button.name = "Imagawa_Yoshimoto_Button";
	this.Imagawa_Yoshimoto_Button.setTransform(20,220.1);
	new cjs.ButtonHelper(this.Imagawa_Yoshimoto_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},49).to({state:[{t:this.Imagawa_Yoshimoto_Button}]},15).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(49).to({_off:false},0).to({_off:true,x:20,y:220.1},15).wait(26));

	// Samurai_4
	this.instance_7 = new lib.ImagawaYoshimoto("synched",0);
	this.instance_7.setTransform(893.95,702.05,0.5329,0.4533,0,0,0,152,225.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(49).to({_off:false},0).to({x:85,y:102.05},15).wait(26));

	// Kiyomizu_Dera_Background
	this.instance_8 = new lib.Background2("synched",0);
	this.instance_8.setTransform(1200.95,300,1,1,0,0,0,400,300);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(49).to({_off:false},0).to({x:-403.9},10).to({x:400},5).wait(26));

	// Explore_Button
	this.instance_9 = new lib.ExploreMoreButton();
	this.instance_9.setTransform(751,-46,1,1,0,0,0,49,46);
	new cjs.ButtonHelper(this.instance_9, 0, 1, 1);

	this.Explore_Button = new lib.ExploreMoreButton();
	this.Explore_Button.name = "Explore_Button";
	this.Explore_Button.setTransform(751,46,1,1,0,0,0,49,46);
	new cjs.ButtonHelper(this.Explore_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).to({state:[{t:this.Explore_Button}]},39).to({state:[]},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:true,y:46},39).wait(51));

	// Title
	this.instance_10 = new lib.Title("synched",0);
	this.instance_10.setTransform(-225.3,128,1,1,0,0,0,177.3,56);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({x:407.95,y:100},14).to({x:406.6,y:56},5).wait(15).to({startPosition:0},0).to({_off:true},6).wait(50));

	// Refresh_Button
	this.Refresh_Button = new lib.Refresh_Button();
	this.Refresh_Button.name = "Refresh_Button";
	this.Refresh_Button.setTransform(62.5,-46.05,1,1,0,0,0,62.5,26.9);
	this.Refresh_Button._off = true;
	new cjs.ButtonHelper(this.Refresh_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Refresh_Button).wait(34).to({_off:false},0).to({y:26.9},3).to({_off:true},3).wait(50));

	// Oda_Nobunaga_Button
	this.Oda_Nobunaga_Button = new lib.OdaNobunaga_Button();
	this.Oda_Nobunaga_Button.name = "Oda_Nobunaga_Button";
	this.Oda_Nobunaga_Button.setTransform(-213.5,330.9,1,1,0,0,0,62.5,26.9);
	new cjs.ButtonHelper(this.Oda_Nobunaga_Button, 0, 1, 2, false, new lib.OdaNobunaga_Button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.Oda_Nobunaga_Button).to({x:413.05,y:341.55},24).to({x:139.75,y:556.25},5).to({_off:true},11).wait(50));

	// Toyotomi_Hideyoshi_Button
	this.Toyotomi_Hideyoshi_Button = new lib.Toyotomi_Hideyoshi_Button();
	this.Toyotomi_Hideyoshi_Button.name = "Toyotomi_Hideyoshi_Button";
	this.Toyotomi_Hideyoshi_Button.setTransform(393.5,640.9,1,1,0,0,0,62.5,26.9);
	new cjs.ButtonHelper(this.Toyotomi_Hideyoshi_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Toyotomi_Hideyoshi_Button).to({x:390.5,y:146.95},27).to({x:381.5,y:556.25},6).to({_off:true},7).wait(50));

	// Tokugawa_Ieyasu_Button
	this.Tokugawa_Ieyasu_Button = new lib.Tokugawa_Ieyasu_Button();
	this.Tokugawa_Ieyasu_Button.name = "Tokugawa_Ieyasu_Button";
	this.Tokugawa_Ieyasu_Button.setTransform(883.45,640.9,1,1,0,0,0,62.5,26.9);
	new cjs.ButtonHelper(this.Tokugawa_Ieyasu_Button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Tokugawa_Ieyasu_Button).to({x:62.5,y:26.9},4).to({x:741.5,y:572.95},15).to({x:883.45,y:640.9},10).to({x:675.45,y:556.25},3).to({x:651.45},2).to({_off:true},6).wait(50));

	// Samurai_3
	this.instance_11 = new lib.TokugawaIeyasu("synched",0);
	this.instance_11.setTransform(-100.95,105,0.4337,0.4667,0,0,0,166,225);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(19).to({_off:false},0).to({x:655.95,y:458.95},8).to({x:728,y:308},2).to({x:655.95,y:410.3},4).to({x:648.95},1).to({_off:true},6).wait(50));

	// Samurai_2
	this.instance_12 = new lib.ToyotomiHideyoshi("synched",0);
	this.instance_12.setTransform(396,709.9,1,1,0,0,0,81,102);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(19).to({_off:false},0).to({x:399,y:224.95},5).to({x:391,y:374.95},5).to({x:385,y:376.95},5).to({_off:true},6).wait(50));

	// Samurai_1
	this.instance_13 = new lib.OdaNobunaga("synched",0);
	this.instance_13.setTransform(-169.3,487.95,1,1,0,0,0,81,102);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(19).to({_off:false},0).to({x:129.35,y:102},5).to({x:141.35,y:407.3},5).wait(5).to({startPosition:0},0).to({_off:true},6).wait(50));

	// Mount_Fuji_Background
	this.Mount_Fuji_Background = new lib.MountFujiBackground("synched",0);
	this.Mount_Fuji_Background.name = "Mount_Fuji_Background";
	this.Mount_Fuji_Background.setTransform(1216.95,300,1,1,0,0,0,400,300);

	this.timeline.addTween(cjs.Tween.get(this.Mount_Fuji_Background).to({x:904},4).to({x:623},5).to({x:400},5).to({_off:true},26).wait(50));

	// Samurai_Music
	this.instance_14 = new lib.an_Video({'id': 'instance_14', 'src':'', 'autoplay':true, 'controls':true, 'muted':false, 'loop':true, 'poster':'', 'preload':true, 'class':'video'});

	this.instance_14.setTransform(235.35,396.25,1,1,0,0,0,200,150);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({_off:true},2).wait(88));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-403.9,0,2020.9,956.9);
// library properties:
lib.properties = {
	id: '4E4DA788F98D2E4599B100F1EB13B95B',
	width: 800,
	height: 600,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Joshua_project_atlas_1.png?1715562172769", id:"Joshua_project_atlas_1"},
		{src:"sounds/Samuraiwav.mp3?1715562172818", id:"Samuraiwav"},
		{src:"https://code.jquery.com/jquery-3.4.1.min.js?1715562172818", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1715562172818", id:"sdk/anwidget.js"},
		{src:"components/video/src/video.js?1715562172818", id:"an.Video"}
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
an.compositions['4E4DA788F98D2E4599B100F1EB13B95B'] = {
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
function _updateVisibility(evt) {
	var parent = this.parent;
	var detach = this.stage == null || this._off || !parent;
	while(parent) {
		if(parent.visible) {
			parent = parent.parent;
		}
		else{
			detach = true;
			break;
		}
	}
	detach = detach && this._element && this._element._attached;
	if(detach) {
		this._element.detach();
		this.dispatchEvent('detached');
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	if(this._element && this._element._attached) {
		var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
		var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
		var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
		mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
		this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
		var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
		var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
		var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
		this._element.setProperty('transform', tx);
		this._element.setProperty('width', w);
		this._element.setProperty('height', h);
		this._element.update();
	}
}

function _tick(evt) {
	var stage = this.stage;
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}
function _componentDraw(ctx) {
	if(this._element && !this._element._attached) {
		this._element.attach($('#dom_overlay_container'));
		this.dispatchEvent('attached');
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