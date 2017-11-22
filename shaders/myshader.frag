#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float normScale;
uniform float colorScale;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	color.r = color.r + colorScale *(0.0-color.r);
	color.g = color.g + colorScale *(0.0-color.g);
	color.b = color.b + colorScale *(1.0-color.b);

	gl_FragColor = color;
}
