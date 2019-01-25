window.addEventListener('wheel', handleScroll, false);
window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);
window.addEventListener('mousedown', handleMouseDown, false);
window.addEventListener('mouseup', handleMouseUp, false);
window.addEventListener('mousemove', handleMouseMove, false);

var Mouse = function() 
{ 
  this.screenPos = vec2.create();
  this.worldPos = vec2.create();

  this.left = new MouseButton();
  this.right = new MouseButton();
  this.middle = new MouseButton();
}

var MouseButton = function() 
{ 
  this.current = false;
  this.pressed = false;
  this.released = false;
}

var Keyboard = function() 
{ 
  this.keyPressed = [];
  this.keyCurrent = [];
  this.keyReleased = [];
  this.Binds = 
  {
    UP : "W",
    DOWN : "S",
    RIGHT : "D",
    LEFT : "A",
    SPRINT : "Shift",
  };
}

function handleMouseDown(event)
{
  if(!WebGlInitialized)
  {
    return;
  }

  if(event.button == 0)
  {
    manager.mouse.left.pressed = true;
    manager.mouse.left.current = true;  
    manager.mouse.left.released = false;  
  }
  else if(event.button == 1)
  {
    manager.mouse.middle.pressed = true;
    manager.mouse.middle.current = true;  
    manager.mouse.middle.released = false;  
  }
  else if(event.button == 2)
  {
    manager.mouse.right.pressed = true;
    manager.mouse.right.current = true;  
    manager.mouse.right.released = false;  
  }
  
  var rect = canvas.getBoundingClientRect();  // absolute position of canvas

  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  var s = convertScreenToWorld([x, y]);

  console.log("Canvas: " +[canvas.width ,canvas.height]);
  console.log("Screen: " +[x,y]);
  console.log("World: " + s);
  console.log("Left: " + rect.left);
}

function handleMouseUp(event)
{
  if(!WebGlInitialized)
  {
    return;
  }

  if(event.button == 0)
  {
    manager.mouse.left.current = false;  
    manager.mouse.left.released = true;  
  }
  else if(event.button == 1)
  {
    manager.mouse.middle.current = false;  
    manager.mouse.middle.released = true;  
  }
  else if(event.button == 2)
  {
    manager.mouse.right.current = false;  
    manager.mouse.right.released = true;  
  }
}

function handleMouseMove(event)
{
  if(!WebGlInitialized)
  {
    return;
  }
  
  var rect = canvas.getBoundingClientRect();

  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  vec2.set(manager.mouse.screenPos, x, y);

  var s = convertScreenToWorld([x, y]);

  vec2.set(manager.mouse.worldPos, s[0], s[1]);
}

function handleScroll(event)
{
  if(!WebGlInitialized)
  {
    return;
  }
}

function handleKeyDown(event)
{
  if(!WebGlInitialized)
  {
    return;
  }

  var index = -11;
  var key = String.fromCharCode(event.keyCode);

	if(event.shiftKey && (index = isKeyCurrent(manager.keyboard.Binds.SPRINT)) == -1)
	{
		key = "Shift";
	}

  if((index = isKeyCurrent(key)) == -1)
  {
  	manager.keyboard.keyCurrent.push(key);
    manager.keyboard.keyPressed.push(key);
  }

  if(key == "O")
  {
  	for(var i = 0; i < GameObjects.length; i++)
  	{
  		console.log(GameObjects[i]);
  	}
  }

  if(key == "T")
  {
    var i = getObjectByName("sideWall");
    GameObjects[i].transform.pos[1] += 0.1;
    console.log("Y: " + GameObjects[i].transform.pos[1]);
    manager.isOutdated = true;
    GameObjects[i].transform.dirty = true;  
  }

  if(key == "G")
  {
    var i = getObjectByName("sideWall");
    GameObjects[i].transform.pos[1] -= 0.1;
    console.log("Y: " + GameObjects[i].transform.pos[1]);
    manager.isOutdated = true;
    GameObjects[i].transform.dirty = true;
  }

  if(key == "H")
  {
    var i = getObjectByName("sideWall");
    GameObjects[i].transform.pos[0] += 0.1;
    console.log("Y: " + GameObjects[i].transform.pos[0]);
    manager.isOutdated = true;
    GameObjects[i].transform.dirty = true;  
  }

  if(key == "F")
  {
    var i = getObjectByName("sideWall");
    GameObjects[i].transform.pos[0] -= 0.1;
    console.log("Y: " + GameObjects[i].transform.pos[0]);
    manager.isOutdated = true;
    GameObjects[i].transform.dirty = true;
  }

  if(key == "8")
  {
    //Set Day Time Constant
    manager.time = 0.01;
    manager.timeFactor = 0;
  }

  if(key == "9")
  {
    //Set Night Time Constant
    manager.time = 0.65;
    manager.timeFactor = 0;
  }

  if(key == "0")
  {
    //Set Day/Night Cycle
    manager.time = 0.01;
    manager.timeFactor = -1;
  }
}

var iajs = 1;

function handleKeyUp(event)
{
  if(!WebGlInitialized)
  {
    return;
  }

  var index = -1;
  var key = String.fromCharCode(event.keyCode);

	if(!event.shiftKey && (index = isKeyCurrent(manager.keyboard.Binds.SPRINT)) != -1)
	{
		key = "Shift";
	}

  if((index = isKeyCurrent(key)) != -1)
  {
    manager.keyboard.keyReleased.push(key);
  	manager.keyboard.keyCurrent.splice(index, 1);
  }
}

function isKeyCurrent(key)
{
	for(var i = 0; i < manager.keyboard.keyCurrent.length; i++)
	{
		if(manager.keyboard.keyCurrent[i] == key)
		{
			return i;
		}
	}

	return -1;
}

function isKeyPressed(key)
{
  for(var i = 0; i < manager.keyboard.keyPressed.length; i++)
  {
    if(manager.keyboard.keyPressed[i] == key)
    {
      return i;
    }
  }

  return -1;
}

function isKeyReleased(key)
{
  for(var i = 0; i < manager.keyboard.keyReleased.length; i++)
  {
    if(manager.keyboard.keyReleased[i] == key)
    {
      return i;
    }
  }

  return -1;
}
