attribute vec3 vertexPosition;
attribute vec2 textureCoordinate;

varying vec2 texCoord;

uniform mat4 modelXformMatrix;
uniform mat4 viewXformMatrix;

void main(void) {
  gl_Position = viewXformMatrix * modelXformMatrix * vec4(vertexPosition, 1.0);

  texCoord = textureCoordinate;
}