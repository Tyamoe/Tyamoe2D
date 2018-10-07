function radToDeg(r) 
{
	return r * 180 / Math.PI;
}

function degToRad(d)
{
	return d * Math.PI / 180;
}

function clamp(num, min, max) 
{
  return num <= min ? min : num >= max ? max : num;
}

function rand(min, max) 
{
  return Math.random() * (max - min) + min;
}

function randEven(min, max)
{
  return Math.floor((Math.random() * (max - min) / 2) + min) * 2;
}

function distPointToRect(p, rc, rs)
{
	var dx = Math.max(Math.abs(p[0] - rc[0]) - rs[0] / 2, 0);
	var dy = Math.max(Math.abs(p[1] - rc[1]) - rs[1] / 2, 0);

	return dx * dx + dy * dy;
}

function distPointToPoint(p1, p2)
{
	var dx = Math.max(Math.abs(p1[0] - p2[0]), 0);
	var dy = Math.max(Math.abs(p1[1] - p2[1]), 0);

	return dx * dx + dy * dy;
}

function clamperramperlamper(value, min, max)
{
	return 0.0 + (value - min) * (1.0 - 0.0) / (max - min);
}

function convertScreenToWorld(screenCoords) 
{
	var proj = mat4.create();
	mat4.identity(proj);
	var aspectRatio = canvas.width / canvas.height;
	mat4.ortho(proj, -aspectRatio, aspectRatio, -1, 1, -1, 1);

  var x = 2.0 * screenCoords[0] / canvas.width - 1;
	var y = -2.0 * screenCoords[1] / canvas.height + 1;

	mat4.multiply(proj, proj, manager.camera.view);
	mat4.invert(proj, proj);

	var point3D = vec3.create();
	vec3.set(point3D, x, y, 0); 

	vec3.transformMat4(point3D, point3D, proj);
	
	return point3D;
}

/*function point2D get2dPoint(Point3D point3D, Matrix viewMatrix, Matrix projectionMatrix, int width, int height)*/
function convertWorldToScreen(worldCoords) 
{
	var point3D = vec3.create();
	vec3.set(point3D, worldCoords[0], worldCoords[1], 0); 

	var proj = mat4.create();
	mat4.identity(proj);
	var aspectRatio = canvas.width / canvas.height;
	mat4.ortho(proj, -aspectRatio, aspectRatio, -1, 1, -1, 1);

	mat4.multiply(proj, proj, manager.camera.view);

      //transform world to clipping coordinates
	vec3.transformMat4(point3D, point3D, proj);

  var winX = Math.round(((point3D[0] + 1) / 2.0) * canvas.width);
      //we calculate -point3D.getY() because the screen Y axis is
      //oriented top->down 
  var winY = Math.round(((1 - point3D[1] / 2.0) * canvas.height));

	var point2D = vec2.create();
	vec2.set(point2D, winX, winY); 

  return point2D;
}