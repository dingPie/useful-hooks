import withAppProvider from '@/hocs/withAppProvider';

function App({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default withAppProvider(App);
