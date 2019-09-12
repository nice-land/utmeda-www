export type Action =
  | { type: 'mousedown'; x: number }
  | { type: 'mousemove'; x: number }
  | { type: 'mouseup' }
  | { type: 'activate' }
  | { type: 'init-load' }
  | { type: 'video-load-complete' }
  | { type: 'gl-load-complete' }
  | { type: 'fix-autoplay' }
  | { type: 'play' }
  | { type: 'end' }
  | { type: 'light'; light: boolean }
  | { type: 'reset' }
  | { type: 'visibility'; value: 'hidden' | 'visible' | 'prerender' };

export interface IState {
  playState: 'inactive' | 'transitioning' | 'loading' | 'playing' | 'paused' | 'ended' | 'stalled';
  light: boolean;
  showPlayButton: boolean;
  mouseDown: boolean;
  mouseMove: boolean;
  videoPreloaded: boolean;
  glLoaded: boolean;
  screenX: number;
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
});

export const reducer: React.Reducer<IState, Action> = (state, action) => {
  // console.log(action.type, state, action);

  switch (action.type) {
    case 'visibility': {
      if (state.playState !== 'playing' && state.playState !== 'paused') {
        return state;
      }

      return {
        ...state,
        playState: action.value === 'hidden' ? 'paused' : 'playing',
      };
    }
    case 'light': {
      return {
        ...state,
        light: action.light,
      };
    }
    case 'activate': {
      return {
        ...state,
        playState: state.playState === 'loading' ? 'loading' : 'transitioning',
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
      if (state.playState !== 'loading') {
        return state;
      }

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
        mouseMove: Math.abs(action.x - state.screenX) > 5,
      };
    }
    case 'mousedown': {
      return {
        ...state,
        mouseDown: true,
        mouseMove: false,
        screenX: action.x,
      };
    }
    case 'reset': {
      return init();
    }
  }
  return state;
};
