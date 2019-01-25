var Animation = function(cols, rows, dimension, loop, duration, ...input)
{
	this.uneven = (input.length > 0) ? input[0] : 0;
	this.frames = [];
	this.frameDuration = [];

	if(duration.length > 0)
	{
		this.frameDuration = duration;
	}
	else
	{
		for(var i = 0; i < (cols * rows) - this.uneven; i++)
		{
			this.frameDuration[i] = duration;
		}
	}

	this.durationUpdate = function(duration)
	{
		if(duration.length > 0)
		{
			this.frameDuration = duration;
		}
		else
		{
			for(var i = 0; i < (cols * rows) - this.uneven; i++)
			{
				this.frameDuration[i] = duration;
			}
		}
	}

	this.frameDelay = 0.0;

	this.Index = -1;

	this.cols = cols;
	this.rows = rows;

  this.width = dimension[0];
  this.height = dimension[1];

	this.looping = loop;
	this.running = false;
	this.done = false;
}

function animate()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].animation != null)
		{
			var obj = GameObjects[i];

			if(obj.animation.running)
			{
				if(obj.animation.Index == -1)
				{
					obj.animation.Index = -1;
					obj.animation.frameDelay = 0;
				}

				obj.animation.frameDelay -= dt;

				if(obj.animation.frameDelay <= 0)
				{
					//Reset Frame Duration
					obj.animation.Index++;
					obj.animation.frameDelay = obj.animation.frameDuration[obj.animation.Index];

					if(obj.animation.Index >= (obj.animation.cols * obj.animation.rows) - obj.animation.uneven)
					{
						if(!obj.animation.looping)
						{
							obj.animation.running = false;
						}

						obj.animation.Index = 0;
						obj.animation.frameDelay = obj.animation.frameDuration[0];
					}

					var uv = getUV(obj);

					var u = uv[0];
					var v = uv[1];
					var u2 = uv[2];
					var v2 = uv[3];

					var uvs =
					[
						[u2, v2],
						[u2, v],
						[u, v],
						[u, v2]
					];

					if(!obj.sprite.flipped)
					{
						obj.sprite.flipped = true;

						if(obj.sprite.flipHorizontal)
						{
							var temp = uvs[0][0];

							uvs[0][0] = uvs[3][0];

							uvs[3][0] = temp;

							temp = uvs[1][0];

							uvs[1][0] = uvs[2][0];

							uvs[2][0] = temp;
						}

						if(obj.sprite.flipVertical)
						{
							var temp = uvs[0][1];

							uvs[0][1] = uvs[1][1];

							uvs[1][1] = temp;

							temp = uvs[2][1];

							uvs[2][1] = uvs[3][1];

							uvs[3][1] = temp;
						}
					}

					var vertices = 
					[
						//Pos     Texture Coords
						0.5,  0.5, uvs[0][0], uvs[0][1],  // Top Right
						0.5, -0.5, uvs[1][0], uvs[1][1],  // Bottom Right
						-0.5,-0.5, uvs[2][0], uvs[2][1],  // Bottom Left
						-0.5, 0.5, uvs[3][0], uvs[3][1]   // Top Left
					];

					obj.mesh.vertexBuffer = vertices;

					gl.bindVertexArray(obj.mesh.VAO);

					gl.bindBuffer(gl.ARRAY_BUFFER, obj.mesh.VBO);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
					
					gl.bindVertexArray(null);

					manager.isOutdated = true;
				}
			}
			else
			{	
				if(obj.animation.Index != 0)
				{
					obj.animation.Index = 0;
					manager.isOutdated = true;

					var uv = getUV(obj);

					var u = uv[0];
					var v = uv[1];
					var u2 = uv[2];
					var v2 = uv[3];

					var uvs =
					[
						[u2, v2],
						[u2, v],
						[u, v],
						[u, v2]
					];

					if(!obj.sprite.flipped)
					{
						obj.sprite.flipped = true;

						if(obj.sprite.flipHorizontal)
						{
							var temp = uvs[0][0];

							uvs[0][0] = uvs[3][0];

							uvs[3][0] = temp;

							temp = uvs[1][0];

							uvs[1][0] = uvs[2][0];

							uvs[2][0] = temp;
						}

						if(obj.sprite.flipVertical)
						{
							var temp = uvs[0][1];

							uvs[0][1] = uvs[1][1];

							uvs[1][1] = temp;

							temp = uvs[2][1];

							uvs[2][1] = uvs[3][1];

							uvs[3][1] = temp;
						}
					}

					var vertices = 
					[
						//Pos     Texture Coords
						0.5,  0.5, uvs[0][0], uvs[0][1],  // Top Right
						0.5, -0.5, uvs[1][0], uvs[1][1],  // Bottom Right
						-0.5,-0.5, uvs[2][0], uvs[2][1],  // Bottom Left
						-0.5, 0.5, uvs[3][0], uvs[3][1]   // Top Left
					];

					obj.mesh.vertexBuffer = vertices;

					gl.bindVertexArray(obj.mesh.VAO);

					gl.bindBuffer(gl.ARRAY_BUFFER, obj.mesh.VBO);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
				
					gl.bindVertexArray(null);
				}
			}
		}
		else
		{
			if(GameObjects[i].sprite != null)
			{
				var obj = GameObjects[i];
				if(!obj.sprite.flipped)
				{
					obj.sprite.flipped = true;

					var uvs =
					[
						[1.0, 1.0],
						[1.0, 0.0],
						[0.0, 0.0],
						[0.0, 1.0]
					];

					if(obj.sprite.flipHorizontal)
					{
						uvs[0][0] = 1 - uvs[0][0];
						uvs[1][0] = 1 - uvs[1][0];
						uvs[2][0] = 1 - uvs[2][0];
						uvs[3][0] = 1 - uvs[3][0];
					}

					if(obj.sprite.flipVertical)
					{
						uvs[0][1] = 1 - uvs[0][1];
						uvs[1][1] = 1 - uvs[1][1];
						uvs[2][1] = 1 - uvs[2][1];
						uvs[3][1] = 1 - uvs[3][1];
					}

					var squareVertices = 
					[
						//Pos     Texture Coords
						0.5,  0.5, uvs[0][0], uvs[0][1],  // Top Right
						0.5, -0.5, uvs[1][0], uvs[1][1],  // Bottom Right
						-0.5,-0.5, uvs[2][0], uvs[2][1],  // Bottom Left
						-0.5, 0.5, uvs[3][0], uvs[3][1]   // Top Left
					];

					obj.mesh.vertexBuffer = squareVertices;

					gl.bindVertexArray(obj.mesh.VAO);

					gl.bindBuffer(gl.ARRAY_BUFFER, obj.mesh.VBO);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);
				
					gl.bindVertexArray(null);
				}
			}
		}
	}
}

function getUV(obj)
{
	var srcX = (obj.animation.Index % obj.animation.cols) * obj.animation.width;
	var srcY = Math.floor(obj.animation.Index / obj.animation.cols) * obj.animation.height;

	var srcWidth = obj.animation.width;
	var srcHeight = obj.animation.height;

	var u = srcX / (obj.animation.width * obj.animation.cols);
	var v = srcY / (obj.animation.height * obj.animation.rows);
	var u2 = (srcX + srcWidth) / (obj.animation.width * obj.animation.cols);
	var v2 = (srcY + srcHeight) / (obj.animation.height * obj.animation.rows);

	return [u, v, u2, v2];
}
