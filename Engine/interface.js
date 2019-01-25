var Button = function(lFunc, rFunc, hFunc)
{
	this.interact = new Interactable(lFunc, rFunc, hFunc);
}

var Interactable = function(lFunc, rFunc, hFunc)
{
	this.interactable = true;
	this.lClickFunc = lFunc;
	this.rClickFunc = rFunc;
	this.hoverFunc = hFunc;

	this.hovered = false;
}

function ui()
{
	input();
}

function input()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		var obj = GameObjects[i];
		if(obj.button != null)
		{
			var dis = distPointToRect(manager.mouse.worldPos, obj.transform.pos, obj.transform.scale);

			//Check if it is being clicked/if its being hovered over
			if(manager.mouse.left.pressed)
			{
				if(obj.button.interact.interactable)
				{
					if(dis == 0)
					{
						for(var j = 0; j < obj.button.interact.lClickFunc.length; j++)
						{
							obj.button.interact.lClickFunc[j](obj);
						}
					}
				}
			}
			else if(manager.mouse.right.pressed)
			{
				if(obj.button.interact.interactable)
				{
					if(dis == 0)
					{
						for(var j = 0; j < obj.button.interact.rClickFunc.length; j++)
						{
							obj.button.interact.rClickFunc[j](obj);
						}
					}
				}
			}
			else
			{
				if(dis == 0)
				{
					obj.button.interact.hovered = true;
					for(var j = 0; j < obj.button.interact.hoverFunc.length; j++)
					{
						obj.button.interact.hoverFunc[j](obj);
					}
				}
				else
				{
					if(obj.button.interact.hovered)
					{
						obj.button.interact.hovered = false;
						if(obj.sprite != null)
						{
							obj.sprite.tint[0] = 1.0;
							obj.sprite.tint[1] = 1.0;
							obj.sprite.tint[2] = 1.0;
							manager.isOutdated = true;
						}
					}
				}
			}
		}
	}
}

function effectMouse()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		var obj = GameObjects[i];
		if(obj.interact != null)
		{
			var dis = distPointToRect(manager.mouse.worldPos, obj.transform.pos, obj.transform.scale);

			//Check if it is being clicked/if its being hovered over
			if(manager.mouse.left.pressed)
			{
				if(obj.interact.interactable)
				{
					if(dis == 0)
					{
						for(var j = 0; j < obj.interact.lClickFunc.length; j++)
						{
							obj.interact.lClickFunc[j](obj);
						}
					}
				}
			}
			else if(manager.mouse.right.pressed)
			{
				if(obj.interact.interactable)
				{
					if(dis == 0)
					{
						for(var j = 0; j < obj.interact.rClickFunc.length; j++)
						{
							obj.interact.rClickFunc[j](obj);
						}
					}
				}
			}
			else
			{
				if(dis == 0)
				{
					obj.interact.hovered = true;
					for(var j = 0; j < obj.interact.hoverFunc.length; j++)
					{
						obj.interact.hoverFunc[j](obj);
					}
				}
				else
				{
					if(obj.interact.hovered)
					{
						obj.interact.hovered = false;
						if(obj.sprite != null)
						{
							obj.sprite.tint[0] = 1.0;
							obj.sprite.tint[1] = 1.0;
							obj.sprite.tint[2] = 1.0;
						}
					}
				}
			}
		}
	}
}