var pauseGameFunction = function(obj)
{
	manager.isRunning = (manager.isRunning) ? false : true;
	obj.audio.play();

	//Change button to correct button texture
	if(manager.isRunning)
	{
		obj.sprite.texture = buttonPauseTexture;
	}
	else
	{
		obj.sprite.texture = buttonPlayTexture;
	}
	manager.isOutdated = true;
}

var playGameFunction = function(obj)
{
	manager.toggleRunning();

	if(obj != null && obj.audio != null)
	{
		obj.audio.play();
	}

	GameObjects[oGet("playButton")].enabled = !manager.isRunning;
	GameObjects[oGet("title")].enabled = !manager.isRunning;

	GameObjects[oGet("pauseButton")].enabled = manager.isRunning;
	GameObjects[oGet("muteButton")].enabled = manager.isRunning;
	GameObjects[oGet("scoreText")].enabled = manager.isRunning;
	resetLevel();
	EndGameScreen(false);

	manager.isOutdated = true;
}

function globalMuteFunction(obj)
{
	GLOBAL_VOLUME = (GLOBAL_VOLUME == 0) ? 1 : 0;
	obj.audio.play();

	//Change button to correct mute button texture
	if(GLOBAL_VOLUME == 1)
	{
		obj.sprite.texture = buttonUnmutedTexture;
	}
	else
	{
		obj.sprite.texture = buttonMutedTexture;
	}
}

var restartGameFunction = function(obj)
{
	obj.audio.play();
	resetLevel();
}