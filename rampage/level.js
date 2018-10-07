function makeLevel()
{
	console.log("Loading Level");

	InitStuff();
	InitGlobals();
	
	var top = CornerTopLEFT[1];
	var left = CornerTopLEFT[0];
	var right = CornerTopRIGHT[0];

	createGround(shaderTexture);

	var sideWall = new GameObject("sideWall", ShaderType.TEXTURE, 3);
	sideWall.transform = new Transform(TransformInput.POS, -2, 0);
	sideWall.mesh = new Mesh();
	sideWall.sprite = new Sprite("wallSide.png");
	//sideWall.collider = new Collider(ColliderType.LINE, [], [1.0, 1], true);
	sideWall.behavior = new Behavior([], []);

	AddObject(shaderTexture, sideWall);

	var wall1 = new GameObject("wall1", ShaderType.TEXTURE, 3);
	wall1.transform = new Transform(TransformInput.POS, -2, 1);
	wall1.mesh = new Mesh();
	wall1.sprite = new Sprite("wallCorner.png");
	wall1.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	wall1.behavior = new Behavior([], [initFuncHitboxDepth]);

	AddObject(shaderTexture, wall1);

	var wall2 = new GameObject("wall2", ShaderType.TEXTURE, 3);
	wall2.transform = new Transform(TransformInput.POS, -1, 1);
	wall2.mesh = new Mesh();
	wall2.sprite = new Sprite("wallFull.png");
	wall2.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	wall2.behavior = new Behavior([], [initFuncHitboxDepth]); 

	AddObject(shaderTexture, wall2);

	var wall3 = new GameObject("wall3", ShaderType.TEXTURE, 3);
	wall3.transform = new Transform(TransformInput.POS, 0, 1);
	wall3.mesh = new Mesh();
	wall3.sprite = new Sprite("wallFull.png");
	wall3.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	wall3.behavior = new Behavior([], [initFuncHitboxDepth]);

	AddObject(shaderTexture, wall3);

	var wall4 = new GameObject("wall4", ShaderType.TEXTURE, 3);
	wall4.transform = new Transform(TransformInput.POS, 1, 1);
	wall4.mesh = new Mesh();
	wall4.sprite = new Sprite("wallFull.png");
	wall4.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	wall4.behavior = new Behavior([], [initFuncHitboxDepth]);

	AddObject(shaderTexture, wall4);

	var wall5 = new GameObject("wall5", ShaderType.TEXTURE, 3);
	wall5.transform = new Transform(TransformInput.POS, 2, 1);
	wall5.mesh = new Mesh();
	wall5.sprite = new Sprite("wallCorner.png", true);
	wall5.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	wall5.behavior = new Behavior([], [initFuncHitboxDepth]);

	AddObject(shaderTexture, wall5);

	var sideWall2 = new GameObject("sideWall2", ShaderType.TEXTURE, 3);
	sideWall2.transform = new Transform(TransformInput.POS, 2, 0);
	sideWall2.mesh = new Mesh();
	sideWall2.sprite = new Sprite("wallSide.png", true);
	//sideWall2.collider = new Collider(ColliderType.LINE, [], [1.0, 0.4], true);
	sideWall2.behavior = new Behavior([], []);

	AddObject(shaderTexture, sideWall2);

	var shelf = new GameObject("shelf", ShaderType.TEXTURE, 4);
	shelf.transform = new Transform(TransformInput.POS, 0, 1);
	shelf.mesh = new Mesh();
	shelf.sprite = new Sprite("shelf.png");
	shelf.collider = new Collider(ColliderType.LINE, [], [0.7, 0.4], true);
	shelf.behavior = new Behavior([], [initFuncHitboxDepth]);

	AddObject(shaderTexture, shelf);

	player = new GameObject("player", ShaderType.TEXTURE, 7);
	player.transform = new Transform(TransformInput.POS_SCALE, -2, 0, 0.6, 0.9);
	player.mesh = new Mesh();
	player.sprite = new Sprite(["playerFaceRight.png", "playerFaceAway.png", "playerFaceToward.png", "playerFaceAwayDia.png", "playerFaceTowardDia.png"]);
	player.animation = new Animation(3, 2, [26, 33], true, 0.15, 1);
	player.animation.running = true;
	player.physics = new Physics(2.2, 4.0, [0, 0], true);
	player.occluder = new Occluder([0.1, 0.1]);
	player.collider = new Collider(ColliderType.LINE, [playerCollisionFunc]);
	player.particles = new Particles(false, 50, 0.1, Position.CENTER, LayerStyle.BEHIND, 0.7, [0.24, 0.47], [0.14, 0.27], [0.0, 0.01]);
	player.behavior = new Behavior([playerUpdateFunction, updateFuncOccluder, updateFuncParticles], [initFuncOccluder, initFuncParticles]);

	AddObject(shaderTexture, player);

	var sword = new GameObject("sword", ShaderType.TEXTURE, 8, player);
	sword.transform = new Transform(TransformInput.SCALE, 0.3, 0.6);
	sword.mesh = new Mesh();
	sword.sprite = new Sprite("sword.png");
	sword.behavior = new Behavior([swordUpdateFunction], []);

	AddObject(shaderTexture, sword);

	var torch = new GameObject("torch", ShaderType.TEXTURE, 4);
	torch.transform = new Transform(TransformInput.POS, -2, 1);
	torch.mesh = new Mesh();
	torch.sprite = new Sprite(makeTexture("torch.png"));
	torch.particles = new Particles(true, 20, 0.15, Position.TOP, LayerStyle.INFRONT, 0.25, [1.0, 1.0], [0.39, 0.62], [0.0, 0.01]);
	torch.behavior = new Behavior([updateFuncParticles], [initFuncParticles]);

	AddObject(shaderTexture, torch);

	var torch1 = new GameObject("torch1", ShaderType.TEXTURE, 4);
	torch1.transform = new Transform(TransformInput.POS, 5, 5);
	torch1.mesh = new Mesh();
	torch1.sprite = new Sprite("torch.png");

	AddObject(shaderTexture, torch1);

	var light1 = new GameObject("light1", ShaderType.LIGHT, 5);
	light1.transform = new Transform(TransformInput.POS_SCALE, -2, 1, 3, 3);
	light1.mesh = new Mesh();
	light1.light = new Light([1.0, 0.8, 0.0, 0.3], 1.6, 0.0);
	light1.behavior = new Behavior([], [initFuncLight]);

	AddObject(shaderLight, light1);

	var light2 = new GameObject("light2", ShaderType.LIGHT, 5);
	light2.transform = new Transform(TransformInput.POS_SCALE, 1, 1, 2, 2);
	light2.mesh = new Mesh();
	light2.light = new Light([1.0, 0.0, 1.0, 0.3], 1.1, 0.0);
	light2.behavior = new Behavior([], [initFuncLight]);

	AddObject(shaderLight, light2);

	var light3 = new GameObject("light3", ShaderType.LIGHT, 5);
	light3.transform = new Transform(TransformInput.POS_SCALE, 5, 5, 20, 20);
	light3.mesh = new Mesh();
	light3.light = new Light([0.0, 0.8, 0.2, 0.6], 2.6, 1.0);
	light3.behavior = new Behavior([updateFuncLight], [initFuncLight]);

	AddObject(shaderLight, light3);

	var playButton1 = new GameObject("but", ShaderType.TEXTURE, 12);
	playButton1.transform = new Transform(TransformInput.POS_SCALE, right - 1, top - 1, 1, 1);
	playButton1.mesh = new Mesh();
	playButton1.sprite = new Sprite("pauseButton.png");
	playButton1.button = new Button([interactFuncTogglePlay], null, [interactFuncButtonHighlight]);
	playButton1.audio = new Audible("misscoinSound1.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, playButton1);

	var muteButton = new GameObject("muteButton", ShaderType.COLOR, 12);
	muteButton.transform = new Transform(TransformInput.POS_SCALE, right - 2, top - 1, 1, 1);
	muteButton.mesh = new Mesh(meshLight);
	muteButton.light = new Light([1.0, 1.0, 0.0, 1.0]);
	muteButton.button = new Button([interactFuncToggleGlobalMute], null, [interactFuncButtonHighlight]);
	muteButton.audio = new Audible("misscoinSound2.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderColor, muteButton);

	var textTest = new GameObject("textTest", ShaderType.TEXTURE, 12);
	textTest.transform = new Transform(TransformInput.POS_SCALE, 0, 4, 1.5, 1);
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