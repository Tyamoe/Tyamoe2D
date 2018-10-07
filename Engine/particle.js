var Particles = function(on, count, rate, pos, layer, range, ...theme)
{
  this.emit = on;
  this.reconfigure = true;

  this.count = count;
  this.range = range; 

  this.rate = -1;
  this.maxRate = rate;

  this.themeR = [theme[0][0], theme[0][1]];
  this.themeG = (theme.length == 1) ? [theme[0][0], theme[0][1]] : [theme[1][0], theme[1][1]];
  this.themeB = (theme.length == 1) ? [theme[0][0], theme[0][1]] : [theme[2][0], theme[2][1]];

  this.center = vec2.create();
  this.position = pos;
  this.layer = layer;

  this.AttrPosition = -1;

  this.modelMatrix = mat3.create();

  this.elements = new Mesh(meshLight);

  this.size = [];
  this.pos = [];
  this.color = [];
}

function renderParticles(emitter)
{
  currProg = shaders[ShaderType.PARTICLES];
  gl.useProgram(currProg.program);
      
  gl.bindVertexArray(emitter.elements.VAO);
  //console.log("Particles: " + currProg.name);

  gl.uniformMatrix4fv(currProg.program.projMatrixUniform, false, manager.camera.projMatrix);
  gl.uniformMatrix4fv(currProg.program.viewMatrixUniform, false, manager.camera.view);

  for(var i = 0; i < emitter.size.length; i++)
  {
    // Pos, Color, 
    if(emitter.reconfigure)
    {
      var offsetx = Math.random() * emitter.range - (emitter.range / 2); 
      var offsety = Math.random() * emitter.range - (emitter.range / 2); 

      emitter.pos[i][0] = emitter.center[0] + offsetx;
      emitter.pos[i][1] = emitter.center[1] + offsety;

      var r = rand(emitter.themeR[0], emitter.themeR[1]);
      var g = rand(emitter.themeG[0], emitter.themeG[1]);
      var b = rand(emitter.themeB[0], emitter.themeB[1]);

      emitter.color[i][0] = r;
      emitter.color[i][1] = g;
      emitter.color[i][2] = b;

      //console.log(emitter.color);
    }

    mat3.identity(emitter.modelMatrix);

    mat3.translate(emitter.modelMatrix, emitter.modelMatrix, [(emitter.pos[i][0]), (emitter.pos[i][1])]);
    mat3.scale(emitter.modelMatrix, emitter.modelMatrix, [(emitter.size[i][0]), (emitter.size[i][1])]);

    gl.uniformMatrix3fv(currProg.program.modelMatrixUniform, false, emitter.modelMatrix);
    gl.uniform4fv(currProg.program.color, new Float32Array([emitter.color[i][0], emitter.color[i][1], emitter.color[i][2], 1.0]));
    
    gl.drawElements(gl.TRIANGLES, emitter.elements.indexBuffer.length, gl.UNSIGNED_SHORT, 0);
  
  }
}
