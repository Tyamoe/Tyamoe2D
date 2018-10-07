precision mediump float;

attribute vec2 vertPosition;
attribute vec2 vertTexCoord;

varying vec2 fragmentUV;

uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat3 modelMatrix;

void main() 
{
	float scale = 1.0;
	gl_Position = projMatrix * viewMatrix * vec4(modelMatrix * vec3(vertPosition, 1.0), 1.0);
    
	fragmentUV.x = ((vertTexCoord.x == 0.0) ? -1.0 : vertTexCoord.x) * scale;
	fragmentUV.y = ((vertTexCoord.y == 0.0) ? -1.0 : vertTexCoord.y) * scale;
}