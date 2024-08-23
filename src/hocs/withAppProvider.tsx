import { FC } from 'react';

import type { AppProps } from 'next/app';

import { QueryClientProvider } from '@tanstack/react-query';

import { ChakraProvider } from '@chakra-ui/react';

import { queryClient } from '@/configs/react-query';
import theme from '@/configs/theme';
import fonts from '@/configs/theme/foundations/typography/fonts';

const coveredTheme = {
  ...theme,
  fonts,
};

function withAppProvider(AppComponent: FC<AppProps>) {
  return function WrappedAppComponent(props: AppProps) {
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={coveredTheme}>
          <AppComponent {...props} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };
}

export default withAppProvider;
