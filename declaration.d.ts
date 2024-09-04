import '@tanstack/react-query';

type MetaTypeType = 'toast' | 'callback' | 'none';

interface MetaProps {
  type: MetaTypeType;
  message?: string;
  callback?: (...args: any) => void;
}

declare module '@tanstack/react-query' {
  interface Register {
    // P_TODO: interface 타입은 왜 못받을까요...
    queryMeta:
      | {
          type: MetaTypeType;
          message?: string;
          callback?: (...args: any) => void;
        }
      | undefined;
    mutationMeta: Record<string, unknown>;
  }
}
