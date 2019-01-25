var DataLoaded = false;
var WebGlInitialized = false;

window.onload = function()
{
  	var background = document.getElementById("background");
  	var height = background.clientHeight * 0.70;
  	var width = height * 1.2;

  	var offsetLeft = background.clientHeight * 0.2;
  	var offsetTop = background.clientHeight * 0.2;

  	var iCanvas = document.createElement('canvas');
	iCanvas.id = 'breakerCanvas';
	iCanvas.setAttribute("width", "" + width);
	iCanvas.setAttribute("height", "" + height);

	iCanvas.setAttribute("style", "position: absolute; left: " + offsetLeft + "px; top:" + offsetTop + "px;");

	background.appendChild(iCanvas);

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
	{		
		firefox = true;
	}

	InitWebGL();
}