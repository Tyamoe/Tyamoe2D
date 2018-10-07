var interactFuncButtonHighlight = function(obj)
{
	if(obj.sprite == null)
	{
		return;
	}
	if(obj.sprite.tint[0] + obj.sprite.tint[1] + obj.sprite.tint[2] == 3.0)
	{
		obj.sprite.tint[0] = 1.0;
		obj.sprite.tint[1] = 1.0;
		obj.sprite.tint[2] = 0.0;

		manager.isOutdated = true;
	}
}

var interactFuncTogglePlay = function(obj)
{
	manager.isRunning = (manager.isRunning) ? false : true;

	if(obj.audio != null)
	{
		obj.audio.play();
	}
}

function interactFuncToggleGlobalMute(obj)
{
	GLOBAL_VOLUME = (GLOBAL_VOLUME == 0) ? 1 : 0;

	if(obj.audio != null)
	{
		obj.audio.play();
	}
}