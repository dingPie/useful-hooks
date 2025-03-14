import '@tanstack/react-query';

type ToastMetaType = {
  type: 'toast';
  message: string;
};

type CallbackMetaType = {
  type: 'callback';
  // 인자를 자유롭게 받기 위한 any 사용
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any) => void;
};

type NoneMetaType = {
  type: 'none';
};

// 위 타입들을 interface가 아닌 type 으로 설정해야 정상적으로 추론이 가능합니다.
type MetaProps = ToastMetaType | CallbackMetaType | NoneMetaType;

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta?: MetaProps;
    mutationMeta: Record<string, unknown>;
  }
}
