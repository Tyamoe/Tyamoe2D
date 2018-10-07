precision mediump float;

varying vec2 texCoord;

uniform sampler2D texture1;
uniform vec4 tint;

void main()
{
	gl_FragColor = texture2D(texture1, texCoord) * tint;
}