window.requestAnimFrame = (function() 
{
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
   		window.mozRequestAnimationFrame ||
  		window.oRequestAnimationFrame ||
   		window.msRequestAnimationFrame ||
   		function(callback, element) 
   		{
			return window.setTimeout(callback, 1000 / 30);
   		}
	);
})();

function tick() 
{
	requestAnimFrame(tick);

	if(!WebGlInitialized || !DataLoaded)
	{
		return;
	}

	resize();
	
  	dt = getFrameRate();

  	ui();

  	//if(1.0 / dt < 57)
  		//console.log("FPS: " + 1.0 / dt);

	if(manager.isRunning)
	{
  		animate();
  		update();
  		effect();
    	process();
    	audio();
    	collide();
	}

	if(manager.isOutdated)
	{
		render();

		manager.isOutdated = false;
	}

	reset();
}

function update()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].behavior != null && GameObjects[i].behavior.updateFunc != null)
		{
			var count = GameObjects[i].behavior.updateFunc.length;

			for(var j = 0; j < count; j++)
			{
				GameObjects[i].behavior.updateFunc[j](GameObjects[i]);
			}
		}
	}
}

function process()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].physics != null && GameObjects[i].transform != null)
		{
			var obj = GameObjects[i];

			if(obj.collider != null)
			{
				if(obj.collider.isColliding && !vec2.exactEquals(obj.transform.oldPos, obj.transform.pos))
				{
					obj.collider.isColliding = false;
					continue;
				}
			}

			vec2.copy(obj.transform.oldPos, obj.transform.pos);
			vec2.scaleAndAdd(obj.transform.pos, obj.transform.pos, obj.physics.vel, dt);

			if(!vec2.exactEquals(obj.transform.oldPos, obj.transform.pos))
			{
				obj.transform.dirty = true;

				if(obj.collider != null)
				{
					updateCollider(obj);
				}
				
				manager.isOutdated = true;
			}
		}
	}

	for(var i = 0; i < manager.camera.update.length; i++)
	{
		manager.camera.update[i]();
	}
}

function reset()
{
	manager.mouse.left.pressed = false;
	manager.mouse.middle.pressed = false;
	manager.mouse.right.pressed = false;

	manager.mouse.left.released = false;
	manager.mouse.middle.released = false;
	manager.mouse.right.released = false;

	if(manager.keyboard.keyPressed.length > 0)
	{
		manager.keyboard.keyPressed.splice(0, manager.keyboard.keyPressed.length);
	}
	if(manager.keyboard.keyReleased.length > 0)
	{
		manager.keyboard.keyReleased.splice(0, manager.keyboard.keyReleased.length);
	}
}