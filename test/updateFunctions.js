var drawUpdateFunction = function (draww)
{

	var targetTexture1 = gl.createTexture();
	var targetTexture2 = gl.createTexture();


	// Create Texture
	const targetTextureWidth = 256;
	const targetTextureHeight = 256;


	gl.bindTexture(gl.TEXTURE_2D, targetTexture1);
	{
	  const level = 0;
	  const internalFormat = gl.RGBA;
	  const border = 0;
	  const format = gl.RGBA;
	  const type = gl.UNSIGNED_BYTE;
	  const data = null;

	  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
	                targetTextureWidth, targetTextureHeight, border,
	                format, type, data);
	 
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	}

	gl.bindTexture(gl.TEXTURE_2D, targetTexture2);
	{
	  const level = 0;
	  const internalFormat = gl.RGBA;
	  const border = 0;
	  const format = gl.RGBA;
	  const type = gl.UNSIGNED_BYTE;
	  const data = null;
	  
	  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
	                targetTextureWidth, targetTextureHeight, border,
	                format, type, data);
	 
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}

	// Create and bind the framebuffer
	const fb = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		 
	// attach the texture as the first color attachment
	const attachmentPoint = gl.COLOR_ATTACHMENT0;
	gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture2, level);




	// RENDER
	gl.useProgram(shaders[ShaderType.SCHMOKE].program);
	setMatrixUniforms(shaders[ShaderType.SCHMOKE].program, null);

	gl.bindTexture(gl.TEXTURE_2D, targetTexture1);
	gl.activeTexture(gl.TEXTURE0);





  gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);

  var pm = mat4.create();
	mat4.identity(pm);

 	var aspectRatio = targetTextureWidth / targetTextureHeight;
	mat4.ortho(pm, -aspectRatio, aspectRatio, -1, 1, -1, 1);


  //gl.clear(gl.COLOR_BUFFER_BIT);
	//gl.clearColor(0.0, 0.0, 0.0, 1.0);

  	/*var obj = player;

		if(currProg != shaders[obj.shader])
		{
			currProg = shaders[obj.shader];
		
  		gl.useProgram(currProg.program);
		}

			  gl.uniformMatrix4fv(currProg.program.projMatrixUniform, false, pm);
			  gl.uniformMatrix4fv(currProg.program.viewMatrixUniform, false, manager.camera.view);


			mat3.identity(obj.transform.modelMatrix);

			mat3.translate(obj.transform.modelMatrix, obj.transform.modelMatrix, [(obj.transform.pos[0]), (obj.transform.pos[1])]);
			mat3.rotate(obj.transform.modelMatrix, obj.transform.modelMatrix, degToRad(obj.transform.rotation));
			mat3.scale(obj.transform.modelMatrix, obj.transform.modelMatrix, [(obj.transform.scale[0]), (obj.transform.scale[1])]);
			

		gl.bindVertexArray(obj.mesh.VAO);

		setMatrixUniforms(currProg.program, obj);

		gl.bindTexture(gl.TEXTURE_2D, obj.sprite.texture);
		gl.activeTexture(gl.TEXTURE0);

		gl.drawElements(gl.TRIANGLES, obj.mesh.indexBuffer.length, gl.UNSIGNED_SHORT, 0);
		gl.bindVertexArray(null);*/
  
  var targ = targetTexture1;
  targetTexture1 = targetTexture2;
  targetTexture2 = targ;

  // Set texture
  draww.sprite.texture = targetTexture2;
  gl.viewport(0, 0, canvas.width, canvas.height);
	//gl.clearColor(0.6, 0.4, 0.4, 1.0);
}

var playerUpdateFunction = function (player)
{
	if(player.collider.isColliding)
	{
		player.collider.isColliding = false;
		return;
	}

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