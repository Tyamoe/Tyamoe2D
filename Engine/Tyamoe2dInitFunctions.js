var initFuncHitboxDepth = function(obj)
{
	var t = (obj.transform.scale[1] - obj.collider.hitbox.scale[1]) / 2;
	t = obj.transform.pos[1] + t;

	obj.collider.hitbox.pos[1] = t;
}

var initFuncOccluder = function(o)
{
	o.occluder.id = Occluders.length;

	Occluders.push(o.transform.pos[0] - o.occluder.size[0]);
	Occluders.push(o.transform.pos[1] - o.occluder.size[1]);
	Occluders.push(o.transform.pos[0] + o.occluder.size[0]);
	Occluders.push(o.transform.pos[1] + o.occluder.size[1]);
}

var initFuncLight = function(light)
{
	var posX = light.transform.pos[0];
	var posY = light.transform.pos[1];

	var radius = light.light.radius;

	light.light.id = Lights.length;

	Lights.push(posX);
	Lights.push(posY);
	Lights.push(radius);
}

var initFuncParticles = function(obj)
{
	for(var i = 0; i < obj.particles.count; i++)
	{
    obj.particles.color[i] = [0.0, 0.0, 0.0];

    obj.particles.pos[i] = [0.0, 0.0];

		obj.particles.size[i] = [0.05, 0.05];
	}

	if(obj.particles.position == Position.BOTTOM)
	{
		obj.particles.center = [obj.transform.pos[0], obj.transform.pos[1] - (obj.transform.scale[1] * 0.6)];
	}
	else if(obj.particles.position == Position.TOP)
	{
		obj.particles.center = [obj.transform.pos[0], obj.transform.pos[1]];
	}
	else if(obj.particles.position == Position.LEFT)
	{
		obj.particles.center = [obj.transform.pos[0] - (obj.transform.scale[0] * 0.6), obj.transform.pos[1]];
	}
	else if(obj.particles.position == Position.RIGHT)
	{
		obj.particles.center = [obj.transform.pos[0] + (obj.transform.scale[0] * 0.6), obj.transform.pos[1]];
	}
	else if(obj.particles.position == Position.CENTER)
	{
		obj.particles.center = [obj.transform.pos[0], obj.transform.pos[1]];
	}
}

var initFuncText = function(obj)
{
  obj.text.canvas = document.createElement('canvas');
	obj.text.canvas.id = obj.name;
	obj.text.canvas.width = (obj.text.maxWidth);
	obj.text.canvas.height = (obj.text.fontSize * obj.text.rows);

	var ctx = obj.text.canvas.getContext("2d");

	ctx.font = obj.text.fontSize + "px Arial";
	ctx.textAlign = obj.text.textAlign;
	ctx.textBaseline = "bottom";

	var si = ctx.measureText(obj.text.text).width;

	ctx.fillStyle = obj.text.backColor;
	ctx.fillRect(0, 0, si, obj.text.fontSize - 5);

	ctx.fillStyle = obj.text.color;
	ctx.fillText(obj.text.text, 0, obj.text.fontSize);

	ctx.strokeStyle = obj.text.borderColor;
	ctx.strokeText(obj.text.text, 0, obj.text.fontSize);

	obj.sprite.texture = makeCanvasTexture(obj.text.canvas);
}