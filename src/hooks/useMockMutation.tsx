import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AsyncFn, AsyncFnReturn, Parameter } from '@toktokhan-dev/universal';

interface MockFuncProps {
  errorRatio?: number;
  data?: any;
}

export type UseMutationParams<
  T extends AsyncFn,
  Error = any,
  Data = AsyncFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseMutationOptions<Data, Error, Variables>,
    'mutationFn' | 'mutationKey'
  >;
};

const mockFunc = async (params?: MockFuncProps) => {
  const isError = (await Math.random()) < (params?.errorRatio || 0);
  if (isError) throw isError;
  return isError;
};

export const useMockMutate = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  params?: UseMutationParams<(params?: MockFuncProps) => Promise<boolean>>,
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useMutation(mockFunc, {
    ...params?.options,
  });
};
