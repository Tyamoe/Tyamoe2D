var SCORE = 0;
var HIGHSCORE = 0;
var BRICKCOUNT = 0;
var BRICKS = 0;

var dot = null;

function makeLevel()
{
	console.log("Loading BREAKEr");

	// Play Button | Title |  Background | Score counter
	// End game screen ~ play button | display score | Game over title
	// Moving Ground | Down/Up Pipes
	// Player

	InitStuff();
	InitGlobals();

	level1();

	setMenu();

	dot = new GameObject("dot", ShaderType.COLOR, 8);
	dot.transform = new Transform(TransformInput.POS_SCALE, 0, 0, 0.2, 0.2);
	dot.mesh = new Mesh();
	dot.light = new Light([1.0, 0.0, 0.0, 1.0]);

	AddObject(shaderColor, dot);

	player = new GameObject("player", ShaderType.TEXTURE, 7);
	player.transform = new Transform(TransformInput.POS_SCALE, 0, -6.5, 2, 0.5);
	player.mesh = new Mesh();
	player.sprite = new Sprite("breaker/paddle.png");
	player.physics = new Physics(10, 100);
	player.collider = new Collider(ColliderType.LINE, [playerCollisionFunc]);
	player.behavior = new Behavior([playerUpdateFunction, updateFuncParticles], [initFuncParticles]);
	player.audio = new Audible("flappy/wing.wav", AudioStyle.CONSTANT, AudioState.ALL, false);
	player.particles = new Particles(false, 20, 0.1, Position.CENTER, LayerStyle.INFRONT, 0.9, [0.0, 0.01], [0.9, 0.99], [0.9, 0.99]);

	AddObject(shaderTexture, player);

	var ball = new GameObject("ball", ShaderType.TEXTURE, 8);
	ball.transform = new Transform(TransformInput.SCALE, 1, 1);
	ball.mesh = new Mesh();
	ball.sprite = new Sprite("breaker/ball.png");
	ball.physics = new Physics(12, 100);
	ball.collider = new Collider(ColliderType.CIRCLE, [ballCollisionFunction], [0.8, 0.8]);
	ball.behavior = new Behavior([ballUpdateFunction], []);
	vec2.set(ball.physics.vel, -6, 6);

	AddObject(shaderTexture, ball);

	var p = new GameObject("particlesEmitter", ShaderType.COLOR, 1);
	p.transform = new Transform(TransformInput.POS_SCALE, 0, 0, 1, 1);
	p.mesh = new Mesh();
	p.light = new Light([0.6, 0.6, 0.6, 0.0]);
	p.behavior = new Behavior([updateFuncParticles], [initFuncParticles]);
	p.particles = new Particles(true, 20, 0.3, Position.CENTER, LayerStyle.INFRONT, 25, [0.9, 0.99], [0.9, 0.99], [0.0, 0.02]);

	AddObject(shaderColor, p);

	var leftWall = new GameObject("leftWall", ShaderType.COLOR, 0);
	leftWall.transform = new Transform(TransformInput.POS_SCALE, -9.5, 0, 0.5, 20);
	leftWall.mesh = new Mesh();
	leftWall.light = new Light([0.6, 0.6, 0.6, 1.0]);
	leftWall.collider = new Collider(ColliderType.LINE, [wallCollisionFunction], [1.0, 1.0], true);

	AddObject(shaderColor, leftWall);

	var rightWall = new GameObject("rightWall", ShaderType.COLOR, 0);
	rightWall.transform = new Transform(TransformInput.POS_SCALE, 9.5, 0, 0.5, 20);
	rightWall.mesh = new Mesh();
	rightWall.light = new Light([0.6, 0.6, 0.6, 1.0]);
	rightWall.collider = new Collider(ColliderType.LINE, [wallCollisionFunction], [1.0, 1.0], true);

	AddObject(shaderColor, rightWall);

	var floor = new GameObject("floor", ShaderType.COLOR, 0);
	floor.transform = new Transform(TransformInput.POS_SCALE, 0, -8, 20, 0.5);
	floor.mesh = new Mesh();
	floor.light = new Light([0.6, 0.6, 0.6, 1.0]);
	floor.collider = new Collider(ColliderType.LINE, [floorCollisionFunction], [1.0, 1.0], true);

	AddObject(shaderColor, floor);

	GameObjects.sort( function(a, b){return sortRenderLayers(a,b)} );
}

function level1()
{
	console.log("Level 1");
	setBricks(10, 3, 6);
}

function level2()
{
	console.log("Level 2");
	setBricks(12, 5, 4);
}

function setMenu()
{
	var top = CornerTopLEFT[1];
	var left = CornerTopLEFT[0];
	var right = CornerTopRIGHT[0];

	var ceiling = new GameObject("ceiling", ShaderType.COLOR, 0);
	ceiling.transform = new Transform(TransformInput.POS_SCALE, 0, top - 1, 20, 2);
	ceiling.mesh = new Mesh();
	ceiling.light = new Light([0.6, 0.6, 0.6, 1.0]);
	ceiling.collider = new Collider(ColliderType.LINE, [wallCollisionFunction], [1.0, 1.0], true);

	AddObject(shaderColor, ceiling);

	var scoreText = new GameObject("scoreText", ShaderType.TEXTURE, 12);
	scoreText.transform = new Transform(TransformInput.POS_SCALE, left + 1, top - 1, 1, 1);
	scoreText.mesh = new Mesh();
	scoreText.sprite = new Sprite("canvas");
	scoreText.text = new Text("0", 90, "blue", 200, Alignment.LEFT, 1);
	scoreText.behavior = new Behavior([scoreTextUpdateFunction], [initFuncText]);
	scoreText.audio = new Audible("flappy/point.wav", AudioStyle.CONSTANT, AudioState.ALL, false, false, 0.6);

	AddObject(shaderTexture, scoreText);

	var playButton = new GameObject("playButton", ShaderType.TEXTURE, 12);
	playButton.transform = new Transform(TransformInput.POS_SCALE, right - 1, top - 1, 2, 2);
	playButton.mesh = new Mesh();
	playButton.sprite = new Sprite(buttonPauseTexture);
	playButton.button = new Button([interactFuncTogglePlay], [], [interactFuncButtonHighlight]);
	playButton.audio = new Audible("flappy/swoosh.wav", AudioStyle.CONSTANT, AudioState.ALL, false);

	AddObject(shaderTexture, playButton);
}

function setBricks(cols, rows, size)
{
	BRICKS = cols * rows;

	var top = CornerTopLEFT[1] - 2;
	var left = CornerTopLEFT[0];

	//console.log("left: " + left + " | top: " + top);

	var w = viewWidth / cols;
	var h = (viewHeight / size) / rows;

	//console.log("w: " + w + " | h: " + h);

	var halfw = w / 2;
	var halfh = h / 2;

	var sx = left + halfw;
	var ex = sx + (w * (cols));

	var sy = top - halfh;
	var ey = sy - (h * (rows - 1));

	//console.log("sx: " + sx + " | ex: " + ex);
	//console.log("sy: " + sy + " | ey: " + ey);

	for(var i = sx; i < ex; )
	{
		for(var j = sy; j > ey; )
		{
			//console.log("x: " + i + " | y: " + j);
			var brick1 = new GameObject("brick", ShaderType.TEXTURE, 3);
			brick1.transform = new Transform(TransformInput.POS_SCALE, i, j, w, h);
			brick1.mesh = new Mesh();
			brick1.sprite = new Sprite(brickBrown);
			brick1.collider = new Collider(ColliderType.LINE, [brickCollisionFunction], [1.0, 1.0]);

			AddObject(shaderTexture, brick1);
			j -= h;
		}
		i += w;
	}
}

function resetLevel()
{
	GameObjects[oGet("player")].transform = new Transform(TransformInput.POS_SCALE, 0, -6.5, 2, 0.5);
	GameObjects[oGet("player")].particles.rate = -1;
	GameObjects[oGet("player")].particles.emit = false;
	GameObjects[oGet("player")].particles.position = Position.CENTER;

	GameObjects[oGet("ball")].transform = new Transform(TransformInput.SCALE, 1, 1);
	vec2.set(GameObjects[oGet("ball")].physics.vel, 6, 6);

	BRICKCOUNT = 0;
	SCORE = 0;

	var brick = oGet("brick");
	for(var i = 0; i < BRICKS; i++)
	{
		if(GameObjects[i + brick].transform.pos[0] > 11)
		{
			GameObjects[i + brick].transform.pos[0] -= 20;
			GameObjects[i + brick].transform.dirty = true;
			vec2.copy(GameObjects[i + brick].collider.hitbox.pos, GameObjects[i + brick].transform.pos);
			updateCollider(GameObjects[i + brick]);
		}
	}
}