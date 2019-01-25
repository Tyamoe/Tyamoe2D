var updateFuncEmpty = function(obj) { }

var updateFuncFollowPlayerCamera = function()
{
	if(player != null)
	{
		vec3.set(manager.camera.Pos, player.transform.pos[0] * manager.camera.zoom[0], player.transform.pos[1] * manager.camera.zoom[1], 0);
	}
	else
	{
		vec3.set(manager.camera.Pos, 0, 0, 0);
	}
	var temp = vec3.create();
	vec3.add(temp, manager.camera.Pos, manager.camera.Front);
	mat4.lookAt(manager.camera.view, manager.camera.Pos, temp, manager.camera.Up);

	mat4.scale(manager.camera.view, manager.camera.view, [manager.camera.zoom[0], manager.camera.zoom[0], 1]);
}

var updateFuncStaticCamera = function()
{
	var temp = vec3.create();
	vec3.add(temp, manager.camera.Pos, manager.camera.Front);
	mat4.lookAt(manager.camera.view, manager.camera.Pos, temp, manager.camera.Up);

	mat4.scale(manager.camera.view, manager.camera.view, [manager.camera.zoom[0], manager.camera.zoom[0], 1]);
}

var updateFuncParticles = function (obj)
{
	if(obj.particles.emit)
	{
	  obj.particles.rate -= dt;

	  if(obj.particles.rate > 0)
	  {
	    obj.particles.reconfigure = false;
	  }
	  else
	  {
	    obj.particles.reconfigure = true;
	    obj.particles.rate = obj.particles.maxRate;
	    manager.isOutdated = true;
	  }
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

var updateFuncOccluder = function(obj)
{
	var index = obj.occluder.id;

	Occluders[index + 0] = obj.transform.pos[0] - obj.occluder.size[0];	// BOTTOM LEFT
	Occluders[index + 1] = obj.transform.pos[1] - obj.occluder.size[1];

	Occluders[index + 2] = obj.transform.pos[0] + obj.occluder.size[0];	// TOP RIGHT
	Occluders[index + 3] = obj.transform.pos[1] + obj.occluder.size[1];
}

var updateFuncLight = function(light)
{
	var index = light.light.id;

	Lights[index + 0] = light.transform.pos[0];
	Lights[index + 1] = light.transform.pos[1];
	Lights[index + 2] = light.light.radius;
}