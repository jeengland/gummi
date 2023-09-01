precision mediump float;

uniform sampler2D samplerUtil;
uniform vec4 pixelColor;

varying vec2 texCoord;

void main(void) {
  vec4 color = texture2D(samplerUtil, vec2(texCoord.s, texCoord.t));

  vec3 tint = vec3(color) * (1.0 - pixelColor.a) + vec3(pixelColor) * pixelColor.a;
  vec4 res = vec4(tint, color.a);

  gl_FragColor = res;
}
