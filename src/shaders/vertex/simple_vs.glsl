attribute vec3 vertexPosition;

uniform mat4 modelXformMatrix;
void main(void) {
    gl_Position = modelXformMatrix * vec4(vertexPosition, 1.0);
}