precision mediump float;

varying float vDistance[12];
varying float radii[12];

uniform float time;

void main()
{
	vec4 c = vec4(0.1, 0.1, 0.3, time);

	float dis = 1.0;
	float check = 0.0;

	for(int i = 0; i < 12; i++)
	{
		if(vDistance[i] == -1.0)
		{
			continue;
		}

		check += vDistance[i];

		dis = (1.0 - 0.0) * ((vDistance[i]) - 0.0) / ((radii[i]) - 0.0) + 0.0;

		dis = clamp(dis, 0.0, 1.0);

		gl_FragColor = vec4(c.rgb, c.a * (pow(0.01, dis) - 0.01)); // * (dis));
		c = gl_FragColor;
	}

	if(check == 0.0)
	{	
		gl_FragColor = vec4(c.rgb, c.a);
	}
}