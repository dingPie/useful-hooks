import React, { useMemo } from 'react';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { MetaProps } from '../../declaration';
import useHandleError from './useHandleError';

type CustomQueryClientProviderProps = {
  children: JSX.Element;
};

const CustomQueryClientProvider = ({
  children,
}: CustomQueryClientProviderProps) => {
  const { handleApiError } = useHandleError();

  const queryCache = useMemo(
    () =>
      new QueryCache({
        onError: (error: any, query) => {
          const meta = query.meta as MetaProps;
          if (!meta || meta.type === 'toast') {
            handleApiError(error, { message: meta?.message });
          } else if (meta.type === 'callback' && meta.callback) {
            meta?.callback(error);
          }
          // P_MEMO: none 타입은 작동안함
        },
      }),
    [handleApiError],
  );

  const mutationCache = useMemo(
    () =>
      new MutationCache({
        onError: (error: any, _variable, _context, mutation) => {
          const isOnError = !!mutation.options.onError;
          if (!isOnError) {
            handleApiError(error);
          }
        },
      }),
    [handleApiError],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            /** 개발자 판단하에 설정해주세요 기본값은 0 입니다. */
            staleTime: 0,
            /** 개발자 판단하에 설정해주세요 기본값은 3 입니다. */
            retry: 1,
          },
        },
        queryCache,
        mutationCache,
      }),
    [mutationCache, queryCache],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
