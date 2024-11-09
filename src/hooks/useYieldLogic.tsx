import { useCallback, useState } from 'react';

export const useYieldLogic = <T,>() => {
  const [resolve, setResolve] = useState<(v: T) => void>();

  const startYield = useCallback(() => {
    return new Promise((resolve) => {
      setResolve(() => resolve);
    });
  }, []);

  const endYield = useCallback(
    (v: T) => {
      resolve?.(v);
    },
    [resolve],
  );

  return {
    startYield,
    endYield,
  };
};
