import { useSearchParams } from 'next/navigation';

type MethodType = 'push' | 'replace';

export const useShallowSearchParams = (
  key: string,
  method: MethodType = 'push',
) => {
  const searchParams = useSearchParams();
  const paramsValue = searchParams.get(key) ?? '';

  const setParamsValue = (num: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, encodeURIComponent(num));
    if (method === 'replace') {
      window.history.replaceState(null, '', `?${params}`);
    } else {
      window.history.pushState(null, '', `?${params}`);
    }
  };

  const deletePageValue = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
  };

  return {
    paramsValue,
    setParamsValue,
    deletePageValue,
  };
};
