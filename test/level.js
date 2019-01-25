function makeLevel()
{
	console.log("Loading Level");

	InitStuff();
	//InitGlobals();
	
	var top = CornerTopLEFT[1];
	var left = CornerTopLEFT[0];
	var right = CornerTopRIGHT[0];





	var t1 = new GameObject("t1", ShaderType.TEXTURE, 12);
	t1.transform = new Transform(TransformInput.POS_SCALE, 0, 0, 19, 14);
	t1.mesh = new Mesh();
	t1.sprite = new Sprite("", false, true);
	//t1.behavior = new Behavior([drawUpdateFunction], []);

	//AddObject(shaderTexture, t1);






	player = new GameObject("player", ShaderType.TEXTURE, 7);
	player.transform = new Transform(TransformInput.POS_SCALE, -4, 0, 0.6, 0.9);
	player.mesh = new Mesh();
	player.sprite = new Sprite(["playerFaceRight.png", "playerFaceAway.png", "playerFaceToward.png", "playerFaceAwayDia.png", "playerFaceTowardDia.png"]);
	player.animation = new Animation(3, 2, [26, 33], true, 0.15, 1);
	player.animation.running = true;
	player.physics = new Physics(2.2, 4.0, [0, 0], true);
	player.occluder = new Occluder([0.1, 0.1]);
	player.collider = new Collider(ColliderType.LINE, [playerCollisionFunc]);
	player.particles = new Particles(false, 50, 0.5, Position.CENTER, LayerStyle.BEHIND, 0.7, [0.24, 0.47], [0.14, 0.27], [0.0, 0.01]);
	player.behavior = new Behavior([playerUpdateFunction, updateFuncOccluder, updateFuncParticles], [initFuncOccluder, initFuncParticles]);

	AddObject(shaderTexture, player);

	var light1 = new GameObject("light1", ShaderType.LIGHT, 5);
	light1.transform = new Transform(TransformInput.POS_SCALE, -5, 1, 3, 3);
	light1.mesh = new Mesh();
	light1.light = new Light([1.0, 0.8, 0.0, 0.3], 1.6, 0.0);
	light1.behavior = new Behavior([], [initFuncLight]);

	AddObject(shaderLight, light1);

	var muteButton = new GameObject("muteButton", ShaderType.COLOR, 12);
	muteButton.transform = new Transform(TransformInput.POS_SCALE, right - 2, top - 1, 1, 1);
	muteButton.mesh = new Mesh(meshLight);
	muteButton.light = new Light([1.0, 1.0, 0.0, 1.0]);
	muteButton.button = new Button([interactFuncToggleGlobalMute], null, [interactFuncButtonHighlight]);
	muteButton.audio = new Audible("misscoinSound2.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderColor, muteButton);

	var playButton1 = new GameObject("but", ShaderType.TEXTURE, 12);
	playButton1.transform = new Transform(TransformInput.POS_SCALE, right - 1, top - 1, 1, 1);
	playButton1.mesh = new Mesh();
	playButton1.sprite = new Sprite("pauseButton.png");
	playButton1.button = new Button([interactFuncTogglePlay], null, [interactFuncButtonHighlight]);
	playButton1.audio = new Audible("misscoinSound1.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, playButton1);

	var textTest = new GameObject("textTest", ShaderType.TEXTURE, 12);
	textTest.transform = new Transform(TransformInput.POS_SCALE, -3, 4, 1.5, 1);
	textTest.mesh = new Mesh();
	textTest.sprite = new Sprite("canvas");
	textTest.text = new Text("1337", 50, "green", 140, Alignment.LEFT, 1, "#FF0000", "black");
	textTest.behavior = new Behavior([], [initFuncText]);

	AddObject(shaderTexture, textTest);

	createMasks(shaderMask, shaderShadow);

	GameObjects.sort( function(a, b){return sortRenderLayers(a,b)} );
}

var sortRenderLayers = function(a, b)
{
	return (a.layer - b.layer);
}