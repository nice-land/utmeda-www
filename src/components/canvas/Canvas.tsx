import { CanvasProps } from 'react-three-fiber';

export let Canvas = (props: CanvasProps) => null;

if (typeof window !== 'undefined') {
  // tslint:disable-next-line: no-var-requires
  Canvas = require('react-three-fiber').Canvas;
}
