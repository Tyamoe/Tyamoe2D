precision mediump float;

attribute vec2 vertPosition;

varying float vDistance[12];
varying float radii[12];

uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat3 modelMatrix;

uniform vec3 lightData[12];

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

		vDistance[i] = distance(pos, vec3(lightData[i].xy, 1.0));
		radii[i] = lightData[i].z;
	}

	gl_Position = projMatrix * viewMatrix * vec4(modelMatrix * vec3(vertPosition, 1.0), 1.0);
}