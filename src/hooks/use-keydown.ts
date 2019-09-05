import * as React from 'react';

/**
 * Custom hooks that return the keys that are pressed on the keyboard
 */
export const useKeyDown = (preventDefaultKeys: number[] = []) => {
  const [keys, setKeys] = React.useState<number[]>([]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (preventDefaultKeys.includes(e.keyCode)) {
      e.preventDefault();
    }

    if (keys.includes(e.keyCode)) {
      return;
    }

    setKeys([...keys, e.keyCode]);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (preventDefaultKeys.includes(e.keyCode)) {
      e.preventDefault();
    }

    const d = keys.indexOf(e.keyCode, 0);

    setKeys([...keys.slice(0, d), ...keys.slice(d + 1)]);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('keyup', handleKeyUp, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('keyup', handleKeyUp, false);
    };
  }, [keys]);

  return keys;
};
