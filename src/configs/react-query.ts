import { QueryClient } from '@tanstack/react-query';

// P_TODO: 이거 프로바이더로 분리 예정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** 개발자 판단하에 설정해주세요 기본값은 0 입니다. */
      staleTime: 0,
      /** 개발자 판단하에 설정해주세요 기본값은 3 입니다. */
      retry: 1,
    },
  },
});
