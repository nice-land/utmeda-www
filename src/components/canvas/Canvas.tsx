export let Canvas = () => null;

if (typeof window !== 'undefined') {
  // tslint:disable-next-line: no-var-requires
  Canvas = require('react-three-fiber').Canvas;
}
