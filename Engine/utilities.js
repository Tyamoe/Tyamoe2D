var lastUpdate = 0;
var dt = 0.016;

function getFrameRate()
{
	var now = Date.now();
	var tdt = (now - lastUpdate) / 1000;
	lastUpdate = now;

  if(tdt > 1)
  {
    tdt = 0.016;
  }

	return tdt;
}

function resize() 
{
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  if (canvas.width  != displayWidth || canvas.height != displayHeight) 
  {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

	mat4.identity(manager.camera.projMatrix);

 	var aspectRatio = canvas.width / canvas.height;
	mat4.ortho(manager.camera.projMatrix, -aspectRatio, aspectRatio, -1, 1, -1, 1);

}

var sortRenderLayers = function(a, b)
{
  return (a.layer - b.layer);
}
