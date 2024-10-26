import { useRef } from 'react';

interface UseAnimationProps {
  fps?: number;
}

export const useAnimationFrame = ({ fps = 60 }: UseAnimationProps) => {
  const requestRef = useRef(0);

  const nowRef = useRef(0); // 프레임마다 업데이트 할 시간값
  const thenRef = useRef(Date.now()); // 다음 애니메이션이 실행될 시간

  const animateFrame = (callback: (...args: any) => void) => {
    requestRef.current = window.requestAnimationFrame(() =>
      animateFrame(callback),
    );

    const interval = 1000 / fps;
    nowRef.current = Date.now();
    const diff = nowRef.current - thenRef.current;

    if (diff < interval) return; // 해당 프레임 미만만큼 흘렀다면 애니메이션 실행하지 않음.

    callback();
    thenRef.current = nowRef.current - (diff % interval); // 나머지만큼 빼지 않으면 FPS가 동일하게 지켜지지 않는다.
  };

  const cancelAnimateFrame = () => {
    window.cancelAnimationFrame(requestRef.current);
    requestRef.current = 0;
  };

  return { animateFrame, cancelAnimateFrame, requestRef };
};
