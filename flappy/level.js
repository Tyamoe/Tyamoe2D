var SCORE = 0;
var hSCORE = 0;
function makeLevel()
{
	console.log("Loading FLAPPy");

	InitStuff();
	InitGlobals();

	var title = new GameObject("title", ShaderType.TEXTURE, 12);
	title.transform = new Transform(TransformInput.POS_SCALE, 0, 3.5, 6, 2);
	title.mesh = new Mesh();
	title.sprite = new Sprite("flappy/flappy.png");

	AddObject(shaderTexture, title);

	// < END GAME SCREEN

	var gameover = new GameObject("gameover", ShaderType.TEXTURE, 12, null, false);
	gameover.transform = new Transform(TransformInput.POS_SCALE, 0, 3.5, 6, 2);
	gameover.mesh = new Mesh();
	gameover.sprite = new Sprite("flappy/gameoverText.png");

	AddObject(shaderTexture, gameover);

	var panel = new GameObject("panel", ShaderType.TEXTURE, 12, null, false);
	panel.transform = new Transform(TransformInput.POS_SCALE, 0, 0, 6, 3);
	panel.mesh = new Mesh();
	panel.sprite = new Sprite("flappy/panel.png");

	AddObject(shaderTexture, panel);

	var gold = new GameObject("medal", ShaderType.TEXTURE, 13, null, false);
	gold.transform = new Transform(TransformInput.POS_SCALE, -1.7, -0.25, 1.32, 1.32);
	gold.mesh = new Mesh();
	gold.sprite = new Sprite("flappy/gold.png");

	AddObject(shaderTexture, gold);

	var scoreT = new GameObject("scoreT", ShaderType.TEXTURE, 13, null, false);
	scoreT.transform = new Transform(TransformInput.POS_SCALE, 2.25, 0.29, 1, 1);
	scoreT.mesh = new Mesh();
	scoreT.sprite = new Sprite("canvas");
	scoreT.text = new Text("0", 72, "black", 200, Alignment.LEFT, 1);
	scoreT.behavior = new Behavior([], [initFuncText]);

	AddObject(shaderTexture, scoreT);

	var bestT = new GameObject("bestT", ShaderType.TEXTURE, 13, null, false);
	bestT.transform = new Transform(TransformInput.POS_SCALE, 2.25, -0.81, 1, 1);
	bestT.mesh = new Mesh();
	bestT.sprite = new Sprite("canvas");
	bestT.text = new Text("0", 72, "black", 200, Alignment.LEFT, 1);
	bestT.behavior = new Behavior([], [initFuncText]);

	AddObject(shaderTexture, bestT);

	// END GAME SCREEN >

	var playButton = new GameObject("playButton", ShaderType.TEXTURE, 12);
	playButton.transform = new Transform(TransformInput.POS_SCALE, 0, -3, 2, 1.3);
	playButton.mesh = new Mesh();
	playButton.sprite = new Sprite("flappy/playButton.png");
	playButton.button = new Button([playGameFunction], [], [interactFuncButtonHighlight]);
	playButton.audio = new Audible("flappy/swoosh.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, playButton);

	var pauseButton = new GameObject("pauseButton", ShaderType.TEXTURE, 12);
	pauseButton.transform = new Transform(TransformInput.POS_SCALE, 3.6, -7.0, 1, 1);
	pauseButton.mesh = new Mesh();
	pauseButton.sprite = new Sprite("flappy/pauseButton.png");
	pauseButton.button = new Button([pauseGameFunction], [], [interactFuncButtonHighlight]);
	pauseButton.audio = new Audible("flappy/swoosh.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, pauseButton);

	var muteButton = new GameObject("muteButton", ShaderType.TEXTURE, 12);
	muteButton.transform = new Transform(TransformInput.POS_SCALE, -3.6, -7.0, 1, 1);
	muteButton.mesh = new Mesh();
	muteButton.sprite = new Sprite("flappy/unmutedButton.png");
	muteButton.button = new Button([globalMuteFunction], [], [interactFuncButtonHighlight]);
	muteButton.audio = new Audible("flappy/swoosh.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, muteButton);

	var scoreText = new GameObject("scoreText", ShaderType.TEXTURE, 12);
	scoreText.transform = new Transform(TransformInput.POS_SCALE, -3.7, 7.2, 1, 1);
	scoreText.mesh = new Mesh();
	scoreText.sprite = new Sprite("canvas");
	scoreText.text = new Text("0", 72, "black", 200, Alignment.LEFT, 1);
	scoreText.behavior = new Behavior([scoreTextUpdateFunction], [initFuncText]);
	scoreText.audio = new Audible("flappy/point.wav", AudioStyle.CONSTANT, AudioState.ALL, false, false, 0.6);

	AddObject(shaderTexture, scoreText);

	player = new GameObject("player", ShaderType.TEXTURE, 7);
	player.transform = new Transform(TransformInput.POS_SCALE, -1, 0, 1.2, 1);
	player.mesh = new Mesh();
	player.sprite = new Sprite("flappy/bird_blue.png");
	player.physics = new Physics();
	player.collider = new Collider(ColliderType.CIRCLE, [playerCollisionFunc], [0.8, 0.9]);
	player.behavior = new Behavior([playerUpdateFunction], []);
	player.audio = new Audible("flappy/wing.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	player.animation = new Animation(3, 1, [35, 24], true, [0.2, 0.22, 0.2]);
	player.animation.running = true;

	AddObject(shaderTexture, player);

	var ground = new GameObject("ground", ShaderType.TEXTURE, 6);
	ground.transform = new Transform(TransformInput.POS_SCALE, 5.6, -6.2, 20, 3);
	ground.mesh = new Mesh();
	ground.sprite = new Sprite("flappy/ground.png");
	ground.behavior = new Behavior([groundUpdateFunction], []);
	ground.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	ground.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	ground.physics = new Physics();
	ground.physics.vel[0] = -1.5;

	AddObject(shaderTexture, ground);

	var ceiling = new GameObject("ceiling", ShaderType.COLOR, 8);
	ceiling.transform = new Transform(TransformInput.POS_SCALE, 0, 8, 9, 1);
	ceiling.mesh = new Mesh();
	ceiling.light = new Light([0, 0, 0, 0]);
	ceiling.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	ceiling.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderColor, ceiling);

	var pipeUp1 = new GameObject("pipeUp1", ShaderType.TEXTURE, 3);
	pipeUp1.transform = new Transform(TransformInput.ALL, 6, pipeUp[0], 1, pipeUp[1], 0);
	pipeUp1.mesh = new Mesh();
	pipeUp1.sprite = new Sprite("flappy/pipe-green.png");
	pipeUp1.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeUp1.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeUp1.physics = new Physics();
	pipeUp1.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeUp1);

	var pipeDown1 = new GameObject("pipeDown1", ShaderType.TEXTURE, 3, pipeUp1);
	pipeDown1.transform = new Transform(TransformInput.ALL, 6, pipeDown[0], 1, pipeDown[1], 180);
	pipeDown1.mesh = new Mesh();
	pipeDown1.sprite = new Sprite("flappy/pipe-green.png");
	pipeDown1.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeDown1.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeDown1.behavior = new Behavior([pipeUpdateFunction], []);
	pipeDown1.physics = new Physics();
	pipeDown1.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeDown1);

	var pipeUp2 = new GameObject("pipeUp2", ShaderType.TEXTURE, 3);
	pipeUp2.transform = new Transform(TransformInput.ALL, 11, pipeUp[2], 1, pipeUp[3], 0);
	pipeUp2.mesh = new Mesh();
	pipeUp2.sprite = new Sprite("flappy/pipe-green.png");
	pipeUp2.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeUp2.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeUp2.physics = new Physics();
	pipeUp2.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeUp2);

	var pipeDown2 = new GameObject("pipeDown2", ShaderType.TEXTURE, 3, pipeUp2);
	pipeDown2.transform = new Transform(TransformInput.ALL, 11, pipeDown[2], 1, pipeDown[3], 180);
	pipeDown2.mesh = new Mesh();
	pipeDown2.sprite = new Sprite("flappy/pipe-green.png");
	pipeDown2.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeDown2.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeDown2.behavior = new Behavior([pipeUpdateFunction], []);
	pipeDown2.physics = new Physics();
	pipeDown2.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeDown2);

	var pipeUp3 = new GameObject("pipeUp3", ShaderType.TEXTURE, 3);
	pipeUp3.transform = new Transform(TransformInput.ALL, 16, pipeUp[4], 1, pipeUp[5], 0);
	pipeUp3.mesh = new Mesh();
	pipeUp3.sprite = new Sprite("flappy/pipe-green.png");
	pipeUp3.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeUp3.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeUp3.physics = new Physics();
	pipeUp3.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeUp3);

	var pipeDown3 = new GameObject("pipeDown3", ShaderType.TEXTURE, 3, pipeUp3);
	pipeDown3.transform = new Transform(TransformInput.ALL, 16, pipeDown[4], 1, pipeDown[5], 180);
	pipeDown3.mesh = new Mesh();
	pipeDown3.sprite = new Sprite("flappy/pipe-green.png");
	pipeDown3.collider = new Collider(ColliderType.LINE, [ignoreNonPlayerCollision]);
	pipeDown3.audio = new Audible("flappy/hit.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	pipeDown3.behavior = new Behavior([pipeUpdateFunction], []);
	pipeDown3.physics = new Physics();
	pipeDown3.physics.vel[0] = -2;

	AddObject(shaderTexture, pipeDown3);

	var background = new GameObject("background", ShaderType.TEXTURE, 1);
	background.transform = new Transform(TransformInput.SCALE, 9, 16);
	background.mesh = new Mesh();
	background.sprite = new Sprite("flappy/background-day.png");
	background.behavior = new Behavior([], [gameInitFunction]);

	AddObject(shaderTexture, background);

	GameObjects.sort( function(a, b){return sortRenderLayers(a,b)} );
}

function EndGameScreen(onoff)
{
	if(SCORE > hSCORE)
	{
		hSCORE = SCORE;
	}

	GameObjects[oGet("playButton")].enabled = onoff;

	GameObjects[oGet("pauseButton")].enabled = !onoff;
	GameObjects[oGet("muteButton")].enabled = !onoff;
	GameObjects[oGet("scoreText")].enabled = !onoff;

	GameObjects[oGet("gameover")].enabled = onoff;
	GameObjects[oGet("panel")].enabled = onoff;
	GameObjects[oGet("scoreT")].enabled = onoff;
	GameObjects[oGet("bestT")].enabled = onoff;

	if(onoff)
	{
		GameObjects[oGet("scoreT")].text.text = "" + SCORE;
		GameObjects[oGet("bestT")].text.text = "" + hSCORE;

		GameObjects[oGet("scoreT")].behavior.initFunc[0](GameObjects[oGet("scoreT")]);
		GameObjects[oGet("bestT")].behavior.initFunc[0](GameObjects[oGet("bestT")]);

		GameObjects[oGet("medal")].enabled = onoff;
		if(SCORE >= 0 && SCORE < 10)
		{
			GameObjects[oGet("medal")].sprite.texture = medalBronzeTexture;
		}
		else if(SCORE > 10 && SCORE < 30)
		{
			GameObjects[oGet("medal")].sprite.texture = medalSilverTexture;
		}
		else if(SCORE > 30)
		{	
			GameObjects[oGet("medal")].sprite.texture = medalGoldTexture;
		}
	}
	else
	{
		GameObjects[oGet("medal")].enabled = onoff;
	}
	manager.isOutdated = true;
}

function resetLevel()
{
	SCORE = 0;

	player.transform = new Transform(TransformInput.POS_SCALE, -1, 0, 1.2, 1);
	player.physics = new Physics();
	vec2.set(player.physics.vel, 0, 0);
	player.collider.isColliding = false;
	player.animation.running = true;

	GameObjects[oGet("ground")].transform.pos[0] = -5.6;
	GameObjects[oGet("ground")].physics.vel[0] = -1.5;

	GameObjects[oGet("pipeUp1")].transform.pos[0] = 6;
	GameObjects[oGet("pipeUp1")].physics.vel[0] = -2;
	updateCollider(GameObjects[oGet("pipeUp1")]);

	GameObjects[oGet("pipeDown1")].transform.pos[0] = 6;
	GameObjects[oGet("pipeDown1")].physics.vel[0] = -2;
	GameObjects[oGet("pipeDown1")].behavior.toggle = 0;
	updateCollider(GameObjects[oGet("pipeDown1")]);

	GameObjects[oGet("pipeUp2")].transform.pos[0] = 11;

	GameObjects[oGet("pipeUp2")].physics.vel[0] = -2;
	updateCollider(GameObjects[oGet("pipeUp2")]);


	GameObjects[oGet("pipeDown2")].transform.pos[0] = 11;
	GameObjects[oGet("pipeDown2")].physics.vel[0] = -2;
	GameObjects[oGet("pipeDown2")].behavior.toggle = 0;
	updateCollider(GameObjects[oGet("pipeDown2")]);

	GameObjects[oGet("pipeUp3")].transform.pos[0] = 16;
	GameObjects[oGet("pipeUp3")].physics.vel[0] = -2;
	updateCollider(GameObjects[oGet("pipeUp3")]);

	GameObjects[oGet("pipeDown3")].transform.pos[0] = 16;
	GameObjects[oGet("pipeDown3")].physics.vel[0] = -2;
	GameObjects[oGet("pipeDown3")].behavior.toggle = 0;
	updateCollider(GameObjects[oGet("pipeDown3")]);
}