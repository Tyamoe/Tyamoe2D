var Mesh = function(...input)
{
	var temp = (input.length > 0) ? input[0]() : makeMesh();

	this.vertexBuffer = temp.vb;
	this.indexBuffer = temp.ib;

	this.VBO = temp.vbo;
	this.IBO = temp.ibo;
	this.VAO = temp.vao;

	this.AttrPosition = -1;
	this.AttrTexCoords = -1;

	this.vertSize = temp.vertSize;
	this.posSize = temp.posSize;
}

function makeMesh()
{
	var mesh = {};

	var inds = 
	[
		0, 1, 3,
		1, 2, 3
	];

	var squareVertices = 
	[
		//Pos     Texture Coords
		0.5,  0.5, 1.0, 1.0,  // Top Right
		0.5, -0.5, 1.0, 0.0,  // Bottom Right
		-0.5,-0.5, 0.0, 0.0,  // Bottom Left
		-0.5, 0.5, 0.0, 1.0   // Top Left
	];

	mesh.vb = squareVertices;
	mesh.ib = inds;

	mesh.vbo = gl.createBuffer();
	mesh.ibo = gl.createBuffer();
	mesh.vao = gl.createVertexArray();

	gl.bindVertexArray(mesh.vao);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);

  gl.vertexAttribPointer(
    0, 
    2, 
    gl.FLOAT, 
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT, 
    0  
  );

  gl.enableVertexAttribArray(0);
 
  gl.vertexAttribPointer(
    1, 
    2, 
    gl.FLOAT, 
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT, 
    2 * Float32Array.BYTES_PER_ELEMENT 
  );

  gl.enableVertexAttribArray(1);

	gl.bindVertexArray(null);

	mesh.vertSize = 4;
	mesh.posSize = 2;

	return mesh;
}

var meshLight = function()
{
	var mesh = {};
	var inds = 
	[
		0, 1, 3,
		1, 2, 3
	];

	var squareVertices = 
	[
		// Positions
		0.5, 0.5,   // Top Right
		0.5, -0.5,  // Bottom Right
		-0.5,-0.5,   // Bottom Left
		-0.5, 0.5  // Top Left
	];

	mesh.vb = squareVertices;
	mesh.ib = inds;

	mesh.vbo = gl.createBuffer();
	mesh.ibo = gl.createBuffer();
	mesh.vao = gl.createVertexArray();

	gl.bindVertexArray(mesh.vao);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);

  gl.vertexAttribPointer(
    0, 
    2, 
    gl.FLOAT, 
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,  
    0      
  );

  gl.enableVertexAttribArray(0);

	gl.bindVertexArray(null);

	mesh.vertSize = 2;
	mesh.posSize = 2;

	return mesh;
}

var meshHeavy = function()
{
	var mesh = {};

	var inds = 
	[
		0, 1, 3,
		1, 2, 3
	];

	var squareVertices = 
	[
		//	Pos     	Texture Coords
		0.5,  0.5, 1.0, 1.0,  // Top Right
		0.5, -0.5, 1.0, 0.0,  // Bottom Right
		-0.5,-0.5, 0.0, 0.0,  // Bottom Left
		-0.5, 0.5, 0.0, 1.0   // Top Left
	];

	mesh.vb = squareVertices;
	mesh.ib = inds;

	mesh.vbo = gl.createBuffer();
	mesh.ibo = gl.createBuffer();
	mesh.vao = gl.createVertexArray();

	gl.bindVertexArray(mesh.vao);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inds), gl.STATIC_DRAW);

  gl.vertexAttribPointer(
    0, 
    2, 
    gl.FLOAT, 
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT, 
    0 
  );

  gl.enableVertexAttribArray(0);
 
  gl.vertexAttribPointer(
    1, 
    2,    
    gl.FLOAT,  
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT, 
    2 * Float32Array.BYTES_PER_ELEMENT 
  );

  gl.enableVertexAttribArray(1);

	gl.bindVertexArray(null);

	mesh.vertSize = 4;
	mesh.posSize = 2;

	return mesh;
}