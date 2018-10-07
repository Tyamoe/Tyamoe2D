var Audible = function(src, style, state, loop, ...input)
{
	this.sound = new Audio();
	this.sound.src = audioPath + src;
	this.sound.loop = loop;
	this.sound.controls = false;
	this.sound.autoplay = (input.length > 0) ? input[0] : false;

	this.style = style;
	this.state = state;

	this.playing = (input.length > 0) ? input[0] : false;
	this.volume = ((input.length > 1) ? input[1] : 1.0) * GLOBAL_VOLUME;

	this.paused = false;

	this.play = function()
	{
    this.sound.play();
    this.paused = false;
    this.playing = true;
  }

  this.stop = function()
  {
    this.sound.pause();
    this.paused = true;
    this.playing = false;
  }
}

function audio()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].audio != null)
		{
			var obj = GameObjects[i];

	  	if(obj.audio.playing && obj.audio.paused)
	  	{
	  		obj.audio.stop();
	  	}
	  	else if(obj.audio.playing)
	  	{
	  		if(obj.audio.style == AudioStyle.DISTANCE)
	  		{
	  			updateVolumeBasedOnDist(obj);
	  		}

	  		if(obj.audio.sound.ended)
	  		{
	  			obj.audio.stop();
	  		}
	  	}

	  	if(!obj.audio.sound.muted && manager.muteAudio)
	  	{
	  		obj.audio.sound.muted = true;
	  	}
	  	else if(obj.audio.sound.muted && !manager.muteAudio)
	  	{
	  		obj.audio.sound.muted = false;
	  	}
	  	obj.audio.sound.volume = obj.audio.volume * GLOBAL_VOLUME;
		}
	}
}

function updateVolumeBasedOnDist(obj)
{
	var dis = distPointToPoint(obj.transform.pos, player.transform.pos);
 
 	// 0.0 == smallest rescale 1.0 == largest
 	// 5 == largest input value 0 == smallest
 	// dis == squared distance between audio and player
	dis = 0.0 + (dis - MIN_SOUND_DISTANCE) * (1.0 - 0.0) / (MAX_SOUND_DISTANCE - MIN_SOUND_DISTANCE); 

	dis = (dis > 1) ? 1 : dis;
	dis = (dis < 0) ? 0 : dis;

	obj.audio.volume = 1 - dis;
}