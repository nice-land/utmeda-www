export type Action =
  | { type: 'mousedown'; x: number; y: number }
  | { type: 'mousemove'; x: number; y: number }
  | { type: 'mouseup' }
  | { type: 'activate' }
  | { type: 'init-load' }
  | { type: 'video-load-complete' }
  | { type: 'gl-load-complete' }
  | { type: 'fix-autoplay' }
  | { type: 'play' }
  | { type: 'end' }
  | { type: 'light'; light: boolean }
  | { type: 'reset' };

export interface IState {
  playState: 'inactive' | 'transitioning' | 'loading' | 'playing' | 'ended' | 'stalled';
  light: boolean;
  showPlayButton: boolean;
  mouseDown: boolean;
  mouseMove: boolean;
  videoPreloaded: boolean;
  glLoaded: boolean;
  screenX: number;
  screenY: number;
}

export const init = (): IState => ({
  playState: 'inactive',
  light: false,
  showPlayButton: false,
  mouseDown: false,
  videoPreloaded: false,
  glLoaded: false,
  mouseMove: false,
  screenX: 0,
  screenY: 0,
});

export const reducer: React.Reducer<IState, Action> = (state, action) => {
  console.log(action.type, state);
  switch (action.type) {
    case 'light': {
      return {
        ...state,
        light: action.light,
      };
    }
    case 'activate': {
      return {
        ...state,
        playState: 'transitioning',
      };
    }
    case 'video-load-complete': {
      return {
        ...state,
        videoPreloaded: true,
        playState: state.playState === 'stalled' ? 'stalled' : state.glLoaded ? 'playing' : 'loading',
      };
    }
    case 'gl-load-complete': {
      return {
        ...state,
        glLoaded: true,
        playState: state.playState === 'stalled' ? 'stalled' : state.videoPreloaded ? 'playing' : 'loading',
      };
    }
    case 'init-load': {
      return {
        ...state,
        playState: 'loading',
        showPlayButton: false,
      };
    }

    case 'play': {
      return {
        ...state,
        playState: 'playing',
        showPlayButton: false,
      };
    }
    case 'fix-autoplay': {
      return {
        ...state,
        playState: 'stalled',
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
      return init();
    }
  }
  return state;
};
