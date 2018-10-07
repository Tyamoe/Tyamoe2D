var Shader = function(name, program)
{
  this.name = name;
  this.program = program;

  this.GameObjectIndexs = [];
  this.count = 0;
}

function makeShader(shaderName)
{
  var vertexShader = loadShader(shaderName + "-vs.vs");
  var fragmentShader = loadShader(shaderName + "-fs.fs");

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
  {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) 
  {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
  }

  program.projMatrixUniform = gl.getUniformLocation(program, "projMatrix");
  program.modelMatrixUniform = gl.getUniformLocation(program, "modelMatrix");
  program.viewMatrixUniform = gl.getUniformLocation(program, "viewMatrix");
  program.tint = gl.getUniformLocation(program, "tint");
  program.color = gl.getUniformLocation(program, "color");
  program.lightData = gl.getUniformLocation(program, "lightData");
  program.occluderData = gl.getUniformLocation(program, "occluderData");
  program.time = gl.getUniformLocation(program, "time");
  program.radius = gl.getUniformLocation(program, "radius");
  program.res = gl.getUniformLocation(program, "res");
  program.lightpos = gl.getUniformLocation(program, "lightpos");

  return program;
}

function loadShader(shaderName) 
{
  var fragment = "fs";
  var vertex = "vs";

  var script = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", shaderPath + shaderName, false);
  xmlhttp.send();
  if (xmlhttp.status==200) 
  {
    script = xmlhttp.responseText;
  }

  var shader;
  if(shaderName.indexOf(fragment) !== -1)
  {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else
  {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }

  gl.shaderSource(shader, script);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
  {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function shaderAddObject(shader, obj)
{
  shader.GameObjectIndexs.push(GameObjects.length - 1);
  shader.count++;

  obj.mesh.AttrPosition = gl.getAttribLocation(shader.program, 'vertPosition');
  obj.mesh.AttrTexCoords = gl.getAttribLocation(shader.program, 'vertTexCoord');

  if(obj.name == "torch")
  {
    console.log("Shader: " + shader.name);
    console.log(obj);
    console.log("vertSize: " + obj.mesh.vertSize);
    console.log("Attr: " + obj.mesh.AttrPosition + " " + obj.mesh.AttrTexCoords);
  }

  gl.bindVertexArray(obj.mesh.VAO);

  if(obj.mesh.AttrPosition != -1)
  {
    gl.vertexAttribPointer(
      obj.mesh.AttrPosition,        // Attribute location
      obj.mesh.posSize,                          // Number of elements per attribute
      gl.FLOAT,                   // Type of elements
      gl.FALSE,
      obj.mesh.vertSize * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0                           // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(obj.mesh.AttrPosition);
  }

  if(obj.mesh.AttrTexCoords != -1)
  {
    gl.vertexAttribPointer(
       obj.mesh.AttrTexCoords,       // Attribute location
      2,                          // Number of elements per attribute
      gl.FLOAT,                   // Type of elements
      gl.FALSE,
       obj.mesh.vertSize * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      obj.mesh.posSize * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(obj.mesh.AttrTexCoords);
  }

  gl.bindVertexArray(null);
}

function shaderAdd(shader)
{
  shaders.push(shader);
}

function applyAttributes(mesh)
{
  if(mesh.AttrPosition != -1)
  {
    gl.vertexAttribPointer(
      mesh.AttrPosition,        // Attribute location
      2,                          // Number of elements per attribute
      gl.FLOAT,                   // Type of elements
      gl.FALSE,
      mesh.vertSize * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0                           // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(mesh.AttrPosition);
  }

  if(mesh.AttrTexCoords != -1)
  {
    gl.vertexAttribPointer(
      mesh.AttrTexCoords,       // Attribute location
      2,                          // Number of elements per attribute
      gl.FLOAT,                   // Type of elements
      gl.FALSE,
      mesh.vertSize * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(mesh.AttrTexCoords);
  }

  if(mesh.AttrColor != -1)
  {
    gl.vertexAttribPointer(
      meshbj.AttrColor,       // Attribute location
      3,                          // Number of elements per attribute
      gl.FLOAT,                   // Type of elements
      gl.FALSE,
      8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(mesh.AttrColor);
  }
}

function setMatrixUniforms(shader, obj) 
{
  gl.uniformMatrix3fv(shader.modelMatrixUniform, false, obj.transform.modelMatrix);

  if(shader.tint != null)
  {
    gl.uniform4fv(shader.tint, new Float32Array([obj.sprite.tint[0], obj.sprite.tint[1], obj.sprite.tint[2], obj.sprite.tint[3]]));
  }

  if(shader.UV != null)
  {
    gl.uniform1fv(shader.UV, obj.sprite.UVs); 
  }

  if(shader.color != null)
  {
    gl.uniform4fv(shader.color, new Float32Array([obj.light.color[0], obj.light.color[1], obj.light.color[2], obj.light.color[3]]));
  }

  if(shader.radius != null)
  {
    gl.uniform1fv(shader.radius, obj.light.radius);
  }

  if(shader.res != null)
  {
    gl.uniform2fv(shader.res, new Float32Array([canvas.width, canvas.height]));
  }

  if(shader.lightpos != null)
  {
    var p = convertWorldToScreen([obj.transform.pos[0], obj.transform.pos[1]]); 
    gl.uniform2fv(shader.lightpos, new Float32Array([p[0], p[1]]));
  }
}

function setGlobalUniforms(shader) 
{
  gl.uniformMatrix4fv(shader.projMatrixUniform, false, manager.camera.projMatrix);
  gl.uniformMatrix4fv(shader.viewMatrixUniform, false, manager.camera.view);

  if(shader.time != null)
  {
    gl.uniform1f(shader.time, manager.time);
  }

  if(shader.lightData != null)
  {
    gl.uniform3fv(shader.lightData, Lights);
  }

  if(shader.occluderData != null)
  {
    gl.uniform4fv(shader.occluderData, Occluders);
  }
}