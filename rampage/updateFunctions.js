var swordUpdateFunction = function (sword)
{
	vec2.set(sword.transform.oldPos, sword.transform.pos[0], sword.transform.pos[1]);
	vec2.set(sword.transform.pos, sword.parent.transform.pos[0] - 0.5, sword.parent.transform.pos[1]);
	
	sword.transform.dirty = true;

	var index = -1;

	//Move Up
	if((index = isKeyPressed("T")) != -1)
	{
		//console.log("Index : " + sword.animation.Index);
		//console.log("UV : " + sword.sprite.u + ", " + sword.sprite.v);
		//sword.animation.running = true;
	}
}

var playerUpdateFunction = function (player)
{
	if(player.collider.isColliding)
	{
		player.collider.isColliding = false;
		return;
	}

  
  //var i = getObjectByName("light3");
  //var light = GameObjects[i];
  
	//vec2.copy(light.transform.pos, player.transform.pos);

	//light.transform.dirty = true;

	var W = false;
	var S = false;
	var D = false;
	var A = false;

	var index = -1;

	//Move Up
	if((index = isKeyCurrent(manager.keyboard.Binds.UP)) != -1)
	{
		W = true;

		player.animation.durationUpdate(0.15);
		player.animation.running = true;

		vec2.set(player.physics.vel, player.physics.vel[0], player.physics.speed);
	}
	else if((index = isKeyCurrent(manager.keyboard.Binds.DOWN)) != -1)	//Move Down
	{
		S = true;
		
		player.animation.durationUpdate(0.15);
		player.animation.running = true;

		vec2.set(player.physics.vel, player.physics.vel[0], -player.physics.speed);
	}
	else
	{
		vec2.set(player.physics.vel, player.physics.vel[0], 0);
	}

	//Move Right
	if((index = isKeyCurrent(manager.keyboard.Binds.RIGHT)) != -1)
	{
		D = true;
		
		player.sprite.flip(Orientation.HORIZONTAL, false);

		player.animation.durationUpdate(0.15);
		player.animation.running = true;

		vec2.set(player.physics.vel, player.physics.speed, player.physics.vel[1]);
	}
	else if((index = isKeyCurrent(manager.keyboard.Binds.LEFT)) != -1)	//Move Left
	{
		A = true;
		
		player.sprite.flip(Orientation.HORIZONTAL, true);

		player.animation.durationUpdate(0.15);
		player.animation.running = true;

		vec2.set(player.physics.vel, -player.physics.speed, player.physics.vel[1]);
	}
	else
	{
		vec2.set(player.physics.vel, 0, player.physics.vel[1]);
	}

	var len = vec2.length(player.physics.vel);
	if(len <= 0)
	{
		player.animation.running = false;
	}

	//Sprint
	if((index = isKeyCurrent(manager.keyboard.Binds.SPRINT)) != -1)
	{
		player.animation.durationUpdate(0.1);
		player.animation.running = true;

		vec2.scale(player.physics.vel, player.physics.vel, 1.5);
		len = vec2.length(player.physics.vel);

		if(len > 0)
		{
			player.particles.emit = true;
			if(len > player.physics.maxSpeed)
			{
				vec2.scale(player.physics.vel, player.physics.vel, player.physics.maxSpeed / len);
			}
		}
		else
		{
			player.animation.running = false;
			player.particles.emit = false;
		}
		//console.log("1Length: " + len);
		//console.log("Velocitiy: " + player.physics.vel);
	}
	else
	{
		player.particles.emit = false;
	}

	if(W && (D || A))
	{
		player.sprite.changeTexture(3);
	}
	else if(S && (D || A))
	{
		player.sprite.changeTexture(4);
	}
	else if(S)
	{
		player.sprite.changeTexture(2);
	}
	else if(W)
	{
		player.sprite.changeTexture(1);
	}
	else if(A || D)
	{
		player.sprite.changeTexture(0);
	}
}