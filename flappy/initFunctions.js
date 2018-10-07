var gameInitFunction = function(obj)
{
	setTimeout(function() { manager.toggleRunning(); }, 100);

	if(obj != null && obj.audio != null)
	{
		obj.audio.play();
	}

	GameObjects[oGet("playButton")].enabled = true;
	GameObjects[oGet("title")].enabled = true;

	GameObjects[oGet("pauseButton")].enabled = false;
	GameObjects[oGet("muteButton")].enabled = false;
	GameObjects[oGet("scoreText")].enabled = false;

	manager.isOutdated = true;
}