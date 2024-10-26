import { useEffect, useRef } from 'react';

export const useMultipleKeyEventEffect = ({
  diff,
  keyEvent,
}: {
  diff: number;
  keyEvent: Record<string, ((...args: any) => void | undefined)[]>;
}) => {
  const pressed = useRef<Record<string, number[]>>({});

  useEffect(() => {
    const keyboardEvent = ({ key }: KeyboardEvent) => {
      const now = Date.now();

      if (!pressed.current[key]) pressed.current[key] = [];
      const prev = pressed.current[key].at(-1) ?? Infinity;
      const eventIndex = pressed.current[key].length;

      if (now - prev < diff) {
        keyEvent?.[key]?.[eventIndex] && keyEvent[key][eventIndex]();
        pressed.current[key].push(now);
      } else {
        keyEvent?.[key]?.[0] && keyEvent[key][0]();
        pressed.current[key] = [now];
      }
    };
    window.removeEventListener('keydown', keyboardEvent);
    window.addEventListener('keydown', keyboardEvent);

    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [diff, keyEvent]);
};
