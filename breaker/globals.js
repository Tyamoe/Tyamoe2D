var Position = 
{
  CENTER: 1,
  LEFT: 2,
  RIGHT: 3,
  TOP: 4,
  BOTTOM: 5,
};

var buttonPlayTexture = null;
var buttonPauseTexture = null;
var buttonMutedTexture = null;
var buttonUnmutedTexture = null;

var brickBlue = null;
var brickBrown = null;
var brickGreen = null;
var brickGrey = null;
var brickOrange = null;
var brickPurple = null;
var brickRed = null;
var brickYellow = null;

function InitGlobals()
{
  buttonPlayTexture = makeTexture("breaker/playButton1.png");
  buttonPauseTexture = makeTexture("breaker/pauseButton.png");

  buttonMutedTexture = makeTexture("breaker/mutedButton.png");
  buttonUnmutedTexture = makeTexture("breaker/unmutedButton.png");
  
  brickBlue = makeTexture("breaker/brick_blue.png");
  brickBrown = makeTexture("breaker/brick_brown.png");
  brickGreen = makeTexture("breaker/brick_green.png");
  brickGrey = makeTexture("breaker/brick_grey.png");

  brickOrange = makeTexture("breaker/brick_orange.png");
  brickPurple = makeTexture("breaker/brick_purple.png");
  brickRed = makeTexture("breaker/brick_red.png");
  brickYellow = makeTexture("breaker/brick_yellow.png");
}