// VERTEX SHADER
attribute vec3 vertexPosition;

uniform mat4 modelXformMatrix;
uniform mat4 viewXformMatrix;

void main(void) {
    gl_Position = viewXformMatrix * modelXformMatrix * vec4(vertexPosition, 1.0);
}