import { useCallback, useMemo, useState } from 'react';

type KeyType<T> = keyof T;
type IdType = string | number;

const getPartialValue = <T,>(value: T, valueList?: (keyof T)[]) => {
  const result = !valueList
    ? value
    : valueList.reduce((a, v) => {
        a[v] = value[v];
        return a;
      }, {} as T);
  return result;
};

interface UseCheckboxHandlerProps<T> {
  dataList?: T[];
  keyName?: KeyType<T>;
  valueList?: KeyType<T>[];
}

export const useCheckboxHandler = <T,>({
  dataList,
  keyName,
  valueList,
}: UseCheckboxHandlerProps<T>) => {
  const [checkedMap, setCheckedMap] = useState<Map<IdType, T>>(new Map());

  const isCheckedAll = useMemo(
    () => !!dataList?.length && checkedMap.size === dataList?.length,
    [dataList?.length, checkedMap.size],
  );

  const isIndeterminate = useMemo(
    () =>
      !!dataList?.length &&
      checkedMap.size > 0 &&
      checkedMap.size < dataList?.length,
    [checkedMap.size, dataList?.length],
  );

  const isChecked = (value: T) => {
    const id = (keyName ? value[keyName] : value) as IdType;
    return checkedMap.has(id);
  };

  // 전체선택
  const onChangeCheckAll = useCallback(() => {
    if (isCheckedAll) {
      setCheckedMap(new Map());
    } else {
      const allMap = dataList?.map((value) => {
        const id = (keyName ? value[keyName] : value) as IdType;
        const newValue = getPartialValue(value, valueList);
        return [id, newValue];
      }) as [IdType, T][];
      setCheckedMap(new Map([...allMap]));
    }
  }, [dataList, isCheckedAll, keyName, valueList]);

  // 하나씩 선택
  const onChangeCheckItem = useCallback(
    (value: T) => {
      const id = (keyName ? value[keyName] : value) as IdType;
      setCheckedMap((prev) => {
        const copy = new Map(prev);
        if (copy.has(id)) copy.delete(id);
        else {
          const newValue = getPartialValue(value, valueList);
          copy.set(id, newValue);
        }
        return copy;
      });
    },
    [keyName, valueList],
  );

  // 선택한 데이터로 inti
  const resetCheckedMap = useCallback(
    (initDataList?: T[]) => {
      const initList = initDataList?.map((value) => {
        const id = (keyName ? value[keyName] : value) as IdType;
        const newValue = getPartialValue(value, valueList);
        return [id, newValue];
      }) as [IdType, T][];
      setCheckedMap(new Map([...initList]));
    },
    [keyName, valueList],
  );

  const getKeys = useCallback(
    () => [...checkedMap].map((v) => v[0]),
    [checkedMap],
  );

  const getValues = useCallback(
    () => [...checkedMap].map((v) => v[1]),
    [checkedMap],
  );

  return {
    checkedMap,
    isCheckedAll,
    isIndeterminate,
    isChecked,
    onChangeCheckAll,
    onChangeCheckItem,
    resetCheckedMap,
    getKeys,
    getValues,
  };
};
