var Sprite = function(texture, ...input)
{
  this.textureList = [];

  if(texture.constructor === Array)
  {
    for(var i = 0; i < texture.length; i++)
    {
      this.textureList[i] = makeTexture(texture[i]);
    }
  }
  else
  {
    this.textureList[0] = makeTexture(texture);
  }

  this.texture = this.textureList[0];

  this.index = 0;

  this.UVs = [0, 0, 0, 0, 0, 0, 0, 0];

  this.pickID;

  this.tint = [1.0, 1.0, 0.0, 1.0];
  this.alpha = 1.0;

  this.layer = 1;

  this.flipHorizontal = (input.length > 0) ? input[0] : false;
  this.flipVertical = (input.length > 1) ? input[1] : false;

  this.flipped = false;

  this.flip = function(axis, state)
  {
    this.flipped = false;
    if(axis == Orientation.HORIZONTAL)
    {
      this.flipHorizontal = state;
    }
    else if(axis == Orientation.VERTICAL)
    {
      this.flipVertical = state;
    }
  }

  this.changeTexture = function(index)
  {
    if(index >= this.textureList.length)
    {
      index = 0;
    }

    if(index == this.index)
    {
      return;
    }

    this.index = index;

    this.texture = this.textureList[index];
  }
}

function testCanvasTexture()
{
  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canny);

  if (isPowerOf2(canvas.width) && isPowerOf2(canvas.height)) 
  {
    gl.generateMipmap(gl.TEXTURE_2D);
  } 
  else 
  {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  return texture;
}

function makeCanvasTexture(can)
{
  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, can);

  if (isPowerOf2(canvas.width) && isPowerOf2(canvas.height)) 
  {
    gl.generateMipmap(gl.TEXTURE_2D);
  } 
  else 
  {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  return texture;
}

function makeTexture(name)
{
  if(typeof name != "string" || name.indexOf("canvas") !== -1)
  {
    return name;
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.crossOrigin = "";

  image.onload = function() 
  {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) 
    {
       gl.generateMipmap(gl.TEXTURE_2D);
    } 
    else 
    {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    DataLoaded = true;
  };
  
  image.src = texturePath + name;

  return texture;
}

function isPowerOf2(value) 
{
  return (value & (value - 1)) == 0;
}