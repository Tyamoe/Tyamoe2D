var DataLoaded = false;
var WebGlInitialized = false;

var canny = null;

window.onload = function()
{
  	var background = document.getElementById("background");
  	var height = background.clientHeight * 0.90;
  	var width = background.clientWidth * 0.90;

  	var offsetLeft = background.clientWidth * 0.05;
  	var offsetTop = background.clientHeight * 0.05;

  	var iCanvas = document.createElement('canvas');
	iCanvas.id = 'game-surface';
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

function errorHandler() 
{
   alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

// toggle full screen
function toggleFullScreen() 
{
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) 
	{  
		// current working methods
		if (document.documentElement.requestFullscreen) 
		{
			document.documentElement.requestFullscreen();
		} 
		else if (document.documentElement.mozRequestFullScreen) 
		{
			document.documentElement.mozRequestFullScreen();
		} 
		else if (document.documentElement.webkitRequestFullscreen) 
		{
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} 
	else 
	{
		if (document.cancelFullScreen) 
		{
			document.cancelFullScreen();
		} 
		else if (document.mozCancelFullScreen)
		{
			document.mozCancelFullScreen();
		} 
		else if (document.webkitCancelFullScreen) 
		{
			document.webkitCancelFullScreen();
		}
	}
}