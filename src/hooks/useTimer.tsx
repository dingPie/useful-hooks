import { useCallback, useEffect, useRef, useState } from 'react';

const INTERVAL = 1000;

const useTimer = () => {
  const [ms, setMs] = useState(0);
  const [tick, setTick] = useState(0);

  const startTime = useRef(Date.now());
  const expectedTime = useRef(startTime.current + INTERVAL);
  const tickRef = useRef<NodeJS.Timer>();

  const setUseTimer = useCallback(
    (ms: number) => {
      if (tickRef.current) clearTimeout(tickRef.current);
      expectedTime.current = Date.now(); // -1000;
      setMs(ms);
      runTick(tick);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick],
  );

  const stopTimer = useCallback(() => {
    setMs(0);
  }, []);

  const runTick = useCallback((tick: number) => {
    setTick(tick);
    const drift = Date.now() - expectedTime.current;
    const addTick = tick + 1;
    expectedTime.current += INTERVAL;
    tickRef.current = setTimeout(() => runTick(addTick), INTERVAL - drift);
  }, []);

  useEffect(() => {
    setMs((prev) => prev - INTERVAL);
  }, [tick]);

  useEffect(() => {
    if (ms === 0 && tickRef.current) clearTimeout(tickRef.current);
  }, [ms]);

  return { ms, stopTimer, setUseTimer };
};

export default useTimer;
