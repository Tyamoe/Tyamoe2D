var currProg = null;
var ccc = 0;
function render()
{
  gl.clear(gl.COLOR_BUFFER_BIT);

  for(var i = 0; i < GameObjects.length; i++)
  {
  	var obj = GameObjects[i];

  	if(!obj.enabled || obj.mesh == null)
		{
			continue;
		}

		if(obj.particles != null && obj.particles.emit && obj.particles.layer == LayerStyle.BEHIND)
		{
			//console.log("BEHIND");
			renderParticles(obj.particles);
		}

		if(currProg != shaders[obj.shader])
		{
			//if(currProg!=null)
				//console.log(currProg.name + " changing to " + shaders[obj.shader].name);
			currProg = shaders[obj.shader];
		
  		gl.useProgram(currProg.program);
  		setGlobalUniforms(currProg.program);
			ccc++;
		}

		if(obj.transform.dirty)
		{
			mat3.identity(obj.transform.modelMatrix);

			mat3.translate(obj.transform.modelMatrix, obj.transform.modelMatrix, [(obj.transform.pos[0]), (obj.transform.pos[1])]);
			mat3.rotate(obj.transform.modelMatrix, obj.transform.modelMatrix, degToRad(obj.transform.rotation));
			mat3.scale(obj.transform.modelMatrix, obj.transform.modelMatrix, [(obj.transform.scale[0]), (obj.transform.scale[1])]);
			
			obj.transform.dirty = false;
		}

		gl.bindVertexArray(obj.mesh.VAO);

		setMatrixUniforms(currProg.program, obj);

		if(obj.sprite != null && obj.sprite.texture != manager.boundTexture)
		{
			gl.bindTexture(gl.TEXTURE_2D, obj.sprite.texture);
			gl.activeTexture(gl.TEXTURE0);

			manager.boundTexture = obj.sprite.texture;
		}
		//console.log("obj: " + obj.name);

		//DEBUG -- This is the draw call that causes the error
		gl.drawElements(gl.TRIANGLES, obj.mesh.indexBuffer.length, gl.UNSIGNED_SHORT, 0);
		gl.bindVertexArray(null);
		if(obj.particles != null && obj.particles.emit && obj.particles.layer == LayerStyle.INFRONT)
		{
			//console.log("INFRONT");
			renderParticles(obj.particles);
		}
  }
  //console.log("Shader: " + ccc);
  ccc = 0;
}