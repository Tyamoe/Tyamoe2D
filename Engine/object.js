var GameManager = function() 
{ 
	this.isRunning = true;
	this.isOutdated = true;

	this.toggleRunning = function()
	{
    	this.isRunning = (this.isRunning) ? false : true;
  	}

	this.camera = null;
	this.mouse = null;
	this.keyboard = null;

	this.muteAudio = false;
	this.boundTexture = -1;

	this.time = 0.8;
	this.timeFactor = 1;
}

var Camera = function() 
{ 
	this.update = null;
	this.fov = 45;

	this.rotation = 0.0;

	this.Pos = vec3.create();
  	this.Front = vec3.create();
  	this.Up = vec3.create();

  	this.zoom = vec2.create();
	vec2.set(this.zoom, 0.13, 0.13);

  	this.view = mat4.create();
	this.projMatrix = mat4.create();
}

var GameObject = function(name, ...input) 
{
	this.name = name;

	this.enabled = (input.length > 3) ? input[3] : true;

	this.shader = (input.length > 0) ? input[0] : ShaderType.TEXTURE;

	this.layer = (input.length > 1) ? input[1] : RenderPriority.MEDIUM;

	this.parent = (input.length > 2) ? input[2] : null;

	this.transform = null;		//*****
	this.sprite = null;			//*****
	this.animation = null;		//****
	this.physics = null;		//*****
	this.collider = null;		//*****
	this.mesh = null;			//*****
	this.behavior = null;		//*****
	this.stats = null;			//***
	this.light = null;			//**
	this.particles = null;		//***
	this.material = null;		//****
	this.occluder = null;		//*

	this.interact = null;		//*****
	this.button = null;			//****
	this.text = null;			//***

	this.audio = null;			//****
}

var Transform = function(type, ...input)
{
	this.dirty = true;

  	this.pos = vec2.create();
  	this.oldPos = vec2.create();
  	this.scale = vec2.create();

	vec2.set(this.pos, 0, 0);
	vec2.set(this.oldPos, 0, 0);
	vec2.set(this.scale, 1, 1);

	this.rotation = 0.0;

	this.modelMatrix = mat3.create();

	if(type == TransformInput.POS || type == TransformInput.POS_SCALE || type == TransformInput.POS_ROTATION || type == TransformInput.ALL)
	{
		vec2.set(this.pos, input[0], input[1]);
		vec2.set(this.oldPos, input[0], input[1]);
	}

	if(type == TransformInput.POS_SCALE || type == TransformInput.ALL)
	{
		vec2.set(this.scale, input[2], input[3]);
	}
	else if(type == TransformInput.SCALE)
	{
		vec2.set(this.scale, input[0], input[1]);
	}

	if(type == TransformInput.POS_ROTATION)
	{
		this.rotation = input[2];
	}
	else if(type == TransformInput.ROTATION)
	{
		this.rotation = input[0];
	}
	else if(type == TransformInput.ALL)
	{
		this.rotation = input[4];
	}
}

var Text = function(text, fontSize, color, maxWidth, textAlign, rows, ...input)
{
	this.text = text;
	this.color = color;
	this.fontSize = fontSize;
	this.textAlign = (textAlign == Alignment.CENTER) ? "center" : (textAlign == Alignment.LEFT) ? "left" : "right";
	
	this.rows = rows;
	this.maxWidth = maxWidth;

	var borderColor = (input.length > 0) ? input[0] : color;
	var backColor = (input.length > 1) ? input[1] : "transparent";

	this.borderColor = borderColor;
	this.backColor = backColor;

	this.canvas = null;

	this.setText = function(obj, txt)
	{
		gl.deleteTexture(obj.sprite.texture);

		this.text = txt;

		var ctx = this.canvas.getContext("2d");
		ctx.font = this.fontSize + "px Arial";
		ctx.textAlign = this.textAlign;
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, 0, this.fontSize);

		ctx.font = (this.fontSize) + "px Arial";
		ctx.textAlign = this.textAlign;
		ctx.strokeStyle = this.borderColor;
		ctx.strokeText(this.text, 0, this.fontSize);

		obj.sprite.texture = makeCanvasTexture(this.canvas);
	}
}

var Physics = function(...input)
{
  	this.vel = vec2.create();

  	this.speed = (input.length > 0) ? input[0] : 2.2;
  	this.maxSpeed = (input.length > 1) ? input[1] : 4.0;
	vec2.copy(this.vel, ((input.length > 2) ? input[2] : [0, 0]));
  	this.friction = (input.length > 3) ? input[3] : false;
}

var Behavior = function(update, init)
{
	this.updateFunc = [];
	this.initFunc = [];

	this.updateFunc = update;
	this.initFunc = init;

	this.toggle = 0;
}

var Stats = function()
{
	this.maxHealth = 0.0;
	this.health = 0.0;
	this.armor = 0.0;
	this.damage = 0.0;
	this.cooldown = 0.0;
	this.lives = 0;
}

var Light = function(color, ...input)
{
	this.id = -1;
	
	this.color = vec4.create();
	vec4.copy(this.color, color);

	this.radius = (input.length > 0) ? input[0] : 2.0;
	this.intensity = (input.length > 1) ? input[1] : 1.0;
	this.color[3] *= this.intensity;
}

var Occluder = function(size)
{
	this.id = -1;
	this.size = vec2.create();
	vec2.copy(this.size, size);
}

function oGet(name)
{
	return getObjectByName(name);
}

function getObjectByName(name)
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].name == name)
		{
			return i;
		}
	}
	return 1;
}

function AddObject(shader, obj)
{
	//console.log("Adding Object: " + obj.name);

	if(obj.collider != null)
	{
		InitCollider(obj);
	}

	if(obj.behavior != null && obj.behavior.initFunc != null)
	{
		var count = obj.behavior.initFunc.length;

		for(var i = 0; i < count; i++)
		{
			obj.behavior.initFunc[i](obj);
		}
	}

	GameObjects.push(obj);
}