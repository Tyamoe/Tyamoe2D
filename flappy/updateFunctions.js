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

	ctx.textAlign = obj.text.textAlign;
	ctx.fillStyle = obj.text.color;
	ctx.font = obj.text.fontSize + "px Arial";
	ctx.fillText(obj.text.text, 0, obj.text.fontSize);

	obj.sprite.texture = makeCanvasTexture(obj.text.canvas);

	if(obj.audio != null)
	{
		obj.audio.play();
	}
}

var groundUpdateFunction = function(obj)
{
	if(obj.transform.pos[0] <= -5.59999)
	{
		obj.transform.pos[0] = 5.6; 
	}
}

var resetPos = 10;

var pipeUpdateFunction = function(obj)
{
	if(obj.transform.pos[0] <= -5.0)
	{
		obj.transform.pos[0] = 10.0; 
		obj.parent.transform.pos[0] = 10.0; 
		//Set pipe to not ignore
		obj.behavior.toggle = 0;

		var i = randEven(0, 7);

		console.log("Index: " + i);

		obj.transform.pos[1] = pipeDown[i];
		obj.transform.scale[1] = pipeDown[i + 1];

		obj.parent.transform.pos[1] = pipeUp[i];
		obj.parent.transform.scale[1] = pipeUp[i + 1];

		//Update Pipe Transform

		//Update Speed
		/*if(SCORE > 5 && SCORE < 12)
		{
			obj.physics.vel[0] = -2.2;
			resetPos = 9;
		}
		else if(SCORE > 12 && SCORE < 18)
		{
			obj.physics.vel[0] = -2.5;
			resetPos = 8.5;
		}
		else if(SCORE > 18 && SCORE < 25)
		{
			obj.physics.vel[0] = -2.8;
			resetPos = 8.0;
		}
		else if(SCORE > 25)
		{
			obj.physics.vel[0] = -3.0;
			resetPos = 7.5;
		}*/
	}

	if(obj.behavior.toggle == 0 && obj.transform.pos[0] + 2.5000  <= 0.2 && obj.transform.pos[0] + 2.5000  >= 0)
	{
		SCORE++;
		//Set pipe to ingore
		obj.behavior.toggle = 1;
	}
}

var playerUpdateFunction = function (obj)
{
	if(obj.collider.isColliding)
	{
		obj.collider.isColliding = false;
		return;
	}

	if(!obj.animation.running)
	{
		return;
	}

	var index = -1;

	//Move Up
	if((index = isKeyCurrent(manager.keyboard.Binds.UP)) != -1)
	{
		if(obj.audio.sound.paused)
		{
			obj.audio.play();
		}
		//player.physics.vel[1] = (player.physics.vel[1] < 6) ? player.physics.vel[1]+1 : 6;
		obj.physics.vel[1] = (obj.physics.vel[1] < 0) ? 0 : obj.physics.vel[1];
		obj.physics.vel[1] = (obj.physics.vel[1] < 7) ? obj.physics.vel[1] + 1 : 7;
	}
	else
	{
		//player.physics.vel[1] = (player.physics.vel[1] > -5) ? player.physics.vel[1]-1 : -5;
		obj.physics.vel[1] = (obj.physics.vel[1] > -6) ? obj.physics.vel[1] - 2 : -6;
	}
}