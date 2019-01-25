var TransformInput = 
{
  BLANK: 1,
  POS: 2,
  SCALE: 3,
  ROTATION: 4,
  POS_SCALE: 5,
  POS_ROTATION: 6,
  ALL: 7,
};

var ColliderType = 
{
  CIRCLE: 1,
  LINE: 2,
};

var Orientation = 
{
  HORIZONTAL: 1,
  VERTICAL: 2,
  DIAGONAL: 3,
};

var Position = 
{
  CENTER: 1,
  LEFT: 2,
  RIGHT: 3,
  TOP: 4,
  BOTTOM: 5,
};

var Alignment = 
{
  CENTER: 1,
  LEFT: 2,
  RIGHT: 3,
};

var RenderPriority = 
{
  LOW: 0,
  MEDIUM: 3,
  HIGH: 10,
};

var LayerStyle = 
{
  BEHIND: -1,
  INFRONT: -2,
};

var MaterialType = 
{
  DIRT: 0,
  GRASS: 1,
  SAND: 4,
  COBBLE: 2,
  METAL: 3,
};

var AudioStyle = 
{
  CONSTANT: 0,
  DISTANCE: 1,
}

var AudioState = 
{
  ALL: 0,
  ALL_MENU_LOWER: 1,
  ALL_GAME_LOWER: 2,
  ONLY_GAME: 3,
  ONLY_MENU: 4,
}

var Stage = 
{
  MAIN: 0,
  PAUSE: 1,
  SETTINGS: 2,
  GAME: 3,
  SPECIAL: 14,
}

var GLOBAL_VOLUME = 1.0;

var MIN_SOUND_DISTANCE = 0.2;
var MAX_SOUND_DISTANCE = 70.0;

var VectorLEFT  = [-1,  0 ];
var VectorRIGHT = [ 1,  0 ];
var VectorUP    = [ 0,  1 ];
var VectorDOWN  = [ 0, -1 ];

var texturePath = "https://tyamoe.com/Tyamoe2D/images/";

var audioPath = "https://tyamoe.com/Tyamoe2D/audio/";

var shaderPath = "https://tyamoe.com/Tyamoe2D/shaders/";

var Lights = [];
var Occluders = [];

var player = null;

var shaderTexture = null;
var shaderLight = null;
var shaderColor = null;
var shaderMask = null;
var shaderShadow = null;
var shaderParticles = null;
var shaderSchmoke = null;

var ShaderType = 
{
  TEXTURE: 0,
  LIGHT: 1,
  COLOR: 2,
  MASK: 3,
  SHADOW: 4,
  PARTICLES: 5,
  SCHMOKE: 6,
};

var CornerTopLEFT  = [];
var CornerTopRIGHT = [];
var CornerBottomLEFT = [];
var CornerBottomRIGHT  = [];

var viewWidth = 0;
var viewHeight = 0;

function InitStuff()
{
  manager.camera.update[0]();
  resize();

  CornerTopLEFT  = convertScreenToWorld([0, 0]);
  CornerTopRIGHT = convertScreenToWorld([canvas.width, 0]);
  CornerBottomLEFT = convertScreenToWorld([0, canvas.height]);
  CornerBottomRIGHT  = convertScreenToWorld([canvas.width, canvas.height]);

  viewWidth = Math.abs(CornerTopLEFT[0]) + Math.abs(CornerBottomRIGHT[0]);
  viewHeight = Math.abs(CornerTopLEFT[1]) + Math.abs(CornerBottomRIGHT[1]);

  //console.log("viewWidth: " + viewWidth + " | viewHeight: " + viewHeight);

  shaderTexture = new Shader("Texture", makeShader("texture"));
  shaderLight = new Shader("Light", makeShader("light"));
  shaderColor = new Shader("Color", makeShader("color"));
  shaderMask = new Shader("Mask", makeShader("mask"));
  shaderShadow = new Shader("Shadow", makeShader("shadow"));
  shaderParticles = new Shader("Particles", makeShader("particles"));
  shaderSchmoke = new Shader("Schmoke", makeShader2("fog"));

  shaderAdd(shaderTexture);
  shaderAdd(shaderLight);
  shaderAdd(shaderColor);
  shaderAdd(shaderMask);
  shaderAdd(shaderShadow);
  shaderAdd(shaderParticles);
  shaderAdd(shaderSchmoke);
}