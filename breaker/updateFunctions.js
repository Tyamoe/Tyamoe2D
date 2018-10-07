var scoreTextUpdateFunction = function(obj)
{
	if(SCORE + "" == obj.text.text)
	{
		return;
	}

	obj.text.text = "" + SCORE;

	gl.deleteTexture(obj.sprite.texture);

	var ctx = obj.text.canvas.getContext("2d");
	ctx.clearRect(0, 0, obj.text.canvas.width, obj.text.canvas.height);

	ctx.font = obj.text.fontSize + "px Arial";
	ctx.fillText(obj.text.text, 0, obj.text.fontSize);

	obj.sprite.texture = makeCanvasTexture(obj.text.canvas);
}

var ballUpdateFunction = function(obj)
{

}

var playerUpdateFunction = function (player)
{
	if(!player.collider.isColliding)
	{
	  player.particles.rate = -1;
		player.particles.emit = false;
		player.particles.position = Position.CENTER;
	  player.particles.reconfigure = true;
		//player.collider.isColliding = false;
		//return;
	}

	var index = -1;

	//Move Right
	if((index = isKeyCurrent(manager.keyboard.Binds.RIGHT)) != -1)
	{
		vec2.set(player.physics.vel, player.physics.speed, player.physics.vel[1]);
	}
	else if((index = isKeyCurrent(manager.keyboard.Binds.LEFT)) != -1)	//Move Left
	{
		vec2.set(player.physics.vel, -player.physics.speed, player.physics.vel[1]);
	}
	else
	{
		vec2.set(player.physics.vel, 0, player.physics.vel[1]);
	}

	//Sprint
	if((index = isKeyCurrent(manager.keyboard.Binds.SPRINT)) != -1)
	{
		vec2.scale(player.physics.vel, player.physics.vel, 0.7);
	}
}