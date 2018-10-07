var Material = function(mat, effect, ...input)
{
	this.id = mat;
	this.effectFunc = effect;
	this.drag = (input.length > 0) ? input[0] : 1.0;
}

function effect()
{
	effectTime();
	effectMouse();

	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].physics != null)
		{
			var obj1 = GameObjects[i];
			var trans1 = GameObjects[i].transform;
			for(var j = 0; j < GameObjects.length; j++)
			{
				if(GameObjects[j].material != null)
				{
					var obj2 = GameObjects[j];
					var trans2 = GameObjects[j].transform;

					var dis = distPointToRect(trans1.pos, trans2.pos, trans2.scale);
					if(dis == 0)
					{
						if(obj1.physics != null && obj1.physics.friction)
						{
							vec2.scale(obj1.physics.vel, obj1.physics.vel, obj2.material.drag);
						}

						for(var k = 0; k < obj2.material.effectFunc.length; k++)
						{
							obj2.material.effectFunc[k](obj2, obj1);
						}
						break;
					}
				}
			}
		}
	}
}

function effectTime()
{
	if(manager.timeFactor == 0)
	{
		return;
	}

	if(manager.timeFactor == 1)
	{	
		manager.time -= (dt / 10);
	}	
	else
	{
		manager.time += (dt / 10);
	}

	if(manager.time < 0 || manager.time > 0.8)
	{
		if(manager.time < -1 || manager.time > 1)
		{
			manager.time = 0.0;
		}

		manager.timeFactor *= -1;
	}

	if(manager.time % 0.05 == 0)
	{
		manager.isOutdated = true;
	}
}