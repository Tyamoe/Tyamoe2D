precision mediump float;

varying vec2 fragmentUV;

uniform vec4 color;
uniform float radius;
uniform vec2 lightpos;
uniform vec2 res;

void main() 
{
	float dis = length(fragmentUV);

	//vec2 reso = gl_FragCoord.xy;

	//float dis = distance(vec3(lightpos, 1.0), vec3(reso, 1.0));

	//dis = (1.0 - 0.0) * (dis - 0.0) / (radius - 0.0) + 0.0;

	//distance = clamp(distance, 0.0, 1.0);

	gl_FragColor = vec4(color.rgb, color.a * (pow(0.01, dis) - 0.01));
	//gl_FragColor = vec4(color.rgb, color.a * (1.0 - dis));
}