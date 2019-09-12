import { Vector2 } from 'three';

const fragmentShader = `
uniform float dt;
uniform vec2 dimensions;
uniform float random;
uniform float erratic; // [0, 1]

#define PI 3.141592
#define LINE_THICKNESS 0.0075

float rand(float x){
  return fract(sin(x)*1.0);
}

float plot(vec2 st, float pct) {
  return smoothstep(pct - LINE_THICKNESS, pct, st.y) - smoothstep(pct, pct + LINE_THICKNESS, st.y);
}

void main() {
  vec2 st = gl_FragCoord.st/dimensions;

  float y_displacement = 0.2;
  float frequency =  220.0;
  float amplitude = mix(0.075,0.025, random);

  float angle = st.x * frequency;
  float angle2 = st.x * 120.0;
  float angle3 = st.x * 130.0 + mix(0.5, 0.6, random) * 60.0;

  float y = (sin(angle - mix(0.0, 4.0 * PI, dt)) *
            sin(angle2 - mix(0.0, 4.0 * PI, dt)) *
            sin(angle3 - mix(0.0, 4.0 * PI, dt))) *
            amplitude * erratic + y_displacement;

  float pct = plot(st, y);

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
        type: 'i',
        value: 0,
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
