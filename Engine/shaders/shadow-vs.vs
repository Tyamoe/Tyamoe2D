precision mediump float;

attribute vec2 vertPosition;

varying float vDistance[12];
varying float radii[12];
varying float oDistance[12];
varying float dDistance[12];

uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat3 modelMatrix;

uniform vec3 lightData[12];
uniform vec4 occluderData[6];

bool intersect(vec2 min, vec2 max, vec2 p1, vec2 p2);

void main()
{
	vec3 pos = modelMatrix * vec3(vertPosition, 1.0);

	for(int i = 0; i < 12; i++)
	{
		if(lightData[i].z == 0.0)
		{
			vDistance[i] = -1.0;
			continue;
		}

		bool occluder = intersect(vec2(occluderData[0].xy), vec2(occluderData[0].zw), vec2(pos.xy), vec2(lightData[i].xy));

		if(occluder)
		{
			oDistance[i] = distance(pos, vec3(occluderData[0].xy, 1.0));
      dDistance[i] = distance(vec3(lightData[i].xy, 1.0), vec3(occluderData[0].zw, 1.0));
		}
		else
		{
			oDistance[i] = 0.0;
      dDistance[i] = 0.0;
		}

		vDistance[i] = distance(pos, vec3(lightData[i].xy, 1.0));
		radii[i] = lightData[i].z;
	}

	gl_Position = projMatrix * viewMatrix * vec4(modelMatrix * vec3(vertPosition, 1.0), 1.0);
}

bool intersect(vec2 min, vec2 max, vec2 p1, vec2 p2)
{
  float minX = p1.x;
  float maxX = p2.x;

  if(p1.x > p2.x)
  {
    minX = p2.x;
    maxX = p1.x;
  }

  if(maxX > max.x)
  {
    maxX = max.x;
  }
  if(minX < min.x)
  {
    minX = min.x;
  }

  if(minX > maxX) // If their projections do not intersect return false
  {
    return false;
  }

  float minY = p1.y;
  float maxY = p2.y;

  float dx = p2.x - p1.x;

  if(abs(dx) > 0.0000001)
  {
    float a = (p2.y - p1.y) / dx;
    float b = p2.y - a * p2.x;
    minY = a * minX + b;
    maxY = a * maxX + b;
  }

  if(minY > maxY)
  {
    float tmp = maxY;
    maxY = minY;
    minY = tmp;
  }

  if(maxY > max.y)
  {
    maxY = max.y;
  }

  if(minY < min.y)
  {
    minY = min.y;
  }

  if(minY > maxY) // If Y-projections do not intersect return false
  {
    return false;
  }

  return true;
}