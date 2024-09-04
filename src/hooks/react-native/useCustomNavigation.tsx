import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ParamListBase, useNavigation } from '@react-navigation/native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

export const useCustomNavigation = <ParamList extends ParamListBase>() => {
  const navigation =
    useNavigation<NativeStackScreenProps<ParamList>['navigation']>();

  const isRun = useRef(false);

  const oncePush = (
    ...args: undefined extends ParamList[keyof ParamList]
      ?
          | [screen: keyof ParamList]
          | [screen: keyof ParamList, params: ParamList[keyof ParamList]]
      : [screen: keyof ParamList, params: ParamList[keyof ParamList]]
  ) => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;

    navigation.push(...args);

    setTimeout(() => {
      isRun.current = false;
    }, 300);
  };

  const oncePop = () => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;

    navigation.pop();

    setTimeout(() => {
      isRun.current = false;
    }, 300);
  };

  const onceReplace = (
    ...args: undefined extends ParamList[keyof ParamList]
      ?
          | [screen: keyof ParamList]
          | [screen: keyof ParamList, params: ParamList[keyof ParamList]]
      : [screen: keyof ParamList, params: ParamList[keyof ParamList]]
  ) => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;

    navigation.replace(...args);

    setTimeout(() => {
      isRun.current = false;
    }, 300);
  };

  return {
    ...navigation,
    push: oncePush,
    pop: oncePop,
    replace: onceReplace,
  };
};
