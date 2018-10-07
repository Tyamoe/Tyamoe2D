var gl;

var canvas = null;

var manager = null;

var shaders = [];
var GameObjects = [];

var texturesLoaded = 0;
var modelsLoaded = false;

var firefox = false;

var modelCount = 0;

function InitWebGL()
{
	canvas = document.getElementById('flappyCanvas');
	gl = canvas.getContext('webgl2');

	if (!gl) 
	{
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) 
	{
		alert('Your browser does not support WebGL');
		return;
	}

  gl.viewport(0, 0, canvas.width, canvas.height);
  
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.clearColor(0.1, 0.1, 0.1, 1.0);	  //Set clear color

	WebGlInitialized = true;

	manager = new GameManager();

  manager.mouse = new Mouse();
  manager.keyboard = new Keyboard();
  manager.camera = new Camera();
  
  manager.camera.update = [updateFuncStaticCamera];
  vec3.set(manager.camera.Pos, 0, 0, 0);
  vec3.set(manager.camera.Front, 0, 0, -1);
  vec3.set(manager.camera.Up, 0, 1, 0);

  makeLevel();

	console.log("Entering Game Loop");
  tick();
}