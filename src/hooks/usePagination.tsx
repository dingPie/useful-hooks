import { useCallback, useMemo } from 'react';

import { useShallowSearchParams } from './useShallowSearchParams';

export interface UsePaginationProps {
  page?: number;
  setPage?: (num: number) => void;
  total?: number;
  pageSize?: number;
  buttonLimit?: number;
}

export const usePagination = ({
  page,
  setPage,
  total = 0,
  pageSize = 10,
  buttonLimit = 5,
}: UsePaginationProps) => {
  const { paramsValue: paramsPage, setParamsValue: setParamsPage } =
    useShallowSearchParams('page');

  const pageNum = useMemo(() => page ?? Number(paramsPage), [page, paramsPage]);
  const setPageNum = useCallback(
    (num: number) => setPage ?? setParamsPage(num.toString()),
    [setPage, setParamsPage],
  );

  const pageGroupIndex = Math.floor(pageNum / buttonLimit);

  const pageButtonLength = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  );

  const totalPageButtonList = useMemo(
    () =>
      Array(pageButtonLength)
        .fill(0)
        .map((_, i) => i),
    [pageButtonLength],
  );

  const pageButtonList = useMemo(
    () =>
      totalPageButtonList.slice(
        pageGroupIndex * buttonLimit,
        (pageGroupIndex + 1) * buttonLimit,
      ),
    [totalPageButtonList, pageGroupIndex, buttonLimit],
  );

  const isDisabledPrev = useMemo(() => pageNum <= 0, [pageNum]);
  const isDisabledNext = useMemo(
    () => pageNum >= pageButtonLength - 1,
    [pageButtonLength, pageNum],
  );

  const setFirst = useCallback(() => {
    setPageNum(0);
  }, [setPageNum]);

  const setLast = useCallback(() => {
    setPageNum(pageButtonLength - 1);
  }, [pageButtonLength, setPageNum]);

  const setPrev = useCallback(() => {
    const nextPageNum =
      pageGroupIndex === 0 ? 0 : pageGroupIndex * buttonLimit - 1;
    setPageNum(nextPageNum);
  }, [buttonLimit, pageGroupIndex, setPageNum]);

  const setNext = useCallback(() => {
    const nextPageNum =
      pageGroupIndex === Math.floor(pageButtonLength / buttonLimit)
        ? pageButtonLength - 1
        : (pageGroupIndex + 1) * buttonLimit;
    setPageNum(nextPageNum);
  }, [buttonLimit, pageButtonLength, pageGroupIndex, setPageNum]);

  return {
    /**
     * api호출할 page (default: 0)
     */
    pageNum,
    /**
     * api호출할 page set
     */
    setPageNum,
    /**
     * 렌더링할 페이지 넘버
     */
    pageButtonList,
    /**
     * 이전, 처음 버튼 사용 가능여부
     */
    isDisabledPrev,
    /**
     * 다음, 마지막 버튼 사용 가능여부
     */
    isDisabledNext,
    /**
     * 처음 페이지 선택
     */
    setFirst,
    /**
     * 마지막 페이지 선택
     */
    setLast,
    /**
     * 이전버튼 클릭. 이전 페이지의 마지막 항목으로 이동합니다. (6~10 에서 눌렀을 때, 5로 이동 )
     */
    setPrev,
    /**
     * 다음버튼 선택. 이전 페이지의 마지막 항목으로 이동합니다. (1~5 에서 눌렀을 때, 6로 이동 )
     */
    setNext,
  };
};
