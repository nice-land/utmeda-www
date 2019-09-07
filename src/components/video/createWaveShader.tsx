import { Vector2 } from 'three';

const fragmentShader = `
uniform float dt;
uniform vec2 dimensions;
uniform float random;
uniform float erratic; // [0, 1]

#define PI 3.141592
#define LINE_THICKNESS 0.005

float rand(float x){
  return fract(sin(x)*1.0);
}

float plot(vec2 st, float pct) {
  return smoothstep(pct - LINE_THICKNESS, pct, st.y) - smoothstep(pct, pct + LINE_THICKNESS, st.y);
}

void main() {
  vec2 st = gl_FragCoord.st/dimensions;

  float y_displacement = 0.2;
  float frequency = 220.0 + 440.0 * random;
  float amplitude = mix(0.05, 0.01, random);
  float angle = st.x * frequency;

  float x = sin(angle) * amplitude * erratic + y_displacement;

  vec3 color = vec3(x);

  float pct = plot(st, x);

  gl_FragColor = mix(vec4(0.0,0.0,0.0,0.0), vec4(1.0,1.0,1.0, 0.8), pct);
}
`;

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export default (dimensions: [number, number]) => {
  return {
    uniforms: {
      dimensions: {
        type: 'vec2',
        value: new Vector2(dimensions[0], dimensions[1]),
      },
      dt: {
        type: 'f',
        value: 0.2,
      },
      erratic: {
        type: 'f',
        value: 1,
      },
      random: {
        type: 'f',
        value: Math.random(),
      },
    },

    vertexShader,
    fragmentShader,
    transparent: true,
    opacity: 1.0,
  };
};
