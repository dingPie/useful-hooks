import { useCallback } from 'react';

import { FieldErrors } from 'react-hook-form';

const DEFAULT_ERROR_MESSAGE = '서버 오류가 발생했습니다.';

const useHandleError = () => {
  const handleFormError = useCallback((err: FieldErrors<any>) => {
    const targetError = Object.values(err);
    if (!targetError.length) {
      return;
    }

    // P_TODO: 에러 처리 방식 각 환경 및 라이브러리에 맞게 수정.
    const message =
      (targetError[0]?.message as string) ?? DEFAULT_ERROR_MESSAGE;

    console.log({ message });
  }, []);

  const handleApiError = (error: any, data?: any) => {
    if (data?.message) {
      console.log({ message: data?.message });
      return;
    }

    const serverError = Object.values(error?.response?.data)[0] as
      | string
      | Array<string>;
    const detail =
      typeof serverError === 'string'
        ? serverError
        : (serverError as Array<string>).at(0);
    const notDefinedServerError = detail === '<' || !detail;

    const message = notDefinedServerError ? DEFAULT_ERROR_MESSAGE : detail;
    // P_TODO: 에러 처리 방식 각 환경 및 라이브러리에 맞게 수정.
    console.log({ message });
  };

  return { handleFormError, handleApiError };
};

export default useHandleError;
