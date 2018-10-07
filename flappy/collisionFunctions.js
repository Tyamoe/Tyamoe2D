var playerCollisionFunc = function(player, other)
{
	if(!manager.isRunning)
	{
		return;
	}

	//console.log("Collision between Player and " + other.name);
	//console.log(other);

	vec2.set(player.physics.vel, 0, -8);
	vec2.copy(player.transform.pos, player.transform.oldPos);
	player.transform.pos[0] = -1.1;

	player.collider.isColliding = true;

	player.animation.running = false;

	manager.isOutdated = true;

	GameObjects[oGet("ground")].physics.vel[0] = 0;
	GameObjects[oGet("pipeDown1")].physics.vel[0] = 0;
	GameObjects[oGet("pipeUp1")].physics.vel[0] = 0;
	GameObjects[oGet("pipeDown2")].physics.vel[0] = 0;
	GameObjects[oGet("pipeUp2")].physics.vel[0] = 0;
	GameObjects[oGet("pipeDown3")].physics.vel[0] = 0;
	GameObjects[oGet("pipeUp3")].physics.vel[0] = 0;
}

var ignoreNonPlayerCollision = function(ingoniosan, other)
{
	if(other.name != "player")
	{
		ingoniosan.collider.isColliding = false;
	}
	else if(ingoniosan.name == "ground")
	{
		ingoniosan.audio.play();

		EndGameScreen(true);
		manager.isRunning = false;
	}
	else
	{
		if(ingoniosan.audio.playing)
		{
			EndGameScreen(true);
			manager.isRunning = false;
		}
		//player collsion sound
		ingoniosan.audio.play();
	}
}