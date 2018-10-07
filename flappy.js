var DataLoaded = false;
var WebGlInitialized = false;

var canny = null;

window.onload = function()
{
  var background = document.getElementById("background");
  var height = background.clientHeight * 0.80;
  var width = height * 0.5625;

  var offsetLeft = width;
  var offsetTop = background.clientHeight * 0.1;

  var iCanvas = document.createElement('canvas');
	iCanvas.id = 'flappyCanvas';
	iCanvas.setAttribute("width", "" + width);
	iCanvas.setAttribute("height", "" + height);

  canny = document.createElement('canvas');
	canny.id = 'gagasa';
	canny.setAttribute("width", "" + 100);
	canny.setAttribute("height", "" + 100);
	canny.setAttribute("style", "background-color: red;");

	var ctx = canny.getContext("2d");
	ctx.font = "12px Arial";
	ctx.fillText("Hello World", 10, 50);

	iCanvas.setAttribute("style", "position: absolute; left: " + offsetLeft + "px; top:" + offsetTop + "px;");

	background.appendChild(iCanvas);

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
	{		
		firefox = true;
	}

	InitWebGL();
}