import { VideoTexture, LinearFilter, TextureLoader, RepeatWrapping, Texture } from 'three';

const fragmentShader = `
varying vec2 vUv;
uniform float dispFactor;
uniform sampler2D disp;
uniform sampler2D texture;
uniform float angle1;
uniform float angle2;
uniform float intensity1;
uniform float intensity2;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}
void main() {

  vec4 _disp = texture2D(disp, vUv);
  vec2 dispVec = vec2(_disp.r, _disp.g);
  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;
  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
  vec4 _texture1 = texture2D(texture, distortedPosition1 * vec2(0.5, 1.0));
  vec4 _texture2 = texture2D(texture, vec2(0.5 + distortedPosition2.x * 0.5, distortedPosition2.y));
  gl_FragColor = mix(_texture1, _texture2, dispFactor);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv ;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

// please respect authorship and do not remove
// tslint:disable-next-line:no-console
console.log(
  '%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ',
  'color: #bada55; font-size: 0.8rem',
);

const createTexture = (src: HTMLVideoElement) => {
  const texture = new VideoTexture(src);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;

  return texture;
};

export default (
  src: HTMLVideoElement,
  intensity1: number,
  intensity2: number,
  angle1: number,
  angle2: number,
  dispTexture: Texture,
) => {
  const texture = createTexture(src);

  dispTexture.wrapS = dispTexture.wrapT = RepeatWrapping;

  return {
    uniforms: {
      intensity1: {
        type: 'f',
        value: intensity1,
      },
      intensity2: {
        type: 'f',
        value: intensity2,
      },
      dispFactor: {
        type: 'f',
        value: 0.0,
      },
      angle1: {
        type: 'f',
        value: angle1,
      },
      angle2: {
        type: 'f',
        value: angle2,
      },
      texture: {
        type: 't',
        value: texture,
      },
      disp: {
        type: 't',
        value: dispTexture,
      },
    },

    vertexShader,
    fragmentShader,
    transparent: true,
    opacity: 1.0,
  };
};
