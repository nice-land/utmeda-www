import {
  Vector2,
} from 'three';

const fragmentShader = `
uniform float dt;
uniform vec2 dimensions;
uniform float erratic; // [0, 1]

#define PI 3.141592
#define LINE_THICKNESS 0.01

float rand(float x){
  return fract(sin(x)*1.0);
}

float plot(vec2 st, float pct) {
  return smoothstep(pct - LINE_THICKNESS, pct, st.y) -
        smoothstep(pct, pct + LINE_THICKNESS, st.y);
}

void main() {
  vec2 st = gl_FragCoord.st/dimensions;

  float y_displacement = 0.2;
  float frequency = 50.0;
  float amplitude = 0.1;
  float angle = (dt + st.x) * frequency;

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
        value: 0,
      },
      erratic: {
        type: 'f',
        value: 1,
      },
    },

    vertexShader,
    fragmentShader,
    transparent: true,
    opacity: 1.0,
  };
};
