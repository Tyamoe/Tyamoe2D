var buttonPlayTexture = null;
var buttonPauseTexture = null;
var buttonMutedTexture = null;

var medalBronzeTexture = null;
var medalSilverTexture = null;
var medalGoldTexture = null;

var pipeDown = [];
var pipeUp = [];

function InitGlobals()
{
  buttonPlayTexture = makeTexture("flappy/playButton1.png");
  buttonPauseTexture = makeTexture("flappy/pauseButton.png");

  buttonMutedTexture = makeTexture("flappy/mutedButton.png");
  buttonUnmutedTexture = makeTexture("flappy/unmutedButton.png");

  medalBronzeTexture = makeTexture("flappy/bronze.png");
  medalSilverTexture = makeTexture("flappy/silver.png");
  medalGoldTexture = makeTexture("flappy/gold.png");

  /**************************** 0:1 **********************************/

  pipeUp.push(-4.1);
  pipeUp.push(2.2);

  pipeDown.push(4.1);
  pipeDown.push(7.2);

  /**************************** 2:3 **********************************/

  pipeUp.push(-2.0);
  pipeUp.push(5.5);

  pipeDown.push(5.9);
  pipeDown.push(3.6);

  /***************************** 4:5 ********************************/

  pipeUp.push(-1.4);
  pipeUp.push(6.6);

  pipeDown.push(6.5);
  pipeDown.push(2.5);

  /***************************** 6:7 *********************************/

  pipeUp.push(-3.0);
  pipeUp.push(4.6);

  pipeDown.push(5.0);
  pipeDown.push(5.4);
}