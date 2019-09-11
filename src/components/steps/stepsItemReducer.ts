export type Action =
  | { type: 'mousedown'; x: number; y: number }
  | { type: 'mousemove'; x: number; y: number }
  | { type: 'mouseup' }
  | { type: 'play' }
  | { type: 'autoplay-disabled' }
  | { type: 'end' }
  | { type: 'light'; light: boolean }
  | { type: 'reset' };

export interface IState {
  playState: 'initial' | 'loading' | 'playing' | 'ended';
  light: boolean;
  showPlayButton: boolean;
  mouseDown: boolean;
  mouseMove: boolean;
  screenX: number;
  screenY: number;
}

export const reducer: React.Reducer<IState, Action> = (state, action) => {
  switch (action.type) {
    case 'light': {
      return {
        ...state,
        light: action.light,
      };
    }
    case 'play': {
      return {
        ...state,
        playState: 'playing',
        showPlayButton: false,
      };
    }
    case 'autoplay-disabled': {
      return {
        ...state,
        showPlayButton: true,
      };
    }
    case 'mouseup': {
      return {
        ...state,
        mouseDown: false,
      };
    }
    case 'end': {
      return {
        ...state,
        playState: 'ended',
      };
    }
    case 'mousemove': {
      return {
        ...state,
        mouseMove: Math.abs(action.x - state.screenX) > 5 || Math.abs(action.y - state.screenY) > 5,
      };
    }
    case 'mousedown': {
      return {
        ...state,
        mouseDown: true,
        mouseMove: false,
        screenX: action.x,
        screenY: action.y,
      };
    }
    case 'reset': {
      return {
        ...state,
        playState: 'initial',
        showPlayButton: false,
        light: false,
      };
    }
  }
  return state;
};
