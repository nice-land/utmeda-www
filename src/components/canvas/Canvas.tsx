import { CanvasProps } from 'react-three-fiber';

export let Canvas = (_props: CanvasProps) => null;

if (typeof window !== 'undefined') {
  // tslint:disable-next-line: no-var-requires
  Canvas = require('react-three-fiber').Canvas;
}
