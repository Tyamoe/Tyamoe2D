precision mediump float;

attribute vec2 vertPosition;

uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat3 modelMatrix;

void main()
{
	gl_Position = projMatrix * viewMatrix * vec4(modelMatrix * vec3(vertPosition, 1.0), 1.0);
}